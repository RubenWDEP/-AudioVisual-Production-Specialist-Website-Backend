import { getConnection } from "../db/db";

export const getCommentAction = async (sectionCommentName: string) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT name, comment, create_at FROM comments WHERE section=?`,
      [sectionCommentName]
    );
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
