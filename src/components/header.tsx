import { Button } from "@/components/ui/button"
import { Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "@/components/theme-provider"
import { Logo } from "@/components/icon/logo"
import { Link } from "react-router-dom"

export function Header() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-gray-200 dark:bg-gray-600">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-300">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 hover:cursor-pointer transition-opacity">
          <Logo className="h-8 text-blue-base dark:text-blue-light" />
        </Link>
        
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
    </header>
  )
}
