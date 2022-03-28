require("dotenv").config();
import cors from "cors";
import express from "express";
import config from "config";
import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import rateLimit, { MemoryStore } from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  store: new MemoryStore(),
});

const app = express();

app.use(
  cors({
    origin: config.get("origin"),
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb" }));

app.use("/api", apiLimiter);

app.use(deserializeUser);

app.use(router);

app.use(express.static("uploads"));

const port = config.get<number>("port");

app.listen(port, async () => {
  log.info(`App started at http://localhost:${port}`);

  await connectToDb();
});
