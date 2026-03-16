import * as React from "react"
import { cn } from "@/lib/utils"

interface CardLayoutProps {
  children: React.ReactNode
  className?: string
}

export function CardLayout({ children, className }: CardLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-8rem)] w-full flex items-center justify-center">
      <div className="w-[580px] h-[296px]">
        <div
          className={cn(
            "w-full h-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-500 rounded-xl shadow-sm p-12 flex flex-col",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
