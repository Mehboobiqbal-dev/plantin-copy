'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

// Define interface for plant
interface Plant {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  detailId: string | null;
}

const PlantList: React.FC = () => {
  const router = useRouter();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/plants');
        if (!res.ok) throw new Error('Failed to fetch plants');
        const data = await res.json();
        setPlants(data.plants);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#16a34a" loading={true} size={60} />
      </div>
    );
  }

  if (error) return <div className="text-red-600 text-center mt-8">Error: {error}</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">All Plants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {plants.map(plant => (
          <div
            key={plant._id}
            className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/plants/${plant._id}`)}
          >
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{plant.name}</h2>
              <p className="text-sm text-gray-600">{plant.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlantList;
