import { Header } from "@/components/layout/header/header.tsx"
import { Layout } from "@/components/layout/layout.tsx"
import { Home } from "@/components/pages/home"
import { NotFound } from "@/components/pages/not-found"
import { Redirecting } from "@/components/pages/redirecting"
import { AppRoutes } from "@/enum/routes"
import { Route, Routes } from "react-router-dom"

export function App() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background lg:h-screen lg:overflow-hidden">
      <Header />

      <Layout>
        <Routes>
          <Route path={AppRoutes.HOME} element={<Home />} />
          <Route path={AppRoutes.NOT_FOUND_PAGE} element={<NotFound />} />
          <Route path={AppRoutes.REDIRECT} element={<Redirecting />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
