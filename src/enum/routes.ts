export const AppRoutes = {
  HOME: "/",
  ABOUT: "/about",
  NOT_FOUND_PAGE: "/not-found",
  REDIRECT: "/:shortUrl",
} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];
