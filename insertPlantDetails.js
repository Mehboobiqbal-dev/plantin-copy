const { MongoClient } = require('mongodb');
const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

async function insertPlantDetails() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env.local');
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const database = client.db('plantdb');
    const collection = database.collection('plantDetails');
    const plantDetailsData = JSON.parse(await fs.readFile('./data/PlantDetails.json', 'utf8'));
    const plantDetails = Object.entries(plantDetailsData).map(([idStr, detail]) => ({
      _id: parseInt(idStr, 10),
      scientificName: detail.scientificName,
      fullDescription: detail.fullDescription,
      images: detail.images,
    }));
    await collection.deleteMany({});
    const result = await collection.insertMany(plantDetails);
    console.log(`Inserted ${result.insertedCount} plant details successfully`);
  } catch (error) {
    console.error('Error inserting plant details:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

insertPlantDetails().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});