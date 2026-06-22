import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { EmptyList } from "@/components/empty-list.tsx"
import { CaretLeft, CaretRight, Download } from "@phosphor-icons/react"
import { useLinks } from "@/hooks/use-links.ts"
import { LoadingState } from "@/components/ui/loading-state.tsx"
import { LinksList } from "@/components/layout/links-list/links-list.tsx"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { exportLinksCsv } from "@/services/links-service.ts"
import { toast } from "sonner"
import axios from "axios"
import { useEffect, useRef, useState, type CSSProperties } from "react"
import {
  LINKS_CHANNEL_NAME,
  type LinksChannelMessage,
} from "@/lib/links-channel"

interface MyLinksProps {
  minHeight?: number
}

export function MyLinks({ minHeight }: MyLinksProps) {
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState(1)
  const {
    links,
    isLoading,
    error,
    total = links.length,
    pageSize = 10,
    isFetching = false,
  } = useLinks(currentPage)
  const hasLinks = links.length > 0
  const listViewportRef = useRef<HTMLDivElement | null>(null)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const rangeStart = total === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const rangeEnd = Math.min(currentPage * pageSize, total)

  useEffect(() => {
    const channel = new BroadcastChannel(LINKS_CHANNEL_NAME)

    channel.onmessage = (event: MessageEvent<LinksChannelMessage>) => {
      if (event.data.type === "link-accessed") {
        queryClient.invalidateQueries({ queryKey: ["links"] })
      }
    }

    return () => channel.close()
  }, [queryClient])

  useEffect(() => {
    if (!isLoading && total > 0 && links.length === 0 && currentPage > 1) {
      setCurrentPage((page) => page - 1)
    }
  }, [currentPage, isLoading, links.length, total])

  const goToPage = (page: number) => {
    setCurrentPage(page)
    listViewportRef.current?.scrollTo?.({ top: 0 })
  }

  const { mutate: handleExportCsv, isPending: isExportingCsv } = useMutation({
    mutationFn: exportLinksCsv,
    onSuccess: ({ fileUrl }) => {
      const link = document.createElement("a")
      link.href = fileUrl
      link.download = "links.csv"
      link.rel = "noopener noreferrer"
      document.body.append(link)
      link.click()
      link.remove()
      toast.success("CSV exported successfully.")
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? ((error.response?.data as { message?: string })?.message ??
          "Failed to export CSV.")
        : "Failed to export CSV."
      toast.error(message)
    },
  })

  return (
    <Card
      className="desktop-compact-panel flex h-auto min-h-0 w-full flex-col overflow-hidden lg:h-fit lg:max-h-[calc(100vh-19rem)] lg:min-h-[var(--create-link-height)]"
      style={
        minHeight
          ? ({ "--create-link-height": `${minHeight}px` } as CSSProperties)
          : undefined
      }
    >
      <CardHeader className="flex shrink-0 flex-row items-center justify-between border-b">
        <div>
          <p className="mb-2 font-mono text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            02 / Routes
          </p>
          <CardTitle>My links</CardTitle>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-300 bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-600 dark:border-border/70 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80 dark:hover:text-secondary-foreground"
          disabled={!hasLinks || isExportingCsv}
          onClick={() => handleExportCsv()}
        >
          <Download size={16} className="mr-1" />
          {isExportingCsv ? "Exporting..." : "Download CSV"}
        </Button>
      </CardHeader>

      <CardContent
        ref={listViewportRef}
        className="route-scrollbar min-h-0 flex-1 overflow-y-auto pr-2"
      >
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <p className="py-4 text-center text-sm text-destructive">{error}</p>
        ) : !hasLinks ? (
          <EmptyList />
        ) : (
          <LinksList links={links} startIndex={(currentPage - 1) * pageSize} />
        )}
      </CardContent>

      {hasLinks && (
        <nav
          className="flex shrink-0 flex-col gap-3 border-t border-border/80 pt-3 sm:flex-row sm:items-center sm:justify-between sm:pt-4"
          aria-label="Links pagination"
        >
          <p
            className="text-center font-mono text-[0.6875rem] text-muted-foreground sm:text-left sm:text-xs"
            aria-live="polite"
          >
            {rangeStart}–{rangeEnd} of {total} routes
          </p>

          <div className="grid grid-cols-[2.25rem_1fr_2.25rem] items-center gap-2 sm:flex sm:justify-end sm:gap-3">
            <Button
              variant="outline"
              size="icon-lg"
              disabled={currentPage === 1 || isFetching}
              onClick={() => goToPage(currentPage - 1)}
              aria-label="Previous page"
              title="Previous page"
              className="border-gray-300 bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-600 sm:h-7 sm:w-7 dark:border-border/70 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80 dark:hover:text-secondary-foreground"
            >
              <CaretLeft size={14} aria-hidden="true" />
            </Button>

            <span className="text-center font-mono text-xs whitespace-nowrap text-foreground">
              <span className="sm:hidden">
                {currentPage} / {totalPages}
              </span>
              <span className="hidden sm:inline">
                Page {currentPage} of {totalPages}
              </span>
            </span>

            <Button
              variant="outline"
              size="icon-lg"
              disabled={currentPage === totalPages || isFetching}
              onClick={() => goToPage(currentPage + 1)}
              aria-label="Next page"
              title="Next page"
              className="border-gray-300 bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-600 sm:h-7 sm:w-7 dark:border-border/70 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80 dark:hover:text-secondary-foreground"
            >
              <CaretRight size={14} aria-hidden="true" />
            </Button>
          </div>
        </nav>
      )}
    </Card>
  )
}
