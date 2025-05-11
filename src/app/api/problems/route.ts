import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

interface Category {
  name: string;
  slug: string;
  headerImage: string;
  title: string;
  description: string;
  mainDescription: string;
  commonProblemsDescription: string;
  diagnosisSteps: string;
}

interface Problem {
  _id: string;
  image: string;
  title: string;
  description: string;
  category: string;
}

interface ProblemData {
  problems: Problem[];
  categories: Category[];
  selectedCategory: Category;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("categorySlug") || "all-problem";

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
    const categoryCollection = database.collection("problemCategories");
    const categoriesFromDb = await categoryCollection.find({}).toArray();
    const categories: Category[] = categoriesFromDb.map((doc) => ({
      name: doc.name,
      slug: doc.slug,
      headerImage: doc.headerImage,
      title: doc.title,
      description: doc.description,
      mainDescription: doc.mainDescription,
      commonProblemsDescription: doc.commonProblemsDescription || '',
      diagnosisSteps: doc.diagnosisSteps || '',
    }));

    // Find selected category
    const selectedCategory =
      categories.find((cat) => cat.slug === categorySlug) ||
      categories.find((cat) => cat.slug === "all-problem")!;
    if (!selectedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Fetch problems
    const problemCollection = database.collection("problems");
    const problemsFromDb = await problemCollection.find({}).toArray();
    const problems: Problem[] = problemsFromDb.map((doc) => ({
      _id: doc._id.toString(),
      image: doc.image,
      title: doc.title,
      description: doc.description,
      category: doc.category,
    }));

    // Filter problems by selected category
    const filteredProblems =
      selectedCategory.slug === "all-problem"
        ? problems
        : problems.filter((problem) => problem.category.toLowerCase() === selectedCategory.name.toLowerCase());

    const response: ProblemData = {
      problems: filteredProblems,
      categories,
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