import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, service, message, _hp } = body;

    // Honeypot check (spam protection)
    if (_hp) {
      return NextResponse.json({ success: true });
    }

    // Validation
    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes: nombre, email, servicio" },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // 1. Guardar en Supabase
    const { data: contactData, error: dbError } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          email,
          company: company || null,
          service,
          message: message || null,
          status: "new",
        },
      ])
      .select();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Error al guardar contacto" },
        { status: 500 }
      );
    }

    // 2. Enviar email (opcional, si está configurado)
    if (resend) {
      try {
        await resend.emails.send({
          from: "OVA VISION <noreply@ovavision.com>",
          to: ["ovavision.ve@gmail.com"],
          replyTo: email,
          subject: `Nuevo contacto: ${name} - ${service}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Nuevo mensaje de contacto</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #f5f5f5;">
                  <td style="padding: 10px; font-weight: bold;">Nombre:</td>
                  <td style="padding: 10px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Email:</td>
                  <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr style="background-color: #f5f5f5;">
                  <td style="padding: 10px; font-weight: bold;">Empresa:</td>
                  <td style="padding: 10px;">${company || "No especificada"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Servicio:</td>
                  <td style="padding: 10px;">${service}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                <h3>Mensaje:</h3>
                <p style="color: #555; line-height: 1.6;">${message || "Sin mensaje adicional"}</p>
              </div>
              <div style="margin-top: 20px; color: #999; font-size: 12px;">
                <p>Este mensaje fue enviado desde el formulario de contacto de OVA VISION</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // No fallar si el email no se envía
      }
    }

    return NextResponse.json({
      success: true,
      message: "Contacto guardado correctamente",
      contactId: contactData?.[0]?.id,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Error al procesar solicitud" },
      { status: 500 }
    );
  }
}
