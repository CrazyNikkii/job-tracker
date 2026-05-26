import cors from "cors";
import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT ?? 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
