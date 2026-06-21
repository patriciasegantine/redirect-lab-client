import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .url("Please enter a valid URL (e.g. https://www.example.com)"),
  shortUrl: z
    .string()
    .min(3, "The shortened link must be at least 3 characters long")
    .max(50, "The shortened link must be no more than 50 characters long")
    .regex(/^[a-zA-Z0-9_-]+$/, "Use only letters, numbers, _ and -"),
});
