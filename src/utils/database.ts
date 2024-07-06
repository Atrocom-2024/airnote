import { MongoClient, Db } from "mongodb";
import { Pool } from "pg";

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

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  options: `-c search_path=${process.env.DB_SCHEMA}`
});