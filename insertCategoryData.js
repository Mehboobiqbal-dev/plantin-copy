const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function insertCategoryData() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env.local');
  }
  const client = new MongoClient(uri);

  const categories = [
    {
      name: 'All plants',
      slug: 'all-plants',
      headerImage: 'https://strapi.myplantin.com/Plant_illustration01_78e3457b6f.webp',
      title: 'Plant Identifier by Picture',
      description: 'Identify plants, use customizable lists, and learn how to care for each particular species.',
      mainDescription: 'Imagine walking down the street and noticing fantastic flowers blooming in someone’s garden. In fact, these queens – you think – would fit perfectly in your backyard. But what are they called? Your plant knowledge from 8th-grade biology isn’t enough...',
      expandedDescription: 'Well, that’s the kind of situation a plant identifier was created for. The plant identifier app is an online alternative to manual plant identification. Let’s learn a bit more about how to identify a plant both manually and with some help from digital technologies.',
    },
    {
      name: 'Houseplants',
      slug: 'houseplants',
      headerImage: 'https://strapi.myplantin.com/houseplant_illustration.webp',
      title: 'Houseplant Identifier by Picture',
      description: 'Identify houseplants, use customizable lists, and learn how to care for each particular species.',
      mainDescription: 'Imagine walking down the street and noticing fantastic houseplants in someone’s home. These would fit perfectly in your living room. But what are they called? Your plant knowledge isn’t enough...',
      expandedDescription: 'A plant identifier app simplifies houseplant identification. Learn how to recognize and care for these indoor plants with ease. Discover tips for watering, lighting, and maintaining your houseplants.',
    },
    {
      name: 'Cactuses',
      slug: 'cactus',
      headerImage: 'https://strapi.myplantin.com/cactus_illustration.webp',
      title: 'Cactus Identifier by Picture',
      description: 'Identify cactuses, explore their unique traits, and learn care tips for these desert plants.',
      mainDescription: 'Picture yourself in a desert landscape, spotting a unique cactus. You’d love to grow one at home, but what’s its name? Your basic plant knowledge falls short...',
      expandedDescription: 'A plant identifier app simplifies cactus identification. Learn how to recognize and care for these hardy plants with ease. Discover their water-saving adaptations and ideal growing conditions.',
    },
    {
      name: 'Succulents',
      slug: 'succulents',
      headerImage: 'https://strapi.myplantin.com/succulent_illustration.webp',
      title: 'Succulent Identifier by Picture',
      description: 'Identify succulents, learn about their care, and discover their unique water-storing abilities.',
      mainDescription: 'You spot a plump, vibrant succulent at a market. It’d be perfect for your desk, but what’s its name? Your plant knowledge doesn’t quite cut it...',
      expandedDescription: 'Succulent identification is easy with a plant identifier app. Explore their diverse shapes and learn care tips for these low-maintenance plants.',
    },
    {
      name: 'Flowers',
      slug: 'flowers',
      headerImage: 'https://strapi.myplantin.com/flower_illustration.webp',
      title: 'Flower Identifier by Picture',
      description: 'Identify flowers, create stunning gardens, and learn care tips for vibrant blooms.',
      mainDescription: 'Walking through a garden, you see dazzling flowers. They’d look amazing in your yard, but what are they called? Your biology lessons feel far away...',
      expandedDescription: 'A plant identifier app makes flower identification simple. Learn about petal shapes, colors, and care routines to keep your flowers thriving.',
    },
    {
      name: 'Trees',
      slug: 'trees',
      headerImage: 'https://strapi.myplantin.com/tree_illustration.webp',
      title: 'Tree Identifier by Picture',
      description: 'Identify trees, learn about their growth, and discover their ecological importance.',
      mainDescription: 'You notice a majestic tree in a park. It’d be perfect for your backyard, but what’s its name? Your plant knowledge isn’t enough...',
      expandedDescription: 'Tree identification is streamlined with a plant identifier app. Learn about leaf patterns, bark, and care tips for these towering plants.',
    },
    {
      name: 'Veggies & Fruit',
      slug: 'veggies-fruit',
      headerImage: 'https://strapi.myplantin.com/veggie_illustration.webp',
      title: 'Veggie & Fruit Identifier by Picture',
      description: 'Identify edible plants, plan your garden, and learn how to grow fresh produce.',
      mainDescription: 'At a farm, you see thriving veggie plants. You’d love to grow them, but what are they? Your gardening knowledge needs a boost...',
      expandedDescription: 'A plant identifier app simplifies veggie and fruit identification. Learn planting schedules, soil needs, and harvesting tips for your garden.',
    },
    {
      name: 'Grasses',
      slug: 'grasses',
      headerImage: 'https://strapi.myplantin.com/grass_illustration.webp',
      title: 'Grass Identifier by Picture',
      description: 'Identify grasses, design lush lawns, and learn maintenance tips for green spaces.',
      mainDescription: 'You see a vibrant lawn with unique grasses. They’d suit your yard, but what are they called? Your plant knowledge falls short...',
      expandedDescription: 'Grass identification is easy with a plant identifier app. Discover blade shapes, growth habits, and care tips for healthy lawns.',
    },
    {
      name: 'Shrubs',
      slug: 'shrub',
      headerImage: 'https://strapi.myplantin.com/shrub_illustration.webp',
      title: 'Shrub Identifier by Picture',
      description: 'Identify shrubs, enhance your landscape, and learn care tips for these versatile plants.',
      mainDescription: 'A neighbor’s yard has stunning shrubs. They’d look great in your garden, but what are they? Your plant knowledge isn’t enough...',
      expandedDescription: 'A plant identifier app simplifies shrub identification. Learn about pruning, soil needs, and design ideas for your landscape.',
    },
    {
      name: 'Ferns',
      slug: 'ferns',
      headerImage: 'https://strapi.myplantin.com/fern_illustration.webp',
      title: 'Fern Identifier by Picture',
      description: 'Identify ferns, create lush indoor or outdoor spaces, and learn care tips.',
      mainDescription: 'You spot delicate ferns in a forest. They’d thrive in your home, but what’s their name? Your biology knowledge isn’t enough...',
      expandedDescription: 'Fern identification is streamlined with a plant identifier app. Explore frond patterns and care tips for these shade-loving plants.',
    },
    {
      name: 'Herbs',
      slug: 'herbs',
      headerImage: 'https://strapi.myplantin.com/herb_illustration.webp',
      title: 'Herb Identifier by Picture',
      description: 'Identify herbs, grow fresh flavors, and learn culinary and care tips.',
      mainDescription: 'At a market, you see aromatic herbs. They’d elevate your cooking, but what are they? Your plant knowledge needs refreshing...',
      expandedDescription: 'A plant identifier app makes herb identification easy. Learn about leaf shapes, aromas, and growing tips for your herb garden.',
    },
    {
      name: 'Foliage',
      slug: 'foliage',
      headerImage: 'https://strapi.myplantin.com/foliage_illustration.webp',
      title: 'Foliage Identifier by Picture',
      description: 'Identify foliage plants, enhance your decor, and learn care tips for lush greenery.',
      mainDescription: 'You see striking foliage in a shop. It’d brighten your home, but what’s its name? Your plant knowledge isn’t enough...',
      expandedDescription: 'Foliage identification is simple with a plant identifier app. Discover leaf textures, colors, and care tips for vibrant indoor plants.',
    },
    {
      name: 'Aquatics',
      slug: 'aquatics',
      headerImage: 'https://strapi.myplantin.com/aquatic_illustration.webp',
      title: 'Aquatic Plant Identifier by Picture',
      description: 'Identify aquatic plants, design water gardens, and learn care tips for wet environments.',
      mainDescription: 'By a pond, you spot fascinating aquatic plants. They’d suit your water feature, but what are they? Your plant knowledge falls short...',
      expandedDescription: 'Aquatic plant identification is easy with a plant identifier app. Learn about water needs, growth habits, and care for these unique plants.',
    },
    {
      name: 'Mushrooms',
      slug: 'mushrooms',
      headerImage: 'https://strapi.myplantin.com/mushroom_illustration.webp',
      title: 'Mushroom Identifier by Picture',
      description: 'Identify mushrooms, learn about their unique properties, and discover their ecological roles.',
      mainDescription: 'While hiking, you spot a cluster of intriguing mushrooms. They’d be a great addition to your study, but what are they? Your biology knowledge isn’t enough...',
      expandedDescription: 'A plant identifier app makes mushroom identification easy. Explore their fascinating world with our digital tools and learn about their ecological importance.',
    },
  ];

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('plantdb');
    const collection = database.collection('categories');

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

    console.log('All categories inserted successfully!');
  } catch (error) {
    console.error('Error inserting categories:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

insertCategoryData().catch(console.error);