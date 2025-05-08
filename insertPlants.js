const { MongoClient } = require('mongodb');
const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');

// Load .env.local explicitly
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

async function insertPlants() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env.local file');
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('plantdb');
    const collection = database.collection('plants');

    // Read and parse plants.json
    const plantData = JSON.parse(await fs.readFile('./data/plants.json', 'utf8'));
    const plants = plantData.plants.map(plant => ({ ...plant, _id: plant.id }));

    // Optional: Clear collection before inserting (for testing)
    await collection.deleteMany({});
    const result = await collection.insertMany(plants);
    console.log(`Inserted ${result.insertedCount} plants successfully`);
  } catch (error) {
    console.error('Error inserting plants:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

insertPlants().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});