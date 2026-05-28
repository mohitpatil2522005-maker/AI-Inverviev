import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Zap, TrendingUp, Play, BarChart3, Clock, ChevronRight,
  Target, Star, Brain, ArrowUpRight, Calendar, Trophy
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts"
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import GlassCard from "@/components/shared/GlassCard"
import ScoreRing from "@/components/shared/ScoreRing"
import PageTransition from "@/components/shared/PageTransition"
import { DashboardSkeleton } from "@/components/shared/SkeletonLoaders"
import { useState, useEffect } from "react"

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } }) }

const weeklyData = [
  { day: "Mon", score: 68, interviews: 2 },
  { day: "Tue", score: 74, interviews: 3 },
  { day: "Wed", score: 71, interviews: 1 },
  { day: "Thu", score: 82, interviews: 4 },
  { day: "Fri", score: 79, interviews: 2 },
  { day: "Sat", score: 85, interviews: 3 },
  { day: "Sun", score: 88, interviews: 2 },
]

const skillData = [
  { skill: "Technical", value: 78 },
  { skill: "Communication", value: 85 },
  { skill: "Problem Solving", value: 72 },
  { skill: "Leadership", value: 65 },
  { skill: "HR Readiness", value: 90 },
  { skill: "Coding", value: 80 },
]

const recentInterviews = [
  { company: "Google", role: "SWE L4", score: 88, type: "Technical", date: "2h ago", status: "completed" },
  { company: "Amazon", role: "PM", score: 74, type: "Behavioral", date: "1d ago", status: "completed" },
  { company: "Meta", role: "Data Scientist", score: 91, type: "Coding", date: "2d ago", status: "completed" },
  { company: "Netflix", role: "SWE", score: 66, type: "System Design", date: "3d ago", status: "completed" },
]

const aiSuggestions = [
  { icon: Brain, text: "Practice more system design questions — it's your lowest scoring area", action: "Practice Now", color: "#8b5cf6" },
  { icon: Target, text: "Your Amazon LP answers need more STAR format structure", action: "View Tips", color: "#3b82f6" },
  { icon: TrendingUp, text: "Great progress! You've improved 12 points this week", action: "View Report", color: "#10b981" },
]

