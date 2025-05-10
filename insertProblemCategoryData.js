const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function insertProblemCategoryData() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env.local');
  }
  const client = new MongoClient(uri);

  const categories = [
    {
      name: 'All Problems',
      slug: 'all-problem',
      headerImage: 'https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FDiseases_illustration_a772d9dc34.webp&w=3840&q=75',
      title: 'Plant Problems Diagnosis',
      description: 'We cannot allow your plants to suffer from disorders and various diseases. Let’s begin treatment with our plant problems identifier and easy in-app ID tool.',
      mainDescription: 'If you have houseplants or grow them in the garden, you have probably encountered problems such as illnesses and even the death of your plants. Plant problems in the “All Problems” category occur due to various causes, such as pathogens and adverse environmental conditions. Diagnosing different plant problems is key to the plant’s successful growth.',
    },
    {
      name: 'Diseases',
      slug: 'diseases',
      headerImage: 'https://strapi.myplantin.com/disease_illustration.webp',
      title: 'Plant Disease ID Diagnosis',
      description: 'Protect your plants from diseases with our plant disease identifier and in-app diagnostic tool.',
      mainDescription: 'If you have houseplants or grow them in the garden, you’ve likely faced plant diseases. These issues, caused by pathogens like fungi or bacteria, can disrupt plant functions and structure, potentially leading to death. Diagnosing plant diseases early is crucial for successful treatment and growth.',
    },
    {
      name: 'Pests',
      slug: 'pests',
      headerImage: 'https://strapi.myplantin.com/pest_illustration.webp',
      title: 'Plant Pest ID Diagnosis',
      description: 'Identify and manage plant pests using our pest identifier and in-app diagnostic tool.',
      mainDescription: 'Pests like insects and bugs can wreak havoc on your houseplants or garden. These issues in the “Pests” category arise from infestations that damage plant tissues. Identifying pests promptly is essential to protect your plants and ensure their healthy growth.',
    },
    {
      name: 'Weeds',
      slug: 'weeds',
      headerImage: 'https://strapi.myplantin.com/weed_illustration.webp',
      title: 'Plant Weeds ID Diagnosis',
      description: 'Control invasive weeds with our weed identifier and in-app diagnostic tool.',
      mainDescription: 'Weeds compete with your plants for resources, impacting their growth. In the “Weeds” category, these invasive plants can choke out your garden or houseplants. Diagnosing and managing weeds early is key to maintaining a thriving plant environment.',
    },
  ];

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('plantdb');
    const collection = database.collection('problemCategories');

    for (const category of categories) {
      // Check if category already exists by slug
      const existingCategory = await collection.findOne({ slug: category.slug });
      if (existingCategory) {
        console.log(`Category '${category.name}' already exists, skipping...`);
        continue;
      }

      // Insert category
      await collection.insertOne(category);
      console.log(`Inserted category: ${category.name}`);
    }

    console.log('All problem categories inserted successfully!');
  } catch (error) {
    console.error('Error inserting problem categories:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

insertProblemCategoryData().catch(console.error);