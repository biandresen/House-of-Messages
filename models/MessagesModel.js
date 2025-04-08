import { pool } from "../db/pool.js";

const MessagesModel = {
  async findMessageByLatest() {
    const queryText = `SELECT m.*, u.username
FROM messages m
LEFT JOIN users u ON m.user_id = u.id
ORDER BY m.created_at DESC
LIMIT 1;
`;

    try {
      const result = await pool.query(queryText);
      return result.rows[0];
    } catch (err) {
      console.error("Error fetching latest message from database: ", err);
      throw err;
    }
  },
};

export default MessagesModel;
