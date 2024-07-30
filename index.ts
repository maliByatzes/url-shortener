import { Redis } from "ioredis";
import app from "./app";
import connectDB from "./db/connectDB";

if (!process.env.REDIS_URL) {
  console.error("REDIS_URL is not set");
  process.exit(1);
}

export const redis = new Redis(process.env.REDIS_URL);

redis.set("key", "URL Shortener Service");

redis.get("key", function(err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

connectDB();

Bun.serve({
  fetch: app.fetch,
});

console.log('Server is running');
