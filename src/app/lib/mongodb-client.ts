import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not defined in .env");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Preserve connection across hot reloads in development
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // Create a new connection in production
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;