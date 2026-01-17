import { Target, Eye } from "lucide-react";

const MissionVisionSection = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center">
            Nuestra <span className="text-primary">Misión</span> y <span className="text-primary">Visión</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 lg:p-10 rounded-xl border bg-card hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <Target className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">Misión</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Impulsar y transformar empresas venezolanas mediante soluciones que unen lo mejor de la 
                automatización inteligente y el branding estratégico. Integramos sistemas basados en 
                inteligencia artificial que simplifican procesos complejos, reducen tiempos operativos 
                y optimizan recursos.
              </p>
            </div>
            
            <div className="p-8 lg:p-10 rounded-xl border bg-card hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <Eye className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">Visión</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Ser la agencia líder en Venezuela en automatización empresarial y soluciones creativas, 
                reconocida por ampliar el acceso a tecnologías avanzadas y por impulsar el crecimiento 
                de marcas que buscan operar con eficiencia, innovación y un impacto visual memorable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
