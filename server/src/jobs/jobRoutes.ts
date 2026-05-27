import { Router } from "express";
import type { JobApplication, JobStatus } from "./jobTypes.js";

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

const validStatuses: JobStatus[] = [
  "Interested",
  "Applied",
  "Interview Scheduled",
  "Rejected",
  "Accepted",
];

router.get("/", (_req, res) => {
  res.json(jobs);
});

router.post("/", (req, res) => {
  const { company, position, status, jobUrl } = req.body;

  if (
    typeof company !== "string" ||
    typeof position !== "string" ||
    typeof status !== "string" ||
    typeof jobUrl !== "string"
  ) {
    return res.status(400).json({
      error: "Invalid job data",
    });
  }

  if (!company.trim()) {
    return res.status(400).json({
      error: "Company is required",
    });
  }

  if (!validStatuses.includes(status as JobStatus)) {
    return res.status(400).json({
      error: "Invalid job status",
    });
  }

  const newJob: JobApplication = {
    id: Date.now().toString(),
    company: company.trim(),
    position: position.trim(),
    status: status as JobStatus,
    jobUrl: jobUrl.trim(),
  };

  jobs.push(newJob);

  return res.status(201).json(newJob);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { company, position, status, jobUrl } = req.body;

  const jobIndex = jobs.findIndex((job) => job.id === id);

  if (jobIndex === -1) {
    return res.status(404).json({
      error: "Job not found",
    });
  }

  if (
    typeof company !== "string" ||
    typeof position !== "string" ||
    typeof status !== "string" ||
    typeof jobUrl !== "string"
  ) {
    return res.status(400).json({
      error: "Invalid job data",
    });
  }

  if (!company.trim()) {
    return res.status(400).json({
      error: "Company is required",
    });
  }

  if (!validStatuses.includes(status as JobStatus)) {
    return res.status(400).json({
      error: "Invalid job status",
    });
  }

  const updatedJob: JobApplication = {
    id,
    company: company.trim(),
    position: position.trim(),
    status: status as JobStatus,
    jobUrl: jobUrl.trim(),
  };

  jobs[jobIndex] = updatedJob;

  return res.json(updatedJob);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const jobIndex = jobs.findIndex((job) => job.id === id);

  if (jobIndex === -1) {
    return res.status(404).json({
      error: "Job not found",
    });
  }

  const deletedJob = jobs.splice(jobIndex, 1)[0];

  return res.json(deletedJob);
});

export default router;
