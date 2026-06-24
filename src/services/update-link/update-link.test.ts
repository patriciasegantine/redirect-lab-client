import { beforeEach, describe, expect, it, vi } from "vitest"
import { api } from "@/services/api-client.ts"
import { updateLinkService } from "./update-link.service.ts"

vi.mock("@/services/api-client.ts", () => ({
  api: {
    patch: vi.fn(),
  },
}))

const updatedLink = {
  id: "link-id",
  originalUrl: "https://example.com/updated",
  shortUrl: "updated-link",
  accessCount: 3,
  createdAt: "2026-06-23T00:00:00.000Z",
}

describe("updateLinkService", () => {
  const mockedPatch = vi.mocked(api.patch)

  beforeEach(() => mockedPatch.mockReset())

  it("updates a link using its id", async () => {
    mockedPatch.mockResolvedValueOnce({ data: updatedLink })

    await expect(
      updateLinkService({
        id: "link-id",
        originalUrl: "https://example.com/updated",
        shortUrl: "updated-link",
      })
    ).resolves.toEqual(updatedLink)

    expect(mockedPatch).toHaveBeenCalledWith("/links/link-id", {
      originalUrl: "https://example.com/updated",
      shortUrl: "updated-link",
    })
  })
})
