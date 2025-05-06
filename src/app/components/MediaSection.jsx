import React, { useState } from 'react';

const MediaSection = () => {
  
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  
  const slideDistance = 150;

 
  const logos = [
    { src: 'https://strapi.myplantin.com/House_Beatiful_8ba2dda0b2.webp', alt: 'House Beautiful' },
    { src: 'https://strapi.myplantin.com/Frame_29b9ac154d.webp', alt: 'Genesis' },
    { src: 'https://strapi.myplantin.com/Frame_1_ffd688e692.webp', alt: 'Homes & Gardens' },
    { src: 'https://strapi.myplantin.com/Frame_2_ace48f8ae9.webp', alt: 'Veranda' },
    { src: 'https://strapi.myplantin.com/martha_stewart_logo_1ecd9d6dfa.webp', alt: 'Martha Stewart' },
    { src: 'https://strapi.myplantin.com/martha_stewart_logo_1ecd9d6dfa.webp', alt: 'Martha Stewart' },
    { src: 'https://strapi.myplantin.com/martha_stewart_logo_1ecd9d6dfa.webp', alt: 'Martha Stewart' },
    { src: 'https://strapi.myplantin.com/martha_stewart_logo_1ecd9d6dfa.webp', alt: 'Martha Stewart' },
  ];

  
  const handleArrowClick = () => {
    setOffset((prev) => prev + slideDistance);
  };

  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(offset);
  };

  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    setOffset(dragOffset - diff);
  };

  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Media about us</h2>
      
      <div className="relative">
        
        <div className="overflow-hidden pr-12">
          <div
            
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            
            className={`flex space-x-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            
            style={{ 
              transform: `translateX(-${offset}px)`, 
              transition: isDragging ? 'none' : 'transform 0.5s ease-out'
            }}
          >
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className="h-12 flex-shrink-0"
              />
            ))}
          </div>
        </div>
        
        <button
          onClick={handleArrowClick}
          className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-green-500 text-white p-2 rounded-full shadow hover:bg-green-600 focus:outline-none inline-flex items-center"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10 10.293 6.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MediaSection;
