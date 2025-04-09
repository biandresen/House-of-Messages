import { pool } from "../db/pool.js";

const MessagesModel = {
  async findMessageByLatest() {
    console.log("Finding last message...");
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
};

export default MessagesModel;
