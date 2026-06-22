export const LINKS_CHANNEL_NAME = "redirect-lab-links";

export type LinksChannelMessage = {
  type: "link-accessed";
  shortUrl: string;
};
