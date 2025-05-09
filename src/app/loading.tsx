"use client";

import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  if (!isLoading) return null; // Nothing shown after loading

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
      }}
    >
      <ClipLoader color="#123abc" loading={isLoading} size={60} />
    </div>
  );
}

export default Loading;
