import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LinksList } from "@/components/layout/links-list/links-list.tsx";
import type { Link } from "@/types/link.ts";

const invalidateQueriesSpy = vi.fn();
const mutateSpy = vi.fn();

const mutationState = {
  isPending: false,
};

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({
    invalidateQueries: invalidateQueriesSpy,
  }),
  useMutation: (options: { onSuccess?: () => void }) => ({
    mutate: (id: string) => {
      mutateSpy(id);
      options.onSuccess?.();
    },
    isPending: mutationState.isPending,
  }),
}));

const linksFixture: Link[] = [
  {
    id: "1",
    originalUrl: "https://example.com/first",
    shortUrl: "first",
    accessCount: 2,
    createdAt: "2026-04-01T10:00:00.000Z",
  },
  {
    id: "2",
    originalUrl: "https://example.com/second",
    shortUrl: "second",
    accessCount: 9,
    createdAt: "2026-04-01T10:00:00.000Z",
  },
];

describe("LinksList", () => {
  beforeEach(() => {
    invalidateQueriesSpy.mockReset();
    mutateSpy.mockReset();
    mutationState.isPending = false;
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("renders all links with original url and views count", () => {
    render(React.createElement(LinksList, { links: linksFixture }));

    expect(
      screen.getByRole("button", {
        name: /open shortened link brev\.ly\/first/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /open shortened link brev\.ly\/second/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("https://example.com/first")).toBeInTheDocument();
    expect(screen.getByText("https://example.com/second")).toBeInTheDocument();
    expect(screen.getByText("2 views")).toBeInTheDocument();
    expect(screen.getByText("9 views")).toBeInTheDocument();
  });

  it("alerts when user clicks the short url button", async () => {
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(React.createElement(LinksList, { links: [linksFixture[0]] }));

    await user.click(
      screen.getByRole("button", {
        name: /open shortened link brev\.ly\/first/i,
      }),
    );

    expect(alertSpy).toHaveBeenCalledWith("shortUrl first");
  });

  it("alerts when user clicks copy shortened link button", async () => {
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(React.createElement(LinksList, { links: [linksFixture[0]] }));

    await user.click(
      screen.getByRole("button", {
        name: /copy shortened link brev\.ly\/first/i,
      }),
    );

    expect(alertSpy).toHaveBeenCalledWith("shortUrl first copied to clipboard!");
  });

  it("calls mutation with link id after confirming deletion and invalidates links query", async () => {
    const user = userEvent.setup();
    render(React.createElement(LinksList, { links: [linksFixture[0]] }));

    await user.click(
      screen.getByRole("button", {
        name: /delete link brev\.ly\/first/i,
      }),
    );
    await user.click(screen.getByRole("button", { name: /^delete$/i }));

    expect(mutateSpy).toHaveBeenCalledTimes(1);
    expect(mutateSpy).toHaveBeenCalledWith("1");
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ["links"] });
  });

  it("disables delete action while deletion is pending", () => {
    mutationState.isPending = true;

    render(React.createElement(LinksList, { links: [linksFixture[0]] }));

    expect(
      screen.getByRole("button", {
        name: /delete link brev\.ly\/first/i,
      }),
    ).toBeDisabled();
  });
});
