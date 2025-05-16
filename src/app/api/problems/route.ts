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

/**
 * @swagger
 * /api/problems:
 *   get:
 *     summary: Retrieve plant problems and categories
 *     description: Fetches a list of plant problems and categories, optionally filtered by a category slug. If no slug is provided, defaults to 'all-problem'.
 *     tags:
 *       - Problems
 *     parameters:
 *       - in: query
 *         name: categorySlug
 *         schema:
 *           type: string
 *           default: all-problem
 *         description: Slug of the category to filter problems (e.g., 'pests', 'diseases', 'all-problem')
 *         required: false
 *         example: pests
 *     responses:
 *       200:
 *         description: Successfully retrieved problems and categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 problems:
 *                   type: array
 *                   description: List of plant problems, filtered by the selected category
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier of the problem
 *                         example: 507f1f77bcf86cd799439011
 *                       image:
 *                         type: string
 *                         description: URL or path to the problem image
 *                         example: https://example.com/images/pest.jpg
 *                       title:
 *                         type: string
 *                         description: Title of the problem
 *                         example: Aphid Infestation
 *                       description:
 *                         type: string
 *                         description: Description of the problem
 *                         example: Small sap-sucking insects causing leaf curling.
 *                       category:
 *                         type: string
 *                         description: Category name the problem belongs to
 *                         example: Pests
 *                 categories:
 *                   type: array
 *                   description: List of all available problem categories
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of the category
 *                         example: Pests
 *                       slug:
 *                         type: string
 *                         description: URL-friendly identifier for the category
 *                         example: pests
 *                       headerImage:
 *                         type: string
 *                         description: URL or path to the category header image
 *                         example: https://example.com/images/pests-header.jpg
 *                       title:
 *                         type: string
 *                         description: Title of the category
 *                         example: Common Pests
 *                       description:
 *                         type: string
 *                         description: Brief description of the category
 *                         example: Issues caused by insects and other pests.
 *                       mainDescription:
 *                         type: string
 *                         description: Detailed description of the category
 *                         example: Pests can cause significant damage to plants...
 *                       commonProblemsDescription:
 *                         type: string
 *                         description: Description of common problems in the category
 *                         example: Common pest issues include aphids and spider mites.
 *                       diagnosisSteps:
 *                         type: string
 *                         description: Steps to diagnose problems in the category
 *                         example: Inspect leaves and stems for signs of insects...
 *                 selectedCategory:
 *                   type: object
 *                   description: The selected category based on the categorySlug
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the category
 *                       example: Pests
 *                     slug:
 *                       type: string
 *                       description: URL-friendly identifier for the category
 *                       example: pests
 *                     headerImage:
 *                       type: string
 *                       description: URL or path to the category header image
 *                       example: https://example.com/images/pests-header.jpg
 *                     title:
 *                       type: string
 *                       description: Title of the category
 *                       example: Common Pests
 *                     description:
 *                       type: string
 *                       description: Brief description of the category
 *                       example: Issues caused by insects and other pests.
 *                     mainDescription:
 *                       type: string
 *                       description: Detailed description of the category
 *                       example: Pests can cause significant damage to plants...
 *                     commonProblemsDescription:
 *                       type: string
 *                       description: Description of common problems in the category
 *                       example: Common pest issues include aphids and spider mites.
 *                     diagnosisSteps:
 *                       type: string
 *                       description: Steps to diagnose problems in the category
 *                       example: Inspect leaves and stems for signs of insects...
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: personally identifiable information
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