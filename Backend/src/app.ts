
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { healthRouter } from "./routes/health.routes.js";
import { clubRouter } from "./routes/club.routes.js";
import { authRouter } from "./routes/auth.routes.js";

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/health", healthRouter);
app.use("/api/clubes", clubRouter);
app.use("/api/auth", authRouter);
