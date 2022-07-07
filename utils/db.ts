import { MongoClient, ObjectId } from "@mongo";

export { ObjectId };

const client = new MongoClient();

const MONGO_URI = Deno.env.get("MONGO_URI");

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not set");
}

await client.connect(MONGO_URI!);
console.log("Connected to MongoDB");

export const db = client.database("freshdb");

// Post
export interface IPost {
  _id: ObjectId;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const postCollection = db.collection<IPost>("posts");

// User
export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export const userCollection = db.collection<IUser>("users");
