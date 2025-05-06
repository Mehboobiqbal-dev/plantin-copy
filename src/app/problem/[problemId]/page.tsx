'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import plantProblem from '../../data/PlantProblemData.json';
import plantDetails from '../../data/ProblemDetail.json';
import { FiMessageSquare } from 'react-icons/fi';
import RelatedProblem from '../../components/RelatedProblem';

// Define interface for plant problem
interface PlantProblem {
  id: number;
  category: string;
  image: string;
  title: string;
  description: string;
}

// Define interface for problem details
interface ProblemDetail {
  scientificName: string;
  fullDescription: string;
  SignOfDamage: string;
  images: string[];
}

// Define type for plantDetails
interface PlantDetails {
  [key: string]: ProblemDetail;
}

// Define prop interface for StickyBotanistPost
interface StickyBotanistPostProps {
  problemId: string;
  isSticky: boolean;
}

const StickyBotanistPost = ({ problemId, isSticky }: StickyBotanistPostProps) => {
  const router = useRouter();

  return (
    <div
      className={`${isSticky ? 'sticky top-25' : ''} ${
        isSticky ? 'py-4 px-3' : 'py-6 px-4'
      } bg-white rounded-xl shadow-md transition-all duration-300`}
    >
      <div className={`flex items-center ${isSticky ? 'space-x-3' : 'space-x-4'}`}>
        <div>
          <h3 className={`${isSticky ? 'text-lg' : 'text-xl'} font-semibold text-gray-900`}>
            Botanist Help
          </h3>
          <p className={`text-gray-600 ${isSticky ? 'text-sm' : 'text-base'}`}>
            Send your request and get professional care guide.
          </p>
        </div>
        <img
          src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fbanner_botanist_help_bb0b0c7058.webp&w=384&q=75"
          alt="Plant illustration"
          className={`object-contain rounded-lg ${
            isSticky ? 'w-[126px] h-[140px]' : 'w-[180px] h-[200px]'
          }`}
        />
      </div>
      <button
        onClick={() => router.push(`/problem/${problemId}/diagnose`)}
        className="mt-4 flex items-center gap-2 px-5 py-2 bg-emerald-500 text-white rounded-full border border-emerald-500 hover:bg-emerald-600 transition duration-200"
      >
        <FiMessageSquare size={isSticky ? 14 : 18} /> Ask the Botanist
      </button>
    </div>
  );
};

const Problem = () => {
  const { problemId } = useParams();
  const router = useRouter();

  // Safely convert problemId to string
  const id = Array.isArray(problemId) ? problemId[0] : problemId ?? '';

  // Determine plant and details from your data sources
  const plant = (plantProblem as { Data: PlantProblem[] }).Data.find(
    (p) => p.id === parseInt(id, 10)
  );
  const detail = id ? (plantDetails as PlantDetails)[id] : undefined;

  // Always declare hooks at the top to ensure consistent order
  const [isStickyActive, setIsStickyActive] = useState(false);
  const damageSectionRef = useRef<HTMLElement | null>(null);

  // Early return AFTER the hooks are declared
  if (!plant) {
    router.replace('/problems/all-problem');
    return null;
  }

  // Use detailed images if available. Otherwise, use a single plant image.
  const images = detail?.images?.length ? detail.images : [plant.image];

  // Split the "SignOfDamage" text into an array of points.
  const damagePoints = detail?.SignOfDamage
    ? detail.SignOfDamage.split('\n').filter(Boolean)
    : [];

  useEffect(() => {
    const currentRef = damageSectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === currentRef) {
            setIsStickyActive(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center"></div>
      </header>

      {/* Layout container for main content and right sidebar */}
      <div className="flex-1 space-y-6 max-w-7xl mx-auto px-4">
        {/* Left Column: Main Content */}
        <div className="flex-grow flex items-start justify-start text-left">
          <div className="text-sm">
            <span className="text-gray-700">PlantIn</span>
            <span className="mx-1 text-gray-700"> &gt; </span>
            <span className="text-gray-600">Plant Problem</span>
            <span className="mx-1 text-gray-700"> &gt; </span>
            <span className="text-gray-500">{plant.title}</span>
          </div>
        </div>
        {/* Top Section: Image and Text */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            {images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
                {images.map((src: string, idx: number) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`${plant.title} ${idx + 1}`}
                    className={`${idx === 0 ? 'md:row-span-2' : ''} w-full h-full object-cover rounded-lg shadow-md cursor-pointer`}
                    onClick={() => {
                      // Add your image click handler logic if needed.
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex-1">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                <span className="text-3xl text-left font-bold text-gray-900 mt-2">
                  {plant.title}
                </span>
              </h2>
              <p className="text-gray-700 text-left leading-relaxed">
                {detail?.fullDescription || 'Detailed description not available.'}
              </p>
            </section>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Signs of Damage Section with ref for Intersection Observer */}
          {damagePoints.length > 0 && (
            <section ref={damageSectionRef} className="mt-10 flex-1">
              <h2 className="text-3xl text-left font-semibold text-black mb-2">
                Signs of Damage
              </h2>
              <ul className="list-disc list-inside text-left mt-3 pl-4">
                {damagePoints.map((point: string, index: number) => (
                  <li className="font-normal" key={index}>
                    {point}
                  </li>
                ))}
              </ul>
              <article className="paywall mt-4">
                <p className="text-2xl font-bold">How to prevent</p>
              </article>
              <div className="relative flex flex-col items-center bg-blue-100 md:p-10 p-4 pt-12 rounded-3xl mt-5">
                <img
                  src="data:image/png;base64,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"
                  alt="Premium icon"
                  className="w-12 h-12 mb-4 mx-auto"
                />
                <p className="text-xl text-center font-semibold">
                  Go Premium to continue reading
                </p>
                <p className="font-normal text-center">
                  Also you’ll get unlimited access to disease identification and all the
                  other beneficial features
                </p>
                <button
                  className="flex bg-transparent items-center justify-center rounded-[30px] cursor-pointer min-w-[196px] w-full text-lg border-none bg-gradient-to-r from-[#04BF94] to-[#52C8AD] text-white shadow-xl hover:shadow-lg hover:bg-gradient-to-r hover:from-[#06D3A4] hover:to-[#60E7C8] disabled:opacity-70 disabled:cursor-not-allowed max-w-[300px] mt-5"
                  type="button"
                >
                  <span className="px-4 py-3 font-semibold">Upgrade to premium</span>
                </button>
              </div>
            </section>
          )}

          {/* Call to Action */}
          <div className="w-full md:w-1/3">
            <StickyBotanistPost problemId={id} isSticky={isStickyActive} />
          </div>
        </div>
        <RelatedProblem count={4} />
      </div>
    </div>
  );
};

export default Problem;