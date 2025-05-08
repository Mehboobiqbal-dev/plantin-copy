import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return NextResponse.json({ error: 'MONGODB_URI is not defined' }, { status: 500 });
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('plantdb');
    const collection = database.collection('plants');
    const plants = await collection.find({}).toArray();
    return NextResponse.json({ plants });
  } catch (error) {
    console.error('Error fetching plants:', error);
    return NextResponse.json({ error: 'Failed to fetch plants' }, { status: 500 });
  } finally {
    await client.close();
  }
}