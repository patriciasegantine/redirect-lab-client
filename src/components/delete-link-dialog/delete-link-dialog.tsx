import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Trash } from "@phosphor-icons/react"

interface DeleteLinkDialogProps {
  shortUrl: string
  onConfirm: () => void
  isPending?: boolean
}

export function DeleteLinkDialog({
  shortUrl,
  onConfirm,
  isPending,
}: DeleteLinkDialogProps) {
  const baseUrl = import.meta.env.VITE_FRONTEND_URL ?? window.location.origin
  const triggerLabel = `Delete link ${baseUrl}/${shortUrl}`

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="h-8 w-8 border border-destructive/20"
          disabled={isPending}
          aria-label={triggerLabel}
          title={triggerLabel}
        >
          <Trash
            size={16}
            weight="bold"
            className="text-destructive"
            aria-hidden="true"
          />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogTitle>Delete link</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">
            {baseUrl}/{shortUrl}
          </span>
          ? This action cannot be undone.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel size="sm">Cancel</AlertDialogCancel>
          <AlertDialogAction size="sm" onClick={onConfirm}>
            <Trash />
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
