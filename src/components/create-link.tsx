import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components//ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLink } from "@/services/links-service";
import { toast } from "sonner";
import { getAppHost } from "@/lib/utils/app-url.ts";

export function CreateLink() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const queryClient = useQueryClient();
  
  const { mutate: handleSubmitCreate, isPending, error } = useMutation({
    mutationFn: () => addLink({ originalUrl, shortUrl }),
    onSuccess: () => {
      setOriginalUrl("");
      setShortUrl("");
      queryClient.invalidateQueries({ queryKey: ["links"] });
      toast.success("Link created successfully!");
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitCreate();
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>New link</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="original-url">ORIGINAL LINK</Label>
            <Input
              id="original-url"
              type="url"
              placeholder="www.example.com"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="short-url">SHORT LINK</Label>
            <Input
              id="short-url"
              type="text"
              placeholder={`${getAppHost()}/`}
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
              required
            />
          </div>
          
          {error && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
          
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : "Save link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
