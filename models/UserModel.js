import { pool } from "../db/pool.js";

export const UserModel = {
  async findUserByEmail(email) {
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

  async createUser({ email, username, password, firstName, lastName, is_member, is_admin }) {
    const queryText =
      "INSERT INTO users (email, username, password, firstname, lastname, is_member, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const queryParams = [email, username, password, firstName, lastName, is_member, is_admin];
    try {
      await pool.query(queryText, queryParams);
    } catch (err) {
      console.error("Error creating user in database: ", err);
      throw err;
    }
  },
};
