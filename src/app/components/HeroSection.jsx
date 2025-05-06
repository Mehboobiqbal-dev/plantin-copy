import React from 'react';

export function HeroSection() {
  return (
<section className="flex flex-row items-center justify-center px-4 py-8 mx-auto max-w-[1320px]">
    
      <div className="flex-1">
        <img
          src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fhome_recognize_plants_4808b08867.webp&w=1920&q=75"
          alt="Hero Image"
          className="w-1/2 h-1/2 object-cover"
/>
      </div>

    
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-4 text-left">
          Recognize unknown plants
        </h1>
        <p className="text-lg mb-6 text-left">
        Take a photo of any plant and get an accurate result using our extensive plant database. Identify any rare plants quickly and precisely, and make your identification simple and reliable with one of the largest collections of plant species.
        </p>
        <button className="bg-teal-700 text-white py-4 px-8 rounded-full mb-6">
          Discover a Plant
        </button>
      </div>
    </section>
  );
}    