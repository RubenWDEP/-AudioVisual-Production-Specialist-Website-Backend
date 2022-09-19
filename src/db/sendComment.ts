import { getConnection } from "./db";

export const sendComment = async (
  name: string,
  section: string,
  email: string,
  comment: string
) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `INSERT INTO comments (section, name, email, comment) VALUES (?,?,?,?)
    `,
      [section, name, email, comment]
    );
    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
