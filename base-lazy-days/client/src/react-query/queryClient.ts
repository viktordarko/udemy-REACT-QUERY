import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { toast } from "@/components/app/toast";

function createTitle(errorMsg: string, actionType: "query" | "mutation") {
  const action = actionType === "query" ? "fetch" : "update";
  return `Could not ${action} data: ${errorMsg ?? "Server error"}`;
}

function errorHandler(title: string) {
  const id = "react-query-toast";

  if (!toast.isActive(id)) {
    toast({ id, title, status: "error", variant: "subtle", isClosable: true });
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      gcTime: 1000 * 60 * 15, // 15 minutes
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => errorHandler(createTitle(error.message, "query")),
  }),
  mutationCache: new MutationCache({
    onError: (error) => errorHandler(createTitle(error.message, "mutation")),
  }),
});
