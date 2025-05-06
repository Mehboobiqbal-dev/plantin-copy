import React from 'react';

const AboutSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="mb-4">
          <p className="text-sm text-gray-500">PlantIn &gt; About us</p>
        </div>

        
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome to PlantIn</h2>

       
        <p className="text-lg text-gray-700 mb-4">
          It's your virtual gardening companion. To get humans and nature in touch, we support green
          thumbs with personalized plant care plans. Our custom ML model identifies more than 16 000
          plant species with 95.8% accuracy and dozens of plant diseases.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          For personalized advice, we also offer conversations with botany experts. Every feature of
          PlantIn is created to make your gardening journey comfortable. We aim to build a worldwide
          community of plant enthusiasts who care, share, and learn while practicing.
        </p>

        
        <h3 className="text-3xl font-semibold text-gray-800 mt-8 mb-4">Educate with fun</h3>
        <p className="text-lg text-gray-700">
          We believe in the power of edutainment. The more time you spend with PlantIn, the more you
          learn about plants around you. Read articles online & offline, take quizzes to test your
          knowledge, or use real-time scanning to get valuable tips on plant care.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
