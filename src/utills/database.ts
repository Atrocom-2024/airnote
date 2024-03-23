import { MongoClient, Db } from "mongodb";

let cachedDb: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }
  const uri = process.env.MONGODB_URI;
  const client: MongoClient = await MongoClient.connect(uri);
  const db: Db = client.db('kimmulju');

  cachedDb = db;
  return db;
}