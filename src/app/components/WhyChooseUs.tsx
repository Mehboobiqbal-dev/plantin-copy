'use client';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Zap } from 'lucide-react';

const benefits = [
  { icon: Star, title: "Présentation Haut de Gamme", description: "Visuels immersifs et captivants." },
  { icon: CheckCircle, title: "Fiabilité Maximale", description: "Solutions testées et garanties." },
  { icon: Zap, title: "Rapidité d’Exécution", description: "Livraison rapide et efficace." },
];

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 20 } },
};

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-blue-900">
      <div className="container mx-auto bg-blue-800">
        <h2 className="text-4xl font-bold text-center text-brand-blue-dark mb-12">Pourquoi Nous Choisir ?</h2>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 b gap-8"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="bg-blue-600 p-8 rounded-xl shadow-2xl overflow-hidden group"
                variants={cardVariants}
                whileHover={{ scale: 1.05, boxShadow: '0px 20px 30px -10px rgba(0,0,0,0.2)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative z-10">
                  <Icon className="h-12 w-12 text-brand-blue mb-6" />
                  <h3 className="text-2xl font-semibold text-brand-blue-dark mb-3">{benefit.title}</h3>
                  <p className="text-brand-gray-dark leading-relaxed">{benefit.description}</p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-150"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;