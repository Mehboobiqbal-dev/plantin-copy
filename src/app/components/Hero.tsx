// src/app/(components)/WhyChooseUs.tsx
import { CheckCircle } from 'lucide-react'; // npm install lucide-react

const benefits = [
  { icon: CheckCircle, text: "Présentation haut de gamme" },
  { icon: CheckCircle, text: "Accessibilité permanente" },
  { icon: CheckCircle, text: "Gain de temps pour vos équipes" },
  { icon: CheckCircle, text: "Image moderne et professionnelle" },
  { icon: CheckCircle, text: "Outil marketing efficace" },
  { icon: CheckCircle, text: "Équipe locale, disponible et réactive" },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-brand-gray-light">
      <div className="container mx-auto bg-blue-700">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark">Pourquoi opter pour 3D Dour ?</h2>
          <p className="mt-4 text-lg text-brand-gray">Les avantages qui font la différence.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex items-start space-x-4 transition-transform duration-300 hover:scale-105">
              <benefit.icon className="h-8 w-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-brand-blue-dark mb-2">{benefit.text}</h3>
                {/* Optional: Add a short description for each benefit here */}
                {/* <p className="text-brand-gray text-sm">Lorem ipsum dolor sit amet consectetur.</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;