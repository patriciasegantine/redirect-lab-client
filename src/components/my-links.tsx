import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmptyList } from "@/components/empty-list.tsx";
import { Download } from "@phosphor-icons/react";

export function MyLinks() {
  const hasLinks = false
  
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
        {
          !hasLinks
          ? <EmptyList />
          : <div>List</div>
        }
      </CardContent>
    </Card>
  )
}
