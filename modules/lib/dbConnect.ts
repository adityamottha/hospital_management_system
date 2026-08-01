import mongoose from "mongoose";
import { ApiError } from "../utils/apiError";

const MONGODB_URI = process.env.MONGODB_URI!;

// check URL available insie env
if (!MONGODB_URI) {
  throw new ApiError(500,"Please define MONGODB_URI in .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache || {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

async function dbConnect() {
  // Already connected
  if (cached.conn) {
    return cached.conn;
  }

  // Connection already in progress
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("DATABASE CONNECTED SUCCESSFULLY.");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;