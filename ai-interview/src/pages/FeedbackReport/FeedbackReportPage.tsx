import { motion } from "framer-motion"
import {
  BarChart3, TrendingUp, CheckCircle2, AlertCircle,
  Lightbulb, GraduationCap, Download, Share2, Linkedin,
  ChevronRight, Brain, Target, Star, Award, MessageSquare
} from "lucide-react"
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip
} from "recharts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import GlassCard from "@/components/shared/GlassCard"
import ScoreRing from "@/components/shared/ScoreRing"
import PageTransition from "@/components/shared/PageTransition"

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }) }

const radarData = [
  { subject: 'Technical', A: 82, fullMark: 100 },
  { subject: 'Communication', A: 88, fullMark: 100 },
  { subject: 'Confidence', A: 74, fullMark: 100 },
  { subject: 'Fluency', A: 90, fullMark: 100 },
  { subject: 'HR Readiness', A: 85, fullMark: 100 },
  { subject: 'Problem Solving', A: 78, fullMark: 100 },
]

const timelineData = [
  { name: 'Intro', score: 85 },
  { name: 'Technical Q1', score: 72 },
  { name: 'Technical Q2', score: 88 },
  { name: 'Coding', score: 81 },
  { name: 'Behavioral', score: 92 },
  { name: 'Closing', score: 89 },
]

export default function FeedbackReportPage() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        {/* Header Actions */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Interview Feedback Report</h2>
            <p className="text-sm text-slate-400">Software Engineer Interview • May 27, 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-xs gap-2">
              <Download size={14} /> Download PDF
            </Button>
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-xs gap-2">
              <Linkedin size={14} className="text-blue-400" /> Share on LinkedIn
            </Button>
            <Button size="sm" className="neon-button text-xs gap-2">
              <Share2 size={14} /> Share Report
            </Button>
          </div>
        </motion.div>

        {/* Main Score & Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="lg:col-span-1 p-8 flex flex-col items-center justify-center text-center">
             <ScoreRing score={84} size={180} strokeWidth={12} color="#8b5cf6" label="Overall Score" />
             <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20">
                   <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1">Status</p>
                   <p className="text-sm font-bold text-white">Hire-Ready</p>
                </div>
                <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20">
                   <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-1">Percentile</p>
                   <p className="text-sm font-bold text-white">Top 8%</p>
                </div>
             </div>
          </GlassCard>

          <GlassCard className="lg:col-span-2 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white text-sm">Competency Analysis</h3>
              <Badge variant="outline" className="border-white/10 text-slate-400">Radar View</Badge>
            </div>
            <div className="flex-1 min-h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Radar
                    name="Candidate"
                    dataKey="A"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Tooltip contentStyle={{ backgroundColor: '#0d0d1f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Technical Score", val: 82, icon: Brain, color: "#8b5cf6" },
            { label: "Communication", val: 88, icon: MessageSquare, color: "#3b82f6" },
            { label: "Confidence", val: 74, icon: Star, color: "#06b6d4" },
            { label: "Fluency", val: 90, icon: Target, color: "#10b981" },
          ].map((m, i) => (
            <motion.div key={m.label} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
              <GlassCard className="p-5" hover>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg" style={{ background: `${m.color}15` }}>
                    <m.icon size={16} style={{ color: m.color }} />
                  </div>
                  <span className="text-lg font-black text-white">{m.val}%</span>
                </div>
                <p className="text-xs font-medium text-slate-400">{m.label}</p>
                <Progress value={m.val} className="h-1 mt-3" style={{ background: "rgba(255,255,255,0.06)" }} />
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Timeline Chart */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
          <GlassCard className="p-6">
            <h3 className="font-bold text-white text-sm mb-6">Performance Timeline</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorScore)" dot={{ fill: "#8b5cf6", r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Feedback Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strengths & Weaknesses */}
          <div className="space-y-4">
            <GlassCard className="p-6">
               <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
                 <CheckCircle2 size={16} className="text-green-400" /> Key Strengths
               </h3>
               <div className="space-y-3">
                 {[
                   "Excellent explanation of React's reconciliation algorithm.",
                   "Strong demonstration of problem-solving for edge cases in coding.",
                   "Confident and professional communication style throughout.",
                   "Clear articulation of system design trade-offs."
                 ].map((s, i) => (
                   <div key={i} className="flex gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/10">
                      <Award size={14} className="text-green-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-300">{s}</p>
                   </div>
                 ))}
               </div>
            </GlassCard>

            <GlassCard className="p-6">
               <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
                 <AlertCircle size={16} className="text-red-400" /> Areas for Improvement
               </h3>
               <div className="space-y-3">
                 {[
                   "Optimize space complexity in your algorithm — currently O(n).",
                   "Reduce usage of filler words ('um', 'like') during behavioral answers.",
                   "Be more concise when explaining past project challenges.",
                   "Improve depth in testing strategies for frontend components."
                 ].map((w, i) => (
                   <div key={i} className="flex gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                      <Target size={14} className="text-red-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-300">{w}</p>
                   </div>
                 ))}
               </div>
            </GlassCard>
          </div>

          {/* AI Learning Path */}
          <GlassCard className="p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                <GraduationCap size={16} className="text-violet-400" />
              </div>
              <h3 className="font-bold text-white text-sm">Recommended Learning Path</h3>
            </div>
            
            <div className="flex-1 space-y-6">
              {[
                { title: "Mastering System Design", desc: "Focus on load balancing and database sharding for large scale apps.", progress: 45, color: "#8b5cf6" },
                { title: "Advanced React Patterns", desc: "Deep dive into Compound Components and Render Props.", progress: 70, color: "#3b82f6" },
                { title: "Mock Behavioral Prep", desc: "Practice the STAR method for leadership questions.", progress: 20, color: "#06b6d4" },
              ].map((path, i) => (
                <div key={i} className="relative pl-8 border-l border-white/5">
                  <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full" style={{ backgroundColor: path.color }} />
                  <h4 className="text-sm font-bold text-white mb-1">{path.title}</h4>
                  <p className="text-xs text-slate-400 mb-3">{path.desc}</p>
                  <div className="flex items-center gap-3">
                    <Progress value={path.progress} className="h-1 flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <span className="text-[10px] font-bold text-slate-500">{path.progress}%</span>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-8 neon-button gap-2">
              Explore All Courses <ChevronRight size={16} />
            </Button>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}
