'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { ClipLoader } from 'react-spinners';

interface Category {
  name: string;
  slug: string;
  headerImage: string;
  title: string;
  description: string;
  mainDescription: string;
}

interface Problem {
  _id: string;
  image: string;
  title: string;
  description: string;
  category: string;
}

export default function PlantProblems() {
  const params = useParams();
  const slugParam = params.categorySlug;
  const rawSlug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const selectedSlug = rawSlug || 'all-problem';

  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredData, setFilteredData] = useState<Problem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(`/api/problems?categorySlug=${selectedSlug}`);
        if (!response.ok) throw new Error('Failed to fetch problems');
        const data = await response.json();
        setFilteredData(data.problems);
        setCategories(data.categories);
        setSelectedCategory(data.selectedCategory);
      } catch (error) {
        console.error('Error fetching problems:', error);
        setFilteredData([]);
        setSelectedCategory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [selectedSlug]);

  if (loading || !selectedCategory) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#04BF94" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <header
        className="shadow flex flex-wrap md:flex-nowrap"
        style={{ background: 'linear-gradient(to right, #DDF9D5, #BEFFE4)' }}
      >
        <div className="p-6 w-full md:w-1/2">
          <div className="flex-grow flex items-start justify-start text-left">
            <div className="text-sm">
              <span className="text-gray-700">PlantIn</span>
              <span className="mx-1 text-gray-700">&gt;</span>
              <span className="text-gray-600">Plant Problem</span>
            </div>
          </div>
          <p className="text-3xl text-left md:text-4xl font-bold text-black">
            {selectedCategory.title}
          </p>
          <p className="text-sm text-left">
            {selectedCategory.description}
          </p>
          <button
            type="button"
            className="flex items-center justify-center rounded-[30px] mt-4 w-full md:w-80 px-4 py-3 font-semibold text-white bg-gradient-to-r from-[#04BF94] to-[#52C8AD] shadow-xl hover:shadow-lg hover:from-[#06D3A4] hover:to-[#60E7C8]"
          >
            <img src="https://myplantin.com/icons/camera.svg" alt="Camera Icon" className="w-5 h-5 mr-2" />
            Diagnose a Plant
          </button>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src={selectedCategory.headerImage}
            alt={`${selectedCategory.name} Illustration`}
            className="w-full h-full object-cover"
          />
        </div>
      </header>
      <nav className="mt-6 pb-2">
        <ul className="flex space-x-4 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <li key={cat.slug}>
              <Link
                href={`/problems/${cat.slug}`}
                className={`pb-1 whitespace-nowrap font-medium ${
                  selectedSlug === cat.slug
                    ? 'text-gray-600 underline decoration-teal-500'
                    : 'text-gray-600'
                }`}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full px-[0.5rem] mx-auto xl:max-w-[1320px] lg:max-w-[1140px] max-w-[960px]">
        <div
          className={`relative pt-1 pb-4 px-4 border border-secondary rounded-2xl mt-5 overflow-hidden transition-all ${
            expanded ? 'h-auto' : 'h-[140px]'
          }`}
        >
          <p className="text-gray-700">
            {selectedCategory.mainDescription}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="absolute bg-white p-2 text-blue-500 text-xl font-bold bottom-2 rounded-full border border-blue-500"
          >
            {expanded ? <MdKeyboardArrowUp /> : <IoIosArrowDown />}
          </button>
          {expanded && (
            <div className="mt-4 p-4">
              <div className="border-gray-300 pt-4">
                <p className="text-left text-2xl font-bold p-2">
                  What Are the Common Problems in Plants?
                </p>
                <div className="text-lg text-gray-700 text-left">
                  Protecting plants from diseases requires a thorough approach. First, you should define the
                  problem:
                  <ul>
                    <li>
                      <span className="font-bold text-black text-left">• Plant diseases</span> This is one of
                      the main plant problems, which includes diseases, damages, and disorders which occur
                      during the plant’s growth.
                    </li>
                    <li>
                      <span className="font-bold text-black text-left">• Environmental problems.</span> Experienced
                      gardeners know to consider the habitat in which plants grow for proper and timely protection.
                      Each plant species has its own set of optimal values of factors under which the plants will be
                      in a normal state, and their immune responses to pathogens and pests will be optimal.
                    </li>
                    <li>
                      <span className="font-bold text-black text-left">• Plant pests and invasive plants.</span> Plant
                      pests include insects, bugs, and various weeds that may impact the plants.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-gray-300">
                <p className="text-left text-2xl font-bold p-2">
                  How to Diagnose Plant Problems
                </p>
                <div className="text-lg text-gray-700 text-left">
                  Here is a short list of the steps you should take for easy detection of the plant problems:
                  <ul>
                    <li>
                      <span className="font-bold text-black text-left">• Pay attention to your plants.</span> Always
                      notice when something changes with your plant to detect the problems timely. Frequent observations
                      will help you solve the problem instantly, so check the signs and symptoms first.
                    </li>
                    <li>
                      <span className="font-bold text-black text-left">• Learn the name of the plant.</span> Some gardeners
                      have so many plants that they even forget which one is in front of them. You need to know the plant’s
                      name to figure out its disease.
                    </li>
                    <li>
                      <span className="font-bold text-black text-left">• Look at the leaves.</span> The holes in the leaves
                      often point at the insect pests.
                    </li>
                    <li>
                      <span className="font-bold text-black text-left">• Look for the culprit.</span> Look for the insects or their signs.
                    </li>
                    <li>
                      <span className="font-bold text-black text-left">• Use PlantIn.</span> With the MyPlantIn web version
                      or the PlantIn app for Android and iOS, you can use the identifier of the plant disease that you
                      can rely on in your further search. Moreover, you can get expert help from professionals via the platform.
                    </li>
                  </ul>
                  Don’t hesitate to identify your plant issues to solve them as quickly as possible!
                  Are you thinking about how to diagnose my plant? No worries!
                  You can use our list of possible diseases, read helpful articles, or promptly diagnose the plant and
                  get a treatment guide from our best botanist.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500 px-4">
        {filteredData.length} items match “{selectedCategory.name}”
      </div>
      <div className="mx-auto w-full px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredData.map(item => (
            <Link href={`/problem/${item._id}`} key={item._id}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-bold text-lg mb-1">{item.title}</h2>
                  <p className="text-gray-700 text-sm">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}