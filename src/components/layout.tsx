import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-[calc(100vh-4rem)] w-full bg-gray-200 dark:bg-gray-600">
      <div className="container mx-auto max-w-[1200px] px-4 py-8">
        {children}
      </div>
    </main>
  )
}
