'use client';
import { motion } from 'framer-motion';

export default function Avantages() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Nos Avantages</h1>
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-6"
          >
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center transform hover:rotate-y-180 transition-transform duration-500">
              <span className="text-2xl">🏠</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Immersion Totale</h2>
              <p>Nos visites 3D offrent une expérience réaliste, comme si vous étiez sur place.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-6"
          >
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center transform hover:rotate-y-180 transition-transform duration-500">
              <span className="text-2xl">📈</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Engagement Accru</h2>
              <p>Attirez plus de clients avec des visuels interactifs et modernes.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center space-x-6"
          >
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center transform hover:rotate-y-180 transition-transform duration-500">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Accessibilité</h2>
              <p>Nos solutions sont disponibles sur tous les appareils, 24/7.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}