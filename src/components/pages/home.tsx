import { CreateLink } from "@/components/layout/create-link/create-link";
import { MyLinks } from "@/components/my-links.tsx";

export function Home() {
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-95 lg:shrink-0">
          <CreateLink />
        </div>
        
        <div className="w-full lg:flex-1">
          <MyLinks />
        </div>
      </div>
    </div>
  )
}
