# 🚀 Setup de Supabase + Gemini para OVA VISION

## ✅ Checklist de Configuración

### 1️⃣ **Agregar Variables de Entorno**

Agrega a tu `.env.local`:

```env
# Gemini API
GOOGLE_GEMINI_API_KEY=tu_api_key_de_gemini

# Supabase Service Role (para guardar datos desde API)
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

**¿Cómo obtenerlas?**

#### **Google Gemini:**
1. Ve a https://console.cloud.google.com/
2. Crea un proyecto nuevo
3. Habilita "Generative Language API"
4. Ve a "Credentials" → Crea una "API Key"
5. Copia la clave en `GOOGLE_GEMINI_API_KEY`

#### **Supabase Service Role:**
1. Ve a tu proyecto en https://app.supabase.com
2. Settings → API → Copiar "service_role" key
3. Pega en `SUPABASE_SERVICE_ROLE_KEY`

---

### 2️⃣ **Crear Tablas en Supabase**

1. Ve a tu proyecto en https://app.supabase.com
2. SQL Editor → New Query
3. Copia y pega TODO el contenido de `supabase.sql`
4. Click "Run"

**Esto creará:**
- ✅ Tabla `contacts` - Para formularios de contacto
- ✅ Tabla `conversations` - Historial del chat
- ✅ Tabla `faq` - Preguntas frecuentes (ya con datos iniciales)
- ✅ Tabla `chat_logs` - Logs de conversaciones

---

### 3️⃣ **Archivos Creados/Modificados**

**Nuevas rutas API:**
- `src/app/api/chat/route.ts` - ChatBot con FAQ + Gemini
- `src/app/api/contacts/route.ts` - Guardar contactos en Supabase

**Componentes actualizados:**
- `src/components/ChatBot.tsx` - Conectado a `/api/chat`
- `src/components/sections/HeroSection.tsx` - Formulario conectado a `/api/contacts`
- `src/components/WhatsAppButton.tsx` - Número actualizado

**Archivos de referencia:**
- `supabase.sql` - Schema de base de datos

---

### 4️⃣ **Flujo de Funcionamiento**

#### **Formulario de Contacto:**
```
Usuario llena formulario
        ↓
Envía a POST /api/contacts
        ↓
Se guarda en tabla `contacts`
        ↓
Se envía email por Resend
        ↓
Toast de éxito
```

#### **ChatBot:**
```
Usuario envía mensaje
        ↓
POST /api/chat
        ↓
Busca en tabla `faq`
        ↓
Si hay match → Responde desde FAQ ✅
Si NO → Usa Gemini API 🤖
        ↓
Guarda en `conversations` y `chat_logs`
        ↓
Retorna respuesta
```

---

### 5️⃣ **Próximos Pasos (Opcional)**

**Para mejorar el ChatBot:**

1. **Alimentar la FAQ:**
   - Ve a Supabase → Tabla `faq`
   - Agrega más preguntas y respuestas sobre tus servicios
   - El bot las usará automáticamente

2. **Dashboard de Admin:**
   - Ver contactos en tabla `contacts`
   - Ver historial de chats en `conversations`
   - Analizar logs en `chat_logs`

3. **Webhooks:**
   - Supabase puede enviar notificaciones cuando llegan nuevos contactos
   - Se puede integrar con Slack, Discord, etc.

---

### ⚠️ **Troubleshooting**

**"Error: GOOGLE_GEMINI_API_KEY not configured"**
→ Asegúrate de agregar la variable en `.env.local` y reinicia Next.js

**"Error: SUPABASE_SERVICE_ROLE_KEY not configured"**
→ Agrega la clave de servicio en `.env.local`

**"Forbidden" al guardar contacto**
→ Verifica que las RLS policies en Supabase estén activas (las creó el SQL automáticamente)

**ChatBot no responde**
→ Revisa la consola de navegador (F12) para ver errores de la API
→ Verifica que `/api/chat` sea accesible

---

## 📝 Notas Importantes

- Las respuestas del ChatBot primero buscan en FAQ (más rápido)
- Solo usa Gemini si no encuentra match en FAQ
- Todos los datos se guardan en Supabase para análisis
- El formulario envía email Y guarda en BD

---

**¿Preguntas?** Revisa los archivos:
- `src/app/api/chat/route.ts` - Lógica del chat
- `src/app/api/contacts/route.ts` - Lógica de contactos
- `supabase.sql` - Schema de la BD
