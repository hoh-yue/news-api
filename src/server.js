import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import NodeCache from "node-cache";

dotenv.config();

const app = express();
const cache = new NodeCache({ stdTTL: process.env.CACHE_DURATION || 300 });
const port = process.env.PORT || 3000;
const GNEW_API_KEY = process.env.GNEWS_API_KEY;
const BASE_URL = process.env.GNEWS_BASE_URL;
const URL = {
  HEADLINE: `${BASE_URL}/top-headlines?apikey=${GNEW_API_KEY}`,
  SEARCH: `${BASE_URL}/search?apikey=${GNEW_API_KEY}`,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from news api!");
});

const callApi = async (url, params, cacheKey) => {
  if (cache.has(cacheKey)) {
    console.info("Serving from cache...");
    const cachedData = cache.get(cacheKey);
    return cachedData;
  }

  const response = await axios.get(url, { params });
  cache.set(cacheKey, response.data);
  console.info("Serving from API...");

  const customData = {
    data: response?.data?.articles,
    total: response?.data?.totalArticles,
    page: params?.page,
    max: params?.max,
  };
  return customData;
};

app.get("/api/v1/headlines", async (req, res) => {
  try {
    const { max = 10, page = 1, lang = "en", category = "general" } = req.query;
    const cacheKey = `${max}-${page}-${lang}-${category}`;
    const params = { max, page, lang, category };
    const response = await callApi(URL.HEADLINE, params, cacheKey);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error?.message);
    res.status(500).json({ errors: "Something went wrong: " + error?.message });
  }
});

app.get("/api/v1/news/search", async (req, res) => {
  try {
    const { q, max = 10, page = 1, lang = "en" } = req.query;
    const cacheKey = `${q}-${max}-${page}-${lang}`;
    const params = { q, max, page, lang };
    const response = await callApi(URL.HEADLINE, params, cacheKey);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`NEWS api app listening on port ${port}`);
});

export default app;
