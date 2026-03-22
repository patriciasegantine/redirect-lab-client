export const AppRoutes = {
  HOME: "/",
  REDIRECT: "/:shortUrl",
  NOT_FOUND: "*",
} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];
