import { useQuery } from "@tanstack/vue-query";
import type { TEvent } from "../utils/types";

export const useGetEvents = () =>
  useQuery<TEvent[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

export const useGetTodayEvents = (weekday: number) =>
  useQuery<TEvent[]>({
    queryKey: ["events", weekday],
    queryFn: async () => {
      const res = await fetch(`/api/events?weekday=${weekday}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });
