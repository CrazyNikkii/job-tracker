import type { JobApplication } from "../types";

const API_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL ?? "http://localhost:5000")
  : "";
const AUTH_TOKEN_STORAGE_KEY = "job-tracker-auth-token";

type JobInput = Omit<JobApplication, "id">;

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function saveAuthToken(token: string) {
  sessionStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export function clearAuthToken() {
  sessionStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}

export function hasAuthToken() {
  return Boolean(sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY));
}

export async function getJobs() {
  const response = await fetch(`${API_URL}/api/jobs`, {
    headers: getAuthHeaders(),
  });

  return handleResponse<JobApplication[]>(response);
}

export async function createJob(job: JobInput) {
  const response = await fetch(`${API_URL}/api/jobs`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(job),
  });

  return handleResponse<JobApplication>(response);
}

export async function updateJob(id: string, job: JobInput) {
  const response = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(job),
  });

  return handleResponse<JobApplication>(response);
}

export async function deleteJob(id: string) {
  const response = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse<JobApplication>(response);
}
