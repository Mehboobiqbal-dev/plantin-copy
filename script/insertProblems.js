const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://Mehboob090:Mehboob090%40@cluster0.zvqxj.mongodb.net/plantdb?retryWrites=true&w=majority&appName=Cluster0';

const problems = [
  {
    _id: new ObjectId("670f3b1a8f1c2d3e4a5b6c80"),
    image: "https://strapi.myplantin.com/small_Thrips_Damaging_the_Leaf_ba19b54467.webp",
    title: "Thrips",
    description: "Small insects known as Thysanoptera that cause damage by feeding on plant tissues.",
    category: "pests"
  },
  {
    _id: new ObjectId("670f3b1a8f1c2d3e4a5b6c81"),
    image: "https://strapi.myplantin.com/small_Example_of_Shot_Hole_Disease_b1f61159b2.webp",
    title: "Shot Hole Disease",
    description: "This condition shows up as small holes in the leaves, revealing the damage caused by the disease.",
    category: "diseases"
  },
  {
    _id: new ObjectId("670f3b1a8f1c2d3e4a5b6c82"),
    image: "https://strapi.myplantin.com/small_The_Leaf_with_a_Stink_Bug_d2ec8b40a7.webp",
    title: "Shield Bugs",
    description: "Also referred to as stink bugs, these pests often harm the plant by feeding on its sap.",
    category: "pests"
  },
  {
    _id: new ObjectId("670f3b1a8f1c2d3e4a5b6c83"),
    image: "https://strapi.myplantin.com/small_main_scale_insects_9acd41515f.webp",
    title: "Scale Insects",
    description: "Tiny brown insects that suck plant sap, depriving your plant of vital nutrients.",
    category: "pests"
  },
  {
    _id: new ObjectId("670f3b1a8f1c2d3e4a5b6c84"),
    image: "https://strapi.myplantin.com/small_Peach_Leaves_affected_by_Leaf_Curl_fcf405fc24.webp",
    title: "Peach Leaf Curl",
    description: "A disease caused by the fungus Taphrina deformans, leading to the curling of peach leaves.",
    category: "diseases"
  },
  {
    _id: new ObjectId("670f3b1a8f1c2d3e4a5b6c85"),
    image: "https://strapi.myplantin.com/small_pexels_teona_swift_6913568_c15c3b11c2.webp",
    title: "Snake Plant Issue",
    description: "Dracaena trifasciata related issue description (example for variety).",
    category: "general"
  }
];

