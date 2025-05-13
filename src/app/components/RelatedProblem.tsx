'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProblemItem {
  _id: string;
  image: string;
  title: string;
  description: string;
  category: string;
}

interface RelatedProblemProps {
  count?: number;
}

const RelatedProblem: React.FC<RelatedProblemProps> = ({ count = 4 }) => {
  const router = useRouter();
  const [items, setItems] = useState<ProblemItem[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('/api/problems');
        if (!response.ok) throw new Error(`Failed to fetch problems: ${response.status}`);
        const data = await response.json();
        console.log('Problems fetched:', data);

        // Check if problems array exists
        if (!data.problems || !Array.isArray(data.problems)) {
          throw new Error('Invalid problems data structure');
        }

        setItems(data.problems.slice(0, count));
      } catch (error) {
        console.error('Error fetching problems:', error);
        setItems([]);
      }
    };

    fetchProblems();
  }, [count]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-left text-gray-900">More Problems</h2>
      <div className="flex space-x-4 overflow-x-auto no-scrollbar">
        {items.map((problem) => (
          <div
            key={problem._id}
            onClick={() => router.push(`/problem/${problem._id}`)}
            className="flex-none w-64 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={problem.image}
              alt={problem.title}
              className="w-full h-40 object-cover rounded-t-2xl"
            />
            <div className="px-4 pb-4">
              <h3 className="mt-3 text-lg font-medium text-gray-800">{problem.title}</h3>
              <p className="mt-1 text-left text-sm text-gray-500">{problem.description}</p>
            </div>
          </div>
        ))}
        <div className="flex-none w-64 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center justify-between">
          <img
            src="https://strapi.myplantin.com/twig_e3ab677a36.webp"
            alt="Branch icon"
            className="w-12 h-12 mb-4"
          />
          <button
            onClick={() => router.push("/problems")}
            className="mt-auto px-6 py-2 border border-emerald-500 text-emerald-500 rounded-full hover:bg-emerald-50 font-semibold"
          >
            Discover all
          </button>
        </div>
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default RelatedProblem;