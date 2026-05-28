import cors from "cors";
import express from "express";
import jobRoutes from "./jobs/jobRoutes.js";
import authRoutes from "./auth/authRoutes.js";
import { checkDatabaseConnection } from "./db/index.js";
import { requireAuth } from "./auth/requireAuth.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.resolve(__dirname, "../../client/dist");

  app.use(express.static(clientDistPath));

  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}
