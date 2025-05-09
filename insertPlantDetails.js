
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

    // Read the updated PlantDetails.json (which is an array)
    const plantDetailsArray = JSON.parse(await fs.readFile('./data/PlantDetails.json', 'utf8'));

    // Map the data to the desired structure, including the care object
    const documentsToInsert = plantDetailsArray.map(detail => ({
      scientificName: detail.scientificName,
      fullDescription: detail.fullDescription,
      images: detail.images,
      care: detail.care || {} // Include the care object, default to empty if not present
    }));

    // Clear existing data
    await collection.deleteMany({});
    console.log('Cleared existing plantDetails collection.');

    // Insert new data
    if (documentsToInsert.length > 0) {
      const result = await collection.insertMany(documentsToInsert);
      console.log(`Inserted ${result.insertedCount} plant details successfully`);
    } else {
      console.log('No plant details to insert.');
    }

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