'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Define interface for plant
interface Plant {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  detailId: string | null;
}

interface RelatedPlantsProps {
  id: string;
  allPlants: Plant[];
}

const RelatedPlants: React.FC<RelatedPlantsProps> = ({ id, allPlants }) => {
  const router = useRouter();
  const plants = allPlants
    .filter(p => p._id !== id)
    .slice(0, 4);

  return (
    <section className="mt-10 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Plants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {plants.map(plant => (
          <div
            key={plant._id}
            className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/plants/${plant._id}`)}
          >
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{plant.name}</h3>
              <p className="text-sm text-gray-600">{plant.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedPlants;