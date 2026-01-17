# 🧪 Cómo Verificar y Probar

## 1️⃣ VERIFICAR QUE EL FORMULARIO SE GUARDA EN SUPABASE

### Opción A: En Supabase Studio (Visual)

1. Ve a https://app.supabase.com
2. Abre tu proyecto `pclydpucvwwtwemkshcq`
3. En el sidebar, click en **"Tables"**
4. Click en **"contacts"**
5. Cuando envíes un formulario desde tu web, aparecerá un nuevo registro aquí

**Verás una tabla con:**
- `id` - ID único del contacto
- `created_at` - Fecha/hora de envío
- `name` - Nombre del usuario
- `email` - Email
- `company` - Empresa (si la agregó)
- `service` - Servicio seleccionado
- `message` - Mensaje
- `status` - "new" (nuevo contacto)

### Opción B: Por Query SQL (Para expertos)

Ve a **SQL Editor** en Supabase y ejecuta:

```sql
SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10;
```

---

## 2️⃣ PROBAR EL FORMULARIO LOCALMENTE

### Paso 1: Ejecuta el servidor local
```bash
npm run dev
```

Abre http://localhost:3000

### Paso 2: Llena el formulario
1. Desplázate al **Hero Section** (arriba de la página)
2. Llena el formulario de la derecha:
   - Nombre: `Juan Pérez`
   - Email: `juan@example.com`
   - Empresa: `Mi Empresa` (opcional)
   - Servicio: Selecciona uno
   - Mensaje: `Quiero saber más`

### Paso 3: Envía
Click en **"Enviar Solicitud"**

**Debería ver:**
- ✅ Un toast (notificación) que diga "¡Mensaje enviado!"
- ✅ El formulario se limpia (vacío)
- ✅ NO debería haber errores en la consola

### Paso 4: Verifica en Supabase
Actualiza la tabla `contacts` en Supabase y verás el registro nuevo

---

## 3️⃣ PROBAR EL CHATBOT

### Paso 1: Abre el chat
En la esquina inferior derecha, verás un botón **"✨ Sparkles"** (flotante)

Click en él para abrir el ChatBot

### Paso 2: Escribe un mensaje
Ejemplos de preguntas que encontrará en FAQ:

- **"¿Qué es automatización con IA?"** → Responderá desde FAQ
- **"¿Cuánto tiempo tarda?"** → Responderá desde FAQ
- **"¿Ofrecen consultoría gratuita?"** → Responderá desde FAQ

Ejemplo de pregunta que usará Gemini:
- **"¿Cuáles son vuestros horarios?"** → Irá a Gemini si no está en FAQ

### Paso 3: Verifica la respuesta
- ✅ Si pregunta está en FAQ, responde en menos de 1 segundo
- ✅ Si no está, usa Gemini y tarda 2-5 segundos
- ✅ La respuesta debería ser coherente y en español

### Paso 4: Ver los logs
Ve a Supabase:
1. **Tables** → **"chat_logs"**
2. Verás cada pregunta y respuesta registrada
3. También verás si usó FAQ o Gemini

---

## 📊 ENTENDER LOS DATOS

### Tabla `contacts` (Formularios)
```
┌─────────────────────────────────────┐
│ Contacto nuevo                      │
├─────────────────────────────────────┤
│ id: uuid-aleatorio                  │
│ name: Juan Pérez                    │
│ email: juan@example.com             │
│ company: Mi Empresa                 │
│ service: Automatización con IA      │
│ message: Quiero saber más...        │
│ status: new                         │
│ created_at: 2026-01-17 15:30:00     │
└─────────────────────────────────────┘
```

### Tabla `conversations` (Historial Chat)
```
┌─────────────────────────────────────┐
│ Conversación                        │
├─────────────────────────────────────┤
│ id: uuid-aleatorio                  │
│ user_id: anonymous                  │
│ messages: [                          │
│   {role: "user", content: "..."},   │
│   {role: "assistant", content: "..."}│
│ ]                                   │
│ created_at: 2026-01-17 15:30:00     │
└─────────────────────────────────────┘
```

### Tabla `chat_logs` (Logs detallados)
```
┌─────────────────────────────────────┐
│ Log de Chat                         │
├─────────────────────────────────────┤
│ user_message: ¿Qué es IA?           │
│ bot_response: La IA es...           │
│ used_faq: true                      │
│ used_gemini: false                  │
│ response_time_ms: 45                │
│ created_at: 2026-01-17 15:30:00     │
└─────────────────────────────────────┘
```

---

## ⚠️ ERRORES COMUNES Y SOLUCIONES

### Error: "Error al guardar contacto"
**Causa:** Supabase no tiene las tablas creadas
**Solución:** Ejecuta el `supabase.sql` en Supabase Studio

### Error: "API/chat error" en el chat
**Causa:** Google Gemini API Key no está configurada o es inválida
**Solución:** Verifica que `GOOGLE_GEMINI_API_KEY` esté bien en `.env.local`

### El formulario no muestra toast
**Causa:** Probablemente funciona pero hay error en el toast
**Solución:** Abre la consola (F12) y revisa los errores

### Chat responde muy lento
**Causa:** Está usando Gemini (normal, tarda 2-5 segundos)
**Solución:** Es correcto si la respuesta no está en FAQ

---

## 🎯 CHECKLIST DE VERIFICACIÓN

- [ ] Ejecuté el `supabase.sql` en Supabase Studio
- [ ] Las tablas existen en Supabase (`contacts`, `conversations`, `faq`, `chat_logs`)
- [ ] Agregué `GOOGLE_GEMINI_API_KEY` en `.env.local`
- [ ] Agregué `SUPABASE_SERVICE_ROLE_KEY` en `.env.local`
- [ ] Reinicié Next.js (`npm run dev`)
- [ ] Envié un formulario y apareció en tabla `contacts`
- [ ] Escribí en el chat y funcionó
- [ ] Los logs aparecen en `chat_logs`

---

¿Todo funciona? ¡Excelente! 🚀
Si hay problemas, revisa la consola del navegador (F12) para ver errores específicos.
