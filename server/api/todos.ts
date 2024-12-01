import { TTodo } from "~/app/utils/types";
import { getConnection } from "../utils/db";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const connection = await getConnection();
  try {
    if (method === "POST") {
      const { content, week_id }: TTodo = await readBody(event);
      await connection.query(
        "INSERT INTO todo (content, week_id) VALUES (?,?)",
        [content, week_id]
      );
      return { message: "Todo added" };
    }

    if (method === "PUT") {
      const { id, content, done }: TTodo = await readBody(event);
      await connection.query(
        "UPDATE todo SET content = ?, done = ? WHERE id = ?",
        [content, done, id]
      );
      return { message: "Todo updated" };
    }

    if (method === "DELETE") {
      const { id }: { id: number } = await readBody(event);
      await connection.query("DELETE FROM todo WHERE id = ?", [id]);
      return { message: "Todo deleted" };
    }

    if (method === "GET") {
      const [rows] = await connection.query("SELECT * FROM todo");
      return rows;
    }
  } finally {
    connection.release();
  }
});
