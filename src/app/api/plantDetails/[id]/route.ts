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