import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface WaveformBarsProps {
  active?: boolean
  bars?: number
  className?: string
  color?: string
}

export default function WaveformBars({
  active = true,
  bars = 12,
  className,
  color = "#8b5cf6",
}: WaveformBarsProps) {
  // deterministic pseudo-random generator based on index
  const pseudo = (i: number, seed = 1) => {
    const x = Math.sin(i + seed) * 10000
    return x - Math.floor(x)
  }

  const heights = Array.from({ length: bars }).map((_, i) => `${pseudo(i) * 24 + 8}px`)
  const durations = Array.from({ length: bars }).map((_, i) => 0.8 + pseudo(i + 13) * 0.4)
  return (
    <div className={cn("gap-0.5 flex items-center", className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          animate={
            active
              ? {
                  height: ["4px", heights[i], "4px"],
                }
              : { height: "4px" }
          }
          transition={
            active
              ? {
                  duration: durations[i],
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: "easeInOut",
                }
              : {}
          }
          style={{
            backgroundColor: color,
            width: "3px",
            borderRadius: "2px",
            minHeight: "4px",
          }}
        />
      ))}
    </div>
  )
}
