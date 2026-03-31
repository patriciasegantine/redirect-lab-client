import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLink } from "@/services/links-service.ts";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLinkSchema } from "@/schema/create-link.tsx";

type CreateLinkFormData = z.infer<typeof createLinkSchema>;

export function CreateLink() {
  const queryClient = useQueryClient();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkSchema),
    mode: "onSubmit",
  });
  
  const { mutate: handleSubmitCreate, isPending, error } = useMutation({
    mutationFn: addLink,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["links"] });
      toast.success("Link created successfully.");
    },
  });
  
  const onSubmit = (data: CreateLinkFormData) => {
    handleSubmitCreate(data);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>New Link</CardTitle>
      </CardHeader>
      
      <CardContent>s
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
          aria-busy={isPending}
        >
          <div className="space-y-2">
            <Label htmlFor="original-url">ORIGINAL LINK</Label>
            <Input
              id="original-url"
              type="url"
              placeholder="https://www.example.com"
              aria-invalid={!!errors.originalUrl}
              aria-describedby={errors.originalUrl ? "original-url-error" : undefined}
              {...register("originalUrl")}
            />
            {errors.originalUrl?.message && (
              <p id="original-url-error" className="text-sm text-destructive">
                {errors.originalUrl.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="short-url">SHORT LINK</Label>
            <Input
              id="short-url"
              type="text"
              placeholder="brev.ly/meu-link"
              aria-invalid={!!errors.shortUrl}
              aria-describedby={errors.shortUrl ? "short-url-error" : undefined}
              {...register("shortUrl")}
            />
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
  );
}
