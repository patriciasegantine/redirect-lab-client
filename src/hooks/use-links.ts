import { fetchLinks } from "@/services/links-service"
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query"

const LINKS_PAGE_SIZE = 10
type LinksMode = "paginated" | "infinite"

export function useLinks(page = 1, mode: LinksMode = "paginated") {
  const paginatedQuery = useQuery({
    queryKey: ["links", "page", page],
    queryFn: () => fetchLinks({ page, pageSize: LINKS_PAGE_SIZE }),
    placeholderData: keepPreviousData,
    enabled: mode === "paginated",
  })

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["links", "infinite"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchLinks({ page: pageParam, pageSize: LINKS_PAGE_SIZE }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedLinks = allPages.reduce(
        (total, currentPage) => total + currentPage.links.length,
        0
      )

      return loadedLinks < lastPage.total ? lastPage.page + 1 : undefined
    },
    enabled: mode === "infinite",
  })

  const query = mode === "infinite" ? infiniteQuery : paginatedQuery
  const infinitePages = infiniteQuery.data?.pages ?? []
  const infiniteLinks = infinitePages.flatMap(
    (currentPage) => currentPage.links
  )
  const infiniteMeta = infinitePages.at(-1)

  const error =
    query.error instanceof Error
      ? query.error.message
      : query.error
        ? "Failed to fetch links"
        : null

  if (mode === "infinite") {
    return {
      links: infiniteLinks,
      total: infiniteMeta?.total ?? 0,
      page: infiniteMeta?.page ?? 1,
      pageSize: infiniteMeta?.pageSize ?? LINKS_PAGE_SIZE,
      isLoading: infiniteQuery.isLoading,
      isFetching: infiniteQuery.isFetching,
      isFetchingNextPage: infiniteQuery.isFetchingNextPage,
      hasNextPage: infiniteQuery.hasNextPage,
      fetchNextPage: infiniteQuery.fetchNextPage,
      isError: infiniteQuery.isError,
      error,
      reloadLinks: infiniteQuery.refetch,
    }
  }

  return {
    links: paginatedQuery.data?.links ?? [],
    total: paginatedQuery.data?.total ?? 0,
    page: paginatedQuery.data?.page ?? page,
    pageSize: paginatedQuery.data?.pageSize ?? LINKS_PAGE_SIZE,
    isLoading: paginatedQuery.isLoading,
    isFetching: paginatedQuery.isFetching,
    isFetchingNextPage: false,
    hasNextPage: false,
    fetchNextPage: async () => undefined,
    isError: paginatedQuery.isError,
    error,
    reloadLinks: paginatedQuery.refetch,
  }
}
