import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const dbName = "users";

export async function connectToDatabase() {
  await client.connect();
  return client.db(dbName);
}
