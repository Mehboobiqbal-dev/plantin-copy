const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function updatePlantDetailData() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env.local');
  }
  const client = new MongoClient(uri);

  const plantDetailUpdate = {
    scientificName: 'Nephrolepis Exaltata Smithii',
      fullDescription: 'The cotton candy fern plants Latin name is Nephrolepis exaltata. The fern is also known as the Suzi Wong fern, which can grow to 5 feet tall. The name of the plant describes its feel and color. The cotton candy fern has soft, fluffy chartreuse-colored fronds. The fern can be planted indoors or outdoors in large containers or hanging baskets.',
      images: [
        'https://strapi.myplantin.com/large_main_ce1f03d7-d437-4f74-b17b-0715816b81a8.webp',
        'https://strapi.myplantin.com/large_14344_b739b7b8a3.webp',
        'https://strapi.myplantin.com/medium_menu_410b7b2f-bcf5-4d18-8c9d-d9953ada9d08.webp',
      ],
    care: {
      Water: 'Tips for watering your ferns: avoid watering from above, which can cause the moisture to splash onto the leaves of your ferns. instead, aim the water you give your ferns at the soil above their roots. it will trickle down into the root zone, where your ferns can absorb it and put it to use.',
      Sunlight: 'Prefers bright, indirect light but can tolerate some shade.',
      Soil: 'Well-draining, loamy soil with good aeration.',
    },
    careRequirements: [
      {
        icon: 'https://strapi.myplantin.com/climate_humidity_3ff8353df1.webp',
        label: 'Humidity',
        value: 'Moderate to High',
      },
      {
        icon: 'https://strapi.myplantin.com/climate_lightening_part_sun_df08bd4748.webp',
        label: 'Lighting',
        value: 'Bright Indirect',
      },
      {
        icon: 'https://strapi.myplantin.com/climate_temperature_7496e304fa.webp',
        label: 'Temperature',
        value: '18°C - 24°C',
      },
      {
        icon: 'https://strapi.myplantin.com/climate_hardiness_zone_471884b25e.webp',
        label: 'Hardiness zone',
        value: '6 - 9',
      },
      
      {
        icon: 'https://strapi.myplantin.com/climate_difficulty_66231487c6.webp',
        label: 'Difficulty',
        value: 'Moderate',
      },
    ],
    careSections: [
      {
        title: 'Water',
        icon: 'https://strapi.myplantin.com/plant_care_water_74ea6d9cdc.webp',
        description: 'Water when the top inch of soil feels dry, typically every 7-10 days. Ensure the pot has drainage to prevent root rot.',
      },
      {
        title: 'Pruning',
        icon: 'https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FPlanting_icon_ed780f57c5.webp&w=48&q=75',
        description: 'To prune a plant to encourage bushy new growth, snip off the dominant buds on select stems, staggering the cuts to encourage varied growth.',
      }

     ,
      {
        title: 'Sunlight',
        icon: 'https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fplant_care_sunlight_30ed9006a6.webp&w=48&q=75',
        description: 'Prefers bright, indirect light but can tolerate some shade. Rotate the plant occasionally for even growth.',
      },
      {
        title: 'Soil',
        icon: 'https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FPlanting_icon_2c3ce2a493.webp&w=48&q=75',
        description: 'Use well-draining, loamy soil with good aeration. A mix of potting soil and perlite works well.',
      },
      {
        title: 'Fertilizer',
        icon: 'https://strapi.myplantin.com/plant_care_fertilizer_8feecd00c0.webp',
        description: 'Fertilize every 4-6 weeks during the growing season (spring and summer) with a balanced liquid fertilizer.',
      },
     
      {
        title: 'Common Pests',
        icon: 'https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FPlanting_icon_bf400946b0.webp&w=48&q=75',
        description: 'Watch for pests like spider mites and scale. Treat with neem oil or insecticidal soap if detected.',
      },
    ],
  };

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('plantdb');
    const collection = database.collection('plantDetails');

    const result = await collection.updateOne(
      { _id: new ObjectId('681de01228b81950fd33425a') },
      { $set: plantDetailUpdate },
      { upsert: false }
    );

    if (result.matchedCount === 0) {
      console.log('No document found with _id: 681c8292511efd4fa12e4b23');
    } else if (result.modifiedCount > 0) {
      console.log('Updated plant detail: Ficus microcarpa');
    } else {
      console.log('Plant detail already up-to-date: Ficus microcarpa');
    }

  } catch (error) {
    console.error('Error updating plant detail:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

updatePlantDetailData().catch(console.error);