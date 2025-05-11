import { NextPage } from "next";
import { MongoClient } from "mongodb";
import PlantIdentifierClient from "../../components/PlantIdentifierClient";

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

interface PlantData {
  plants: Plant[];
  categories: Category[];
}

interface PlantIdentifierProps {
  params: Promise<{ categorySlug: string[] }>;
}

const getPlantData = async (): Promise<PlantData> => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("plantdb");

    // Fetch plants
    const plantCollection = database.collection("plants");
    const plantsFromDb = await plantCollection.find({}).toArray();
    const plants: Plant[] = plantsFromDb.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name,
      category: doc.category,
      image: doc.image,
      description: doc.description,
    }));

    // Fetch categories
    const categoryCollection = database.collection("categories");
    const categoriesFromDb = await categoryCollection.find({}).toArray();
    const categories: Category[] = categoriesFromDb.map((doc) => ({
      name: doc.name,
      slug: doc.slug,
      headerImage: doc.headerImage,
      title: doc.title,
      description: doc.description,
      mainDescription: doc.mainDescription,
      expandedDescription: doc.expandedDescription,
    }));

    return { plants, categories };
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    throw error;
  } finally {
    await client.close();
  }
};

const PlantIdentifier: NextPage<PlantIdentifierProps> = async ({ params }) => {
  const plantData = await getPlantData();
  const { plants, categories } = plantData;
  const resolvedParams = await params;
  const slug = resolvedParams.categorySlug.length > 0 ? resolvedParams.categorySlug[0] : undefined;
  const selectedCategory: Category = slug
    ? categories.find((cat) => cat.slug === slug) || categories.find((cat) => cat.slug === "all-plants")!
    : categories.find((cat) => cat.slug === "all-plants")!;

  const displayedPlants: Plant[] =
    selectedCategory.slug === "all-plants"
      ? plants
      : plants.filter((plant) => plant.category === selectedCategory.name);

  const plantCounts: { [key: string]: number } = {};
  categories.forEach((category) => {
    if (category.slug === "all-plants") {
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
              <span className="mx-1 text-gray-700">  </span>
              <span className="text-gray-600">
                {selectedCategory.name} Identifier
              </span>
            </div>
            <p className="mt-3 md:text-3xl text-2xl font-extrabold text-left w-full py-4">
              {selectedCategory.title}
            </p>
            <p className="text-sm xl:max-w-[760px] lg:max-w-[640px] md:max-w-[520px]">
              {selectedCategory.description}
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
        <div className="w-[45%] h-full">
  <img
    src={selectedCategory.headerImage}
    alt={`${selectedCategory.name} Illustration`}
    className="w-full h-[70%] object-contain"
  />
</div>

      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <PlantIdentifierClient
            initialSelectedCategory={selectedCategory}
            initialDisplayedPlants={displayedPlants}
            initialCategories={categories}
            initialPlantCounts={plantCounts}
            initialMainDescription={selectedCategory.mainDescription}
            initialExpandedDescription={selectedCategory.expandedDescription}
          />
        </div>
      </div>
    </div>
  );
};

export default PlantIdentifier;