const problemDetails = [
  {
    _id: new ObjectId("670f3b1a8f1c2d3e4a5b6c80"),
    titleForLookup: "Thrips",
    scientificName: "Thysanoptera (Thrips)",
    fullDescription: "These insects are also known by their scientific name Thysanoptera, and there are about 5 000 species of them. These tiny insects prefer hot climates, so mostly they can be found in hotter regions of the world. They can transmit various plant viruses, and due to their tiny size (their maximum size is about an inch), they can enter even the least noticeable areas of the plant and damage it. Despite their destructive nature, a few species of these insects prey on mites or scale insects. Thrips are primarily active in bigger groups and tend to choose the garden vegetables or flowers (especially roses and gladioli) as their hosts. What’s interesting about these insects is that they have their favorite colors. And they are mostly white and yellow, which means no good for the light-colored flowers.",
    SignOfDamage: "The plant becomes paler. If you notice that the plant is discolored and silverish, it is probably because of Thrips.\nDeformation of plant’s growth. This deformation also affects the new growths, making them weaker and wobbly.\nTiny spots remind the rice in the plant. The naked eye barely notices them, but they can indicate Thrips activity.\nTiny black specks. Another result of the insect’s activity, these black specks are waste left by them.",
    images: [
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Flarge_Thrips_Damaging_the_Leaf_ba19b54467.webp&w=1920&q=75",
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Flarge_Thrip_on_the_Ground_72420f03dd.webp&w=1920&q=75",
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Flarge_Thrip_on_the_Leaf_39cd427c85.webp&w=1920&q=75"
    ]
  },
  {
    _id: new ObjectId("670f3b1a8f1c2d3e4a5b6c81"),
    titleForLookup: "Shot Hole Disease",
    scientificName: "Wilsonomyces carpophilus",
    fullDescription: "The disease’s name couldn’t be more evident because it is about the holes. These ‘craters’ are created by the fungus Wilsonomyces carpophilus. The trees that are affected by this disease are mostly cherries, almonds, nectarine, peaches, apricots, etc. Spring is the most favorable period for the disease. During this period pay attention to the leaves. At first, there will be spots with light green or yellow margins. Later, the affected areas become more prominent, and the centers turn brownish and drop out. Fungal spores that can be found in the centers of brown spots are the main sign that distinguishes this disease from the others. Despite being so common, Shot Hole Disease is a severe issue since it damages the fruit and causes premature leaf drop.",
    SignOfDamage: "Spots on the leaves. Despite the whole three being affected, stems, buds, and fruits included, the leaves’ light green or yellow spots are a most telling sign.\nYellowing around holes. \nShot holes. These brownish spots then drop out, leaving the holes. \nSpots on fruits. At first, they are tiny and purple, but later they turn white or gray. \nGummosis. The process is when a gummy substance is created on affected plants, and sometimes it happens due to Shot Hole Disease. ",
    images: [
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Example_of_Shot_Hole_Disease_b1f61159b2.webp&w=1920&q=75",
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Flarge_Shot_Hole_Disease_4ce022b795.webp&w=1920&q=75",
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Flarge_Cherry_Shot_Hole_Disease_f6cdb15ba7.webp&w=1920&q=75"
    ]
  },
  {
    _id: new ObjectId("670f3b1a8f1c2d3e4a5b6c82"),
    titleForLookup: "Shield Bugs",
    scientificName: "Pyrrhocoridae",
    fullDescription: "This bug is also known as a stink bug, and such a nickname is not coincidental because it does stink when touched or attacked. Its unpleasantness doesn’t end here, because this insect is also really harmful. Its primary food source is sap from beans or tomatoes. It affects the plant’s state, the fruit becomes of poor quality, and yields, in general, are reduced because of this pest. It is easier to spot these bugs than other sap-sucking insects because they are bigger, about 0,59 inches (1,5 cm), adult bugs are bright green, and younger ones can be red, brown, or white.",
    SignOfDamage: "Change of color. Leaves become weaker and of yellow or brown colors.\nEarly fall of leaves and fruits. This happens since the bug weakens the plant. \nTexture changes. Fruits and leaves become mealy to the touch. \nTexture changes. Fruits and leaves become mealy to the touch.",
    images: [
      "https://strapi.myplantin.com/large_The_Leaf_with_a_Stink_Bug_d2ec8b40a7.webp"
    ]
  },
  {
    _id: new ObjectId("670f3b1a8f1c2d3e4a5b6c83"),
    titleForLookup: "Scale Insects",
    scientificName: "Coccoidea",
    fullDescription: "Placeholder description for Scale Insects.",
    SignOfDamage: "Sticky residue on leaves.\nYellowing leaves.",
    images: [
      "https://strapi.myplantin.com/large_main_scale_insects_9acd41515f.webp"
    ]
  },
  {
    _id: new ObjectId("670f3b1a8f1c2d3e4a5b6c84"),
    titleForLookup: "Peach Leaf Curl",
    scientificName: "Taphrina deformans",
    fullDescription: "Placeholder description for Peach Leaf Curl.",
    SignOfDamage: "Curling leaves.\nRed or purple discoloration.",
    images: [
      "https://strapi.myplantin.com/large_Peach_Leaves_affected_by_Leaf_Curl_fcf405fc24.webp"
    ]
  },
  {
    _id: new ObjectId("670f3b1a8f1c2d3e4a5b6c85"),
    titleForLookup: "Snake Plant Issue",
    scientificName: "Dracaena trifasciata",
    fullDescription: "Placeholder description for Snake Plant Issue.",
    SignOfDamage: "Wilting leaves.\nBrown tips.",
    images: [
      "https://strapi.myplantin.com/large_pexels_teona_swift_6913568_c15c3b11c2.webp"
    ]
  }
];

async function insertProblems() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('plantdb');
    const problemsCollection = database.collection('problems');
    const problemDetailsCollection = database.collection('problemDetails');

    // Drop collections to avoid duplicates
    await problemsCollection.drop().catch(err => console.log('No problems collection to drop:', err.message));
    await problemDetailsCollection.drop().catch(err => console.log('No problemDetails collection to drop:', err.message));

    // Insert problems
    const problemsResult = await problemsCollection.insertMany(problems);
    console.log(`${problemsResult.insertedCount} problems inserted:`);
    Object.entries(problemsResult.insertedIds).forEach(([index, id]) => {
      console.log(`Problem ${problems[parseInt(index)].title}: ${id}`);
    });

    // Insert problem details
    const detailsResult = await problemDetailsCollection.insertMany(problemDetails);
    console.log(`${detailsResult.insertedCount} problem details inserted:`);
    Object.entries(detailsResult.insertedIds).forEach(([index, id]) => {
      console.log(`Problem Detail ${problemDetails[parseInt(index)].titleForLookup}: ${id}`);
    });

    // Verify insertion
    const thripsDetail = await problemDetailsCollection.findOne({ _id: new ObjectId("670f3b1a8f1c2d3e4a5b6c80") });
    console.log('Thrips document after insertion:', thripsDetail ? JSON.stringify(thripsDetail) : 'Not found');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await client.close();
  }
}

insertProblems();