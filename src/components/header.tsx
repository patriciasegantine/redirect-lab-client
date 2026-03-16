import { Button } from "@/components/ui/button"
import { Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "@/components/theme-provider"
import LogoSvg from "@/assets/Logo.svg"
import { Link } from "react-router-dom"

export function Header() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-gray-200 dark:bg-gray-600">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-[1200px]">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 hover:cursor-pointer transition-opacity">
          <img src={LogoSvg} alt="Brev.ly Logo" className="w-24 h-24" />
        </Link>
        
        <Button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode (Press D)`}
          variant="ghost"
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
