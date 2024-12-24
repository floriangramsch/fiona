import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { TExam } from "../utils/types";

export const useGetExams = () =>
  useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const res = await fetch("/api/exams");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

export const useAddExamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      start,
      end,
    }: {
      title: string;
      start: string;
      end: string;
    }) => {
      const response = await fetch(`/api/exams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, start, end }),
      });
      if (!response.ok) {
        throw new Error("Error adding exam");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
};

export const useUpdateExamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (exam: TExam) => {
      const response = await fetch(`/api/exams`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: exam.id,
          title: exam.title,
          start: exam.start,
          end: exam.end,
        }),
      });
      if (!response.ok) {
        throw new Error("Error updating exam");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
};

export const useDeleteExamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/exams`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Error deleting exam");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
};
