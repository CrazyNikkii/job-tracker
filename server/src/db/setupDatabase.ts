import "dotenv/config";
import { pool } from "./index.js";

async function setupDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      company TEXT NOT NULL,
      position TEXT NOT NULL,
      status TEXT NOT NULL,
      job_url TEXT NOT NULL
    );
  `);

  console.log("Database setup completed.");
}

setupDatabase()
  .catch((error) => {
    console.error("Database setup failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
