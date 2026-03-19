import type { Link } from "@/types/link.ts";
import { api } from "@/services/api-client.ts";

export type GetLinksResponse = {
  links: Link[];
  total: number;
  page: number;
  pageSize: number;
};

export async function getLinks(): Promise<Link[]> {
  const { data } = await api.get<GetLinksResponse>("/links");

  if (!Array.isArray(data.links)) {
    throw new Error("Invalid get-links response");
  }

  return data.links;
}
