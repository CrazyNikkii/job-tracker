import { saveAuthToken } from "./jobsApi";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

interface LoginResponse {
  token: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function login(password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  const data = await handleResponse<LoginResponse>(response);

  saveAuthToken(data.token);
}
