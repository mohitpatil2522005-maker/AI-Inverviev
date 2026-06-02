import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScanningLineProps {
  className?: string
  direction?: "horizontal" | "vertical"
  color?: string
}

export default function ScanningLine({
  className,
  direction = "horizontal",
  color = "var(--color-primary)",
}: ScanningLineProps) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute z-10",
        direction === "horizontal" ? "left-0 right-0 h-[2px]" : "bottom-0 top-0 w-[2px]",
        className
      )}
      style={{
        background: color,
        boxShadow: `0 0 15px ${color}`,
      }}
      animate={
        direction === "horizontal"
          ? { top: ["-2%", "102%"], opacity: [0, 1, 1, 0] }
          : { left: ["-2%", "102%"], opacity: [0, 1, 1, 0] }
      }
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}
