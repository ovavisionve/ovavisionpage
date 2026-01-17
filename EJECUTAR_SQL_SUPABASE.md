# 🚀 PASO A PASO: Ejecutar SQL en Supabase

## ✅ Variables de Entorno - ¡LISTO!

Tu `.env.local` ya tiene:
- ✅ `GOOGLE_GEMINI_API_KEY` 
- ✅ `SUPABASE_SERVICE_ROLE_KEY`

## 📋 EJECUTAR SQL EN SUPABASE

### Paso 1: Abre Supabase Studio
1. Ve a https://app.supabase.com
2. Haz login con GitHub
3. Abre tu proyecto `pclydpucvwwtwemkshcq`

### Paso 2: Abre SQL Editor
En el sidebar izquierdo:
- Click en **"SQL Editor"**
- Click en **"New Query"**

### Paso 3: Copia el SQL
1. En tu proyecto local, abre el archivo: `supabase.sql`
2. Selecciona TODO el contenido (Ctrl+A)
3. Cópialo (Ctrl+C)

### Paso 4: Pega en Supabase
1. En Supabase Studio, pega el SQL en el editor (Ctrl+V)
2. Click en el botón **"Run"** (abajo a la derecha)
3. **Espera a que termine** ✅

### Paso 5: Verifica que se crearon las tablas

En el sidebar:
- Ve a **"Tables"**
- Deberías ver:
  - ✅ `contacts`
  - ✅ `conversations`
  - ✅ `faq`
  - ✅ `chat_logs`

---

## ⚠️ Si hay errores

**Error: "relation already exists"**
→ Las tablas ya existen. Todo está bien ✅

**Error: "permission denied"**
→ Usa una cuenta con permisos de admin en Supabase

**Error: "syntax error"**
→ Asegúrate de copiar TODO el archivo `supabase.sql` completo

---

## ✨ Ahora está TODO listo

Una vez ejecutado el SQL:
1. Tu ChatBot funcionará con FAQ + Gemini
2. Los contactos se guardarán en Supabase
3. El historial de conversaciones se guardará
4. Los logs se registrarán automáticamente

---

## 🧪 Prueba Local

Para verificar que todo funciona:

```bash
npm run dev
```

Luego:
1. Abre http://localhost:3000
2. Intenta enviar un contacto (debe guardarse sin errores)
3. Abre el ChatBot y escribe algo
4. Debería responder desde FAQ o Gemini

---

## 📊 Ver Datos en Supabase

Para ver los datos guardados:
1. Ve a **"Tables"** en Supabase
2. Click en `contacts` o `conversations`
3. Verás todos los registros guardados

---

¿Alguna duda en los pasos? 🚀
