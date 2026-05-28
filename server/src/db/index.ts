import pg from "pg";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: databaseUrl,
});

export async function checkDatabaseConnection() {
  const result = await pool.query("SELECT 1 AS connected");

  return result.rows[0];
}
