import { pool } from "./pool.js";

async function deleteTables() {
  try {
    console.log("Deleting tables...");
    const client = await pool.connect();
    await client.query(`DROP TABLE IF EXISTS messages;
`);
    await client.query(`DROP TABLE IF EXISTS users;
`);

    console.log("Tables deleted");
    client.release();
  } catch (err) {
    console.error(err);
  }
}

deleteTables();
