const OriginSection = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
            Cómo nace <span className="text-primary">OVA VISION</span>
          </h2>
          
          <div className="space-y-8">
            <div className="p-8 rounded-xl border bg-card">
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">OVA VISION nació de una necesidad urgente.</span> Venezuela 
                está llena de empresas con talento, potencial y visión, pero atrapadas en procesos manuales, 
                lentos y costosos. Vimos cómo negocios con buenas ideas perdían tiempo, dinero y oportunidades 
                solo porque no contaban con las herramientas tecnológicas necesarias para crecer.
              </p>
            </div>
            
            <div className="p-8 rounded-xl border bg-card">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Vimos marcas esforzarse por comunicar sin una estructura estratégica sólida. Vimos equipos 
                saturados por tareas repetitivas que podían ser automatizadas. Por eso creamos OVA VISION: 
                <span className="text-foreground font-semibold"> para ser el puente entre la creatividad, 
                la inteligencia artificial y la productividad empresarial.</span>
              </p>
            </div>
            
            <div className="p-8 rounded-xl border bg-card border-l-4 border-l-primary">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Para traer al país herramientas que transforman, sistemas que liberan tiempo, automatizaciones 
                que eliminan errores y tecnologías que impulsan a las marcas hacia un 
                <span className="text-primary font-bold"> futuro competitivo y moderno.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OriginSection;
