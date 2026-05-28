import { Router } from "express";
import { createJob, deleteJob, getJobs, updateJob } from "./jobStore.js";
import { validateJobBody } from "./jobValidation.js";

const router = Router();

router.get("/", async (_req, res) => {
  const jobs = await getJobs();

  res.json(jobs);
});

router.post("/", async (req, res) => {
  const jobData = validateJobBody(req.body);

  if (!jobData) {
    return res.status(400).json({
      error: "Invalid job data",
    });
  }

  const newJob = await createJob(jobData);

  return res.status(201).json(newJob);
});

router.put("/:id", async (req, res) => {
  const jobData = validateJobBody(req.body);

  if (!jobData) {
    return res.status(400).json({
      error: "Invalid job data",
    });
  }

  const updatedJob = await updateJob(req.params.id, jobData);

  if (!updatedJob) {
    return res.status(404).json({
      error: "Job not found",
    });
  }

  return res.json(updatedJob);
});

router.delete("/:id", async (req, res) => {
  const deletedJob = await deleteJob(req.params.id);

  if (!deletedJob) {
    return res.status(404).json({
      error: "Job not found",
    });
  }

  return res.json(deletedJob);
});

export default router;
