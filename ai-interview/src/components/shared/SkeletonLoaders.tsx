import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-white/5 rounded-lg relative overflow-hidden",
        className
      )}
    >
      <motion.div
        className="inset-0 via-white/10 absolute bg-gradient-to-r from-transparent to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonPulse className="h-8 w-48" />
          <SkeletonPulse className="h-4 w-64" />
        </div>
        <SkeletonPulse className="h-10 w-32" />
      </div>
      <div className="lg:grid-cols-4 gap-4 grid grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonPulse key={i} className="h-32 w-full" />
        ))}
      </div>
      <div className="lg:grid-cols-3 gap-4 grid grid-cols-1">
        <SkeletonPulse className="min-h-[16rem] h-auto md:h-64 lg:col-span-2" />
        <SkeletonPulse className="min-h-[16rem] h-auto md:h-64" />
      </div>
    </div>
  )
}
