import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner.tsx"
import { APP_CONTAINER_CLASS } from "@/lib/layout.ts"
import { cn } from "@/lib/utils/cn.ts"
import { AppRoutes } from "@/enum/routes"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const apiDocsUrl = `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3333"}/docs`

  return (
    <main className="route-canvas flex w-full flex-1 flex-col overflow-x-hidden bg-background lg:min-h-0 lg:overflow-y-hidden">
      <div
        className={cn(
          APP_CONTAINER_CLASS,
          "flex min-h-full flex-col px-4 pt-8 sm:px-6 sm:pt-10 lg:min-h-0 lg:flex-1"
        )}
      >
        <div className="min-h-0 flex-1">{children}</div>
      </div>

      <footer className="mt-6 bg-background/90 font-mono text-xs text-muted-foreground backdrop-blur-xl lg:mt-4 lg:shrink-0">
        <div
          className={cn(
            APP_CONTAINER_CLASS,
            "flex flex-col items-center justify-between gap-2 px-4 py-3 sm:flex-row sm:gap-3 sm:px-6 sm:py-4"
          )}
        >
          <p className="flex flex-wrap justify-center gap-x-1 text-center leading-relaxed sm:justify-start sm:text-left">
            <span>© 2026 Redirect Lab.</span>
            <span>
              Built by{" "}
              <a
                href="https://patriciasegantine.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
              >
                Patricia Segantine
              </a>
              .
            </span>
          </p>

          <nav
            className="flex items-center gap-5 text-[0.6875rem] sm:gap-4 sm:text-xs"
            aria-label="Project links"
          >
            <a
              href="https://github.com/patriciasegantine/redirect-lab-client"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
            >
              GitHub
            </a>
            <a
              href={apiDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
            >
              API Docs
            </a>
            <Link
              to={AppRoutes.ABOUT}
              className="transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
            >
              About
            </Link>
          </nav>
        </div>
      </footer>
      <Toaster richColors position="top-right" />
    </main>
  )
}
