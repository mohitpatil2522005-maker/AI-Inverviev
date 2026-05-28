import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface WaveformBarsProps {
  active?: boolean
  bars?: number
  className?: string
  color?: string
}

export default function WaveformBars({ active = true, bars = 12, className, color = "#8b5cf6" }: WaveformBarsProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          animate={active ? {
            height: ["4px", `${Math.random() * 24 + 8}px`, "4px"],
          } : { height: "4px" }}
          transition={active ? {
            duration: 0.8 + Math.random() * 0.4,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut",
          } : {}}
          style={{ backgroundColor: color, width: "3px", borderRadius: "2px", minHeight: "4px" }}
        />
      ))}
    </div>
  )
}
