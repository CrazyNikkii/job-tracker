import type { JobApplication, JobStatus } from "./jobTypes.js";
import { validStatuses } from "./jobStore.js";

export function validateJobBody(
  body: unknown,
): Omit<JobApplication, "id"> | null {
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
