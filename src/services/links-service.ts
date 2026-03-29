import { deleteLinkService } from "@/services/delete-link/delete-link.service.ts";
import { getLinksService } from "@/services/get-links/get-links.service.ts";

export const fetchLinks = getLinksService;
export const removeLink = deleteLinkService;
