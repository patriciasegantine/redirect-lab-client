import { Header } from "@/components/header"
import { Layout } from "@/components/layout"
import { Home } from "@/components/pages/home"
import { NotFound } from "@/components/pages/not-found"
import { Redirecting } from "@/components/pages/redirecting"
import { Route, Routes } from "react-router-dom"

export function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test-redirect" element={<Redirecting />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
