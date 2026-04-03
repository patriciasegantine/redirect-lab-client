import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MyLinks } from "@/components/layout/my-links/my-links.tsx";
import type { Link } from "@/types/link.ts";

const useLinksMock = vi.fn();

vi.mock("@/hooks/use-links.ts", () => ({
  useLinks: () => useLinksMock(),
}));

vi.mock("@/components/layout/links-list/links-list.tsx", () => ({
  LinksList: ({ links }: { links: Link[] }) => (
    <div data-testid="links-list">Links: {links.length}</div>
  ),
}));

const linksFixture: Link[] = [
  {
    id: "1",
    originalUrl: "https://example.com",
    shortUrl: "example",
    accessCount: 12,
    createdAt: "2026-04-01T10:00:00.000Z",
  },
];

describe("MyLinks", () => {
  beforeEach(() => {
    useLinksMock.mockReset();
  });

  it("shows loading state while links are loading", () => {
    useLinksMock.mockReturnValue({
      links: [],
      isLoading: true,
      error: null,
    });

    render(<MyLinks />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error message when links request fails", () => {
    useLinksMock.mockReturnValue({
      links: [],
      isLoading: false,
      error: "Failed to fetch links",
    });

    render(<MyLinks />);

    expect(screen.getByText(/failed to fetch links/i)).toBeInTheDocument();
  });

  it("shows empty state and keeps CSV download disabled when there are no links", () => {
    useLinksMock.mockReturnValue({
      links: [],
      isLoading: false,
      error: null,
    });

    render(<MyLinks />);

    expect(screen.getByText(/there are no links yet/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /download csv/i })).toBeDisabled();
  });

  it("renders list and enables CSV download when links exist", () => {
    useLinksMock.mockReturnValue({
      links: linksFixture,
      isLoading: false,
      error: null,
    });

    render(<MyLinks />);

    expect(screen.getByTestId("links-list")).toHaveTextContent("Links: 1");
    expect(screen.getByRole("button", { name: /download csv/i })).toBeEnabled();
  });
});
