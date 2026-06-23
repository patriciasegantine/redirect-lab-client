import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { MyLinks } from "@/components/layout/my-links/my-links.tsx"
import type { Link } from "@/types/link.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactElement } from "react"

const useLinksMock = vi.fn()
const useMediaQueryMock = vi.fn(() => false)

vi.mock("@/hooks/use-links.ts", () => ({
  useLinks: (page?: number, mode?: string) => useLinksMock(page, mode),
}))

vi.mock("@/hooks/use-media-query.ts", () => ({
  useMediaQuery: () => useMediaQueryMock(),
}))

vi.mock("@/components/layout/links-list/links-list.tsx", () => ({
  LinksList: ({ links }: { links: Link[] }) => (
    <div data-testid="links-list">Links: {links.length}</div>
  ),
}))

const linksFixture: Link[] = [
  {
    id: "1",
    originalUrl: "https://example.com",
    shortUrl: "example",
    accessCount: 12,
    createdAt: "2026-04-01T10:00:00.000Z",
  },
]

describe("MyLinks", () => {
  const renderWithQueryClient = (ui: ReactElement) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })

    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    )
  }

  beforeEach(() => {
    useLinksMock.mockReset()
    useMediaQueryMock.mockReturnValue(false)
  })

  it("shows loading state while links are loading", () => {
    useLinksMock.mockReturnValue({
      links: [],
      isLoading: true,
      error: null,
    })

    renderWithQueryClient(<MyLinks />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it("shows error message when links request fails", () => {
    useLinksMock.mockReturnValue({
      links: [],
      isLoading: false,
      error: "Failed to fetch links",
    })

    renderWithQueryClient(<MyLinks />)

    expect(screen.getByText(/failed to fetch links/i)).toBeInTheDocument()
  })

  it("shows empty state and keeps CSV download disabled when there are no links", () => {
    useLinksMock.mockReturnValue({
      links: [],
      isLoading: false,
      error: null,
    })

    renderWithQueryClient(<MyLinks />)

    expect(screen.getByText(/no links yet/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /download csv/i })).toBeDisabled()
  })

  it("renders list and enables CSV download when links exist", () => {
    useLinksMock.mockReturnValue({
      links: linksFixture,
      isLoading: false,
      error: null,
      total: 1,
      pageSize: 10,
      isFetching: false,
    })

    renderWithQueryClient(<MyLinks />)

    expect(screen.getByTestId("links-list")).toHaveTextContent("Links: 1")
    expect(screen.getByRole("button", { name: /download csv/i })).toBeEnabled()
    expect(screen.getByText(/1–1 of 1 routes/i)).toBeInTheDocument()
    expect(screen.getByText(/page 1 of 1/i)).toBeInTheDocument()
  })

  it("moves to the next page from the pagination footer", async () => {
    const user = userEvent.setup()
    useLinksMock.mockImplementation((page: number) => ({
      links: linksFixture,
      isLoading: false,
      error: null,
      total: 21,
      pageSize: 10,
      isFetching: false,
      page,
    }))

    renderWithQueryClient(<MyLinks />)

    expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /next/i }))

    expect(useLinksMock).toHaveBeenLastCalledWith(2, "paginated")
    expect(screen.getByText(/page 2 of 3/i)).toBeInTheDocument()
    expect(screen.getByText(/11–20 of 21 routes/i)).toBeInTheDocument()
  })

  it("uses infinite loading instead of pagination on mobile", async () => {
    const user = userEvent.setup()
    const fetchNextPage = vi.fn()
    useMediaQueryMock.mockReturnValue(true)
    useLinksMock.mockReturnValue({
      links: linksFixture,
      isLoading: false,
      error: null,
      total: 21,
      pageSize: 10,
      isFetching: false,
      isFetchingNextPage: false,
      hasNextPage: true,
      fetchNextPage,
    })

    renderWithQueryClient(<MyLinks />)

    expect(useLinksMock).toHaveBeenCalledWith(1, "infinite")
    expect(
      screen.queryByRole("navigation", { name: /pagination/i })
    ).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /load more/i }))
    expect(fetchNextPage).toHaveBeenCalledTimes(1)
  })
})
