import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

interface CareRequirement {
  icon: string;
  label: string;
  value: string;
}

interface CareSection {
  title: string;
  icon: string;
  description: string;
}

interface PlantDetail {
  _id: string;
  scientificName?: string;
  fullDescription?: string;
  images?: string[];
  care?: Record<string, string>;
  careRequirements?: CareRequirement[];
  careSections?: CareSection[];
}
/**
 * @swagger
 * /api/plantDetails/{id}:
 *   get:
 *     summary: Retrieve plant details by ID
 *     description: Fetches detailed information for a specific plant from the plantDetails collection using the provided ID. Returns a formatted plant detail object with optional fields.
 *     tags:
 *       - Plants
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB ObjectId of the plant detail record
 *         example: 507f1f77bcf86cd799439012
 *     responses:
 *       200:
 *         description: Successfully retrieved plant details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the plant detail
 *                   example: 507f1f77bcf86cd799439012
 *                 scientificName:
 *                   type: string
 *                   description: Scientific name of the plant
 *                   example: Monstera deliciosa
 *                   nullable: true
 *                 fullDescription:
 *                   type: string
 *                   description: Detailed description of the plant
 *                   example: A tropical plant with large, split leaves, native to Central America.
 *                   nullable: true
 *                 images:
 *                   type: array
 *                   description: List of image URLs for the plant
 *                   items:
 *                     type: string
 *                     example: https://example.com/images/monstera-1.jpg
 *                   nullable: true
 *                 care:
 *                   type: object
 *                   description: Key-value pairs describing care instructions
 *                   additionalProperties:
 *                     type: string
 *                   example:
 *                     Watering: Weekly, keep soil moist but not soggy
 *                     Light: Bright, indirect light
 *                   nullable: true
 *                 careRequirements:
 *                   type: array
 *                   description: List of care requirements with icons and values
 *                   items:
 *                     type: object
 *                     properties:
 *                       icon:
 *                         type: string
 *                         description: URL or path to the icon image
 *                         example: https://example.com/icons/watering.png
 *                       label:
 *                         type: string
 *                         description: Label for the care requirement
 *                         example: Watering
 *                       value:
 *                         type: string
 *                         description: Value or instruction for the care requirement
 *                         example: Once a week
 *                   nullable: true
 *                 careSections:
 *                   type: array
 *                   description: List of care sections with titles and descriptions
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: Title of the care section
 *                         example: Watering
 *                       icon:
 *                         type: string
 *                         description: URL or path to the section icon
 *                         example: https://example.com/icons/watering-section.png
 *                       description:
 *                         type: string
 *                         description: Detailed description of the care section
 *                         example: Water thoroughly once a week, ensuring good drainage.
 *                   nullable: true
 *       400:
 *         description: Invalid plant detail ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid plant detail ID
 *       404:
 *         description: Plant detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Plant detail not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch plant detail
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid plant detail ID' }, { status: 400 });
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not defined');
    return NextResponse.json({ error: 'MONGODB_URI is not defined' }, { status: 500 });
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('plantdb');
    const collection = db.collection('plantDetails');

    const detail = await collection.findOne({ _id: new ObjectId(id) });
    if (!detail) {
      return NextResponse.json({ error: 'Plant detail not found' }, { status: 404 });
    }

    const formatted: PlantDetail = {
      _id: detail._id.toString(),
      scientificName: detail.scientificName,
      fullDescription: detail.fullDescription,
      images: detail.images,
      care: detail.care,
      careRequirements: detail.careRequirements,
      careSections: detail.careSections,
    };

    return NextResponse.json(formatted);
  } catch (err) {
    console.error(`Error fetching plant detail for id ${id}:`, err);
    return NextResponse.json({ error: 'Failed to fetch plant detail' }, { status: 500 });
  } finally {
    await client.close();
  }
}