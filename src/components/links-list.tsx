import { Copy } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { Link } from "@/types/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeLink } from "@/services/links-service";
import { DeleteLinkDialog } from "@/components/delete-link-dialog/delete-link-dialog.tsx";

interface LinksListProps {
  links: Link[];
}

export const LinksList = ({ links }: LinksListProps) => {
  const queryClient = useQueryClient();
  
  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: (id: string) => removeLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
  
  const handleCopyShortUrl = (shortUrl: string) => {
    alert(`shortUrl ${shortUrl} copied to clipboard!`)
  }
  const handleOpenRedirect = (shortUrl: string) => {
    alert(`shortUrl ${shortUrl}`)
  };
  
  return (
    <div className="space-y-3 pt-4">
      {links.map((link) => (
        <div
          key={link.id}
          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex-1 space-y-2 min-w-0">
            <button
              type="button"
              onClick={() => handleOpenRedirect(link.shortUrl)}
              className="font-semibold text-md text-primary truncate text-left hover:underline"
            >
              {`brev.ly/${link.shortUrl}`}
            </button>
            
            <p className="text-sm text-muted-foreground truncate">
              {link.originalUrl}
            </p>
          </div>
          
          <div className="flex items-center gap-2 justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-200 p-0">
              {`${link.accessCount} views`}
            </p>
            
            <Button
              variant="secondary"
              size="sm"
              className="h-8 w-8"
              onClick={() => handleCopyShortUrl(link.shortUrl)}
            >
              <Copy size={20} className="text-gray-600" />
            </Button>
            
            <DeleteLinkDialog
              shortUrl={link.shortUrl}
              onConfirm={() => handleDelete(link.id)}
              isPending={isPending}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
