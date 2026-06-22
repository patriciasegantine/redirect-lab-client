import { ArrowBendDownRight, Copy } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import type { Link } from "@/types/link"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeLink } from "@/services/links-service"
import { DeleteLinkDialog } from "@/components/delete-link-dialog/delete-link-dialog.tsx"
import { toast } from "sonner"

interface LinksListProps {
  links: Link[]
}

export const LinksList = ({ links }: LinksListProps) => {
  const queryClient = useQueryClient()

  const baseUrl = import.meta.env.VITE_FRONTEND_URL ?? window.location.origin

  const {
    mutate: handleDelete,
    isPending,
    variables: deletingId,
  } = useMutation({
    mutationFn: (id: string) => removeLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] })
      toast.success("Link deleted successfully.")
    },
    onError: () => {
      toast.error("Failed to delete link.")
    },
  })

  const handleCopyShortUrl = async (shortUrl: string) => {
    const fullUrl = `${baseUrl}/${shortUrl}`
    try {
      await navigator.clipboard.writeText(fullUrl)
      toast.success("Link copied to clipboard!")
    } catch {
      toast.error("Failed to copy link.")
    }
  }

  const handleOpenRedirect = (shortUrl: string) => {
    window.open(`/${shortUrl}`, "_blank", "noopener,noreferrer")
  }

  return (
    <ul className="divide-y divide-border/80" aria-label="My shortened links">
      {links.map((link, index) => (
        <li
          key={link.id}
          className="group grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-5 transition-colors first:pt-4 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:gap-4"
        >
          <div className="flex flex-col items-center" aria-hidden="true">
            <span className="grid size-8 place-items-center rounded-full border border-primary/30 bg-accent font-mono text-xs font-bold text-accent-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-2 h-full min-h-8 w-px bg-gradient-to-b from-primary/50 to-transparent group-last:hidden" />
          </div>

          <div className="min-w-0 space-y-2">
            <div className="space-y-1">
              <span className="font-mono text-[0.625rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                Destination
              </span>
              <p
                className="truncate text-sm text-muted-foreground"
                title={link.originalUrl}
              >
                {link.originalUrl}
              </p>
            </div>

            <div className="flex min-w-0 items-center gap-2">
              <ArrowBendDownRight
                className="shrink-0 text-primary"
                size={16}
                weight="bold"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => handleOpenRedirect(link.shortUrl)}
                aria-label={`Open shortened link ${baseUrl}/${link.shortUrl}`}
                title={`Open shortened link ${baseUrl}/${link.shortUrl}`}
                className="truncate text-left font-mono text-sm font-semibold text-foreground underline decoration-primary/40 decoration-2 underline-offset-4 transition-colors hover:cursor-pointer hover:text-primary hover:decoration-primary"
              >
                {`${baseUrl}/${link.shortUrl}`}
              </button>
            </div>
          </div>

          <div className="col-start-2 flex w-full items-center gap-2 sm:col-start-3 sm:row-start-1 sm:w-auto sm:self-center">
            <p className="mr-auto inline-flex h-8 items-center rounded-full border border-gray-300 bg-gray-200 px-3 font-mono text-xs whitespace-nowrap text-gray-600 sm:mr-1 dark:border-transparent dark:bg-secondary dark:text-muted-foreground">
              {`${link.accessCount} ${link.accessCount === 1 ? "view" : "views"}`}
            </p>

            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 bg-card"
              aria-label={`Copy shortened link ${baseUrl}/${link.shortUrl}`}
              title={`Copy shortened link ${baseUrl}/${link.shortUrl}`}
              onClick={() => handleCopyShortUrl(link.shortUrl)}
            >
              <Copy size={16} weight="bold" aria-hidden="true" />
            </Button>

            <DeleteLinkDialog
              shortUrl={link.shortUrl}
              onConfirm={() => handleDelete(link.id)}
              isPending={isPending && deletingId === link.id}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
