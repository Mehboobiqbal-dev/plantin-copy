import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

interface ProblemDetail {
  _id: string;
  scientificName: string;
  fullDescription: string;
  SignOfDamage: string;
  images: string[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400 });
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
    const collection = db.collection('problemDetails');

    console.log(`Querying problemDetails for _id: ${id}`);
    const detail = await collection.findOne({ _id: new ObjectId(id) });
    console.log(`Query result: ${detail ? 'Found' : 'Not found'}`);

    if (!detail) {
      console.error(`No document found for _id: ${id}`);
      return NextResponse.json({ error: 'Problem detail not found' }, { status: 404 });
    }

    const formatted: ProblemDetail = {
      _id: detail._id.toString(),
      scientificName: detail.scientificName,
      fullDescription: detail.fullDescription,
      SignOfDamage: detail.SignOfDamage,
      images: detail.images,
    };

    return NextResponse.json(formatted);
  } catch (err) {
    console.error(`Error fetching problem detail for id ${id}:`, err);
    return NextResponse.json({ error: 'Failed to fetch problem detail' }, { status: 500 });
  } finally {
    await client.close();
  }
}