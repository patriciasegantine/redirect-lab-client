import type { Link } from "@/lib/types";
import { api } from "@/lib/api";

type GetLinksResponse = {
  links: Link[];
  total: number;
  page: number;
  pageSize: number;
};

export async function fetchLinks(): Promise<Link[]> {
  const { data } = await api.get<GetLinksResponse>("/links");
  return data.links;
}
