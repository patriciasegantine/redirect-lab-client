import { Outlet, Route, Routes } from "react-router-dom"
import { Header } from "@/components/layout/header/header.tsx"
import { Layout } from "@/components/layout/layout.tsx"
import { Home } from "@/components/pages/home"
import { NotFound } from "@/components/pages/not-found"
import { Redirecting } from "@/components/pages/redirecting"
import { About } from "@/components/pages/about"
import { AppRoutes } from "@/enum/routes"

function AppShell() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background lg:h-screen lg:overflow-hidden">
      <Header />
      <Layout>
        <Outlet />
      </Layout>
    </div>
  )
}

export function App() {
  return (
    <Routes>
      <Route path={AppRoutes.ABOUT} element={<About />} />
      <Route element={<AppShell />}>
        <Route path={AppRoutes.HOME} element={<Home />} />
        <Route path={AppRoutes.NOT_FOUND_PAGE} element={<NotFound />} />
        <Route path={AppRoutes.REDIRECT} element={<Redirecting />} />
      </Route>
    </Routes>
  )
}

export default App
