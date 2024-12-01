import { TTodo } from "~/app/utils/types";
import { getConnection } from "../utils/db";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const connection = await getConnection();
  try {
    if (method === "POST") {
      // const { content }: TTodo = await readBody(event);
      // await connection.query("INSERT INTO todo (content) VALUES (?)", [
      //   content,
      // ]);
      // return { message: "Todo added" };
    }

    if (method === "PUT") {
      // const { id, content, done }: TTodo = await readBody(event);
      // await connection.query(
      //   "UPDATE todo SET content = ?, done = ? WHERE id = ?",
      //   [content, done, id]
      // );
      // return { message: "Todo updated" };
    }

    if (method === "DELETE") {
      // const { id }: { id: number } = await readBody(event);
      // await connection.query("DELETE FROM todo WHERE id = ?", [id]);
      // return { message: "Todo deleted" };
    }

    if (method === "GET") {
      const { date }: { date?: Date } = getQuery(event);
      if (date) {
        const [rows] = await connection.query(
          `
          SELECT t.id, t.content, t.week_id, w.start, t.done 
          FROM todo t
          LEFT JOIN week w ON w.id = t.week_id
          WHERE ? BETWEEN w.start AND DATE_ADD(w.start, INTERVAL 7 DAY)
          ORDER BY t.done;
          `,
          [date]
        );
        return rows;
      }
    }
    if (method === "POST") {
      const { date }: { date: Date } = await readBody(event);

      const [rows] = await connection.query(
        "INSERT INTO week (start) VALUES (?)",
        [date]
      );
      return rows;
    }
  } finally {
    connection.release();
  }
});
