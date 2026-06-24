import { api } from "@/services/api-client.ts"
import type { Link } from "@/types/link.ts"

export type UpdateLinkInput = {
  id: string
  originalUrl: string
  shortUrl: string
}

export async function updateLinkService({
  id,
  ...input
}: UpdateLinkInput): Promise<Link> {
  const { data } = await api.patch<Link>(`/links/${id}`, input)
  return data
}
