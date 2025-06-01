// src/app/contact/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react'; // Assuming you have lucide-react

export const metadata: Metadata = {
  title: 'Contactez-nous - 3D Dour',
  description: 'Contactez 3D Dour pour vos projets de visites virtuelles en Algérie.',
}

export default function ContactPage() {
  return (
    <>
    <div className="bg-brand-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-white">Contactez-Nous</h1>
          <p className="text-xl text-blue-200 mt-2">Nous sommes là pour répondre à toutes vos questions.</p>
        </div>
      </div>
    <div className="container mx-auto section-padding">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form - Basic Placeholder */}
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-brand-blue-dark mb-6">Envoyez-nous un message</h2>
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-gray">Nom complet</label>
              <input type="text" name="name" id="name" autoComplete="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-gray">Email</label>
              <input type="email" name="email" id="email" autoComplete="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-brand-gray">Téléphone (Optionnel)</label>
              <input type="tel" name="phone" id="phone" autoComplete="tel"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brand-gray">Votre message</label>
              <textarea id="message" name="message" rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"></textarea>
            </div>
            <div>
              <button type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue">
                Envoyer le message
              </button>
            </div>
          </form>
          <p className="mt-4 text-xs text-brand-gray text-center">
            Pour une réponse plus rapide, n'hésitez pas à nous appeler.
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-brand-blue-dark mb-6">Nos Coordonnées</h2>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <Phone className="h-6 w-6 text-brand-blue mr-3 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-medium text-brand-gray-dark">Téléphone</h3>
                            <a href="tel:0542793542" className="text-brand-blue hover:underline">0542793542</a>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <Mail className="h-6 w-6 text-brand-blue mr-3 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-medium text-brand-gray-dark">Email</h3>
                            <a href="mailto:3d.dour@gmail.com" className="text-brand-blue hover:underline">3d.dour@gmail.com</a>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <MapPin className="h-6 w-6 text-brand-blue mr-3 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-medium text-brand-gray-dark">Adresse</h3>
                            <p className="text-brand-gray">Alger, Algérie (Intervention sur Alger et environs)</p>
                            {/* <p className="text-xs text-brand-gray">Rendez-vous sur site ou à nos bureaux (sur RDV)</p> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl">
                 <h3 className="text-xl font-semibold text-brand-blue-dark mb-4">Exemple de Visite Virtuelle</h3>
                <Image
                src="/QR.JPG"
                alt="QR Code Exemple Visite Virtuelle"
                width={150}
                height={150}
                className="rounded-md border-2 border-brand-blue p-1"
                />
                <p className="text-sm text-brand-gray mt-2">Scannez pour une démonstration.</p>
            </div>
        </div>
      </div>
    </div>
    </>
  );
}