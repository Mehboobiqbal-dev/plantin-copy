'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const PlantIdentificationAppPage: React.FC = () => {
  // Slider images for Customer Stories
  const sliderImages = [
    "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FGroup_36988_92113b76cb.webp&w=3840&q=75",
    "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FGroup_36989_5c16a9ae79.webp&w=3840&q=75",
    "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FGroup_36990_99fe9b1e11.webp&w=3840&q=75",
    "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FGroup_36987_1ead159a0c.webp&w=3840&q=75"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="flex flex-row items-center justify-center px-4 py-8 mx-auto max-w-[1320px]">
        <div className="flex-1 p-6">
          <h1 className="text-4xl font-bold mb-4 text-left">
            Plant Identification App, Perfected
          </h1>
          <p className="text-lg mb-6 text-left">
            Identify plants – flowers, cactuses, succulents, and trees instantly.
            Get top-notch care guides and botanists’ assistance.
          </p>
          <button className="bg-teal-700 text-white py-4 px-8 rounded-full hover:bg-teal-800 transition duration-200">
            Get Cared Tools
          </button>
        </div>
        <div className="flex-1 flex justify-end">
          <Image
            src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FGroup_36979_253a764eec.webp&w=1920&q=75"
            alt="Boost Plant Growth"
            width={960}
            height={540}
            className="w-1/2 h-auto object-cover rounded-lg"
          />
        </div>
      </section>

      <h5 className="text-center text-3xl font-bold">Our Customer Stories</h5>

      {/* Image Slider */}
      <div className="w-full">
        <section className="py-12 relative">
          <Image 
            src={sliderImages[currentIndex]} 
            alt={`Customer story image ${currentIndex + 1}`} 
            width={3840} 
            height={2160} 
            className="w-full h-auto object-cover rounded-lg"
          />

          {/* Navigation Buttons */}
          <button 
            onClick={handlePrevious} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-green-500 p-3 rounded-full hover:bg-green-600 transition duration-200"
            aria-label="Previous Image"
          >
            &lt;
          </button>

          <button 
            onClick={handleNext} 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-500 p-3 rounded-full hover:bg-green-600 transition duration-200"
            aria-label="Next Image"
          >
            &gt;
          </button>
        </section>
      </div>

      {/* Divider or Spacer */}
      <div className="my-16 border-t border-white-300 w-full"></div>

      {/* How PlantIn Works Section */}
      <div className="w-full bg-white">
        <section className="flex flex-row items-center justify-center px-4 py-8 mx-auto max-w-[1320px] bg-white">
          <div className="flex-1">
            <Image
              src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fhow_plantin_works_276118c9a5.webp&w=3840&q=75"
              alt="How PlantIn Works"
              width={3840}
              height={2160}
              className="w-full bg-white"
            />
          </div>
          <div className="flex-1 p-6">
            <h1 className="text-4xl font-bold mb-4 text-left">How PlantIn Works</h1>
            <ul className="space-y-4 list-disc pl-5">
              <li className="flex items-center space-x-4">
                <Image 
                  src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fcamera_1_1_e8d06a1cab.webp&w=256&q=75" 
                  alt="Take a plant photo" 
                  width={50} 
                  height={50} 
                />
                <span>Take a plant photo</span>
              </li>
              <li className="flex items-center space-x-4">
                <Image 
                  src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FAI_8e586f271e.webp&w=256&q=75" 
                  alt="AI plant recognition" 
                  width={50} 
                  height={50} 
                />
                <span>Wait until our AI recognizes the species</span>
              </li>
              <li className="flex items-center space-x-4">
                <Image 
                  src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fround_add_button_1_691e849a34.webp&w=256&q=75" 
                  alt="Add plant to list" 
                  width={50} 
                  height={50} 
                />
                <span>Add it to your list of plants</span>
              </li>
              <li className="flex items-center space-x-4">
                <Image 
                  src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FCare_4487db85e9.webp&w=256&q=75" 
                  alt="Care assistance" 
                  width={50} 
                  height={50} 
                />
                <span>Get all the care assistance you request</span>
              </li>
            </ul>
            <div className="flex mt-6">
              <a
                href="https://apps.apple.com/us/app/plantin-plant-identifier-care/id1527399597"
                className="mb-2"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.plantin.app"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Why Subscribe Section */}
      <section className="bg-white-100 py-12">
        <div className="max-w-[1320px] mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Why Subscribe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-2">Best plant Identifier</h3>
              <p className="text-lg font-bold text-teal-700">10.5M+ Identified Plants</p>
              <p className="mt-2">Find out what plant you are looking at.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-2">Prompt Plant Consultant Assistance</h3>
              <p className="text-lg font-bold text-teal-700">12K+ Botanist Consultations</p>
              <p className="mt-2">Our experts will help you fight any plant issue with personalized guides.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold">Plant Community</h3>
                <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">New</span>
              </div>
              <p className="text-lg font-bold text-teal-700">12K+ Posts About Plants</p>
              <p className="mt-2">Connect with other plant enthusiasts from all around the globe.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-2">Selection of Unique Articles</h3>
              <p className="text-lg font-bold text-teal-700">50+ Qualified Experts</p>
              <p className="mt-2">Find out gardening insights with our numerous articles.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-2">Accurate Diagnosis of Plant Diseases</h3>
              <p className="text-lg font-bold text-teal-700">7M+ Saved Plants</p>
              <p className="mt-2">Find out gardening insights with our numerous articles.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PlantIdentificationAppPage;
