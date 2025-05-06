'use client';

import React from 'react';

interface ImageLightboxProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = React.useState(startIndex);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          &times;
        </button>
        <img
          src={images[currentIndex]}
          alt="Lightbox image"
          className="w-full h-auto max-h-[80vh] object-contain"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
            >
              &larr;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
            >
              &rarr;
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageLightbox;