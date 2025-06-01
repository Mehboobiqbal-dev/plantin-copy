import Image from 'next/image';
import { Award, Camera, Film, Clock, Globe, Users, MessageSquare } from 'lucide-react';

const services = [
  { icon: Award, title: "Visite virtuelle en 3D", description: "Présentation réaliste et interactive de vos espaces." },
  { icon: Camera, title: "Photos HDR professionnelles", description: "Rendu optimal avec des détails saisissants." },
  { icon: Film, title: "Vidéos courtes adaptées", description: "Optimisées pour les réseaux sociaux." },
  { icon: Clock, title: "Livraison rapide", description: "Projets prêts en 24 à 48h selon la taille." },
  { icon: Globe, title: "Intégration facile", description: "Compatible avec vos plateformes web." },
  { icon: Users, title: "Support complet", description: "Accompagnement personnalisé tout au long du projet." },
  { icon: Clock, title: "12 mois d'hébergement offerts", description: "Sans frais supplémentaires initiaux." },
  { icon: MessageSquare, title: "Support 24/7", description: "Réponse rapide à toutes vos demandes." },
];

const ServicesIncluded = () => {
  return (
    <section id="services" className="section-padding bg-blue-400">
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-brand-blue">AU TARIF DE 900 DINARS PAR MÈTRE CARRÉ*</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark mt-2">Vous bénéficiez de...</h2>
          <p className="mt-4 text-lg text-brand-gray">Un ensemble complet de prestations premium.</p>
          <p className="text-xs text-brand-gray mt-1">*Tarif de base, consultez nos <a href="#tarifs" className="underline hover:text-brand-blue">tarifs dégressifs</a>.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 bg-blue-500 gap-8 mt-10">
          {services.map((service, index) => (
            <div key={index} className="bg-brand-gray-light p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <service.icon className="h-10 w-10 text-brand-blue mr-4" />
                <h4 className="text-xl font-semibold text-brand-blue-dark">{service.title}</h4>
              </div>
              <p className="text-brand-gray-dark text-sm">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 p-8 bg-brand-blue-dark rounded-lg text-white">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold mb-4 text-yellow-400">Qualité Visuelle Exceptionnelle</h3>
            <p className="mb-4">Nous utilisons des technologies avancées pour des images HDR époustouflantes et des visites virtuelles fluides.</p>
            <p>Chaque détail est optimisé pour valoriser vos propriétés.</p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/5.jpg"
              alt="Photo intérieure de haute qualité"
              width={450}
              height={300}
              className="rounded-lg shadow-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ServicesIncluded;