import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ObjectId' }, { status: 400 });
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
    const detail = await collection.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(detail || {});
  } catch (error) {
    console.error('Error fetching plant detail:', error);
    return NextResponse.json({ error: 'Failed to fetch plant detail' }, { status: 500 });
  } finally {
    await client.close();
  }
}