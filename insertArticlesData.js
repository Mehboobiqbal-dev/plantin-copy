import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

import Article from './src/app/models/article.js';

if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const articlesData = [
  {
    title: "What Do Termites Look Like & How to Identify Them",
    description:
      "Think you've spotted a termite? Learn what they look like, where they hide, and how to catch them early—before they snack on your garden! Let's explore...",
    date: "April 25",
    readingTime: "5 minutes",
    image:
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Termite_swarmer_image_ee4cab9a98.jpg&w=1920&q=100",
    tags: ["guide", "pests", "explainer"],
  },
  {
    title: "What Does Ragweed Look Like?",
    description:
      "A look into the common weed that crowds your garden and its impact on the ecosystem.",
    date: "April 18",
    readingTime: "5 minutes",
    image:
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Common_ragweed_photo_ed641cf592.jpg&w=1920&q=100",
    tags: ["garden", "weeds", "explainer"],
  },
  {
    title: "Best Plants That Repel Bugs for Your Garden",
    description:
      "Discover the plants that naturally ward off pests and help you cultivate a bug-free garden environment.",
    date: "April 11",
    readingTime: "8 minutes",
    image:
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Plants_that_repes_bugs_cover_image_0595ea2fe4.jpg&w=1920&q=100",
    tags: ["plants", "pests", "gardening", "top choice"],
  },
  {
    title: "Best Plants That Repel Bugs for Your Garden",
    description:
      "Discover the plants that naturally ward off pests and help you cultivate a bug-free garden environment.",
    date: "April 11",
    readingTime: "8 minutes",
    image:
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Plants_that_repes_bugs_cover_image_0595ea2fe4.jpg&w=1920&q=100",
    tags: ["plants", "pests", "gardening", "plant of the week"],
  },
  {
    title: "What Does Ragweed Look Like? (Care Guide)",
    description:
      "A look into the common weed that crowds your garden and its impact on the ecosystem.",
    date: "April 18",
    readingTime: "5 minutes",
    image:
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Common_ragweed_photo_ed641cf592.jpg&w=1920&q=100",
    tags: ["garden", "weeds", "care guide"],
  },
  {
    title: "What Does Ragweed Look Like? (Entertainment)",
    description:
      "A look into the common weed that crowds your garden and its impact on the ecosystem.",
    date: "April 18",
    readingTime: "5 minutes",
    image:
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Common_ragweed_photo_ed641cf592.jpg&w=1920&q=100",
    tags: ["garden", "weeds", "entertainment"],
  },
];

async function insertArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await Article.deleteMany({});
    console.log('Cleared existing articles');

    await Article.insertMany(articlesData);
    console.log('Inserted sample articles');

    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error inserting articles:', error);
    process.exit(1);
  }
}

insertArticles();