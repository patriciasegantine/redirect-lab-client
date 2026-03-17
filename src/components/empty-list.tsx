import { Link } from "@phosphor-icons/react";

interface EmptyListProps {
}

export const EmptyList = ({}: EmptyListProps) => {
  return (
    <div className="flex flex-col min-h-50 gap-6 items-center justify-center align-middle text-center">
      <Link size={32}/>
      <p className="text-xs text-muted-foreground">
        THERE ARE NO LINKS YET
      </p>
    </div>
  );
};
