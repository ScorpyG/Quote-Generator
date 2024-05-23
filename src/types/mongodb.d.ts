// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.ts
import { Mongoose } from 'mongoose';

/* eslint-disable no-var */
declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null;
    connection: Mongoose | null;
  };
}
