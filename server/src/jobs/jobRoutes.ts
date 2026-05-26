import { Router } from "express";
import type { JobApplication } from "./jobTypes.js";

const router = Router();

const jobs: JobApplication[] = [
  {
    id: "1",
    company: "Example Company",
    position: "Frontend Developer",
    status: "Interested",
    jobUrl: "https://example.com",
  },
];

router.get("/", (_req, res) => {
  res.json(jobs);
});

export default router;
