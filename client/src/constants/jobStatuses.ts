import type { JobStatus } from "../types";

export const statusOptions: JobStatus[] = [
  "Interested",
  "Applied",
  "Interview Scheduled",
  "Rejected",
  "Accepted",
];

export const statusColors: Record<JobStatus, string> = {
  Interested: "bg-blue-100 text-blue-800",
  Applied: "bg-purple-100 text-purple-800",
  "Interview Scheduled": "bg-yellow-100 text-yellow-800",
  Rejected: "bg-red-100 text-red-800",
  Accepted: "bg-green-100 text-green-800",
};
