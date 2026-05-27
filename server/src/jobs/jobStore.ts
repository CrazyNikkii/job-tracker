import type { JobApplication, JobStatus } from "./jobTypes.js";

const jobs: JobApplication[] = [
  {
    id: "1",
    company: "Example Company",
    position: "Frontend Developer",
    status: "Interested",
    jobUrl: "https://example.com",
  },
];

export const validStatuses: JobStatus[] = [
  "Interested",
  "Applied",
  "Interview Scheduled",
  "Rejected",
  "Accepted",
];

export function getJobs() {
  return jobs;
}

export function createJob(jobData: Omit<JobApplication, "id">) {
  const newJob: JobApplication = {
    id: Date.now().toString(),
    ...jobData,
  };

  jobs.push(newJob);

  return newJob;
}

export function updateJob(id: string, jobData: Omit<JobApplication, "id">) {
  const jobIndex = jobs.findIndex((job) => job.id === id);

  if (jobIndex === -1) {
    return null;
  }

  const updatedJob: JobApplication = {
    id,
    ...jobData,
  };

  jobs[jobIndex] = updatedJob;

  return updatedJob;
}

export function deleteJob(id: string) {
  const jobIndex = jobs.findIndex((job) => job.id === id);

  if (jobIndex === -1) {
    return null;
  }

  const deletedJob = jobs.splice(jobIndex, 1)[0];

  return deletedJob;
}
