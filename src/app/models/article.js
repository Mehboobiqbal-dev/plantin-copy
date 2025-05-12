import mongoose, { Schema, model, models } from 'mongoose';

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  readingTime: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], required: true },
});

export default models.Article || model('Article', ArticleSchema);