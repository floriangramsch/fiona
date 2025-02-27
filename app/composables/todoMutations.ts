import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { TTodo } from "../utils/types";

export const useGetTodos = () =>
  useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("/api/todos");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      content,
      week_id,
    }: {
      content: string;
      week_id: number;
    }) => {
      const response = await fetch(`/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, week_id }),
      });
      if (!response.ok) {
        throw new Error("Error adding todo");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["week"] });
    },
  });
};

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo: TTodo) => {
      const response = await fetch(`/api/todos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: todo.id,
          content: todo.content,
          done: todo.done,
          week_id: todo.week_id,
        }),
      });
      if (!response.ok) {
        throw new Error("Error updating todo");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["week"] });
    },
  });
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/todos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Error deleting todo");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
