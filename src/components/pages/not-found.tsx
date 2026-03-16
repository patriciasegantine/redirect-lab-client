import Image404 from "@/assets/404.svg"
import { CardLayout } from "@/components/ui/card-layout.tsx"

export function NotFound() {
  return (
    <CardLayout>
      <div className="flex flex-col items-center justify-center text-center space-y-6 w-full h-full">
        <div className="flex items-center justify-center">
          <img
            src={Image404}
            alt="404 - Page not found"
            className="h-24"
          />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-200">
          Link not found
        </h1>
        
        <p className="text-sm text-gray-500 dark:text-gray-300 max-w-sm">
          The link you are trying to access does not exist, has been removed, or is an invalid URL. Learn more at{" "}
          <a
            href="/"
            className="text-blue-base hover:underline hover:cursor-pointer font-medium"
          >
            brev.ly
          </a>
          .
        </p>
      </div>
    </CardLayout>
  )
}
