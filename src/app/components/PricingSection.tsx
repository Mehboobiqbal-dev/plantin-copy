const pricingTiers = [
  {
    name: "1 Espace",
    pricePerSqm: "900 DA",
    description: "Offre idéale pour tester notre service et découvrir la qualité de nos visites virtuelles.",
    features: ["Visite virtuelle 3D complète", "Photos HDR professionnelles", "Hébergement 12 mois inclus"],
    bgColor: "bg-white",
    textColor: "text-brand-blue-dark",
    buttonClass: "bg-brand-blue text-white hover:bg-brand-blue-dark"
  },
  {
    name: "2 à 4 Espaces",
    pricePerSqm: "850 DA",
    description: "Parfait pour les petits projets ou plusieurs unités types à présenter.",
    features: ["Tarif dégressif avantageux", "Vidéos courtes adaptées", "Hébergement 12 mois par espace"],
    popular: true,
    bgColor: "bg-brand-blue-dark",
    textColor: "text-white",
    buttonClass: "bg-yellow-400 text-brand-blue-dark hover:bg-yellow-500"
  },
  {
    name: "5 Espaces et Plus",
    pricePerSqm: "750 DA",
    description: "Adapté aux grands programmes immobiliers en phase de commercialisation.",
    features: ["Meilleur tarif par m²", "Support prioritaire", "Intégration web facile"],
    bgColor: "bg-white",
    textColor: "text-brand-blue-dark",
    buttonClass: "bg-brand-blue text-white hover:bg-brand-blue-dark"
  },
];

const PricingSection = () => {
  return (
    <section id="tarifs" className="section-padding bg-blue-200">
      <div className="container mx-auto bg-blue-300">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark">Nos Tarifs</h2>
          <p className="mt-4 text-lg text-brand-gray">Des solutions flexibles adaptées à vos besoins.</p>
        </div>
        <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-400 text-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Nombre d'espaces
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Tarif par m²
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Détails
                </th>
              </tr>
            </thead>
            <tbody className="bg-blue-300 divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-gray-dark">1 espace</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-gray-dark font-semibold">900 DA</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-gray">Offre idéale pour tester notre service</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-gray-dark">2 à 4 espaces</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-gray-dark font-semibold">850 DA</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-gray">Parfait pour les petits projets</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-gray-dark">5 espaces et plus</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-gray-dark font-semibold">750 DA</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-gray">Adapté aux grands programmes immobiliers</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-10 text-center bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-brand-blue-dark mb-3">Information Importante</h3>
          <p className="text-brand-gray leading-relaxed">
            L'offre inclut <span className="font-bold">12 mois d'hébergement gratuits</span> pour chaque visite virtuelle.
            Au-delà, une mensualité de <span className="font-bold">2 500 DA par espace</span> sera appliquée pour maintenir l'accès en ligne.
          </p>
        </div>
        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-block bg-yellow-400 text-brand-blue-dark hover:bg-yellow-500 font-bold py-3 px-10 rounded-lg text-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Obtenir un Devis Personnalisé
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;