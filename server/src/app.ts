import cors from "cors";
import express from "express";
import jobRoutes from "./jobs/jobRoutes.js";
import authRoutes from "./auth/authRoutes.js";
import { checkDatabaseConnection } from "./db/index.js";
import { requireAuth } from "./auth/requireAuth.js";

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

export const app = express();

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);

app.use(express.json());
app.use("/auth", authRoutes);

app.get("/db-health", async (_req, res) => {
  try {
    const result = await checkDatabaseConnection();

    res.json({
      status: "ok",
      database: result,
    });
  } catch {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "job-tracker-server",
  });
});

app.use("/api/jobs", requireAuth, jobRoutes);
