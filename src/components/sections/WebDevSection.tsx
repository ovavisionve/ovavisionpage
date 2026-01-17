import { Globe, Layout, Palette, Users, Box, Sparkles } from "lucide-react";

const webServices = [
  { icon: Layout, text: "Diseño web moderno y atractivo" },
  { icon: Globe, text: "Desarrollo de páginas funcionales" },
  { icon: Palette, text: "Adaptación a identidad visual" },
  { icon: Users, text: "Optimización de experiencia del usuario" },
];

const render3DServices = [
  { icon: Box, text: "Modelado 3D profesional" },
  { icon: Sparkles, text: "Renderizado de productos y empaques" },
];

const WebDevSection = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Desarrollo Digital
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Desarrollo Web y <span className="text-primary">Render 3D</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl border bg-card hover:scale-[1.02] transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-6">Desarrollo Web</h3>
              <ul className="space-y-4">
                {webServices.map((service) => (
                  <li key={service.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{service.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 rounded-xl border bg-card hover:scale-[1.02] transition-all">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                <Box className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-6">Digitalización y Render 3D</h3>
              <ul className="space-y-4">
                {render3DServices.map((service) => (
                  <li key={service.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{service.text}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mt-6 p-4 rounded-lg bg-muted">
                Visualiza tus productos en alta calidad antes de producirlos. Ideal para presentaciones y catálogos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebDevSection;
