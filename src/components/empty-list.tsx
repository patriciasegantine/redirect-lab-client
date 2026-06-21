import { LinkSimple } from "@phosphor-icons/react";

export const EmptyList = () => {
  return (
    <div className="flex flex-col min-h-50 gap-3 items-center justify-center text-center">
      <LinkSimple size={36} className="text-muted-foreground/50" />
      <p className="text-sm text-muted-foreground">No links yet. Create your first one!</p>
    </div>
  );
};
