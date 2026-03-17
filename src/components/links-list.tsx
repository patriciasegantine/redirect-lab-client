import { Copy, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
}

interface LinksListProps {
}

const fakeLinks: Link[] = [
  {
    id: "1",
    originalUrl: "https://www.github.com/johndoe/my-awesome-project",
    shortUrl: "brev.ly/gh-proj",
    accessCount: 1234,
    createdAt: "2026-03-10",
  },
  {
    id: "2",
    originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    shortUrl: "brev.ly/ytube",
    accessCount: 856,
    createdAt: "2026-03-12",
  },
  {
    id: "3",
    originalUrl: "https://www.example.com/very/long/url/that/needs/to/be/shortened",
    shortUrl: "brev.ly/demo",
    accessCount: 42,
    createdAt: "2026-03-15",
  },
  {
    id: "4",
    originalUrl: "https://docs.react.dev/learn",
    shortUrl: "brev.ly/react-docs",
    accessCount: 2103,
    createdAt: "2026-03-08",
  },
];

export const LinksList = ({}: LinksListProps) => {
  const handleCopyShortUrl = (shortUrl: string) => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    console.log("Copied:", shortUrl);
  };
  
  const handleDelete = (id: string) => {
    console.log("Delete link:", id);
  };
  
  return (
    <div className="space-y-3 pt-4">
      {fakeLinks.map((link) => (
        <div
          key={link.id}
          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex-1 space-y-2 min-w-0">
              <span className="font-semibold text-md text-primary truncate">
                {link.shortUrl}
              </span>
            
            <p className="text-sm text-muted-foreground truncate">
              {link.originalUrl}
            </p>
          </div>
          
          <div className="flex items-center gap-2 justify-center">
            <p className="text-sm text-gray-500 p-0">
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
            
            <Button
              variant="secondary"
              size="sm"
              className="h-8 w-8"
              onClick={() => handleDelete(link.id)}
            >
              <Trash size={14} className="text-gray-600" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
