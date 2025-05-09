import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

interface Problem {
  _id: string;
  image: string;
  title: string;
  description: string;
  category: string;
}

export async function GET() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return NextResponse.json({ error: 'MONGODB_URI is not defined' }, { status: 500 });
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('plantdb');
    const collection = database.collection('problems');
    const problems = await collection.find({}).toArray();
    const formattedProblems: Problem[] = problems.map((doc) => ({
      _id: doc._id.toString(),
      image: doc.image,
      title: doc.title,
      description: doc.description,
      category: doc.category,
    }));
    return NextResponse.json({ Data: formattedProblems });
  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json({ error: 'Failed to fetch problems' }, { status: 500 });
  } finally {
    await client.close();
  }
}