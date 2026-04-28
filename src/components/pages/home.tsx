import { CreateLink } from "@/components/layout/create-link/create-link";
import { MyLinks } from "@/components/layout/my-links/my-links.tsx";

export function Home() {
  
  return (
    <div className="h-full min-h-0 space-y-4">
      <div className="h-full min-h-0 flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="w-full lg:w-95 lg:shrink-0">
          <CreateLink />
        </div>
        
        <div className="w-full lg:flex-1 min-h-0">
          <MyLinks />
        </div>
      </div>
    </div>
  )
}
