'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroWith3DGif = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sectionRef = useRef<HTMLDivElement>(null);

  const rotateXBasedOnSectionMouse = useTransform(y, [-200, 200], [15, -15]);
  const rotateYBasedOnSectionMouse = useTransform(x, [-200, 200], [-15, 15]);

  // Define useTransform calls for the background elements
  const translateX1 = useTransform(x, [-200, 200], [30, -30]);
  const translateY1 = useTransform(y, [-200, 200], [30, -30]);
  const translateX2 = useTransform(x, [-200, 200], [-20, 20]);
  const translateY2 = useTransform(y, [-200, 200], [-20, 20]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      x.set(event.clientX - rect.left - rect.width / 2);
      y.set(event.clientY - rect.top - rect.height / 2);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", perspective: "2000px" }}
      className="relative bg-gradient-to-br from-brand-blue via-brand-blue-dark to-gray-900 text-white min-h-screen flex items-center justify-center overflow-hidden section-padding"
    >
      <motion.div
        className="absolute top-10 left-10 w-48 h-48 bg-brand-secondary/5 rounded-full filter blur-2xl opacity-70"
        style={{ translateX: translateX1, translateY: translateY1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-64 h-64 bg-yellow-400/5 rounded-lg filter blur-3xl opacity-60 transform rotate-45"
        style={{ translateX: translateX2, translateY: translateY2 }}
        animate={{ rotate: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
      />

      <div className="container mx-auto bg-blue-500 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <div className="flex items-center mb-4 justify-center md:justify-start">
            <Image src="/3Dour.png" alt="3D Dour Logo" width={50} height={50} className="mr-3" />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">3D DOUR</h1>
          </div>
          <p className="text-xl sm:text-2xl font-light mt-1 mb-5 text-brand-secondary">DONNEZ VIE À VOS LIEUX</p>
          <p className="mt-3 text-lg text-brand-gray-light font-semibold">SPÉCIAL PROMOTEURS IMMOBILIERS</p>
          <p className="text-md sm:text-lg text-gray-300 my-6 leading-relaxed">
            Offrez à vos clients des visites virtuelles immersives pour accélérer vos ventes et mettre en valeur vos projets immobiliers en Algérie.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex justify-center md:justify-start">
            <Link
              href="/contact"
              className="inline-flex items-center bg-brand-secondary text-brand-primary hover:bg-yellow-400 font-bold py-3 px-6 rounded-lg text-lg shadow-xl transition duration-300"
            >
              Demander un devis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] p-1 rounded-xl shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10 group"
            style={{ transformStyle: "preserve-3d", rotateX: rotateXBasedOnSectionMouse, rotateY: rotateYBasedOnSectionMouse }}
            whileHover={{ scale: 1.05, boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.4)" }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
          >
            <Image
              src="/3D.gif"
              alt="Animation 3D des services 3D Dour"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              unoptimized
              priority
            />
            <div className="absolute inset-0 rounded-lg shadow-[inset_0px_0px 20px_rgba(0,0,0,0.3)] pointer-events-none"></div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroWith3DGif;