import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components//ui/label"

export function CreateLink() {
  const [originalUrl, setOriginalUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement link creation logic
    console.log({ originalUrl, shortUrl })
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>New link</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="original-url">ORIGINAL LINK</Label>
            <Input
              id="original-url"
              type="url"
              placeholder="www.example.com"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="short-url">SHORT LINK</Label>
            <Input
              id="short-url"
              type="text"
              placeholder="brev.ly/"
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Save link
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
