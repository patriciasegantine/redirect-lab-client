import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner.tsx";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-[calc(100vh-4rem)] mt-10 w-full bg-gray-200 dark:bg-gray-600">
      <div className="container mx-auto max-w-300 px-4 py-8">
        {children}
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
