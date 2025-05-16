// src/app/api/articles/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Article from '@/app/models/article';

/**
 * @swagger 
 * /api/articles:
 *   get:
 *     summary: Retrieve all articles
 *     description: Fetches a list of all blog articles from the database, including their title, description, date, reading time, image, and tags.
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: Successfully retrieved articles or no articles found
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   description: List of articles when articles are found
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier of the article
 *                         example: 507f1f77bcf86cd799439011
 *                       title:
 *                         type: string
 *                         description: Title of the article
 *                         example: How to Care for Your Indoor Plants
 *                       description:
 *                         type: string
 *                         description: Brief description of the article
 *                         example: Learn the best practices for keeping your indoor plants healthy.
 *                       date:
 *                         type: string
 *                         description: Publication date of the article
 *                         example: 2023-10-15
 *                       readingTime:
 *                         type: string
 *                         description: Estimated reading time of the article
 *                         example: 5 min read
 *                       image:
 *                         type: string
 *                         description: URL or path to the article's featured image
 *                         example: https://example.com/images/indoor-plants.jpg
 *                       tags:
 *                         type: array
 *                         description: List of tags or categories associated with the article
 *                         items:
 *                           type: string
 *                           example: Indoor Plants
 *                 - type: object
 *                   description: Message when no articles are found
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: No articles found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch articles: Database connection error"
 */
export async function GET() {
  try {
    console.log('Handling GET /api/articles');
    await connectToDatabase();
    const articles = await Article.find({}).lean();
    console.log('Fetched articles:', articles.length);
    if (!articles || articles.length === 0) {
      return NextResponse.json({ message: 'No articles found' }, { status: 200 });
    }
    return NextResponse.json(articles);
  } catch (error: any) {
    console.error('Error in /api/articles:', error.message, error.stack);
    return NextResponse.json(
      { error: `Failed to fetch articles: ${error.message}` },
      { status: 500 }
    );
  }
}