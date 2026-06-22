import { CreateLink } from "@/components/layout/create-link/create-link"
import { MyLinks } from "@/components/layout/my-links/my-links.tsx"
import { useEffect, useRef, useState } from "react"

export function Home() {
  const createLinkContainerRef = useRef<HTMLDivElement | null>(null)
  const [createLinkHeight, setCreateLinkHeight] = useState<number>()

  useEffect(() => {
    const target = createLinkContainerRef.current
    if (!target || typeof ResizeObserver === "undefined") return

    const updateHeight = () => {
      setCreateLinkHeight(target.getBoundingClientRect().height)
    }

    updateHeight()

    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(target)

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div className="min-h-full space-y-7 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:gap-7 lg:space-y-0">
      <header className="desktop-compact-hidden space-y-3">
        <h1 className="text-3xl font-extrabold tracking-[-0.05em] text-foreground sm:text-4xl">
          Shorten the distance.
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base lg:whitespace-nowrap">
          Create precise routes, share them anywhere, and keep every destination
          within reach.
        </p>
      </header>

      <div className="flex min-h-0 flex-col gap-6 lg:flex-1 lg:flex-row lg:items-stretch">
        <div
          ref={createLinkContainerRef}
          className="w-full lg:w-90 lg:shrink-0 lg:self-start"
        >
          <CreateLink />
        </div>

        <div className="min-h-0 w-full lg:flex-1">
          <MyLinks minHeight={createLinkHeight} />
        </div>
      </div>
    </div>
  )
}
