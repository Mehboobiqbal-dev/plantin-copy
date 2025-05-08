// pages/index.tsx
import React from 'react';
import Image from 'next/image';

const PlantIdentificationAppPage: React.FC = () => {
  return (
    <section className="flex flex-row items-center justify-center px-4 py-8 mx-auto max-w-[1320px]">
        <div className="flex-1 p-6">
          <h1 className="text-4xl font-bold mb-4 text-left">
          Plant Identification App, Perfected
          </h1>
          <p className="text-lg mb-6 text-left">
          Identify plants – flowers, cactuses, succulents, and trees instantly. Get top-notch care guides and botanists’ assistance.


          </p>
          <button className="bg-teal-700 text-white py-4 px-8 rounded-full hover:bg-teal-800 transition duration-200">
            Get Cared Tools
          </button>
        </div>
        <div className="flex-1">
        <div className="flex-1 text-right">
        <div className="flex justify-end">
        <img
  src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FGroup_36979_253a764eec.webp&w=1920&q=75"
  alt="Boost Plant Growth"
  className="w-2/4 h-auto object-cover rounded-lg"
/>
</div>
</div>
        </div>
      </section>
  );
};

export default PlantIdentificationAppPage;
