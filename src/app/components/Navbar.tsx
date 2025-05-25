'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
            <Image
              src="/images/3d-dour.jpeg" // Adjust path if different
              alt="Logo 3D Dour"
              width={100} // Adjust based on logo size
              height={40} // Adjust based on logo size
              className="h-10 w-auto" // Responsive sizing
              priority // Preload for above-the-fold
            />
          </div>
          <div className="flex space-x-4">
            <a href="#services" className="hover:text-blue-400">Services</a>
            <a href="#features" className="hover:text-blue-400">Avantages</a>
            <a href="#contact" className="hover:text-blue-400">Contact</a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}