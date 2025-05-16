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
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve plant data by category
 *     description: Fetches a list of plants, categories, plant counts per category, and the selected category from the database. Plants are filtered by the provided categorySlug, defaulting to 'all-plants' if not specified.
 *     tags:
 *       - Plants
 *     parameters:
 *       - in: query
 *         name: categorySlug
 *         schema:
 *           type: string
 *         required: false
 *         description: The slug of the category to filter plants by (defaults to 'all-plants')
 *         example: indoor-plants
 *     responses:
 *       200:
 *         description: Successfully retrieved plant data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plants:
 *                   type: array
 *                   description: List of plants filtered by the selected category
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier of the plant
 *                         example: 507f1f77bcf86cd799439011
 *                       name:
 *                         type: string
 *                         description: Name of the plant
 *                         example: Monstera Deliciosa
 *                       category:
 *                         type: string
 *                         description: Category the plant belongs to
 *                         example: Indoor Plants
 *                       image:
 *                         type: string
 *                         description: URL or path to the plant image
 *                         example: https://example.com/images/monstera.jpg
 *                       description:
 *                         type: string
 *                         description: Brief description of the plant
 *                         example: A tropical plant with large, split leaves.
 *                 categories:
 *                   type: array
 *                   description: List of all available categories
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of the category
 *                         example: Indoor Plants
 *                       slug:
 *                         type: string
 *                         description: URL-friendly identifier for the category
 *                         example: indoor-plants
 *                       headerImage:
 *                         type: string
 *                         description: URL or path to the category header image
 *                         example: https://example.com/images/indoor-plants-header.jpg
 *                       title:
 *                         type: string
 *                         description: Display title of the category
 *                         example: Indoor Plants Identifier
 *                       description:
 *                         type: string
 *                         description: Brief description of the category
 *                         example: Explore a variety of indoor plants.
 *                       mainDescription:
 *                         type: string
 *                         description: Main description of the category
 *                         example: Indoor plants thrive in controlled environments.
 *                       expandedDescription:
 *                         type: string
 *                         description: Detailed description of the category
 *                         example: Learn about the care and benefits of indoor plants.
 *                 plantCounts:
 *                   type: object
 *                   description: Number of plants per category
 *                   additionalProperties:
 *                     type: number
 *                   example:
 *                     Indoor Plants: 10
 *                     Outdoor Plants: 5
 *                     All Plants: 15
 *                 selectedCategory:
 *                   type: object
 *                   description: The selected category based on categorySlug
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Indoor Plants
 *                     slug:
 *                       type: string
 *                       example: indoor-plants
 *                     headerImage:
 *                       type: string
 *                       example: https://example.com/images/indoor-plants-header.jpg
 *                     title:
 *                       type: string
 *                       example: Indoor Plants Identifier
 *                     description:
 *                       type: string
 *                       example: Explore a variety of indoor plants.
 *                     mainDescription:
 *                       type: string
 *                       example: Indoor plants thrive in controlled environments.
 *                     expandedDescription:
 *                       type: string
 *                       example: Learn about the care and benefits of indoor plants.
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Category not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

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