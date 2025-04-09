import { pool } from "../db/pool.js";

const MessagesModel = {
  async getMessageByLatest() {
    console.log("Finding latest message...");
    const queryText = `SELECT m.*, u.username FROM messages m
                       LEFT JOIN users u ON m.user_id = u.id
                       ORDER BY m.created_at DESC LIMIT 1; `;

    try {
      const result = await pool.query(queryText);
      return result.rows[0];
    } catch (err) {
      console.error("Error fetching latest message from database: ", err);
      throw err;
    }
  },
  async getAllMessages() {
    console.log("Getting all messages...");
    const queryText = `SELECT m.*, u.username FROM messages m
                       LEFT JOIN users u ON m.user_id = u.id
                       ORDER BY m.created_at DESC;
 `;
    try {
      const result = await pool.query(queryText);
      return result.rows;
    } catch (err) {
      console.error("Error fetching messages from database: ", err);
      throw err;
    }
  },
  async getUsersLatestMessageById(id) {
    const queryText = `SELECT m.*, u.username
                       FROM messages m
                       JOIN users u ON m.user_id = u.id
                       WHERE u.id = $1
                       ORDER BY m.created_at DESC
                       LIMIT 1;`;
    const queryParams = [id];
    try {
      const result = await pool.query(queryText, queryParams);
      return result.rows[0];
    } catch (err) {
      console.error("Error getting a user's latest message by id: ", err);
      throw err;
    }
  },
  async postNewMessage(id, title, text) {
    const queryText = `INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3) RETURNING *;`;
    const queryParams = [id, title, text];
    try {
      const result = await pool.query(queryText, queryParams);
      return result.rows[0];
    } catch (err) {
      console.error("Error during posting of new message: ", err);
      throw err;
    }
  },
  async deleteMessage(id) {
    const queryText = `DELETE FROM messages WHERE id = $1 RETURNING *;`;
    const queryParams = [id];
    try {
      const result = await pool.query(queryText, queryParams);
      return result.rows[0];
    } catch (err) {
      console.log("Error during deletion of message: ", err);
      throw err;
    }
  },
};

export default MessagesModel;
