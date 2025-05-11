'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiMessageSquare } from 'react-icons/fi';
import RelatedProblem from '../../components/RelatedProblem';
import { ClipLoader } from 'react-spinners';

interface PlantProblem {
  _id: string;
  category: string;
  image: string;
  title: string;
  description: string;
}

interface ProblemDetail {
  scientificName: string;
  fullDescription: string;
  SignOfDamage: string;
  images: string[];
}

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
    } sticky top-25 py-4 px-3 bg-white rounded-xl shadow-md transition-all duration-300`}
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
  const [plant, setPlant] = useState<PlantProblem | null>(null);
  const [detail, setDetail] = useState<ProblemDetail | null>(null);
  const [isStickyActive, setIsStickyActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const damageSectionRef = useRef<HTMLElement | null>(null);

  const id = Array.isArray(problemId) ? problemId[0] : problemId ?? '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch problem summary
        const problemsResponse = await fetch('/api/problems');
        if (!problemsResponse.ok) {
          throw new Error(`Failed to fetch problems: ${problemsResponse.status}`);
        }
        const problemsData = await problemsResponse.json();
        console.log('Problems fetched:', problemsData.Data);
        const foundProblem = problemsData.Data.find((p: PlantProblem) => p._id === id);
        if (!foundProblem) {
          throw new Error(`Problem not found for id: ${id}`);
        }
        setPlant(foundProblem);

        // Fetch problem details
        const detailResponse = await fetch(`/api/problemDetails/${id}`);
        console.log('Detail Response Status:', detailResponse.status);
        if (!detailResponse.ok) {
          const errorText = await detailResponse.text();
          console.error('Detail Response Error:', errorText);
          throw new Error(`Failed to fetch problem details: ${errorText}`);
        }
        const detailData = await detailResponse.json();
        console.log('Detail Data:', detailData);
        setDetail(detailData);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'An error occurred while fetching problem details');
        router.replace('/problems/all-problem');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, router]);

  useEffect(() => {
    const currentRef = damageSectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === currentRef) {
            const isIntersecting = entry.isIntersecting;
            setIsStickyActive(!isIntersecting);
            console.log('IntersectionObserver: isStickyActive set to', !isIntersecting);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
      console.log('Observing damageSectionRef');
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
        console.log('Unobserving damageSectionRef');
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#04BF94" size={40} />
      </div>
    );
  }

  if (error || !plant) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error || 'Problem not found'}</p>
      </div>
    );
  }

  const images = detail?.images?.length ? detail.images : [plant.image];
  const damagePoints = detail?.SignOfDamage
    ? detail.SignOfDamage.split('\n').filter(Boolean)
    : [];

  return (
    <div className="bg-white min-h-screen">
      <header className="mb-6">
        <div className="flex items-center"></div>
      </header>
      <div className="flex-1 space-y-6 max-w-7xl mx-auto px-4">
        <div className="flex-grow flex items-start justify-start text-left">
          <div className="text-sm">
            <span className="text-gray-700">PlantIn</span>
            <span className="mx-1 text-gray-700"> &gt; </span>
            <span className="text-gray-600">Plant Problem</span>
            <span className="mx-1 text-gray-700"> &gt; </span>
            <span className="text-gray-500">{plant.title}</span>
          </div>
        </div>
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
                    onClick={() => {}}
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
        <div className="flex flex-col md:flex-row gap-6 min-h-screen">
          {damagePoints.length > 0 && (
            <section ref={damageSectionRef} className="mt-10 flex-1">
              <h2 className="text-3xl text-left font-bold text-black mb-2">
                Signs of Damage
              </h2>
              <ul className="list-disc list-inside text-left mt-3">
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