'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import CollapsibleBox from '../components/ColapsibleBox';

interface Category {
  name: string;
  slug: string;
  headerImage: string;
  title: string;
  description: string;
  mainDescription: string;
  expandedDescription: string;
}

interface Plant {
  _id: string;
  name: string;
  category: string;
  image: string;
  description: string;
}

interface Traits {
  trailing: boolean;
  hanging: boolean;
  evergreen: boolean;
  easyCare: boolean;
  airPurifying: boolean;
}

interface LifeCycle {
  perennial: boolean;
  annual: boolean;
}

interface PlantIdentifierClientProps {
  initialSelectedCategory: Category;
  initialDisplayedPlants: Plant[];
  initialCategories: Category[];
  initialPlantCounts: { [key: string]: number };
  initialMainDescription: string;
  initialExpandedDescription: string;
}

const PlantIdentifierClient: React.FC<PlantIdentifierClientProps> = ({
  initialSelectedCategory,
  initialDisplayedPlants,
  initialCategories,
  initialPlantCounts,
  initialMainDescription,
  initialExpandedDescription,
}) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialSelectedCategory);
  const [displayedPlants, setDisplayedPlants] = useState<Plant[]>(initialDisplayedPlants);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [plantCounts, setPlantCounts] = useState<{ [key: string]: number }>(initialPlantCounts);
  const [mainDescription, setMainDescription] = useState<string>(initialMainDescription);
  const [expandedDescription, setExpandedDescription] = useState<string>(initialExpandedDescription);
  const [traits, setTraits] = useState<Traits>({
    trailing: false,
    hanging: false,
    evergreen: false,
    easyCare: false,
    airPurifying: false,
  });
  const [expanded, setExpanded] = useState<boolean>(false);
  const [lifeCycle, setLifeCycle] = useState<LifeCycle>({
    perennial: false,
    annual: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCategoryData = async (categorySlug: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/categories?categorySlug=${categorySlug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch category data');
      }
      const data = await response.json();
      setSelectedCategory(data.selectedCategory);
      setDisplayedPlants(data.plants);
      setCategories(data.categories);
      setPlantCounts(data.plantCounts);
      setMainDescription(data.selectedCategory.mainDescription);
      setExpandedDescription(data.selectedCategory.expandedDescription);
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTraitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTraits({
      ...traits,
      [e.target.name]: e.target.checked,
    });
  };

  const handleLifeCycleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLifeCycle({
      ...lifeCycle,
      [e.target.name]: e.target.checked,
    });
  };

  const handleCategoryChange = (slug: string) => {
    router.push(`/identify/${slug}`);
    fetchCategoryData(slug);
  };

  return (
    <>
      <aside className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0">
        <div className="p-4 border border-gray-200 border-secondary rounded-2xl bg-white">
          <h3 className="text-sm text-left text-gray-600 font-semibold mb-4">
            <a href="/plant-finder" className="hover:underline">
              Plant Finder
            </a>
          </h3>
          <hr className="border-t border-gray-300 mb-4" />
          <CollapsibleBox title="Traits" titleClassName="text-gray-400">
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="trailing"
                  checked={traits.trailing}
                  onChange={handleTraitChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Trailing</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="hanging"
                  checked={traits.hanging}
                  onChange={handleTraitChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Hanging</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="evergreen"
                  checked={traits.evergreen}
                  onChange={handleTraitChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Evergreen</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="easyCare"
                  checked={traits.easyCare}
                  onChange={handleTraitChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Easy care</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="airPurifying"
                  checked={traits.airPurifying}
                  onChange={handleTraitChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Air Purifying</span>
              </label>
            </div>
          </CollapsibleBox>
          <CollapsibleBox title="Life Cycle" titleClassName="text-gray-400">
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="perennial"
                  checked={lifeCycle.perennial}
                  onChange={handleLifeCycleChange}
                  className="form-radio"
                />
                <span className="ml-2">Perennial</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="annual"
                  checked={lifeCycle.annual}
                  onChange={handleLifeCycleChange}
                  className="form-radio"
                />
                <span className="ml-2">Annual</span>
              </label>
            </div>
          </CollapsibleBox>
          <CollapsibleBox title="Light" titleClassName="text-gray-400">
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="shade"
                  className="form-radio"
                />
                <span className="ml-2">Shade</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="fullSun"
                  className="form-radio"
                />
                <span className="ml-2">Full sun</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="partSunPartShade"
                  className="form-radio"
                />
                <span className="ml-2">Part Sun Part Shade</span>
              </label>
            </div>
          </CollapsibleBox>
          <CollapsibleBox title="Safety Type" titleClassName="text-gray-400">
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="safeForPets"
                  className="form-radio"
                />
                <span className="ml-2">Safe For Pets</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="safeForHumans"
                  className="form-radio"
                />
                <span className="ml-2">Safe For Humans</span>
              </label>
            </div>
          </CollapsibleBox>
        </div>
      </aside>
      <main className="w-full md:w-2/3 lg:w-3/4 md:pl-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#04BF94" size={40} />
          </div>
        ) : displayedPlants.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#04BF94" size={40} />
          </div>
        ) : (
          <>
            <nav>
              <div className="max-w-7xl mx-auto px-4">
                <ul className="flex space-x-4 py-2 overflow-x-hidden hover:overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
                  {categories.map((cat) => (
                    <li
                      key={cat.name}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`
                        whitespace-nowrap cursor-pointer px-3 py-1
                        ${
                          cat.name === selectedCategory.name
                            ? 'text-green-600 font-medium'
                            : 'text-gray-600 hover:text-blue-600'
                        }
                      `}
                    >
                      {cat.name}
                      <span className="ml-2 text-xs text-gray-500">
                        ({plantCounts[cat.name]} Plants)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
            <div className="relative md:p-5 p-4 border rounded-xl border-gray-200">
              <p className="text-lg text-gray-700">
                {mainDescription}
              </p>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 hover:underline mt-4 inline-block focus:outline-none"
              >
                {expanded ? 'Less ID info' : 'More ID info'}
              </button>
              {expanded && (
                <div className="mt-4 border rounded-xl border-gray-200 p-4">
                  <div className="border-gray-200 pt-4">
                    <p className="text-lg text-gray-700">
                      {expandedDescription}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {displayedPlants.map((plant) => (
                <div
                  key={plant._id}
                  className="p-4 shadow rounded bg-white cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    console.log('Navigating to plant:', plant._id);
                    router.push(`/plants/${plant._id}`);
                  }}
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h5 className="mt-2 text-left font-medium">{plant.name}</h5>
                  <p className="mt-1 text-left text-sm text-gray-500">
                    {plant.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default PlantIdentifierClient;