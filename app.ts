import { Hono } from "hono";

const app = new Hono();

app.get('/', (c) => {
  return c.text("URL shortener service");
});

export default app;
