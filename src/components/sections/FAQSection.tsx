import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Necesito conocimientos técnicos para usar sus sistemas?",
    answer: "No. Todos nuestros sistemas están diseñados para usuarios de negocio. Son intuitivos, fáciles de usar y no requieren conocimientos de programación.",
  },
  {
    question: "¿Funciona con mi banco actual?",
    answer: "Sí. Nuestras soluciones son adaptables a cualquier banco que cuente con API o agregadores financieros.",
  },
  {
    question: "¿Qué pasa si cambian las APIs de los servicios?",
    answer: "Nuestro servicio incluye mantenimiento para actualizaciones. Monitoreamos constantemente los cambios en las APIs de terceros.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer: "Absolutamente. Implementamos encriptación de grado empresarial, acceso controlado por roles y cumplimos con las mejores prácticas de seguridad.",
  },
  {
    question: "¿Puedo escalar después de implementar una solución básica?",
    answer: "Totalmente. Nuestra arquitectura está diseñada para el crecimiento. Puedes comenzar con automatización básica y escalar según tus necesidades.",
  },
  {
    question: "¿Cuánto tiempo toma implementar una automatización?",
    answer: "Depende del nivel. Básicas: 1-2 semanas, Medias: 3-4 semanas, Avanzadas: 1-3 meses. Los proyectos personalizados varían según el alcance.",
  },
  {
    question: "¿Ofrecen soporte después de la implementación?",
    answer: "Sí. Todos nuestros proyectos incluyen un período de soporte post-implementación y planes de mantenimiento continuo.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Preguntas <span className="text-primary">Frecuentes</span>
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="px-6 border rounded-xl bg-card"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
