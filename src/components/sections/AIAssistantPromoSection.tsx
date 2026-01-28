'use client';

import { MessageSquare, Zap, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Zap,
    title: 'Respuesta instantánea',
    description: 'Responde consultas en menos de 2 segundos'
  },
  {
    icon: Clock,
    title: 'Disponible 24/7',
    description: 'Sin horarios, sin esperas, siempre activo'
  },
  {
    icon: Sparkles,
    title: 'IA entrenada',
    description: 'Conoce todos nuestros servicios y procesos'
  }
];

// Avatar de Ovi para la sección promo
const OviAvatar = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-10 h-10 text-xl",
    lg: "w-14 h-14 text-3xl"
  };

  return (
    <div className={cn(
      "rounded-full bg-gradient-to-br from-secondary via-ova-cyan to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg",
      sizeClasses[size]
    )}>
      <span role="img" aria-label="Ovi">🤖</span>
    </div>
  );
};

const AIAssistantPromoSection = () => {
  const openChat = () => {
    // Trigger the chatbot to open
    const chatButton = document.querySelector('[data-chatbot-trigger]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
    }
  };

  return (
    <section className="py-16 lg:py-20">
      <div className="container px-6 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/20 to-ova-cyan/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Left side - Icon and text */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
                    <span>🤖</span>
                    Conoce a Ovi
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Habla con{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      Ovi
                    </span>
                    {' '}ahora mismo
                  </h2>

                  <p className="text-foreground/70 mb-6 max-w-xl">
                    Ovi es nuestro asistente virtual con IA. Puede responder tus preguntas sobre
                    automatización, agendar consultas gratuitas y ayudarte a encontrar la solución
                    perfecta para tu empresa.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {features.map((feature) => (
                      <div key={feature.title} className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{feature.title}</p>
                          <p className="text-xs text-foreground/60">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={openChat}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Hablar con Ovi
                  </button>
                </div>

                {/* Right side - Chat preview */}
                <div className="w-full lg:w-80 flex-shrink-0">
                  <div className="bg-background/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl overflow-hidden">
                    {/* Chat header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-secondary to-ova-cyan flex items-center gap-3">
                      <OviAvatar size="md" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">Ovi</p>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <p className="text-xs text-foreground/80">En línea</p>
                        </div>
                      </div>
                    </div>

                    {/* Chat messages preview */}
                    <div className="p-4 space-y-3">
                      <div className="flex gap-2">
                        <OviAvatar size="sm" />
                        <div className="bg-muted/50 rounded-lg rounded-tl-none px-3 py-2 max-w-[200px]">
                          <p className="text-sm">¡Hola! 👋 Soy Ovi, tu asistente de OVA VISION. ¿En qué puedo ayudarte?</p>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <div className="bg-secondary/20 rounded-lg rounded-tr-none px-3 py-2 max-w-[200px]">
                          <p className="text-sm">¿Qué servicios ofrecen?</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <OviAvatar size="sm" />
                        <div className="bg-muted/50 rounded-lg rounded-tl-none px-3 py-2 max-w-[200px]">
                          <p className="text-xs text-muted-foreground">Ovi está escribiendo...</p>
                          <div className="flex gap-1 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantPromoSection;
