const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function insertPlantDetailData() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env.local');
  }
  const client = new MongoClient(uri);

  const plantDetails = [
    {
      _id: new ObjectId('681de01228b81950fd334259'),
      scientificName: 'Ficus microcarpa',
      fullDescription: 'Ficus microcarpa, also known as Chinese banyan, Malayan banyan, Indian laurel, curtain fig, or gajumaru, is a tree in the fig family Moraceae. It is native in a range from China through tropical Asia and the Caroline Islands to Australia.The ficus genus belongs to the family of mulberry plants (Moraceae) and is the most popular indoor tree species for beginners at Bonsai. There is differing information about the number of existing ficus species there may be between 800 and 2000. They live on all continents in the tropical regions and are very suitable for being kept as indoor Bonsai. Some figs can become very large trees with a crown circumference of more than 300 m (1000 ft). Typical for all fig Bonsai species is their milky latex sap which will leak from wounds or cuts. The tropical figs are evergreen trees small shrubs or even climbing plants. The Ficus Ginseng has a thick pot-bellied trunk similar to the Ginseng root.',
      images: [
        'https://strapi.myplantin.com/large_bonsai_ginseng_or_ficus_retusa_also_known_as_banya_2021_10_17_19_41_17_utc_min_f632905789.webp',
        'https://strapi.myplantin.com/medium_menu_933fef76-6073-4b49-8873-1b96ccbe34b4.webp',
        'https://strapi.myplantin.com/medium_menu_933fef76-6073-4b49-8873-1b96ccbe34b4.webp',
      ],
      care: {
        Water: 'Water every 2-3 weeks, allowing soil to dry out between waterings.',
        Sunlight: 'Thrives in indirect light but can tolerate low light.',
        Soil: 'Well-draining soil, preferably a cactus or succulent mix.',
      },
      careRequirements: [
        {
          icon: 'https://strapi.myplantin.com/climate_humidity_3ff8353df1.webp',
          label: 'Humidity',
          value: 'Normal',
        },
        {
          icon: 'https://strapi.myplantin.com/climate_lightening_part_sun_df08bd4748.webp',
          label: 'Lighting',
          value: 'Part Sun',
        },
        {
          icon: 'https://strapi.myplantin.com/climate_temperature_7496e304fa.webp',
          label: 'Temperature',
          value: '16°C - 27°C',
        },
        {
          icon: 'https://strapi.myplantin.com/climate_hardiness_zone_471884b25e.webp',
          label: 'Hardiness Zone',
          value: '10a - 11b',
        },
        {
          icon: 'https://strapi.myplantin.com/climate_difficulty_66231487c6.webp',
          label: 'Difficulty',
          value: 'Medium',
        },
      ],
      careSections: [
        {
          title: 'Water',
          icon: 'https://strapi.myplantin.com/plant_care_water_74ea6d9cdc.webp',
          description: 'Water every 2-3 weeks, allowing soil to dry out between waterings. Overwatering can lead to root rot.',
        },
        {
          title: 'Sunlight',
          icon: 'https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fplant_care_sunlight_30ed9006a6.webp&w=48&q=75',
          description: 'Thrives in indirect light but can tolerate low light. Avoid direct sunlight to prevent leaf burn.',
        },
        {
          title: 'Soil',
          icon: 'https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FPlanting_icon_2c3ce2a493.webp&w=48&q=75',
          description: 'Use well-draining soil, preferably a cactus or succulent mix.',
        },
        {
          title: 'Fertilizer',
          icon: 'https://strapi.myplantin.com/plant_care_fertilizer_8feecd00c0.webp',
          description: 'Fertilize once a month during the growing season with a diluted liquid fertilizer.',
        },
      ],
    },
  ];

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('plantdb');
    const collection = database.collection('plantDetails');

    for (const detail of plantDetails) {
      // Check if detail already exists by _id
      const existingDetail = await collection.findOne({ _id: detail._id });
      if (existingDetail) {
        console.log(`Plant detail '${detail.scientificName}' already exists, skipping...`);
        continue;
      }

      // Insert plant detail
      await collection.insertOne(detail);
      console.log(`Inserted plant detail: ${detail.scientificName}`);
    }

    console.log('All plant details inserted successfully!');
  } catch (error) {
    console.error('Error inserting plant details:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

insertPlantDetailData().catch(console.error);