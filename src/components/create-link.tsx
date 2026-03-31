import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLink } from "@/services/links-service";
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
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="original-url">ORIGINAL LINK</Label>
            <Input
              id="original-url"
              type="url"
              placeholder="https://www.example.com"
              aria-invalid={!!errors.originalUrl}
              {...register("originalUrl")}
            />
            {errors.originalUrl?.message && (
              <p className="text-sm text-destructive">{errors.originalUrl.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="short-url">SHORT LINK</Label>
            <Input
              id="short-url"
              type="text"
              placeholder={`brev.ly/meu-link`}
              aria-invalid={!!errors.shortUrl}
              {...register("shortUrl")}
            />
            {errors.shortUrl?.message && (
              <p className="text-sm text-destructive">{errors.shortUrl.message}</p>
            )}
          </div>
          
          {error && <p className="text-sm text-destructive">{error.message}</p>}
          
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Saving..." : "Save Link"}
            </Button>
        </form>
      </CardContent>
    </Card>
  );
}
