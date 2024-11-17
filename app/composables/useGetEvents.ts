import { useQuery } from "@tanstack/vue-query";
import type { TEvent, TStundenplan } from "../utils/types";

export const useGetEvents = () =>
  useQuery<TStundenplan>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      let data: TEvent[] = await res.json();
      const times: Date[] = [...new Set(data.map((d) => d.start_time))].sort();
      data = data.map((d) => ({
        ...d,
        time_slot: times.findIndex((time) => time === d.start_time) + 1,
      }));
      return {
        times,
        events: data,
      };
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
