import app from "./app";
import connectDB from "./db/connectDB";

connectDB();

Bun.serve({
  fetch: app.fetch,
});

console.log('Server is running');
