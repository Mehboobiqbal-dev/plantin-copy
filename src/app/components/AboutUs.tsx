import Image from 'next/image';

const AboutUs = () => {
  return (
    <section id="about" className="section-padding bg-blue-400">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark">Qui Sommes-Nous ?</h2>
          <p className="mt-4 text-lg text-brand-gray">Votre partenaire de confiance pour des solutions immobilières innovantes.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="mb-4 text-brand-gray-dark leading-relaxed">
              3D Dour est une startup algérienne spécialisée dans les visites virtuelles immersives pour les promoteurs immobiliers. Nous transformons vos projets en expériences interactives, renforçant la confiance des acheteurs et valorisant vos espaces.
            </p>
            <p className="mb-4 text-brand-gray-dark leading-relaxed">
              Basée à Alger, notre équipe jeune et dynamique vous offre un service rapide, sur mesure et innovant, adapté à vos besoins spécifiques.
            </p>
          </div>
          <div className="flex justify-center">
  <video
    src="/3D.mp4" // make sure the file is in the /public directory
    width={500}
    height={350}
    controls
    className="rounded-lg shadow-xl object-cover"
  />
</div>

        </div>
      </div>
    </section>
  );
};
export default AboutUs;