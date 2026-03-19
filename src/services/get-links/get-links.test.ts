import { beforeEach, describe, expect, it, vi } from "vitest";
import { getLinks } from "./get-links.ts";
import { api } from "@/services/api-client.ts";

vi.mock("@/services/api-client.ts", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("getLinks", () => {
  const mockedGet = vi.mocked(api.get);

  beforeEach(() => {
    mockedGet.mockReset();
  });

  it("returns get-links when API responds with a valid payload", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        links: [
          {
            id: "1",
            originalUrl: "https://example.com",
            shortUrl: "abc123",
            accessCount: 10,
            createdAt: "2026-03-19T00:00:00.000Z",
          },
        ],
        total: 1,
        page: 1,
        pageSize: 20,
      },
    });

    await expect(getLinks()).resolves.toEqual([
      {
        id: "1",
        originalUrl: "https://example.com",
        shortUrl: "abc123",
        accessCount: 10,
        createdAt: "2026-03-19T00:00:00.000Z",
      },
    ]);
    expect(mockedGet).toHaveBeenCalledWith("/links");
  });

  it("propagates API errors", async () => {
    mockedGet.mockRejectedValueOnce(new Error("Network error"));

    await expect(getLinks()).rejects.toThrow("Network error");
  });

  it("throws when payload does not contain a get-links array", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        total: 0,
        page: 1,
        pageSize: 20,
      },
    });

    await expect(getLinks()).rejects.toThrow("Invalid get-links response");
  });
});
