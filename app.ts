import { Hono } from "hono";
import "dotenv/config";
import { nanoid } from "nanoid";
import { logger } from "hono/logger";
import { validateUrl } from "./utils/validateUrl";
import Url from "./models/url.model";
import { redis } from ".";

const app = new Hono();

app.use("*", logger());

// Short URL Generator
app.post('/short', async (c) => {
  const { origUrl } = await c.req.json();
  const base = process.env.BASE || 'http://localhost:3000';
  const urlId = nanoid();

  if (!validateUrl(origUrl)) {
    return c.json({ error: "Invalid Original Url" }, 400);
  }

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
  } catch (err: any) {
    console.error(`Error in short url generator: ${err.message}`);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.get('/:urlId', async (c) => {
  const urlId = c.req.param("urlId");
  try {
    const cachedUrl = await redis.get(urlId);
    if (cachedUrl) {
      await redis.incr(`${urlId}_clicks`);
      return c.redirect(cachedUrl);
    }

    const url = await Url.findOne({ urlId });
    if (!url) {
      return c.notFound();
    }

    await redis.set(urlId, url.origUrl);
    await redis.set(`${urlId}_clicks`, url.clicks);

    await Url.updateOne(
      {
        urlId,
      },
      { $inc: { clicks: 1 } }
    );

    await redis.incr(`${urlId}_clicks`);

    return c.redirect(url.origUrl);
  } catch (err: any) {
    console.error(`Error in get url: ${err.message}`);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.get('/', (c) => {
  return c.text("URL shortener service");
});

export default app;
