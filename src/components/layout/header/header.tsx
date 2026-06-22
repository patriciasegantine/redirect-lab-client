import { Button } from "@/components/ui/button.tsx"
import { Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "@/components/theme-provider.tsx"
import { Logo } from "@/components/icon/logo.tsx"
import { Link } from "react-router-dom"
import { APP_CONTAINER_CLASS } from "@/lib/layout.ts"
import { cn } from "@/lib/utils/cn.ts"

export function Header() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div
        className={cn(
          APP_CONTAINER_CLASS,
          "flex h-20 items-center justify-between px-4 sm:px-6"
        )}
      >
        <Link
          to="/"
          aria-label="Go to home page"
          title="Go to home page"
          className="flex items-center gap-2 rounded-lg transition-opacity outline-none hover:cursor-pointer hover:opacity-80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:focus-visible:ring-ring"
        >
          <Logo className="text-primary" />
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-sm text-muted-foreground sm:flex">
            <span
              className="size-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            routing desk
          </span>
          <Button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode (Press D)`}
            variant="ghost"
            size="icon"
          >
            {theme === "light" ? (
              <Moon size={20} weight="bold" />
            ) : (
              <Sun size={20} weight="bold" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
