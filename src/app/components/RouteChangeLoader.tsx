'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loading from '../components/Loading';

const RouteChangeLoader = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Simulate a short loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300); // you can increase to simulate network delay

    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? <Loading /> : null;
};

export default RouteChangeLoader;
