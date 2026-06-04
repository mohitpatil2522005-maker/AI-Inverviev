import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Zap, TrendingUp, Play, BarChart3, Star, ArrowUpRight, Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts"
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import GlassCard from "@/components/shared/GlassCard"
// ScoreRing unused; removed to fix TS6133
import PageTransition from "@/components/shared/PageTransition"
import { DashboardSkeleton } from "@/components/shared/SkeletonLoaders"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4 },
  }),
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <DashboardSkeleton />

  return (
    <PageTransition>
      <div className="space-y-8 pb-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <h1 className="text-3xl font-black text-white font-heading tracking-tight">Good morning, John 👋</h1>
            <p className="text-slate-400 mt-1">You have 3 mock sessions scheduled this week.</p>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
            <Link to="/interview/setup">
              <Button size="lg" className="neon-button px-8 group">
                <Play className="mr-2 h-4 w-4 fill-current group-hover:scale-110 transition-transform" />
                Start Interview
              </Button>
            </Link>
          </motion.div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            icon={<Zap className="w-5 h-5 text-primary" />} 
            label="Credits Left" 
            value="47" 
            progress={47} 
            footer="Pro plan" 
            color="var(--color-primary)"
            index={2}
          />
          <StatCard 
            icon={<Trophy className="w-5 h-5 text-secondary" />} 
            label="Avg Score" 
            value="81" 
            progress={81} 
            footer="+12 this week" 
            color="var(--color-secondary)"
            index={3}
          />
          <StatCard 
            icon={<BarChart3 className="w-5 h-5 text-accent" />} 
            label="Interviews" 
            value="24" 
            progress={65} 
            footer="This month" 
            color="var(--color-accent)"
            index={4}
          />
          <StatCard 
            icon={<Star className="w-5 h-5 text-emerald-400" />} 
            label="Resume Score" 
            value="87" 
            progress={87} 
            footer="ATS optimized" 
            color="#10b981"
            index={5}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={6} className="lg:col-span-2">
            <GlassCard className="p-6 h-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-bold text-white">Weekly Performance</h3>
                  <p className="text-xs text-slate-500 mt-1">Score trend over the last 7 days</p>
                </div>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 py-1">
                  <TrendingUp className="w-3 h-3 mr-1" /> +12%
                </Badge>
              </div>
              <div className="h-64 w-full">
                <PerformanceChart />
              </div>
            </GlassCard>
          </motion.div>

          <div className="space-y-6">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={7}>
              <GlassCard className="p-6">
                <h3 className="font-bold text-white mb-6">Skill Analytics</h3>
                <div className="h-56 w-full">
                  <SkillRadar />
                </div>
              </GlassCard>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={8}>
              <ActivityHeatmap />
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

function StatCard({ icon, label, value, progress, footer, color, index }: any) {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={index}>
      <GlassCard className="p-5 group cursor-pointer hover:border-white/20 transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
            {icon}
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
        </div>
        <h4 className="text-2xl font-black text-white">{value}</h4>
        <p className="text-sm text-slate-400 mb-4">{label}</p>
        <Progress value={progress} className="h-1 bg-white/5 transition-all duration-1000" style={{'--progress-background': color} as any} />
        <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-widest font-bold">{footer}</p>
      </GlassCard>
    </motion.div>
  )
}

function PerformanceChart() {
  const data = [
    { day: "Mon", score: 68 },
    { day: "Tue", score: 74 },
    { day: "Wed", score: 71 },
    { day: "Thu", score: 82 },
    { day: "Fri", score: 79 },
    { day: "Sat", score: 85 },
    { day: "Sun", score: 88 },
  ]

  return (
    <ChartContainer config={{ score: { label: "Score", color: "var(--color-primary)" } }}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
        <XAxis 
          dataKey="day" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: "#475569", fontSize: 12 }} 
          dy={10}
        />
        <YAxis 
          hide 
          domain={[50, 100]}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Area 
          type="monotone" 
          dataKey="score" 
          stroke="var(--color-primary)" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorScore)" 
          animationDuration={1500}
        />
      </AreaChart>
    </ChartContainer>
  )
}

function SkillRadar() {
  const data = [
    { subject: "Technical", value: 78 },
    { subject: "Comm", value: 85 },
    { subject: "Logic", value: 72 },
    { subject: "Leadership", value: 65 },
    { subject: "HR", value: 90 },
    { subject: "Coding", value: 80 },
  ]

  return (
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data} width={300} height={200} style={{ margin: '0 auto' }}>
      <PolarGrid stroke="rgba(255,255,255,0.05)" />
      <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 10 }} />
      <Radar
        name="Skills"
        dataKey="value"
        stroke="var(--color-primary)"
        fill="var(--color-primary)"
        fillOpacity={0.2}
      />
    </RadarChart>
  )
}

function ActivityHeatmap() {
  const daysCount = 7 * 12
  const intensities = useMemo(() => {
    return Array.from({ length: daysCount }).map(() => Math.random())
  }, [daysCount])

  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white text-sm">Interview Activity</h3>
        <span className="text-slate-500 text-[10px]">Last 12 weeks</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {intensities.map((intensity: number, i: number) => (
          <UITooltip key={i}>
            <TooltipTrigger>
              <div 
                className="w-3 h-3 rounded-[2px] transition-all hover:scale-125 cursor-pointer"
                style={{ 
                  backgroundColor: intensity > 0.8 ? 'var(--color-primary)' : 
                                   intensity > 0.5 ? 'rgba(139,92,246,0.6)' :
                                   intensity > 0.2 ? 'rgba(139,92,246,0.3)' :
                                   'rgba(255,255,255,0.04)'
                }}
              />
            </TooltipTrigger>
            <TooltipContent>Activity on day {i + 1}</TooltipContent>
          </UITooltip>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4 text-[10px] text-slate-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-[2px] bg-white/5" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/30" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/60" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-primary" />
        </div>
        <span>More</span>
      </div>
    </GlassCard>
  )
}
