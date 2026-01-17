import { Paintbrush, Shapes, Image, Package, FileImage, Lightbulb } from "lucide-react";

const brandingServices = [
  { icon: Shapes, title: "Identidad Visual Completa", description: "Desarrollo integral de la identidad de marca que refleja los valores de tu empresa." },
  { icon: Paintbrush, title: "Diseño de Logotipo", description: "Logotipos únicos y memorables que comunican la esencia de tu marca." },
  { icon: Image, title: "Ilustraciones", description: "Arte visual personalizado que da vida a tus ideas y conceptos de marca." },
  { icon: FileImage, title: "Mockups", description: "Visualizaciones realistas de cómo se verá tu marca en diferentes aplicaciones." },
  { icon: Package, title: "Diseño de Empaques", description: "Empaques atractivos que destacan en el mercado y conectan con tu audiencia." },
  { icon: Lightbulb, title: "Propuestas Creativas", description: "Estrategias creativas y conceptos innovadores para posicionar tu marca." },
];

const BrandingServicesSection = () => {
  return (
    <section id="branding" className="py-24 lg:py-32">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Servicios
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Branding y <span className="text-primary">Diseño Gráfico</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Creamos identidades visuales que comunican con claridad, propósito y autenticidad.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandingServices.map((service) => (
              <div key={service.title} className="p-6 rounded-xl border bg-card hover:scale-105 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandingServicesSection;
