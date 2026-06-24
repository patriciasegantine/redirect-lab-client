import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { EditLinkDialog } from "./edit-link-dialog.tsx"
import type { Link } from "@/types/link.ts"

const { invalidateQueriesSpy, mutateSpy, resetSpy, toastSuccessSpy } =
  vi.hoisted(() => ({
    invalidateQueriesSpy: vi.fn(),
    mutateSpy: vi.fn(),
    resetSpy: vi.fn(),
    toastSuccessSpy: vi.fn(),
  }))

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ invalidateQueries: invalidateQueriesSpy }),
  useMutation: (options: { onSuccess?: () => void }) => ({
    mutate: (input: unknown) => {
      mutateSpy(input)
      options.onSuccess?.()
    },
    reset: resetSpy,
    isPending: false,
    error: null,
  }),
}))

vi.mock("sonner", () => ({
  toast: { success: toastSuccessSpy },
}))

const link: Link = {
  id: "link-id",
  originalUrl: "https://example.com/original",
  shortUrl: "original-link",
  accessCount: 2,
  createdAt: "2026-06-23T00:00:00.000Z",
}

describe("EditLinkDialog", () => {
  beforeEach(() => {
    invalidateQueriesSpy.mockReset()
    mutateSpy.mockReset()
    resetSpy.mockReset()
    toastSuccessSpy.mockReset()
  })

  it("loads the current values and submits the edited link", async () => {
    const user = userEvent.setup()
    render(<EditLinkDialog link={link} />)

    await user.click(
      screen.getByRole("button", { name: /edit link .*original-link/i })
    )

    const originalUrl = screen.getByLabelText(/original link/i)
    const shortUrl = screen.getByLabelText(/short link/i)
    expect(originalUrl).toHaveValue(link.originalUrl)
    expect(shortUrl).toHaveValue(link.shortUrl)

    await user.clear(originalUrl)
    await user.type(originalUrl, "https://example.com/updated")
    await user.clear(shortUrl)
    await user.type(shortUrl, "updated-link")
    await user.click(screen.getByRole("button", { name: /save changes/i }))

    expect(mutateSpy).toHaveBeenCalledWith({
      id: "link-id",
      originalUrl: "https://example.com/updated",
      shortUrl: "updated-link",
    })
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ["links"] })
    expect(toastSuccessSpy).toHaveBeenCalledWith("Link updated successfully.")
  })
})
