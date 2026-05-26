export type JobStatus =
  | "Interested"
  | "Applied"
  | "Interview Scheduled"
  | "Rejected"
  | "Accepted";

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  jobUrl: string;
}
