import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
}

export default function GradientText({
  children,
  className,
  from = "from-violet-400",
  via = "via-blue-400",
  to = "to-cyan-400",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        `bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent`,
        className
      )}
    >
      {children}
    </span>
  )
}
