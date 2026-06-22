import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Label } from "@/components/ui/label.tsx"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addLink } from "@/services/links-service.ts"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createLinkSchema } from "@/schema/create-link"

type CreateLinkFormData = z.infer<typeof createLinkSchema>

export function CreateLink() {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkSchema),
    mode: "onSubmit",
  })

  const {
    mutate: handleSubmitCreate,
    isPending,
    error,
  } = useMutation({
    mutationFn: addLink,
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: ["links"] })
      toast.success("Link created successfully.")
    },
  })

  const onSubmit = (data: CreateLinkFormData) => {
    handleSubmitCreate(data)
  }

  return (
    <Card className="relative w-full overflow-hidden border-l-4 border-l-primary">
      <CardHeader>
        <p className="mb-2 font-mono text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          01 / Origin
        </p>
        <CardTitle>New Link</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
          aria-busy={isPending}
        >
          <div className="space-y-2">
            <Label htmlFor="original-url" className="tracking-[0.12em]">
              ORIGINAL LINK
            </Label>
            <Textarea
              id="original-url"
              rows={3}
              placeholder="https://www.example.com"
              className="max-h-40 font-mono placeholder:text-muted-foreground/40"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-invalid={!!errors.originalUrl}
              aria-describedby={
                errors.originalUrl ? "original-url-error" : undefined
              }
              {...register("originalUrl")}
            />
            {errors.originalUrl?.message && (
              <p id="original-url-error" className="text-sm text-destructive">
                {errors.originalUrl.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="short-url" className="tracking-[0.12em]">
              SHORT LINK
            </Label>
            <Input
              id="short-url"
              type="text"
              placeholder="my-link"
              className="placeholder:text-muted-foreground/40"
              aria-invalid={!!errors.shortUrl}
              aria-describedby={
                errors.shortUrl
                  ? "short-url-hint short-url-error"
                  : "short-url-hint"
              }
              {...register("shortUrl")}
            />
            <p
              id="short-url-hint"
              className="font-mono text-xs leading-relaxed break-all text-muted-foreground"
            >
              Route:{" "}
              {import.meta.env.VITE_FRONTEND_URL ?? window.location.origin}/
              <span className="font-semibold text-foreground">your-slug</span>
            </p>
            {errors.shortUrl?.message && (
              <p id="short-url-error" className="text-sm text-destructive">
                {errors.shortUrl.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error.message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : "Save Link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
