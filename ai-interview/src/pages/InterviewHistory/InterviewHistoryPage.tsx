import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Play,
  FileText,
  History as HistoryIcon,
  Trash2,
  Share2,
  Building2,
  MoreVertical,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlassCard from "@/components/shared/GlassCard"
import PageTransition from "@/components/shared/PageTransition"

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
}

const historyData = [
  {
    id: 1,
    company: "Google",
    role: "Senior Frontend Engineer",
    date: "May 24, 2026",
    time: "2:30 PM",
    duration: "45m",
    score: 88,
    type: "Technical",
    status: "Completed",
    color: "#8b5cf6",
  },
  {
    id: 2,
    company: "Amazon",
    role: "Product Manager",
    date: "May 22, 2026",
    time: "10:00 AM",
    duration: "60m",
    score: 74,
    type: "Behavioral",
    status: "Completed",
    color: "#3b82f6",
  },
  {
    id: 3,
    company: "Meta",
    role: "Full Stack Engineer",
    date: "May 20, 2026",
    time: "4:15 PM",
    duration: "90m",
    score: 91,
    type: "Coding",
    status: "Completed",
    color: "#10b981",
  },
  {
    id: 4,
    company: "Netflix",
    role: "UI/UX Engineer",
    date: "May 18, 2026",
    time: "11:30 AM",
    duration: "30m",
    score: 68,
    type: "Design",
    status: "Completed",
    color: "#ef4444",
  },
  {
    id: 5,
    company: "Microsoft",
    role: "Software Engineer II",
    date: "May 15, 2026",
    time: "9:00 AM",
    duration: "45m",
    score: 85,
    type: "Technical",
    status: "Completed",
    color: "#06b6d4",
  },
]

export default function InterviewHistoryPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const filteredHistory = historyData.filter(
    (h) =>
      (h.company.toLowerCase().includes(search.toLowerCase()) ||
        h.role.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "All" || h.type === filter)
  )

  return (
    <PageTransition>
      <div className="max-w-6xl space-y-8 pb-12 mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="sm:flex-row sm:items-center gap-6 flex flex-col justify-between"
        >
          <div>
            <h2
              className="text-2xl font-black text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Interview History
            </h2>
            <p className="text-sm text-slate-400">
              Review your past sessions and track your progress.
            </p>
          </div>
          <div className="gap-3 flex items-center">
            <div className="relative">
              <Search
                size={16}
                className="left-3 text-slate-500 absolute top-1/2 -translate-y-1/2"
              />
              <Input
                placeholder="Search interviews..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-sm h-10 rounded-xl w-[240px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="h-10 gap-2 rounded-xl bg-white/5 border-white/10 px-3 text-sm text-slate-200 inline-flex items-center border">
                <Filter size={14} /> {filter}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-white/10 text-white">
                {["All", "Technical", "Behavioral", "Coding", "Design"].map(
                  (f) => (
                    <DropdownMenuItem
                      key={f}
                      onClick={() => setFilter(f)}
                      className="text-sm"
                    >
                      {f}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Timeline List */}
        <div className="space-y-6 relative">
          {/* Vertical Timeline Line */}
          <div className="left-6 top-0 bottom-0 via-white/5 sm:block absolute hidden w-px bg-gradient-to-b from-primary/30 to-transparent" />

          {filteredHistory.map((item, i) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i}
              className="pl-0 sm:pl-16 relative"
            >
              {/* Timeline Dot */}
              <div className="top-6 w-2.5 h-2.5 bg-slate-900 sm:block absolute left-[21px] z-10 hidden rounded-full border-2 border-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" />

              <GlassCard className="p-0 group border-white/5 overflow-hidden transition-all hover:border-primary/20">
                <div className="md:flex-row flex flex-col">
                  {/* Left Side: Basic Info */}
                  <div className="p-6 md:flex-row md:items-center gap-6 flex flex-1 flex-col">
                    <div
                      className="w-14 h-14 rounded-2xl flex shrink-0 items-center justify-center"
                      style={{
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <Building2 size={24} style={{ color: item.color }} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="gap-2 mb-1 flex items-center">
                        <h3 className="font-bold text-white truncate">
                          {item.role}
                        </h3>
                        <Badge
                          className="px-1.5 py-0 text-sm"
                          style={{
                            background: `${item.color}15`,
                            color: item.color,
                            border: `1px solid ${item.color}30`,
                          }}
                        >
                          {item.type}
                        </Badge>
                      </div>
                      <div className="gap-4 text-sm text-slate-500 flex items-center">
                        <span className="gap-1.5 flex items-center">
                          <Calendar size={12} /> {item.date}
                        </span>
                        <span className="gap-1.5 flex items-center">
                          <Clock size={12} /> {item.duration}
                        </span>
                      </div>
                    </div>

                    <div className="gap-8 md:px-8 border-white/5 md:flex flex hidden items-center border-l">
                      <div className="text-center">
                        <p className="text-xl font-black text-white">
                          {item.score}
                        </p>
                        <p className="font-bold text-slate-500 tracking-widest text-sm uppercase">
                          Score
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Actions */}
                  <div className="px-6 py-4 md:py-0 md:w-56 bg-white/[0.02] md:border-t-0 md:border-l border-white/5 md:justify-center gap-3 flex items-center justify-between border-t">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-slate-400 md:flex-none h-10 gap-2 flex-1 transition-all hover:bg-primary/10 hover:text-primary"
                    >
                      <Play size={14} /> Replay
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-slate-400 hover:text-white hover:bg-white/5 md:flex-none h-10 gap-2 flex-1 transition-all"
                    >
                      <FileText size={14} /> Report
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-9 w-9 rounded-md text-slate-500 hover:text-white hover:bg-white/5 inline-flex items-center justify-center">
                        <MoreVertical size={16} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-slate-900 border-white/10 text-white"
                      >
                        <DropdownMenuItem className="text-sm gap-2">
                          <Share2 size={14} /> Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-sm gap-2">
                          <Download size={14} /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-sm gap-2 text-red-400">
                          <Trash2 size={14} /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-white/5 mb-6 border-white/10 flex items-center justify-center border">
              <HistoryIcon size={32} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No interviews found
            </h3>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">
              We couldn't find any interviews matching your search criteria.
            </p>
            <Button
              className="mt-6 neon-button"
              onClick={() => {
                setSearch("")
                setFilter("All")
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </PageTransition>
  )
}
