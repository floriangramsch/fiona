import { useQuery } from "@tanstack/vue-query";

export default function useGetQuote() {
  return useQuery({
    queryKey: ["randomQuote"],
    queryFn: async () => {
      const response = await fetch("/api/quotes");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
  });
}
