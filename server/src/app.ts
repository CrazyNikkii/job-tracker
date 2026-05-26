import cors from "cors";
import express from "express";
import jobRoutes from "./jobs/jobRoutes.js";

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

export const app = express();

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "job-tracker-server",
  });
});

app.use("/api/jobs", jobRoutes);
