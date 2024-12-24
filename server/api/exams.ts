import { TTodo } from "~/app/utils/types";
import { getConnection } from "../utils/db";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const connection = await getConnection();
  try {
    if (method === "POST") {
      const { title, start, end } = await readBody(event);
      await connection.query(
        "INSERT INTO exams (title, start, end) VALUES (?,?,?)",
        [title, start, end]
      );
      return { message: "Todo added" };
    }

    if (method === "PUT") {
      const { id, title, start, end } = await readBody(event);
      await connection.query(
        "UPDATE exams SET title = ?, start = ?, end = ? WHERE id = ?",
        [title, start, end, id]
      );
      return { message: "Exam updated" };
    }

    if (method === "DELETE") {
      const { id }: { id: number } = await readBody(event);
      await connection.query("DELETE FROM exams WHERE id = ?", [id]);
      return { message: "Exam deleted" };
    }

    if (method === "GET") {
      const [rows] = await connection.query("SELECT * FROM exams");
      return rows;
    }
  } finally {
    connection.release();
  }
});
