import { NextPage } from "next";
import plantData from "../../data/plants.json";
import PlantIdentifierClient from "../../components/PlantIdentifierClient";

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

// Define props for the server component
interface PlantIdentifierProps {
  params: Promise<{ categorySlug: string[] }>;
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

const PlantIdentifier: NextPage<PlantIdentifierProps> = async ({ params }) => {
  const { plants } = plantData as PlantData;
  const resolvedParams = await params;
  const slug = resolvedParams.categorySlug.length > 0 ? resolvedParams.categorySlug[0] : undefined;
  const selectedCategory: string = slug
    ? categories.find((cat) => cat.slug === slug)?.name || "All plants"
    : "All plants";

  const displayedPlants: Plant[] =
    selectedCategory === "All plants"
      ? plants
      : plants.filter((plant) => plant.category === selectedCategory);

  // Compute plant counts for each category
  const plantCounts: { [key: string]: number } = {};
  categories.forEach((category) => {
    if (category.name === "All plants") {
      plantCounts[category.name] = plants.length;
    } else {
      plantCounts[category.name] = plants.filter((plant) => plant.category === category.name).length;
    }
  });

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
          <PlantIdentifierClient
            selectedCategory={selectedCategory}
            displayedPlants={displayedPlants}
            categories={categories}
            plantCounts={plantCounts}
          />
        </div>
      </div>
    </div>
  );
};

export default PlantIdentifier;