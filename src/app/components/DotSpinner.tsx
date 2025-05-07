import React from 'react';

const DotSpinner = ({ className = '' }) => {
  const dotCount = 8;
  const radius = 8;
  const dots = Array.from({ length: dotCount }, (_, i) => {
    const angle = (i / dotCount) * 2 * Math.PI;
    const x = 10 + radius * Math.cos(angle); // Center at (10,10) for 20x20 container
    const y = 10 + radius * Math.sin(angle);
    return (
      <div
        key={i}
        className="absolute w-1 h-1 bg-black rounded-full"
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      />
    );
  });

  return (
    <div className={`relative w-5 h-5 animate-spin ${className}`}>
      {dots}
    </div>
  );
};

export default DotSpinner;