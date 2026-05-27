import { Router } from "express";
import type { JobApplication, JobStatus } from "./jobTypes.js";
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
  validStatuses,
} from "./jobStore.js";

const router = Router();

function validateJobBody(body: unknown): Omit<JobApplication, "id"> | null {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const { company, position, status, jobUrl } = body as Record<string, unknown>;

  if (
    typeof company !== "string" ||
    typeof position !== "string" ||
    typeof status !== "string" ||
    typeof jobUrl !== "string"
  ) {
    return null;
  }

  if (!company.trim()) {
    return null;
  }

  if (!validStatuses.includes(status as JobStatus)) {
    return null;
  }

  return {
    company: company.trim(),
    position: position.trim(),
    status: status as JobStatus,
    jobUrl: jobUrl.trim(),
  };
}

router.get("/", (_req, res) => {
  res.json(getJobs());
});

router.post("/", (req, res) => {
  const jobData = validateJobBody(req.body);

  if (!jobData) {
    return res.status(400).json({
      error: "Invalid job data",
    });
  }

  const newJob = createJob(jobData);

  return res.status(201).json(newJob);
});

router.put("/:id", (req, res) => {
  const jobData = validateJobBody(req.body);

  if (!jobData) {
    return res.status(400).json({
      error: "Invalid job data",
    });
  }

  const updatedJob = updateJob(req.params.id, jobData);

  if (!updatedJob) {
    return res.status(404).json({
      error: "Job not found",
    });
  }

  return res.json(updatedJob);
});

router.delete("/:id", (req, res) => {
  const deletedJob = deleteJob(req.params.id);

  if (!deletedJob) {
    return res.status(404).json({
      error: "Job not found",
    });
  }

  return res.json(deletedJob);
});

export default router;
