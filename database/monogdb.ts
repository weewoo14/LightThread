import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

declare global {
  var mongoosePromise: Promise<typeof mongoose> | undefined;
}

export async function mongoConnect() {
  mongoose.set("strictQuery", true);
  mongoose.set("strictPopulate", true);

  if (!global.mongoosePromise) {
    global.mongoosePromise = mongoose.connect(MONGO_URI);
  }

  return global.mongoosePromise;
}