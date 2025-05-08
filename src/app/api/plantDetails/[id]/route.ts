import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid plant ID' }, { status: 400 });
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return NextResponse.json({ error: 'MONGODB_URI is not defined' }, { status: 500 });
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('plantdb');
    const collection = database.collection('plantDetails');
    // Use type assertion to handle numeric _id
    const detail = await collection.findOne({ _id: id as any });
    return NextResponse.json(detail || {});
  } catch (error) {
    console.error('Error fetching plant detail:', error);
    return NextResponse.json({ error: 'Failed to fetch plant detail' }, { status: 500 });
  } finally {
    await client.close();
  }
}