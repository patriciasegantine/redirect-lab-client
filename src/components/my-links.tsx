import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmptyList } from "@/components/empty-list.tsx";
import { Download } from "@phosphor-icons/react";
import { LinksList } from "@/components/links-list.tsx";
import { useLinks } from "@/hooks/use-links";
import { LoadingState } from "@/components/ui/loading-state.tsx";

export function MyLinks() {
  const { links, isLoading, error } = useLinks();
  const hasLinks = links.length > 0;
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <CardTitle>My links</CardTitle>
        <Button
          variant="outline"
          size="sm"
          disabled={!hasLinks}
        >
          <Download size={16} className="mr-1"/>
          Download CSV
        </Button>
      </CardHeader>
      
      <CardContent className="h-full">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <p className="py-4 text-center text-sm text-destructive">{error}</p>
        ) : !hasLinks ? (
          <EmptyList />
        ) : (
          <LinksList links={links} />
        )}
      </CardContent>
    </Card>
  )
}
