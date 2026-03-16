import { CardLayout } from "@/components/ui/card-layout"
import LogoIcon from "@/assets/Logo_Icon.svg"

export function Redirecting() {
  return (
    <CardLayout>
      <div className="flex flex-col items-center justify-center text-center space-y-6 w-full h-full">
        <div className="w-12 h-12 flex items-center justify-center">
          <img
            src={LogoIcon}
            alt="Brev.ly Icon"
            className="w-full h-full animate-logo-pulse"
          />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-200">
            Redirecting...
          </h1>
          
          <p className="text-sm text-gray-500 dark:text-gray-300">
            The link will be opened automatically in a few moments.
          </p>
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-400 w-full mt-auto">
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Not redirected?{" "}
            <a
              href="/"
              className="text-blue-base hover:underline hover:cursor-pointer font-medium"
            >
              Click here
            </a>
          </p>
        </div>
      </div>
    </CardLayout>
  )
}
