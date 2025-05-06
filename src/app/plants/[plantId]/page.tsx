'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ImageLightbox from '../../components/ImageLightbox';
import plantData from '../../data/plants.json';
import plantDetails from '../../data/PlantDetails.json';
import PlantCareSection from '../../components/PlantCareSection';
import RelatedPlants from '../../components/RelatedPlants';
import PopularArticles from '../../components/PopularArticle';

// Define interface for plant
interface Plant {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

// Define interface for plant details
interface PlantDetail {
  images?: string[];
  scientificName?: string;
  fullDescription?: string;
}

// Define type for plantDetails
interface PlantDetails {
  [key: string]: PlantDetail;
}

// Define prop interfaces for components
interface RelatedPlantsProps {
  plantId: string;
}

interface ImageLightboxProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

export default function PlantsDetail() {
  const params = useParams();
  const router = useRouter();

  // Narrow down the ParamValue type (string|string[]|undefined) to a string
  const raw = Array.isArray(params.plantId) ? params.plantId[0] : params.plantId;
  const plantId = raw ?? '';
  const idNum = parseInt(plantId, 10);

  // Pull from JSON
  const allPlants = (plantData as { plants: Plant[] }).plants;
  const plant = allPlants.find(p => p.id === idNum);
  const detail = plantId ? (plantDetails as PlantDetails)[plantId] : undefined;

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // If no plant, redirect
  if (!plant) {
    router.replace('/identify/all-plants');
    return null;
  }

  // Build images array
  const images: string[] = detail?.images?.length ? detail.images : plant.image ? [plant.image] : [];

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{plant.name}</h1>
          <p className="text-sm italic text-gray-500">
            {detail?.scientificName || plant.description}
          </p>
        </div>
        <button
          onClick={() => router.push(`/care-plan/${plantId}`)}
          className="mt-4 md:mt-0 bg-emerald-400 text-white px-4 py-2 rounded-full hover:bg-emerald-500"
        >
          Get Care Plan
        </button>
      </div>

      {/* Images + Description */}
      <div className="flex flex-col md:flex-row gap-6">
        {images.length > 0 && (
          <div className="w-full md:w-1/3 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
            {images.map((src: string, idx: number) => (
              <img
                key={idx}
                src={src}
                alt={`${plant.name} ${idx + 1}`}
                className={`${
                  idx === 0 ? 'md:row-span-2' : ''
                } w-full h-full object-cover rounded-lg shadow-md cursor-pointer`}
                onClick={() => {
                  setPhotoIndex(idx);
                  setLightboxOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {/* Text + Care Requirements */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is the Plant</h2>
            <p className="text-gray-700 leading-relaxed">
              {detail?.fullDescription || 'Detailed description not available.'}
            </p>
            <p className="mt-4 text-sm text-gray-600">
              If you’ve recognized any mistakes, feel free to notify us. This helps us maintain quality.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Care Requirements</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {[
                { icon: 'humidity_3ff8353df1.webp', label: 'Humidity', value: 'Normal' },
                { icon: 'lightening_part_sun_df08bd4748.webp', label: 'Lighting', value: 'Part Sun' },
                { icon: 'temperature_7496e304fa.webp', label: 'Temperature', value: '16°C - 27°C' },
                { icon: 'hardiness_zone_471884b25e.webp', label: 'Hardiness Zone', value: '10a - 11b' },
                { icon: 'difficulty_66231487c6.webp', label: 'Difficulty', value: 'Medium' },
                { icon: 'hibernation_47ea9a4a34.webp', label: 'Hibernation', value: 'Cold Period' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center">
                  <img
                    src={`https://strapi.myplantin.com/climate_${icon}`}
                    alt={`${label} icon`}
                    className="w-12 h-12"
                  />
                  <div className="ml-2 flex flex-col">
                    <span className="text-gray-700">{label}</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How to Care Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Care for the Plant</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <PlantCareSection plant={plant} />

          <div className="sticky top-24 py-4 px-2 bg-blue-50 rounded-xl">
            <div className="flex items-center space-x-4">
              <img
                src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fbanner_disease_diagnosis_ac2a80a8a8.webp&w=384&q=75"
                alt="Plant illustration"
                className="w-[180px] h-[200px] object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Disease diagnosis</h3>
                <p className="text-gray-600">Check your plant’s health</p>
              </div>
            </div>
            <button
              onClick={() => router.push(`/identify/${plantId}/diagnose`)}
              className="mt-4 px-5 py-2 border border-emerald-500 text-emerald-500 rounded-full hover:bg-emerald-100"
            >
              Diagnose my Plant
            </button>
          </div>
        </div>
      </div>

      <RelatedPlants plantId={plantId} />
      <PopularArticles />

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          startIndex={photoIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}