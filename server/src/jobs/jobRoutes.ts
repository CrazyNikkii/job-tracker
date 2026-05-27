import { Router } from "express";
import { createJob, deleteJob, getJobs, updateJob } from "./jobStore.js";
import { validateJobBody } from "./jobValidation.js";

const router = Router();

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
