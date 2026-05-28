import { pool } from "../db/index.js";
import type { JobApplication, JobStatus } from "./jobTypes.js";

export const validStatuses: JobStatus[] = [
  "Interested",
  "Applied",
  "Interview Scheduled",
  "Rejected",
  "Accepted",
];

interface JobRow {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  job_url: string;
}

function mapRowToJob(row: JobRow): JobApplication {
  return {
    id: row.id,
    company: row.company,
    position: row.position,
    status: row.status,
    jobUrl: row.job_url,
  };
}

export async function getJobs() {
  const result = await pool.query<JobRow>(`
    SELECT id, company, position, status, job_url
    FROM jobs
    ORDER BY company ASC;
  `);

  return result.rows.map(mapRowToJob);
}

export async function createJob(jobData: Omit<JobApplication, "id">) {
  const id = Date.now().toString();

  const result = await pool.query<JobRow>(
    `
      INSERT INTO jobs (id, company, position, status, job_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, company, position, status, job_url;
    `,
    [id, jobData.company, jobData.position, jobData.status, jobData.jobUrl],
  );

  return mapRowToJob(result.rows[0]);
}

export async function updateJob(
  id: string,
  jobData: Omit<JobApplication, "id">,
) {
  const result = await pool.query<JobRow>(
    `
      UPDATE jobs
      SET company = $1,
          position = $2,
          status = $3,
          job_url = $4
      WHERE id = $5
      RETURNING id, company, position, status, job_url;
    `,
    [jobData.company, jobData.position, jobData.status, jobData.jobUrl, id],
  );

  const updatedJob = result.rows[0];

  if (!updatedJob) {
    return null;
  }

  return mapRowToJob(updatedJob);
}

export async function deleteJob(id: string) {
  const result = await pool.query<JobRow>(
    `
      DELETE FROM jobs
      WHERE id = $1
      RETURNING id, company, position, status, job_url;
    `,
    [id],
  );

  const deletedJob = result.rows[0];

  if (!deletedJob) {
    return null;
  }

  return mapRowToJob(deletedJob);
}
