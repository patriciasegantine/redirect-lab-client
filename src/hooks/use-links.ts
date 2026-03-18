import { fetchLinks } from "@/lib/links-service";
import { useQuery } from "@tanstack/react-query";

export function useLinks() {
  const query = useQuery({
    queryKey: ["links"],
    queryFn: fetchLinks,
  });
  
  return {
    links: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error:
      query.error instanceof Error
        ? query.error.message
        : query.error
          ? "Failed to fetch links"
          : null,
    reloadLinks: query.refetch,
  };
}
