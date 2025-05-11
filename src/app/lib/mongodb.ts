import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalAny: any = global;

if (!globalAny.mongoose) {
  globalAny.mongoose = { conn: null, promise: null } as MongooseCache;
}

const cached: MongooseCache = globalAny.mongoose;

export default async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}