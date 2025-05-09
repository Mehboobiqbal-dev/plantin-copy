import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

interface ProblemDetail {
  _id: string;
  titleForLookup: string;
  scientificName: string;
  fullDescription: string;
  SignOfDamage: string;
  images: string[];
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const { id } = params;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not defined');
    return NextResponse.json({ error: 'MONGODB_URI is not defined' }, { status: 500 });
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('plantdb');
    const collection = database.collection('problemDetails');

    console.log(`Querying problemDetails for _id: ${id}`);
    let detail = null;

    // Try querying with ObjectId
    if (ObjectId.isValid(id)) {
      detail = await collection.findOne({ _id: new ObjectId(id) });
      console.log(`ObjectId query result: ${detail ? 'Found' : 'Not found'}`);
    }

    // Fallback to string _id
    if (!detail) {
      detail = await collection.findOne({ _id: id });
      console.log(`String _id query result: ${detail ? 'Found' : 'Not found'}`);
    }

    if (!detail) {
      console.error(`No document found for _id: ${id}`);
      return NextResponse.json({ error: 'Problem detail not found' }, { status: 404 });
    }

    console.log(`Found document: ${JSON.stringify(detail)}`);
    const formattedDetail: ProblemDetail = {
      _id: detail._id.toString(),
      titleForLookup: detail.titleForLookup,
      scientificName: detail.scientificName,
      fullDescription: detail.fullDescription,
      SignOfDamage: detail.SignOfDamage,
      images: detail.images,
    };
    return NextResponse.json(formattedDetail);
  } catch (error) {
    console.error(`Error fetching problem detail for id ${id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch problem detail' }, { status: 500 });
  } finally {
    await client.close();
  }
}