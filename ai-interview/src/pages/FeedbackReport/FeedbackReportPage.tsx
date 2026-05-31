import { motion } from "framer-motion"
import {
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Download,
  Share2,
  Linkedin,
  ChevronRight,
  Brain,
  Target,
  Star,
  Award,
  MessageSquare,
} from "lucide-react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartTooltipContent } from "@/components/ui/chart"
import GlassCard from "@/components/shared/GlassCard"
import ScoreRing from "@/components/shared/ScoreRing"
import PageTransition from "@/components/shared/PageTransition"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
}

const radarData = [
  { subject: "Technical", A: 82, fullMark: 100 },
  { subject: "Communication", A: 88, fullMark: 100 },
  { subject: "Confidence", A: 74, fullMark: 100 },
  { subject: "Fluency", A: 90, fullMark: 100 },
  { subject: "HR Readiness", A: 85, fullMark: 100 },
  { subject: "Problem Solving", A: 78, fullMark: 100 },
]

const timelineData = [
  { name: "Intro", score: 85 },
  { name: "Technical Q1", score: 72 },
  { name: "Technical Q2", score: 88 },
  { name: "Coding", score: 81 },
  { name: "Behavioral", score: 92 },
  { name: "Closing", score: 89 },
]

export default function FeedbackReportPage() {
  return (
    <PageTransition>
      <div className="max-w-7xl space-y-6 pb-12 mx-auto">
        {/* Header Actions */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="sm:flex-row sm:items-center gap-4 flex flex-col justify-between"
        >
          <div>
            <h2
              className="text-2xl font-black text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Interview Feedback Report
            </h2>
            <p className="text-sm text-slate-400">
              Software Engineer Interview • May 27, 2026
            </p>
          </div>
          <div className="gap-2 flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/5 border-white/10 text-sm gap-2"
            >
              <Download size={14} /> Download PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/5 border-white/10 text-sm gap-2"
            >
              <Linkedin size={14} className="text-blue-400" /> Share on LinkedIn
            </Button>
            <Button size="sm" className="neon-button text-sm gap-2">
              <Share2 size={14} /> Share Report
            </Button>
          </div>
        </motion.div>

        {/* Main Score & Radar */}
        <div className="lg:grid-cols-3 gap-6 grid grid-cols-1">
          <GlassCard className="lg:col-span-1 p-8 flex flex-col items-center justify-center text-center">
            <ScoreRing
              score={84}
              size={180}
              strokeWidth={12}
              color="#8b5cf6"
              label="Overall Score"
            />
            <div className="mt-8 gap-4 grid w-full grid-cols-2">
              <div className="p-3 rounded-2xl bg-green-500/10 border-green-500/20 border">
                <p className="font-bold text-green-400 tracking-widest mb-1 text-sm uppercase">
                  Status
                </p>
                <p className="text-sm font-bold text-white">Hire-Ready</p>
              </div>
              <div className="p-3 rounded-2xl bg-violet-500/10 border-violet-500/20 border">
                <p className="font-bold text-violet-400 tracking-widest mb-1 text-sm uppercase">
                  Percentile
                </p>
                <p className="text-sm font-bold text-white">Top 8%</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="lg:col-span-2 p-6 flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">
                Competency Analysis
              </h3>
              <Badge
                variant="outline"
                className="border-white/10 text-slate-400"
              >
                Radar View
              </Badge>
            </div>
            <div className="flex min-h-[300px] flex-1 items-center justify-center">
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={radarData}
                >
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />
                  <Radar
                    name="Candidate"
                    dataKey="A"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0d0d1f",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Detailed Metrics */}
        <div className="md:grid-cols-2 lg:grid-cols-4 gap-4 grid grid-cols-1">
          {[
            {
              label: "Technical Score",
              val: 82,
              icon: Brain,
              color: "#8b5cf6",
            },
            {
              label: "Communication",
              val: 88,
              icon: MessageSquare,
              color: "#3b82f6",
            },
            { label: "Confidence", val: 74, icon: Star, color: "#06b6d4" },
            { label: "Fluency", val: 90, icon: Target, color: "#10b981" },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <GlassCard className="p-5" hover>
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: `${m.color}15` }}
                  >
                    <m.icon size={16} style={{ color: m.color }} />
                  </div>
                  <span className="text-lg font-black text-white">
                    {m.val}%
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-400">{m.label}</p>
                <Progress
                  value={m.val}
                  className="h-1 mt-3"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Timeline Chart */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <GlassCard className="p-6">
            <h3 className="font-bold text-white text-sm mb-6">
              Performance Timeline
            </h3>
            <div className="min-h-[16rem] h-auto md:h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.03)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#475569", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fill: "#475569", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#colorScore)"
                    dot={{ fill: "#8b5cf6", r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Feedback Grid */}
        <div className="lg:grid-cols-2 gap-6 grid grid-cols-1">
          {/* Strengths & Weaknesses */}
          <div className="space-y-4">
            <GlassCard className="p-6">
              <h3 className="font-bold text-white text-sm mb-4 gap-2 flex items-center">
                <CheckCircle2 size={16} className="text-green-400" /> Key
                Strengths
              </h3>
              <div className="space-y-3">
                {[
                  "Excellent explanation of React's reconciliation algorithm.",
                  "Strong demonstration of problem-solving for edge cases in coding.",
                  "Confident and professional communication style throughout.",
                  "Clear articulation of system design trade-offs.",
                ].map((s, i) => (
                  <div
                    key={i}
                    className="gap-3 p-3 rounded-xl bg-green-500/5 border-green-500/10 flex border"
                  >
                    <Award
                      size={14}
                      className="text-green-400 mt-0.5 shrink-0"
                    />
                    <p className="text-sm text-slate-300">{s}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-bold text-white text-sm mb-4 gap-2 flex items-center">
                <AlertCircle size={16} className="text-red-400" /> Areas for
                Improvement
              </h3>
              <div className="space-y-3">
                {[
                  "Optimize space complexity in your algorithm — currently O(n).",
                  "Reduce usage of filler words ('um', 'like') during behavioral answers.",
                  "Be more concise when explaining past project challenges.",
                  "Improve depth in testing strategies for frontend components.",
                ].map((w, i) => (
                  <div
                    key={i}
                    className="gap-3 p-3 rounded-xl bg-red-500/5 border-red-500/10 flex border"
                  >
                    <Target
                      size={14}
                      className="text-red-400 mt-0.5 shrink-0"
                    />
                    <p className="text-sm text-slate-300">{w}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* AI Learning Path */}
          <GlassCard className="p-6 flex flex-col">
            <div className="gap-2 mb-6 flex items-center">
              <div className="p-2 rounded-lg bg-violet-500/10 border-violet-500/20 border">
                <GraduationCap size={16} className="text-violet-400" />
              </div>
              <h3 className="font-bold text-white text-sm">
                Recommended Learning Path
              </h3>
            </div>

            <div className="space-y-6 flex-1">
              {[
                {
                  title: "Mastering System Design",
                  desc: "Focus on load balancing and database sharding for large scale apps.",
                  progress: 45,
                  color: "#8b5cf6",
                },
                {
                  title: "Advanced React Patterns",
                  desc: "Deep dive into Compound Components and Render Props.",
                  progress: 70,
                  color: "#3b82f6",
                },
                {
                  title: "Mock Behavioral Prep",
                  desc: "Practice the STAR method for leadership questions.",
                  progress: 20,
                  color: "#06b6d4",
                },
              ].map((path, i) => (
                <div key={i} className="pl-8 border-white/5 relative border-l">
                  <div
                    className="top-0 absolute left-[-5px] h-[9px] w-[9px] rounded-full"
                    style={{ backgroundColor: path.color }}
                  />
                  <h4 className="text-sm font-bold text-white mb-1">
                    {path.title}
                  </h4>
                  <p className="text-sm text-slate-400 mb-3">{path.desc}</p>
                  <div className="gap-3 flex items-center">
                    <Progress
                      value={path.progress}
                      className="h-1 flex-1"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    />
                    <span className="font-bold text-slate-500 text-sm">
                      {path.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Button className="mt-8 neon-button gap-2 w-full">
              Explore All Courses <ChevronRight size={16} />
            </Button>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}
