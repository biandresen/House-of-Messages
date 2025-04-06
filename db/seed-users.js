import { pool } from "./pool.js";

async function seedUser() {
  try {
    console.log("Seeding user...");
    const client = await pool.connect();
    await client.query(
      "INSERT INTO users (email,username, password,firstname,lastname,is_member,is_admin) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [
        "birger1@live.com",
        "@birger",
        "pw123",
        "Birger",
        "Andresen",
        "true",
        "true",
      ]
    );
    const result1 = await client.query("SELECT * FROM users");
    console.log("User seeded");
    console.log(result1.rows);
    client.release();
  } catch (err) {
    console.error(err);
  }
}

seedUser();
