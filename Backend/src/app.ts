
import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health.routes.js";
import { clubRouter } from "./routes/club.routes.js";

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/clubes", clubRouter);
