import { getConnection } from "./db";

export const sendComment = async (
  section: string,
  name: string,
  comment: string
) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `INSERT INTO comments (section, name, comment) VALUES (?,?,?)
    `,
      [section, name, comment]
    );

    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
