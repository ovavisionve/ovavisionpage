'use client';

import {
  Bot, Database, Globe, Workflow,
  Brain, Sparkles, Server, Code2
} from 'lucide-react';

const techCategories = [
  {
    title: 'Automatización',
    icon: Workflow,
    color: 'from-green-400 to-emerald-500',
    tools: ['Make', 'Zapier', 'n8n', 'Power Automate'],
  },
  {
    title: 'Inteligencia Artificial',
    icon: Brain,
    color: 'from-purple-400 to-pink-500',
    tools: ['OpenAI GPT', 'Claude AI', 'LangChain', 'Hugging Face'],
  },
  {
    title: 'Bases de Datos',
    icon: Database,
    color: 'from-secondary to-ova-cyan',
    tools: ['Supabase', 'PostgreSQL', 'Firebase', 'Airtable'],
  },
  {
    title: 'Desarrollo Web',
    icon: Globe,
    color: 'from-ova-amber to-ova-orange',
    tools: ['Next.js', 'React', 'Vercel', 'TailwindCSS'],
  },
];

const TechStackSection = () => {
  return (
    <section className="py-20 lg:py-28 section-gradient-2">
      <div className="container px-6 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-ova-amber/10 text-ova-amber text-sm font-medium mb-4">
              Tecnologías
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stack Tecnológico de{' '}
              <span className="bg-gradient-to-r from-ova-amber to-ova-orange bg-clip-text text-transparent">
                Última Generación
              </span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Utilizamos las herramientas más avanzadas del mercado para crear soluciones robustas, escalables y fáciles de mantener.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategories.map((category) => (
              <div
                key={category.title}
                className="glass-card p-6 group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}>
                  <category.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 text-xs rounded-full bg-muted/50 text-foreground/80 border border-border/30"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom highlight */}
          <div className="mt-12 glass-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-secondary to-purple-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-8 h-8 text-foreground" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Low-Code / No-Code</h3>
                <p className="text-foreground/70">
                  Nuestras soluciones están diseñadas para que tu equipo pueda hacer ajustes sin depender de programadores.
                  Tecnología accesible que crece contigo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
