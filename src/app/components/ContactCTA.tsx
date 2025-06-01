import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="section-padding bg-blue-800 text-white">
      <div className="container mx-auto bg-blue-500">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Prêt à Transformer Vos Projets ?</h2>
          <p className="mt-4 text-lg text-blue-200">Contactez-nous pour une démonstration ou un devis personnalisé.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center bg-blue-600 text-brand-gray-dark p-8 md:p-12 rounded-xl shadow-2xl">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-brand-blue-dark">Pour nous contacter :</h3>
            <div className="flex items-center space-x-3">
              <Phone className="h-6 w-6 text-brand-blue" />
              <a href="tel:0542793542" className="text-lg hover:underline">0542793542</a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-6 w-6 text-brand-blue" />
              <a href="mailto:3d.dour@gmail.com" className="text-lg hover:underline">3d.dour@gmail.com</a>
            </div>
            <p className="text-sm text-brand-gray">
              Notre équipe est disponible pour vous accompagner à chaque étape de votre projet.
            </p>
            <Link href="/contact"
              className="inline-block bg-brand-blue text-white hover:bg-brand-blue-dark font-semibold py-3 px-6 rounded-lg text-md shadow-md transition duration-300 transform hover:scale-105 mt-4">
              Envoyer un message
            </Link>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-lg font-medium mb-2 text-brand-blue-dark">QR Code pour un exemple de visite :</p>
            <Image
              src="/QR.JPG"
              alt="QR Code Exemple Visite Virtuelle"
              width={200}
              height={200}
              className="rounded-lg border-4 border-brand-blue p-1"
            />
            <p className="text-xs mt-2 text-brand-gray">Scannez pour découvrir nos visites virtuelles immersives !</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactCTA;