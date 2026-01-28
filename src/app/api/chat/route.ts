import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Función para buscar respuestas en FAQ con timeout
async function searchFAQ(userMessage: string) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 segundo timeout

    // Buscar preguntas relevantes usando palabras clave
    const { data: faqs, error } = await supabase
      .from("faq")
      .select("id, category, question, answer, keywords, priority")
      .eq("active", true)
      .order("priority", { ascending: false })
      .limit(5);

    clearTimeout(timeoutId);

    if (error || !faqs) return null;

    // Buscar match por similitud simple
    const lowerMessage = userMessage.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    for (const faq of faqs) {
      let score = 0;

      // Buscar en la pregunta
      if (
        faq.question.toLowerCase().includes(lowerMessage) ||
        lowerMessage.includes(faq.question.toLowerCase().split(" ")[0])
      ) {
        score += 10;
      }

      // Buscar en palabras clave
      if (faq.keywords) {
        for (const keyword of faq.keywords) {
          if (lowerMessage.includes(keyword.toLowerCase())) {
            score += 5;
          }
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    }

    return bestScore > 2 ? bestMatch : null; // Umbral mínimo de relevancia
  } catch (error) {
    console.error("FAQ search error:", error);
    return null;
  }
}

// Función para llamar a Groq con timeout
async function callGroq(messages: any[]) {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY not configured");
  }

  const systemPrompt = `Eres un asistente de soporte para OVA VISION, una agencia de automatización con IA y branding estratégico ubicada en Venezuela.

Tu rol es:
1. Ayudar a los clientes con preguntas sobre servicios
2. Ser amable, profesional y conciso
3. Responder en español
4. Si no sabes algo, sugerir contactar directamente
5. Promover los servicios de la agencia cuando sea relevante

Información sobre OVA VISION:
- Servicios: Automatización con IA, Agentes de IA, Branding Estratégico, Desarrollo Web, Consultoría
- WhatsApp: +58 4245781707
- Email: ovavision.ve@gmail.com
- Ubicación: Venezuela
- Horario: Lunes a viernes, 9 AM - 6 PM (hora Venezuela)`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundo timeout

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Groq API error: ${error.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("No response from Groq");
    }

    return text;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Función para guardar en historial con timeout
async function saveConversation(userId: string, messages: any[]) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 segundo timeout
    
    await Promise.race([
      supabase.from("conversations").insert([
        {
          user_id: userId,
          messages: messages,
          status: "active",
        },
      ]),
      new Promise((_, reject) => controller.signal.addEventListener("abort", () => reject(new Error("Timeout")))),
    ]);
    
    clearTimeout(timeoutId);
  } catch (error) {
    console.error("Error saving conversation:", error);
    // No fallar si no se guarda el historial
  }
}

// Función para registrar logs con timeout
async function logChat(
  userMessage: string,
  botResponse: string,
  usedFaq: boolean,
  faqId: string | null,
  usedGemini: boolean,
  responseTime: number
) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 segundo timeout
    
    await Promise.race([
      supabase.from("chat_logs").insert([
        {
          user_message: userMessage,
          bot_response: botResponse,
          used_faq: usedFaq,
          faq_id: faqId,
          used_gemini: usedGemini,
          response_time_ms: responseTime,
        },
      ]),
      new Promise((_, reject) => controller.signal.addEventListener("abort", () => reject(new Error("Timeout")))),
    ]);
    
    clearTimeout(timeoutId);
  } catch (error) {
    console.error("Error logging chat:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    const userMessage = messages[messages.length - 1];
    if (userMessage.role !== "user") {
      return NextResponse.json(
        { error: "Last message must be from user" },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    let botResponse = "";
    let usedFaq = false;
    let faqId = null;
    let usedGemini = false;

    // 1. Intentar responder desde FAQ
    const faqMatch = await searchFAQ(userMessage.content);

    if (faqMatch) {
      botResponse = faqMatch.answer;
      usedFaq = true;
      faqId = faqMatch.id;
    } else {
      // 2. Usar Groq como fallback
      try {
        botResponse = await callGroq(messages);
        usedGemini = true; // mantener el nombre para compatibilidad con logs
      } catch (error: any) {
        console.error("Groq error:", error);
        // Mostrar error específico para debugging (quitar después)
        const errorDetail = error?.message || "Error desconocido";
        botResponse = `Error: ${errorDetail}. Contáctanos por WhatsApp: +58 4245781707`;
      }
    }

    const responseTime = Date.now() - startTime;

    // Guardar en historial y logs (sin esperar)
    saveConversation("anonymous", [...messages, { role: "assistant", content: botResponse }]);
    logChat(
      userMessage.content,
      botResponse,
      usedFaq,
      faqId,
      usedGemini,
      responseTime
    );

    return NextResponse.json({
      role: "assistant",
      content: botResponse,
      meta: {
        usedFaq,
        usedGemini,
        responseTime,
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Error processing chat message" },
      { status: 500 }
    );
  }
}
