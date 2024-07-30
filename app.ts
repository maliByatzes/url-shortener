import { Hono } from "hono";
import "dotenv/config";
import { nanoid } from "nanoid";
import { logger } from "hono/logger";
import { validateUrl } from "./utils/validateUrl";
import Url from "./models/url.model";

const app = new Hono();

app.use("*", logger());

// Short URL Generator
app.post('/short', async (c) => {
  const { origUrl } = await c.req.json();
  const base = process.env.BASE || 'http://localhost:3000';
  const urlId = nanoid();

  if (validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        return c.json(url, 200);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId
        });

        await url.save();
        return c.json(url, 201);
      }
      return c.text('');
    } catch (err: any) {
      console.error(`Error in short url generator: ${err.message}`);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  } else {
    return c.json({ error: "Invalid Original Url" }, 400);
  }
});

app.get('/', (c) => {
  return c.text("URL shortener service");
});

export default app;
