import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useAddTodoMutation } from "./todoMutations";

export function useGetWeek(date: Ref<Date>) {
  return useQuery({
    queryKey: ["week", date],
    queryFn: async () => {
      const response = await fetch(`api/week?date=${date.value.toISOString()}`);
      const res = await response.json();
      return res;
    },
  });
}

export function useAddWeek() {
  const client = useQueryClient();
  const addTodoMutation = useAddTodoMutation();

  return useMutation({
    mutationFn: async ({ date, content }: { date: Date; content: string }) => {
      const response = await fetch("api/week", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: date.toISOString().split("T")[0] }),
      });
      const res = await response.json();
      return { id: res.insertId, content: content };
    },
    onSuccess: ({ id, content }: { id: number; content: string }) => {
      addTodoMutation.mutate({
        week_id: id,
        content: content,
      });
      client.refetchQueries({ queryKey: ["week"] });
    },
  });
}
