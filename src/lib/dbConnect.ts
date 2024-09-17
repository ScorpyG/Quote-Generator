// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.ts
import env from '@/utils/env';
import mongoose from 'mongoose';

const MONGODB_URI = env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI not defined');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

async function dbConnect() {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseConn) => {
      return mongooseConn;
    });
  }

  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.connection;
}

export default dbConnect;
