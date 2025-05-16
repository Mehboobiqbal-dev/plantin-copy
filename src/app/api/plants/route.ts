import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

/**
 * @swagger
 * /api/plants:
 *   get:
 *     summary: Retrieve all plants with details
 *     description: Fetches a list of all plants from the database, enriched with a detailId linking to plant details (up to four detail records are included). Each plant includes its fields and an optional detailId.
 *     tags:
 *       - Plants
 *     responses:
 *       200:
 *         description: Successfully retrieved plants with associated details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plants:
 *                   type: array
 *                   description: List of plants, each with an optional detailId linking to plant details
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
 *                       detailId:
 *                         type: string
 *                         nullable: true
 *                         description: ID of the associated plant details, if available (null for plants beyond the first four)
 *                         example: 507f1f77bcf86cd799439012
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch plants
 */

export async function GET() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return NextResponse.json({ error: 'MONGODB_URI is not defined' }, { status: 500 });
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('plantdb');
    const plantsCollection = database.collection('plants');
    const detailsCollection = database.collection('plantDetails');
    
    const plants = await plantsCollection.find({}).toArray();
    const details = await detailsCollection.find({}).limit(4).toArray(); // Limit to 4 details
    
    // Map plants to include detailId (first 4 plants get details)
    const plantsWithDetails = plants.map((plant, index) => ({
      ...plant,
      detailId: index < details.length ? details[index]._id : null,
    }));
    
    return NextResponse.json({ plants: plantsWithDetails });
  } catch (error) {
    console.error('Error fetching plants:', error);
    return NextResponse.json({ error: 'Failed to fetch plants' }, { status: 500 });
  } finally {
    await client.close();
  }
}