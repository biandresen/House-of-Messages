import { pool } from "../db/pool.js";

export const UserModel = {
  async findUserByEmail(email) {
    console.log("Finding user by email...");
    const queryText = "SELECT * FROM users WHERE email = $1";
    const queryParams = [email];
    try {
      const result = await pool.query(queryText, queryParams);
      return result.rows[0];
    } catch (err) {
      console.error("Error fetching user from database: ", err);
      throw err;
    }
  },

  async findUserByUsername(username) {
    console.log("Finding user by username...");
    const queryText = "SELECT * FROM users WHERE username = $1";
    const queryParams = [username];
    try {
      const result = await pool.query(queryText, queryParams);
      return result.rows[0];
    } catch (err) {
      console.error("Error fetching user from database: ", err);
      throw err;
    }
  },

  async findUserById(id) {
    console.log("Finding user by id...");
    const queryText = "SELECT * FROM users WHERE id = $1";
    const queryParams = [id];
    try {
      const result = await pool.query(queryText, queryParams);
      return result.rows[0];
    } catch (err) {
      console.error("Error fetching user from database: ", err);
      throw err;
    }
  },

  async createUser({
    email,
    username,
    password,
    firstName,
    lastName,
    is_member,
    is_admin,
  }) {
    console.log("Creating user...");
    const queryText =
      "INSERT INTO users (email, username, password, firstname, lastname, is_member, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const queryParams = [
      email,
      username,
      password,
      firstName,
      lastName,
      is_member,
      is_admin,
    ];
    try {
      await pool.query(queryText, queryParams);
    } catch (err) {
      console.error("Error creating user in database: ", err);
      throw err;
    }
  },

  async setMembership(id) {
    console.log("Setting membership...");
    const queryText = `UPDATE users SET is_member = $1 WHERE users.id = $2 RETURNING *`;
    const queryParams = [true, id];
    try {
      const result = await pool.query(queryText, queryParams);
      return result.rows[0];
    } catch (err) {
      console.error("Error setting membership: ", err);
      throw err;
    }
  },
};
