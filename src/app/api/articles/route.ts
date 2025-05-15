import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Article from '@/app/models/article';
/**
 * @swagger
 * /api/articles:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: Articles reloaded  successfully!
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
