import { Link } from "react-router-dom"
import { GithubLogo, Globe, Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/icon/logo"
import { FeatureCards } from "@/components/about/feature-cards"
import { AppRoutes } from "@/enum/routes"
import { cn } from "@/lib/utils/cn"
import { APP_CONTAINER_CLASS } from "@/lib/layout"

const PORTFOLIO_URL = "https://patriciasegantine.vercel.app/"
const GITHUB_PROFILE_URL = "https://github.com/patriciasegantine"
const SOURCE_URL = "https://github.com/patriciasegantine/redirect-lab-client"

export function About() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="route-canvas flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/80 bg-background">
        <div className={cn(APP_CONTAINER_CLASS, "flex h-16 items-center justify-between px-4 sm:px-6")}>
          <Link
            to={AppRoutes.HOME}
            aria-label="Go to home page"
            className="rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Logo className="text-primary" />
          </Link>

          <div className="flex items-center gap-1">
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View portfolio"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Globe size={18} />
            </a>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub profile"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <GithubLogo size={18} />
            </a>
            <Button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              variant="ghost"
              size="icon"
            >
              {theme === "light" ? (
                <Moon size={18} weight="bold" />
              ) : (
                <Sun size={18} weight="bold" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16">
        <section className="max-w-lg space-y-4 text-center">
          <h1 className="text-3xl font-light tracking-tight md:text-4xl">
            Short links for your digital presence
          </h1>
          <p className="text-base text-muted-foreground">
            Create precise routes, track access counts, and export your data. All in one place.
          </p>
        </section>

        <FeatureCards />

        <section className="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
          <Button asChild size="lg" className="h-11 w-full">
            <Link to={AppRoutes.HOME}>Start shortening</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-11 w-full gap-2">
            <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
              <GithubLogo size={18} />
              View source
            </a>
          </Button>
        </section>
      </main>

      <footer className="border-t border-border/80 bg-background py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Redirect Lab. Built by{" "}
        <a
          href={PORTFOLIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground transition-colors hover:text-muted-foreground"
        >
          Patricia Segantine
        </a>
        .
      </footer>
    </div>
  )
}
