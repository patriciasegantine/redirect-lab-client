import { fetchLinks } from "@/services/links-service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

const LINKS_PAGE_SIZE = 10

export function useLinks(page = 1) {
  const query = useQuery({
    queryKey: ["links", page],
    queryFn: () => fetchLinks({ page, pageSize: LINKS_PAGE_SIZE }),
    placeholderData: keepPreviousData,
  })

  return {
    links: query.data?.links ?? [],
    total: query.data?.total ?? 0,
    page: query.data?.page ?? page,
    pageSize: query.data?.pageSize ?? LINKS_PAGE_SIZE,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error:
      query.error instanceof Error
        ? query.error.message
        : query.error
          ? "Failed to fetch links"
          : null,
    reloadLinks: query.refetch,
  }
}
