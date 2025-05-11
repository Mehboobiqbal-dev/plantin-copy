"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react'; // optional: use any icon library you like

const StickyFooter = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-4xl bg-green-100 rounded-xl shadow-lg px-6 py-4 flex justify-between items-center z-50">
      <p className="text-lg font-semibold text-black">
        Identify, get care & grow healthy plants with ease!
      </p>
      <div className="flex items-center gap-3">
        <button className="bg-gradient-to-r from-teal-400 to-green-400 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:opacity-90 transition-all">
          Get access
        </button>
        <button onClick={() => setIsVisible(false)} className="ml-2 text-black hover:text-red-500 transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default StickyFooter;
