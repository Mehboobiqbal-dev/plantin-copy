"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import ThreeScene from './components/ThreeScene';
import BookNowModal from './components/BookNowModal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      {/* Hero Section with 3D Visualization */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ThreeScene />
        <div className="absolute text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            Découvrez des Espaces en 3D Époustouflants
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            Visites virtuelles immersives pour l'immobilier, le tourisme et plus encore
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full text-lg"
            onClick={() => setModalOpen(true)}
          >
            Réserver Maintenant
          </motion.button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 md:px-16 bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Visites Virtuelles 3D',
              desc: 'Présentez vos propriétés avec des visites immersives en 3D, offrant une navigation fluide et des vues à 360°, accessibles depuis tout appareil.',
            },
            {
              title: 'Création de Contenu',
              desc: 'Produisez du contenu visuel captivant pour promouvoir vos espaces, projets ou marques avec une qualité professionnelle.',
            },
            {
              title: 'Développement de Sites Web',
              desc: 'Créez des sites web modernes et intuitifs pour intégrer facilement vos visites virtuelles et renforcer votre présence en ligne.',
            },
            {
              title: 'Photos HDR',
              desc: 'Capturez des images éclatantes avec la technologie HDR pour mettre en valeur chaque détail de vos propriétés ou espaces.',
            },
            {
              title: 'Google Maps pour Entreprises',
              desc: 'Améliorez votre visibilité locale en intégrant vos espaces sur Google Maps avec des visites virtuelles optimisées.',
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-16 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12">Pourquoi Choisir 3D Dour ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            'Visites Fluides et Intuitives',
            'Vues à 360° et Plans 2D',
            'Intégration Facile sur Sites Web',
            'Image Moderne et Gain de Temps',
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="bg-blue-600 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <p className="text-lg font-semibold">{feature}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 md:px-16 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-8">Contactez-Nous</h2>
        <p className="text-lg mb-4">Basé à Alger, au service de Hainaut et au-delà.</p>
        <p className="text-lg mb-8">📞 0542793542</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full text-lg"
          onClick={() => setModalOpen(true)}
        >
          Réserver Votre Visite 3D
        </motion.button>
      </section>

      <Footer />
      {isModalOpen && <BookNowModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}