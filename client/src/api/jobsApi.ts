import type { JobApplication } from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

type JobInput = Omit<JobApplication, "id">;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getJobs() {
  const response = await fetch(`${API_URL}/api/jobs`);

  return handleResponse<JobApplication[]>(response);
}

export async function createJob(job: JobInput) {
  const response = await fetch(`${API_URL}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  return handleResponse<JobApplication>(response);
}

export async function updateJob(id: string, job: JobInput) {
  const response = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  return handleResponse<JobApplication>(response);
}

export async function deleteJob(id: string) {
  const response = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "DELETE",
  });

  return handleResponse<JobApplication>(response);
}
