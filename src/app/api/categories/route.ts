import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

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
  plantCounts: { [key: string]: number };
  selectedCategory: Category;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("categorySlug") || "all-plants";

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return NextResponse.json(
      { error: "MONGODB_URI is not defined" },
      { status: 500 }
    );
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("plantdb");

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

    // Find selected category
    const selectedCategory =
      categories.find((cat) => cat.slug === categorySlug) ||
      categories.find((cat) => cat.slug === "all-plants")!;
    if (!selectedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

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

    // Filter plants by selected category
    const displayedPlants =
      selectedCategory.slug === "all-plants"
        ? plants
        : plants.filter((plant) => plant.category === selectedCategory.name);

    // Calculate plant counts per category
    const plantCounts: { [key: string]: number } = {};
    categories.forEach((category) => {
      if (category.slug === "all-plants") {
        plantCounts[category.name] = plants.length;
      } else {
        plantCounts[category.name] = plants.filter(
          (plant) => plant.category === category.name
        ).length;
      }
    });

    const response: PlantData = {
      plants: displayedPlants,
      categories,
      plantCounts,
      selectedCategory,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}