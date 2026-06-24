import { Link, ChartBar, FileCsv } from "@phosphor-icons/react"
import { cn } from "@/lib/utils/cn"

const features = [
  {
    icon: Link,
    title: "Short Links",
    description: "Create precise, memorable short links and share them anywhere in seconds.",
  },
  {
    icon: ChartBar,
    title: "Access Tracking",
    description: "See how many times each link was accessed and monitor your reach in real time.",
  },
  {
    icon: FileCsv,
    title: "CSV Export",
    description: "Export all your links and access stats as a CSV file whenever you need.",
  },
]

type FeatureCardsProps = {
  className?: string
}

export function FeatureCards({ className }: FeatureCardsProps) {
  return (
    <section className={cn("grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3", className)}>
      {features.map(({ icon: Icon, title, description }) => (
        <div key={title} className="space-y-2 rounded-xl border bg-card p-3 sm:space-y-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Icon size={16} className="text-foreground" />
            </div>
            <h2 className="text-sm font-medium">{title}</h2>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
        </div>
      ))}
    </section>
  )
}
