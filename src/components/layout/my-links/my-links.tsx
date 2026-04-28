import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { EmptyList } from "@/components/empty-list.tsx";
import { Download } from "@phosphor-icons/react";
import { useLinks } from "@/hooks/use-links.ts";
import { LoadingState } from "@/components/ui/loading-state.tsx";
import { LinksList } from "@/components/layout/links-list/links-list.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exportLinksCsv } from "@/services/links-service.ts";
import { toast } from "sonner";
import axios from "axios";
import { useEffect } from "react";
import { LINKS_CHANNEL_NAME, type LinksChannelMessage } from "@/lib/links-channel";

export function MyLinks() {
  const queryClient = useQueryClient();
  const { links, isLoading, error } = useLinks();
  const hasLinks = links.length > 0;

  useEffect(() => {
    const channel = new BroadcastChannel(LINKS_CHANNEL_NAME);

    channel.onmessage = (event: MessageEvent<LinksChannelMessage>) => {
      if (event.data.type === "link-accessed") {
        queryClient.invalidateQueries({ queryKey: ["links"] });
      }
    };

    return () => channel.close();
  }, [queryClient]);
  const { mutate: handleExportCsv, isPending: isExportingCsv } = useMutation({
    mutationFn: exportLinksCsv,
    onSuccess: ({ fileUrl }) => {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "links.csv";
      link.rel = "noopener noreferrer";
      document.body.append(link);
      link.click();
      link.remove();
      toast.success("CSV exported successfully.");
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ?? "Failed to export CSV."
        : "Failed to export CSV.";
      toast.error(message);
    },
  });
  
  return (
    <Card className="w-full h-full min-h-0 overflow-hidden flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between border-b shrink-0">
        <CardTitle>My links</CardTitle>
        <Button
          variant="secondary"
          size="sm"
          disabled={!hasLinks || isExportingCsv}
          onClick={() => handleExportCsv()}
        >
          <Download size={16} className="mr-1"/>
          {isExportingCsv ? "Exporting..." : "Download CSV"}
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 min-h-0 overflow-y-auto">
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
