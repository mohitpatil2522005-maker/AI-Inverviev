import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Filter, Calendar, Clock,
  Play, FileText, ChevronRight, Star,
  Trash2, Share2, Building2, MoreVertical,
  BarChart3, Brain, Download
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

const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

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
    color: "#8b5cf6"
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
    color: "#3b82f6"
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
    color: "#10b981"
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
    color: "#ef4444"
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
    color: "#06b6d4"
  }
]

export default function InterviewHistoryPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const filteredHistory = historyData.filter(h => 
    (h.company.toLowerCase().includes(search.toLowerCase()) || h.role.toLowerCase().includes(search.toLowerCase())) &&
    (filter === "All" || h.type === filter)
  )

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Interview History</h2>
            <p className="text-sm text-slate-400">Review your past sessions and track your progress.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <Input
                placeholder="Search interviews..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-[240px] bg-white/5 border-white/10 text-xs h-10 rounded-xl"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 bg-white/5 border-white/10 rounded-xl text-xs gap-2">
                  <Filter size={14} /> {filter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-white/10 text-white">
                {["All", "Technical", "Behavioral", "Coding", "Design"].map(f => (
                  <DropdownMenuItem key={f} onClick={() => setFilter(f)} className="text-xs">{f}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Timeline List */}
        <div className="relative space-y-6">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-white/5 to-transparent hidden sm:block" />

          {filteredHistory.map((item, i) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i}
              className="relative pl-0 sm:pl-16"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[21px] top-6 w-2.5 h-2.5 rounded-full border-2 border-primary bg-slate-900 z-10 hidden sm:block shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
              
              <GlassCard className="p-0 overflow-hidden group border-white/5 hover:border-primary/20 transition-all">
                <div className="flex flex-col md:flex-row">
                  {/* Left Side: Basic Info */}
                  <div className="p-6 flex-1 flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                      <Building2 size={24} style={{ color: item.color }} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                         <h3 className="font-bold text-white truncate">{item.role}</h3>
                         <Badge className="text-[10px] px-1.5 py-0" style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
                           {item.type}
                         </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {item.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} /> {item.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 md:px-8 border-l border-white/5 hidden md:flex">
                       <div className="text-center">
                          <p className="text-xl font-black text-white">{item.score}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Score</p>
                       </div>
                    </div>
                  </div>

                  {/* Right Side: Actions */}
                  <div className="px-6 py-4 md:py-0 md:w-56 bg-white/[0.02] border-t md:border-t-0 md:border-l border-white/5 flex items-center justify-between md:justify-center gap-3">
                     <Button size="sm" variant="ghost" className="text-slate-400 hover:text-primary hover:bg-primary/10 transition-all flex-1 md:flex-none h-10 gap-2">
                        <Play size={14} /> Replay
                     </Button>
                     <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5 transition-all flex-1 md:flex-none h-10 gap-2">
                        <FileText size={14} /> Report
                     </Button>
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white">
                           <MoreVertical size={16} />
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end" className="bg-slate-900 border-white/10 text-white">
                         <DropdownMenuItem className="text-xs gap-2"><Share2 size={14} /> Share</DropdownMenuItem>
                         <DropdownMenuItem className="text-xs gap-2"><Download size={14} /> Download</DropdownMenuItem>
                         <DropdownMenuItem className="text-xs gap-2 text-red-400"><Trash2 size={14} /> Delete</DropdownMenuItem>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 flex flex-col items-center text-center">
             <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <History size={32} className="text-slate-600" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">No interviews found</h3>
             <p className="text-sm text-slate-400 max-w-xs mx-auto">We couldn't find any interviews matching your search criteria.</p>
             <Button className="mt-6 neon-button" onClick={() => { setSearch(""); setFilter("All"); }}>
               Clear Filters
             </Button>
          </motion.div>
        )}
      </div>
    </PageTransition>
  )
}
