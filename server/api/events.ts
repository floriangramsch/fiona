import { TEvent } from "~/app/utils/types";
import { getConnection } from "../utils/db";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const connection = await getConnection();
  try {
    if (method === "POST") {
      const { name, start, end }: TEvent = await readBody(event);
      await connection.query(
        "INSERT INTO event (name, start, end) VALUES (?, ?, ?)",
        [[name, start, end]]
      );
      return { message: "Todo added" };
    }

    if (method === "PUT") {
      const { id, name, start, end }: TEvent = await readBody(event);
      await connection.query(
        "UPDATE event SET name = ?, start = ?, end = ? WHERE id = ?",
        [name, start, end, id]
      );
      return { message: "Event updated" };
    }

    if (method === "DELETE") {
      const { id }: { id: number } = await readBody(event);
      await connection.query("DELETE FROM event WHERE id = ?", [id]);
      return { message: "Event deleted" };
    }

    if (method === "GET") {
      const { weekday }: { weekday?: number } = getQuery(event);
      if (weekday) {
        const [rows] = await connection.query(
          "SELECT * FROM event WHERE WEEKDAY(start) = ?",
          [weekday - 1]
        );
        return rows;
      } else {
        const [rows] = await connection.query("SELECT * FROM event");
        return rows;
      }
    }
  } finally {
    connection.release();
  }
});
