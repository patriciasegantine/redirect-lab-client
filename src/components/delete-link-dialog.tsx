import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "@phosphor-icons/react";

interface DeleteLinkDialogProps {
  shortUrl: string;
  onConfirm: () => void;
  isPending?: boolean;
}

export function DeleteLinkDialog({ shortUrl, onConfirm, isPending }: DeleteLinkDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 w-8"
          disabled={isPending}
        >
          <Trash size={14} className="text-gray-600" />
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogTitle>Delete link</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">
            brev.ly/{shortUrl}
          </span>
          ? This action cannot be undone.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
