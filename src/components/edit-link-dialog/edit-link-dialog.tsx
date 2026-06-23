import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PencilSimple } from "@phosphor-icons/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button.tsx"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { createLinkSchema } from "@/schema/create-link.ts"
import { updateLink } from "@/services/links-service.ts"
import type { Link } from "@/types/link.ts"

type EditLinkFormData = z.infer<typeof createLinkSchema>

interface EditLinkDialogProps {
  link: Link
}

export function EditLinkDialog({ link }: EditLinkDialogProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const baseUrl = import.meta.env.VITE_FRONTEND_URL ?? window.location.origin
  const form = useForm<EditLinkFormData>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      originalUrl: link.originalUrl,
      shortUrl: link.shortUrl,
    },
  })

  const mutation = useMutation({
    mutationFn: updateLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] })
      toast.success("Link updated successfully.")
      setOpen(false)
    },
  })

  const handleOpenChange = (nextOpen: boolean) => {
    if (mutation.isPending) return
    setOpen(nextOpen)
    if (nextOpen) {
      form.reset({ originalUrl: link.originalUrl, shortUrl: link.shortUrl })
      mutation.reset()
    }
  }

  const apiError = mutation.error
    ? axios.isAxiosError(mutation.error)
      ? ((mutation.error.response?.data as { message?: string })?.message ??
        "Failed to update link.")
      : "Failed to update link."
    : null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 bg-card"
          aria-label={`Edit link ${baseUrl}/${link.shortUrl}`}
          title={`Edit link ${baseUrl}/${link.shortUrl}`}
        >
          <PencilSimple size={16} weight="bold" aria-hidden="true" />
        </Button>
      </DialogTrigger>

      <DialogContent className="top-0 left-0 h-dvh w-full max-w-none translate-x-0 translate-y-0 grid-rows-[auto_1fr] rounded-none pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:top-1/2 sm:left-1/2 sm:h-auto sm:w-[calc(100%-2rem)] sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:grid-rows-none sm:rounded-xl sm:pb-5">
        <DialogHeader>
          <DialogTitle>Edit link</DialogTitle>
          <DialogDescription>
            Update the destination or the shortened route.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex min-h-0 flex-col gap-4"
          onSubmit={form.handleSubmit((data) =>
            mutation.mutate({ id: link.id, ...data })
          )}
          noValidate
          aria-busy={mutation.isPending}
        >
          <div className="flex min-h-0 flex-1 flex-col gap-2">
            <Label htmlFor={`edit-original-url-${link.id}`}>
              ORIGINAL LINK
            </Label>
            <Textarea
              id={`edit-original-url-${link.id}`}
              rows={6}
              className="min-h-48 flex-1 resize-none font-mono leading-relaxed sm:flex-none"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-invalid={!!form.formState.errors.originalUrl}
              aria-describedby={
                form.formState.errors.originalUrl
                  ? `edit-original-url-error-${link.id}`
                  : undefined
              }
              {...form.register("originalUrl")}
            />
            {form.formState.errors.originalUrl?.message && (
              <p
                id={`edit-original-url-error-${link.id}`}
                className="text-sm text-destructive"
              >
                {form.formState.errors.originalUrl.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`edit-short-url-${link.id}`}>SHORT LINK</Label>
            <Input
              id={`edit-short-url-${link.id}`}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-invalid={!!form.formState.errors.shortUrl}
              aria-describedby={
                form.formState.errors.shortUrl
                  ? `edit-short-url-error-${link.id}`
                  : undefined
              }
              {...form.register("shortUrl")}
            />
            {form.formState.errors.shortUrl?.message && (
              <p
                id={`edit-short-url-error-${link.id}`}
                className="text-sm text-destructive"
              >
                {form.formState.errors.shortUrl.message}
              </p>
            )}
          </div>

          {apiError && (
            <p className="text-sm text-destructive" role="alert">
              {apiError}
            </p>
          )}

          <DialogFooter className="mt-auto pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" size="sm" disabled={mutation.isPending}>
              <PencilSimple aria-hidden="true" />
              {mutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
