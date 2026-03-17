import { Header } from "@/components/header"
import { Layout } from "@/components/layout"
import { Home } from "@/components/pages/home"
import { NotFound } from "@/components/pages/not-found"
import { Redirecting } from "@/components/pages/redirecting"
import { AppRoutes } from "@/lib/routes"
import { Route, Routes } from "react-router-dom"

export function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <Layout>
        <Routes>
          <Route path={AppRoutes.HOME} element={<Home />} />
          <Route path={AppRoutes.REDIRECT} element={<Redirecting />} />
          <Route path={AppRoutes.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
