import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function Home() {
  const navigate = useNavigate()
  
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
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
