import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { CreateLink } from "@/components/create-link";
import { MyLinks } from "@/components/my-links.tsx";

export function Home() {
  const navigate = useNavigate()
  
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
      
      <div className="flex gap-3 pt-8">
        <Button onClick={() => navigate('/test-redirect')}>
          Test Redirect Page
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/invalid-route-123')}
        >
          Test 404 Page
        </Button>
      </div>
    </div>
  )
}
