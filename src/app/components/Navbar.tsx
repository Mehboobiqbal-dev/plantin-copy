'use client';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-gray-900 bg-opacity-90 z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">3D Dour</h1>
          </div>
          <div className="flex space-x-4">
            <a href="#about" className="text-white hover:text-blue-400">À Propos</a>
            <a href="#services" className="text-white hover:text-blue-400">Services</a>
            <a href="#tarifs" className="text-white hover:text-blue-400">Tarifs</a>
            <a href="#gallery" className="text-white hover:text-blue-400">Galerie</a>
            <a href="#contact" className="text-white hover:text-blue-400">Contact</a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}