function ActivityHeatmap() {
  const days = Array.from({ length: 7 * 12 }) // 12 weeks
  return (
    <div className="flex flex-wrap gap-1">
      {days.map((_, i) => {
        const intensity = Math.random()
        return (
          <UITooltip key={i}>
            <TooltipTrigger asChild>
              <div
                className="w-3 h-3 rounded-[2px] transition-all hover:scale-125 cursor-pointer"
                style={{
                  background: intensity > 0.8 ? "#8b5cf6" : 
                              intensity > 0.5 ? "rgba(139,92,246,0.6)" :
                              intensity > 0.2 ? "rgba(139,92,246,0.3)" : 
                              "rgba(255,255,255,0.04)"
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
               <p className="text-[10px]">{Math.floor(intensity * 10)} interviews on Day {i}</p>
            </TooltipContent>
          </UITooltip>
        )
      })}
    </div>
  )
}

const chartConfig = {
  score: { label: "Score", color: "#8b5cf6" },
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <PageTransition><DashboardSkeleton /></PageTransition>

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Welcome */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Good morning, John 👋
            </h2>
            <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>You have 3 mock sessions scheduled this week.</p>
          </div>
          <Link to="/interview/setup">
            <Button className="neon-button gap-2 hidden sm:flex">
              <Play size={16} /> Start Interview
            </Button>
          </Link>
        </motion.div>

        {/* Top stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Credits Left", value: "47", sub: "Pro plan", icon: Zap, color: "#8b5cf6", progress: 47 },
            { label: "Avg Score", value: "81", sub: "+12 this week", icon: Trophy, color: "#3b82f6", progress: 81 },
            { label: "Interviews", value: "24", sub: "This month", icon: BarChart3, color: "#06b6d4", progress: null },
            { label: "Resume Score", value: "87", sub: "ATS optimized", icon: Star, color: "#10b981", progress: 87 },
          ].map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
              <GlassCard className="p-5" hover>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                    <stat.icon size={18} style={{ color: stat.color }} />
                  </div>
                  <ArrowUpRight size={14} style={{ color: "#475569" }} />
                </div>
                <p className="text-2xl font-black text-white mb-0.5">{stat.value}{stat.label === "Avg Score" || stat.label === "Resume Score" ? "" : ""}</p>
                <p className="text-xs mb-3" style={{ color: "#94a3b8" }}>{stat.label}</p>
                {stat.progress !== null && (
                  <Progress value={stat.progress} className="h-1" style={{ background: "rgba(255,255,255,0.06)" }} />
                )}
                <p className="text-xs mt-1" style={{ color: "#475569" }}>{stat.sub}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Weekly progress */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="lg:col-span-2">
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-white text-sm">Weekly Performance</h3>
                  <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>Score trend over the last 7 days</p>
                </div>
                <Badge style={{ background: "rgba(16,185,129,0.15)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <TrendingUp size={10} className="mr-1 inline" />+12%
                </Badge>
              </div>
              <ChartContainer config={chartConfig} className="w-full h-48">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="day" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 100]} tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} fill="url(#scoreGrad)" dot={{ fill: "#8b5cf6", r: 3 }} />
                </AreaChart>
              </ChartContainer>
            </GlassCard>
          </motion.div>

          {/* Skill Radar */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className="space-y-4">
            <GlassCard className="p-5 flex flex-col">
              <h3 className="font-bold text-white text-sm mb-1">Skill Analytics</h3>
              <p className="text-xs mb-4" style={{ color: "#64748b" }}>Your skill breakdown</p>
              <div className="flex-1 flex items-center justify-center">
                <ChartContainer config={{}} className="w-full h-48">
                  <RadarChart data={skillData} outerRadius={65}>
                    <PolarGrid stroke="rgba(255,255,255,0.06)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: "#475569", fontSize: 10 }} />
                    <Radar dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} strokeWidth={1.5} />
                  </RadarChart>
                </ChartContainer>
              </div>
            </GlassCard>

            <GlassCard className="p-5">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white text-xs">Interview Activity</h3>
                  <span className="text-[10px] text-slate-500">Last 12 weeks</span>
               </div>
               <ActivityHeatmap />
               <div className="flex items-center gap-2 mt-4 text-[10px] text-slate-500">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {[0.04, 0.3, 0.6, 1].map((o, idx) => (
                      <div key={idx} className="w-2.5 h-2.5 rounded-[2px]" style={{ background: idx === 0 ? "rgba(255,255,255,0.04)" : `rgba(139,92,246,${o})` }} />
                    ))}
                  </div>
                  <span>More</span>
               </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Interviews */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6} className="lg:col-span-2">
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-white text-sm">Recent Interviews</h3>
                <Link to="/history" className="text-xs flex items-center gap-1 hover:text-violet-300 transition-colors" style={{ color: "#8b5cf6" }}>
                  View All <ChevronRight size={12} />
                </Link>
              </div>
              <div className="space-y-3">
                {recentInterviews.map((interview, i) => (
                  <motion.div key={i} variants={fadeUp} initial="hidden" animate="visible" custom={i}
                    className="flex items-center gap-4 p-3 rounded-xl transition-all duration-200 hover:bg-white/5 cursor-pointer">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ background: "rgba(139,92,246,0.15)", color: "#c4b5fd" }}>
                      {interview.company[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{interview.role} @ {interview.company}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge className="text-xs px-1.5 py-0" style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.06)" }}>
                          {interview.type}
                        </Badge>
                        <span className="text-xs" style={{ color: "#475569" }}>{interview.date}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-black" style={{ color: interview.score >= 80 ? "#10b981" : interview.score >= 70 ? "#f59e0b" : "#ef4444" }}>
                        {interview.score}
                      </p>
                      <p className="text-xs" style={{ color: "#475569" }}>score</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Overall Score Ring */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={7}>
              <GlassCard className="p-5 flex flex-col items-center text-center">
                <h3 className="font-bold text-white text-sm mb-4 self-start">Overall Score</h3>
                <ScoreRing score={81} size={130} color="#8b5cf6" label="/ 100" />
                <div className="grid grid-cols-3 w-full gap-2 mt-4">
                  {[["Technical", 78, "#8b5cf6"], ["Communication", 85, "#3b82f6"], ["Confidence", 83, "#06b6d4"]].map(([label, val, color]) => (
                    <div key={label as string} className="text-center">
                      <p className="text-base font-bold" style={{ color: color as string }}>{val as number}</p>
                      <p className="text-[10px]" style={{ color: "#475569" }}>{label as string}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* AI Suggestions */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={8}>
              <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Brain size={16} style={{ color: "#8b5cf6" }} />
                  <h3 className="font-bold text-white text-sm">AI Suggestions</h3>
                </div>
                <div className="space-y-3">
                  {aiSuggestions.map((s, i) => (
                    <div key={i} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                      <div className="flex items-start gap-2 mb-2">
                        <s.icon size={14} className="mt-0.5 shrink-0" style={{ color: s.color }} />
                        <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>{s.text}</p>
                      </div>
                      <button className="text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all" style={{ color: s.color }}>
                        {s.action} <ArrowUpRight size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Upcoming sessions */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={9}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} style={{ color: "#3b82f6" }} />
              <h3 className="font-bold text-white text-sm">Upcoming Mock Sessions</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: "Google SWE - System Design", time: "Tomorrow, 3 PM", type: "System Design" },
                { title: "Behavioral - Amazon LP", time: "Thu, 5 PM", type: "Behavioral" },
                { title: "Coding - Hard LeetCode", time: "Fri, 2 PM", type: "Coding" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(59,130,246,0.15)" }}>
                    <Clock size={16} style={{ color: "#3b82f6" }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">{s.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{s.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </PageTransition>
  )
}
