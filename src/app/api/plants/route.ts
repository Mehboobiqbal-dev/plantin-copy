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