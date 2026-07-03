import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

// Cache the connection across hot-reloads in development
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "pws_cms",           // explicit db name
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000,  // 30s for Atlas cold-start
      socketTimeoutMS: 45000,
    }).then(m => {
      console.log("✅ MongoDB connected");
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB connection failed:", e.message);
    throw e;
  }

  return cached.conn;
}
