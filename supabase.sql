-- =====================================================
-- OVA VISION - Supabase SQL Setup
-- =====================================================

-- 1. Tabla de Contactos
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  service VARCHAR(255) NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, converted
  notes TEXT
);

-- Índices para búsqueda rápida
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- 2. Tabla de Conversaciones (Historial del ChatBot)
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id VARCHAR(255), -- Can be anonymous or user ID if authenticated
  messages JSONB NOT NULL DEFAULT '[]', -- Array of {role, content, timestamp}
  status VARCHAR(50) DEFAULT 'active', -- active, closed, archived
  ip_address VARCHAR(45) -- Para tracking de usuarios anónimos
);

CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);

-- 3. Tabla de FAQ (Preguntas Frecuentes)
CREATE TABLE faq (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  category VARCHAR(100) NOT NULL, -- automatizacion, branding, ia, desarrollo, contacto
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}', -- Para búsqueda
  priority INTEGER DEFAULT 0, -- Mayor prioridad = se muestra primero
  active BOOLEAN DEFAULT true
);

CREATE INDEX idx_faq_category ON faq(category);
CREATE INDEX idx_faq_active ON faq(active);
CREATE INDEX idx_faq_keywords ON faq USING GIN(keywords);

-- 4. Tabla de Logs del ChatBot (opcional, para debugging)
CREATE TABLE chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_message TEXT NOT NULL,
  bot_response TEXT NOT NULL,
  used_faq BOOLEAN DEFAULT false,
  faq_id UUID REFERENCES faq(id),
  used_gemini BOOLEAN DEFAULT false,
  response_time_ms INTEGER
);

CREATE INDEX idx_chat_logs_created_at ON chat_logs(created_at DESC);

-- =====================================================
-- Insert Sample FAQ Data
-- =====================================================

INSERT INTO faq (category, question, answer, keywords, priority, active) VALUES
(
  'automatizacion',
  '¿Qué es la automatización con IA?',
  'La automatización con IA es el proceso de utilizar inteligencia artificial para automatizar tareas repetitivas en tu negocio. Esto permite que tu equipo se enfoque en tareas más estratégicas mientras la IA maneja procesos rutinarios como procesamiento de datos, respuesta a consultas, y gestión de flujos de trabajo.',
  ARRAY['automatización', 'IA', 'procesos', 'tareas'],
  10,
  true
),
(
  'automatizacion',
  '¿Cuánto tiempo tarda implementar una automatización?',
  'El tiempo depende de la complejidad del proceso. Proyectos simples pueden implementarse en 2-4 semanas, mientras que soluciones más complejas pueden tomar 1-3 meses. Realizamos una evaluación inicial gratuita para darte un timeline exacto.',
  ARRAY['implementación', 'tiempo', 'proyecto', 'duración'],
  9,
  true
),
(
  'ia',
  '¿Qué son los Agentes de IA?',
  'Los Agentes de IA son sistemas inteligentes que pueden tomar decisiones autónomamente, realizar múltiples tareas y aprender de las interacciones. Pueden integrase con tus sistemas existentes para automatizar procesos complejos sin intervención humana constante.',
  ARRAY['agentes', 'inteligencia artificial', 'autónomo', 'sistemas'],
  10,
  true
),
(
  'branding',
  '¿Qué incluye un servicio de branding estratégico?',
  'Nuestro servicio de branding incluye: análisis de competencia, definición de identidad de marca, diseño de logo y paleta de colores, estrategia de posicionamiento, creación de contenido visual, y asesoramiento en comunicación de marca. Todo esto diseñado para diferenciarte en el mercado.',
  ARRAY['branding', 'marca', 'identidad', 'diseño', 'estrategia'],
  10,
  true
),
(
  'desarrollo',
  '¿Desarrollan sitios web personalizados?',
  'Sí, desarrollamos sitios web personalizados con tecnología moderna (Next.js, React, Node.js) optimizados para SEO, velocidad y conversión. Cada proyecto es adaptado a tus necesidades específicas y objetivos de negocio.',
  ARRAY['sitio web', 'desarrollo', 'web', 'personalizado', 'diseño'],
  9,
  true
),
(
  'contacto',
  '¿Cuál es el horario de atención?',
  'Nuestro equipo está disponible de lunes a viernes de 9:00 AM a 6:00 PM (horario Venezuela). Puedes contactarnos a través de WhatsApp, email o agendar una consultoría gratuita directamente en nuestra web.',
  ARRAY['horario', 'atención', 'contacto', 'disponible'],
  8,
  true
),
(
  'contacto',
  '¿Ofrecen consultoría gratuita?',
  'Sí, ofrecemos una consultoría inicial gratuita de 30 minutos para evaluar tus necesidades y proponer soluciones. Puedes agendar directamente en nuestro formulario o contactarnos por WhatsApp.',
  ARRAY['consultoría', 'gratuita', 'evaluación', 'asesoramiento'],
  10,
  true
);

-- =====================================================
-- Enable Row Level Security (Seguridad)
-- =====================================================

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública para FAQ
CREATE POLICY "FAQ is publicly readable" ON faq
  FOR SELECT
  TO public
  USING (active = true);

-- Políticas para inserciones (sin autenticación necesaria)
CREATE POLICY "Anyone can insert contacts" ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can insert conversations" ON conversations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can insert chat logs" ON chat_logs
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Políticas para leer conversaciones propias
CREATE POLICY "Users can read own conversations" ON conversations
  FOR SELECT
  TO public
  USING (true); -- En desarrollo, permitir lectura libre. En producción, restricto por user_id

-- =====================================================
-- Triggers para actualizar updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_faq_updated_at BEFORE UPDATE ON faq
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
