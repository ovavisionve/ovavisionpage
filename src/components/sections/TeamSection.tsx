import { Linkedin, Phone, Instagram } from "lucide-react";

const team = [
  {
    name: "Oriana Russo León",
    role: "CEO / Presidente",
    nationality: "Venezolana, Italiana",
    bio: "Actualmente cursando su tercer año en Suffolk University en Boston, MA. Cuenta con más de dos años de experiencia como Directora Creativa de Alimentos Santoni.",
    skills: "Liderazgo, estrategia y creatividad.",
    linkedin: "https://linkedin.com/in/oriana-russo-588093382",
    phone: "+17863523702",
    phoneDisplay: "+1 786 352 3702",
  },
  {
    name: "Valeria V. Rodrigues Abreu",
    role: "CEO / Vicepresidente",
    nationality: "Venezolana, Portugués",
    bio: "Graduada de Florida International University en Marketing y Logística. Apasionada por la inteligencia artificial y su potencial para transformar procesos.",
    skills: "Proactiva y comprometida con el crecimiento continuo.",
    linkedin: null,
    phone: "+584245512363",
    phoneDisplay: "+58 424 551 2363",
  },
];

const TeamSection = () => {
  return (
    <section id="equipo" className="py-24 lg:py-32">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Detrás del <span className="text-primary">Proyecto</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conoce al equipo que lidera OVA VISION.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {team.map((member) => (
              <div key={member.name} className="p-8 rounded-xl border bg-card hover:scale-[1.02] transition-all">
                <div className="w-24 h-24 rounded-2xl bg-primary mb-6 flex items-center justify-center text-3xl font-bold text-primary-foreground">
                  {member.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                </div>
                
                <div className="mb-4">
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.nationality}</p>
                </div>
                
                <p className="text-muted-foreground mb-4">{member.bio}</p>
                <p className="text-sm text-muted-foreground italic">{member.skills}</p>
                
                <div className="flex gap-3 mt-6">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.phone && (
                    <a href={`https://wa.me/${member.phone.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 h-10 rounded-lg bg-muted hover:bg-green-500/20 transition-colors text-sm">
                      <Phone className="w-4 h-4" />
                      <span className="hidden sm:inline">{member.phoneDisplay}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
