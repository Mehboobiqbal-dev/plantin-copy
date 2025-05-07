"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CollapsibleBox from "../components/ColapsibleBox";
import plantData from "../data/plants.json";

interface Category {
  name: string;
  slug: string;
}

interface Plant {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
}

interface PlantData {
  plants: Plant[];
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

interface PlantIdentifierProps {
  categorySlug?: string;
}

const categories: Category[] = [
  { name: "All plants", slug: "all-plants" },
  { name: "Houseplants", slug: "houseplants" },
  { name: "Cactuses", slug: "cactus" },
  { name: "Succulents", slug: "succulents" },
  { name: "Flowers", slug: "flowers" },
  { name: "Trees", slug: "trees" },
  { name: "Veggies & Fruit", slug: "veggies-fruit" },
  { name: "Grasses", slug: "grasses" },
  { name: "Shrubs", slug: "shrub" },
  { name: "Ferns", slug: "ferns" },
  { name: "Herbs", slug: "herbs" },
];

const categoryDisplayNames: { [key: string]: string } = {
  "All plants": "Plant",
  Houseplants: "Houseplant",
  Cactuses: "Cactus",
  Succulents: "Succulent",
  Flowers: "Flower",
  Trees: "Tree",
  "Veggies & Fruit": "Veggie & Fruit",
  Grasses: "Grass",
  Shrubs: "Shrub",
  Ferns: "Fern",
  Herbs: "Herb",
};

const PlantIdentifier: React.FC<PlantIdentifierProps> = ({ categorySlug }) => {
  const { plants } = plantData as PlantData;
  const router = useRouter();

  const selectedCategory: string = categorySlug
    ? categories.find((cat) => cat.slug === categorySlug)?.name || "All plants"
    : "All plants";

  const [traits, setTraits] = React.useState<Traits>({
    trailing: false,
    hanging: false,
    evergreen: false,
    easyCare: false,
    airPurifying: false,
  });
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [lifeCycle, setLifeCycle] = React.useState<LifeCycle>({
    perennial: false,
    annual: false,
  });

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

  const getPlantCount = (categoryName: string): number => {
    if (categoryName === "All plants") {
      return plants.length;
    }
    return plants.filter((plant) => plant.category === categoryName).length;
  };

  const displayedPlants: Plant[] =
    selectedCategory === "All plants"
      ? plants
      : plants.filter((plant) => plant.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen">
      <header
        className="shadow relative flex p-5"
        style={{
          background: "linear-gradient(to right, #DDF9D5, #BEFFE4)",
        }}
      >
        <div className="flex-grow flex items-start justify-start text-left">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="text-sm">
              <span className="text-gray-700">PlantIn</span>
              <span className="mx-1 text-gray-700"> &gt; </span>
              <span className="text-gray-600">
                {categoryDisplayNames[selectedCategory]} Identifier
              </span>
            </div>
            <p className="mt-3 md:text-3xl text-2xl font-extrabold text-left w-full py-4">
              {categoryDisplayNames[selectedCategory]} Identifier by Picture
            </p>
            <p className="text-sm xl:max-w-[760px] lg:max-w-[640px] md:max-w-[520px]">
              Identify plants, use customizable lists, and learn how to care for
              each particular species.
            </p>
            <div className="mt-4 flex">
              <input
                type="text"
                className="relative flex items-center gap-2 md:h-14 h-12 w-full bg-white rounded-2xl px-4 text-16 mr-2"
                placeholder="Find a plant by name"
              />
              <div className="flex-none">
                <button className="rounded-[30px] font-semibold text-white bg-gradient-to-r from-[#04BF94] to-[#52C8AD] hover:from-[#06D3A4] hover:to-[#60E7C8] w-[250px] h-[60px] flex items-center justify-center gap-2">
                  <img
                    src="https://myplantin.com/icons/camera.svg"
                    alt="Camera Icon"
                    className="w-6 h-6"
                  />
                  Identify a plant
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-[65%] h-full"
          style={{
            backgroundImage: "url('/plantidentifier.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
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
            <nav>
              <div className="max-w-7xl mx-auto px-4">
                <ul className="flex space-x-4 py-2 overflow-x-hidden hover:overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
                  {categories.map((cat) => (
                    <li
                      key={cat.slug}
                      onClick={() => router.push(`/identify/${cat.slug}`)}
                      className={`
                        whitespace-nowrap cursor-pointer px-3 py-1
                        ${
                          cat.name === selectedCategory
                            ? "text-green-600 font-medium"
                            : "text-gray-600 hover:text-blue-600"
                        }
                      `}
                    >
                      {cat.name}
                      <span className="ml-2 text-xs text-gray-500">
                        ({getPlantCount(cat.name)} Plants)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
            <div className="relative md:p-5 p-4 border rounded-xl border-gray-200">
              <p className="text-lg text-gray-700">
                Imagine walking down the street and noticing fantastic flowers
                blooming in someone’s garden. In fact, these queens – you think
                – would fit perfectly in your backyard. But what are they
                called? Your plant knowledge from 8th-grade biology isn’t
                enough...
              </p>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 hover:underline mt-4 inline-block focus:outline-none"
              >
                {expanded ? "Less ID info" : "More ID info"}
              </button>
              {expanded && (
                <div className="mt-4 border rounded-xl border-gray-300 p-4">
                  <div className="border-gray-300 pt-4">
                    <p className="text-lg text-gray-700">
                      Well, that’s the kind of situation a plant identifier was
                      created for. The plant identifier app is an online
                      alternative to manual plant identification. Let’s learn a
                      bit more about how to identify a plant both manually and
                      with some help from digital technologies.
                    </p>
                  </div>
                  <div className="border-gray-300">
                    <p className="text-lg text-gray-700">
                      What Kind of Plant Is This? There are almost 400,000
                      identified plant species in the world. If you want to know
                      what kind of plant is this shrub you stumbled upon in the
                      forest, your first option is to ask a biologist. If you
                      don’t have one at hand, you’ll have to master plant
                      identification on your own.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {displayedPlants.map((plant) => (
                <div
                  key={plant.id}
                  className="p-4 shadow rounded bg-white cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => router.push(`/plants/${plant.id}`)}
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
          </main>
        </div>
        <style jsx global>
          {`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default PlantIdentifier;