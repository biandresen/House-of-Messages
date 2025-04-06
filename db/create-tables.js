import { pool } from "./pool.js";

async function createTables() {
  try {
    console.log("Creating tables...");
    const client = await pool.connect();
    await client.query(`CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  is_member BOOLEAN NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);
    await client.query(`CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(50) NOT NULL,
  text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

`);
    console.log("Tables created");
    client.release();
  } catch (err) {
    console.error(err);
  }
}

createTables();
