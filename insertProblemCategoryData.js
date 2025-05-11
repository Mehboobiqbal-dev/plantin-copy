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
      commonProblemsDescription: '<p>Protecting plants from diseases requires a thorough approach. First, you should define the problem:</p><ul><li><span class="font-bold">Plant diseases</span> This is one of the main plant problems, which includes diseases, damages, and disorders which occur during the plant’s growth.</li><li><span class="font-bold">Environmental problems</span> Experienced gardeners know to consider the habitat in which plants grow for proper and timely protection. Each plant species has its own set of optimal values of factors under which the plants will be in a normal state, and their immune responses to pathogens and pests will be optimal.</li><li><span class="font-bold">Plant pests and invasive plants</span> Plant pests include insects, bugs, and various weeds that may impact the plants.</li></ul><p>To save the crop, you need to notice changes in the plant\'s appearance in time and take the necessary measures. It\'s easy to define all these problems at PlantIn and get professional help.</p>',
      diagnosisSteps: '<p><strong>How to Diagnose Plant Problems</strong></p><p>Here is a short list of the steps you should take for easy detection of the plant problems:</p><ul><li><span class="font-bold">Pay attention to your plants</span> Always notice when something changes with your plant to detect the problems timely. Frequent observations will help you solve the problem instantly, so check the signs and symptoms first.</li><li><span class="font-bold">Learn the name of the plant</span> Some gardeners have so many plants that they even forget which one is in front of them. You need to know the plant’s name to figure out its disease.</li><li><span class="font-bold">Look at the leaves</span> The holes in the leaves often point at the insect pests.</li><li><span class="font-bold">Look for the culprit</span> Look for the insects or their signs.</li><li><span class="font-bold">Use PlantIn</span> With the MyPlantIn web version or the PlantIn app for Android and iOS, you can use the identifier of the plant disease that you can rely on in your further search. Moreover, you can get expert help from professionals via the platform.</li></ul><p>Don’t hesitate to identify your plant issues to solve them as quickly as possible!</p><p>Are you thinking about how to diagnose my plant? No worries! You can use our list of possible diseases, read helpful articles, or promptly diagnose the plant and get a treatment guide from our best botanist.</p>',
    },
    {
      name: 'Diseases',
      slug: 'diseases',
      headerImage: 'https://strapi.myplantin.com/disease_illustration.webp',
      title: 'Plant Disease ID Diagnosis',
      description: 'Protect your plants from diseases with our plant disease identifier and in-app diagnostic tool.',
      mainDescription: 'Plant disease identification may be a complicated task for a newbie, so we took our time and figured out how we could help. Choose an identifier and check out this guide. Plant diseases are processes that occur in a plant under the influence of various causes, from pathogens to adverse environmental conditions.',
      commonProblemsDescription: '<p>Plant disease identification may be a complicated task for a newbie, so we took our time and figured out how we could help. Choose an identifier and check out this guide. Plant diseases are processes that occur in a plant under the influence of various causes, from pathogens to adverse environmental conditions.</p>',
      diagnosisSteps: '<p><strong>What Are Common Plant Diseases?</strong></p><p>The most common plant diseases can be safely attributed, first of all, to diseases such as:</p><ul><li>rust;</li><li>ascochitosis;</li><li>septoria;</li><li>mosaic;</li><li>bacteriosis;</li><li>rot;</li><li>fungi;</li><li>powdery mildew;</li><li>mold;</li><li>leaf curl.</li></ul><p>Also, many others are not listed above but can be found on our customizable lists.</p><p><strong>Diseases Identification by Plant Type</strong></p><p>Numerous plant diseases exist, mainly distributed among such plants as peas, potatoes, buckwheat, grasses, hemp, corn, flax, alfalfa, sunflower, rice, soybeans, tobacco, shag, sainfoin, and many others. Plant disease identification effectively addresses the negative factor that impedes the plant’s growth. All plants found in home gardens or urban areas can be attacked by fungi, emphasizing that fungi can be seen as parasites that provoke fungal diseases in plants.</p><p><strong>Tree Disease</strong></p><p>The strong framework of the trunk and branches determines the tree\'s vitality and, of course, its harvest. The trunk and branches contain a complex of tissues that provide strength and growth in length and thickness, transport water and minerals along with the products of photosynthesis, and store nutrients. If the skeleton is affected, the tree has no chance of yielding. In this case, the gardener decides whether to uproot the sick plants or leave.</p><p><strong>Flower Disease</strong></p><p>The main reason for flower diseases is the violation of conditions of maintenance.</p><p><strong>Tomato Disease</strong></p><p>Many tomato diseases are listed above, as they are very common.</p><p><strong>Crop Disease</strong></p><p>Viral diseases cause the greatest damage to cereal crops.</p><p><strong>Houseplant Diseases</strong></p><p>Diseases of indoor plants require immediate treatment, as the disease spreads quickly in a limited space.</p><p><strong>How to Identify Plant Diseases?</strong></p><p>The symptoms of plant diseases are countless, but the most frequent of them can be singled out:</p><ul><li>leaf fall;</li><li>brown leaf tips;</li><li>spots on leaves;</li><li>wilting of leaves;</li><li>soft stem or leaves.</li></ul><p>In the cases of fungi and other diseases, it is necessary to be aware of the different types of fungi on plants and to prevent and heal them along with rot, rust, etc.</p><p><strong>Is There an App to Identify Plant Diseases?</strong></p><p>Many apps work as plant scanners, but PlantIn is the only one that takes plant health so seriously it stores detailed information on every plant disease possible! Our plant ID and plant disease ID can identify the names of plants and various diseases by picture or scan, so go ahead and check out the list with the possible diseases and our expert tips on identifying and preventing them!</p>',
    },
    {
      name: 'Pests',
      slug: 'pests',
      headerImage: 'https://strapi.myplantin.com/pest_illustration.webp',
      title: 'Plant Pest ID Diagnosis',
      description: 'Identify and manage plant pests using our pest identifier and in-app diagnostic tool.',
      mainDescription: 'Have you ever looked at your adorable plants asking yourself in terror: “What kind of bug is on my houseplant? What are these brown spots on the plant stem?” In most cases, pests are the culprits. Pests are insects that cause harm to gardens or indoor plants by feeding on sap or leaves. Eradicating pests often appears impossible since bugs can spread in a whirlwind manner. You can recognize them with the plant pests identification tool from PlantIn. Address our expert help to get a prudent answer to all your questions. Go on reading to find out how to control indoor plant pests.</p>',
      diagnosisSteps: '<p><strong>How to Identify Plant Pests?</  Efficient treatment of your plant heavily relies on the plant insects. Follow these steps for identification:</p><ul><li><span class="font-bold">Examine the plant closely</span>, scrutinizing the lower leaf surface too.</li><li><span class="font-bold">Look for spots, bites, or other bug traces</span> like uncommon substances.</li><li><span class="font-bold">Check the soil</span>, digging into it a bit to see if there are no pests.</li><li><span class="font-bold">Investigate lists</span> with possible types of plant pests.</li><li><span class="font-bold">Study insects carefully</span>: pay attention to the size, color, wings, shell, amount of legs, and antennae.</li></ul><p><strong>Types of Plant Pests</strong></p><ul><li><strong>Aphids</strong> are tiny bugs that come in different colors and suck plant juices, producing honeydew.</li><li><strong>Scales</strong> have a shell and don’t move. Often, they don’t look like living beings.</li><li><strong>Mealybugs</strong> have a similar appearance but are covered in a white furry coat.</li><li><strong>Leaf miners</strong> are flies whose larvae eat out maze-looking ‘mines’ on leaves.</li><li><strong>Moths</strong> usually impair leaves and fruit during a larval stage, i.e., caterpillar.</li><li><strong>Maggots</strong> are flies laying eggs into fruits.</li><li><strong>Beetles and bugs</strong> gnaw leaves and make small holes, skeletonizing the plant.</li><li><strong>Slugs</strong> leave much bigger traces chewing out huge chunks.</li><li><strong>Spider mites and thrips</strong> leave small holes in the leaves, promoting discoloration.</li><li><strong>Worms</strong>, for example, wireworms, can often be found as indoor plant pests in soil. Soil bug identification might be challenging since you don’t see the culprit directly.</li></ul><p><strong>How to Identify Garden Bugs</strong></p><p>Once you have found the source of the infestation, you should ask yourself several questions to make identification easy:</p><ul><li><strong>Does the bug have wings and hardened wing cases?</strong> If yes, it’s a beetle (Flea beetle, Colorado or Japanese beetle, Weevil).</li><li><strong>Does the bug have softer armor and membrane wings?</strong> In this case, you deal with the true bugs (Aphids).</li><li><strong>Is the bug a tiny, winged insect without armor?</strong> If yes, it’s a fly (Whitefly, Fungus gnat, etc.).</li><li><strong>Is the bug extremely tiny and looks like a spider?</strong> In this case, it’s a mite.</li></ul><p><strong>How to Get Rid of Plant Pests</strong></p><p>The general advice for fighting pests is to isolate the plant, remove insects and treat the leaves and branches. For treatment, you can use pesticides. Nonetheless, consider buying a non-toxic one to avoid harming beneficial insects. For example, insecticidal soap or neem oil will do the job with most houseplant insects. If you want a detailed guide on fighting a particular species, visit a relevant page on our website.</p><p><strong>Is There an App to Identify Pests on Plants?</strong></p><p>Yes, there is! PlantIn app and website can precisely identify pests on indoor and outdoor plants. There are many similar services on the Internet, but PlantIn’s product identifies a massive range of insects and provides you with treatment info and precaution. Artificial intelligence allows our app to work fast and carefully. You just need your phone to take a picture.</p>',
    },
    {
      name: 'Weeds',
      slug: 'weeds',
      headerImage: 'https://strapi.myplantin.com/weed_illustration.webp',
      title: 'Plant Weeds ID Diagnosis',
      description: 'Control invasive weeds with our weed identifier and in-app diagnostic tool.',
      mainDescription: 'Weeds compete with your plants for resources, impacting their growth. In the “Weeds” category, these invasive plants can choke out your garden or houseplants. Diagnosing and managing weeds early is key to maintaining a thriving plant environment.',
      commonProblemsDescription: '',
      diagnosisSteps: '',
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
        // Update existing category with new fields
        await collection.updateOne(
          { slug: category.slug },
          { $set: category },
          { upsert: false }
        );
        console.log(`Updated category: ${category.name}`);
        continue;
      }

      // Insert new category
      await collection.insertOne(category);
      console.log(`Inserted category: ${category.name}`);
    }

    console.log('All problem categories processed successfully!');
  } catch (error) {
    console.error('Error processing problem categories:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

insertProblemCategoryData().catch(console.error);