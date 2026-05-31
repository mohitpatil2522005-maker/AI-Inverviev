import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Send,
  Bot,
  User,
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  DollarSign,
  ChevronRight,
  Search,
  PlusCircle,
  History,
  Lightbulb,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import GlassCard from "@/components/shared/GlassCard"
import PageTransition from "@/components/shared/PageTransition"

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
}

const suggestedPrompts = [
  "How can I improve my system design skills?",
  "What is the salary range for L4 SWE at Google?",
  "Review my resume for a PM role at Amazon.",
  "Give me a 3-month roadmap for DevOps.",
]

export default function CareerCoachPage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello John! I'm your AI Career Coach. I can help you with interview prep, resume advice, salary guidance, and career roadmaps. How can I assist you today?",
      time: "12:00 PM",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg = {
      role: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
    setMessages([...messages, newMsg])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      const aiResponse = {
        role: "ai",
        text: "That's a great question. Improving your system design skills requires a combination of understanding architectural patterns and practicing real-world scenarios. I recommend starting with 'Grokking the System Design Interview' and focusing on scalability, availability, and reliability concepts.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 2000)
  }

  return (
    <PageTransition>
      <div className="gap-4 flex min-h-[calc(100vh-8rem)] h-auto lg:h-[calc(100vh-8rem)] overflow-hidden">
        {/* Left Sidebar: History & Quick Actions */}
        <div className="lg:flex w-72 gap-4 hidden flex-col">
          <Button className="neon-button gap-2 py-6 w-full">
            <PlusCircle size={18} /> New Coaching Session
          </Button>

          <GlassCard className="p-4 flex flex-1 flex-col overflow-hidden">
            <h3 className="font-bold text-slate-500 tracking-widest mb-4 gap-2 flex items-center text-sm uppercase">
              <History size={14} /> Recent Sessions
            </h3>
            <div className="space-y-2 scrollbar-hidden flex-1 overflow-y-auto">
              {[
                "Google L4 Prep Strategy",
                "Resume Review - SWE",
                "Salary Negotiation Tips",
                "System Design Basics",
                "Behavioral Prep - STAR",
              ].map((session, i) => (
                <button
                  key={i}
                  className="p-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/5 w-full truncate border border-transparent text-left transition-all"
                >
                  {session}
                </button>
              ))}
            </div>

            <Separator className="my-4 bg-white/5" />

            <div className="space-y-4">
              <h3 className="font-bold text-slate-500 tracking-widest gap-2 flex items-center text-sm uppercase">
                <Sparkles size={14} className="text-primary" /> Career Roadmap
              </h3>
              <div className="p-3 rounded-xl border border-primary/10 bg-primary/5">
                <p className="text-slate-300 mb-2 text-[11px]">
                  Target: Staff Engineer
                </p>
                <div className="h-1 bg-white/5 overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    className="h-full bg-primary"
                  />
                </div>
                <p className="text-slate-500 mt-2 text-right text-[9px]">
                  65% Complete
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Main Chat Area */}
        <div className="gap-4 min-w-0 flex flex-1 flex-col">
          <GlassCard className="p-0 relative flex flex-1 flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="px-6 py-4 border-white/10 bg-white/[0.02] flex items-center justify-between border-b">
              <div className="gap-3 flex items-center">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-primary/30 bg-primary/20">
                  <Bot size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    AI Career Coach
                  </h3>
                  <div className="gap-1.5 flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 animate-pulse rounded-full" />
                    <span className="text-slate-500 text-sm">
                      Online & Ready to help
                    </span>
                  </div>
                </div>
              </div>
              <div className="gap-2 flex">
                <Button variant="ghost" size="icon" className="text-slate-400">
                  <Search size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400">
                  <Info size={18} />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-6 scrollbar-hidden flex-1 overflow-y-auto">
              {messages.length === 1 && (
                <div className="md:grid-cols-2 gap-3 mb-8 grid grid-cols-1">
                  {suggestedPrompts.map((prompt, i) => (
                    <motion.button
                      key={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                      onClick={() => {
                        setInput(prompt)
                        handleSend()
                      }}
                      className="p-4 rounded-2xl bg-white/[0.02] border-white/5 hover:bg-white/5 text-sm text-slate-400 group border text-left transition-all hover:border-primary/30"
                    >
                      <p className="group-hover:text-white transition-colors">
                        {prompt}
                      </p>
                      <ChevronRight
                        size={14}
                        className="mt-2 text-slate-600 transition-colors group-hover:text-primary"
                      />
                    </motion.button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`gap-4 flex ${msg.role === "user" ? "flex-row-reverse text-right" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex shrink-0 items-center justify-center ${
                      msg.role === "ai"
                        ? "border border-primary/30 bg-primary/20 text-primary"
                        : "bg-slate-800 text-slate-400 border-white/10 border"
                    }`}
                  >
                    {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                      msg.role === "ai"
                        ? "bg-white/[0.03] border-white/10 text-slate-200 rounded-tl-none border"
                        : "text-white rounded-tr-none border border-primary/20 bg-primary/10 text-left"
                    }`}
                  >
                    {msg.text}
                    <p className="mt-2 text-slate-500 text-sm opacity-60">
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="gap-4 flex">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-primary/30 bg-primary/20 text-primary">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border-white/10 gap-1 flex rounded-tl-none border">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        delay: 0.2,
                      }}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        delay: 0.4,
                      }}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-6 bg-white/[0.02] border-white/10 border-t">
              <div className="max-w-4xl relative mx-auto">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything about your career..."
                  className="h-14 pl-6 pr-14 rounded-2xl bg-white/5 border-white/10 text-white focus:ring-primary/50"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  className="right-2 w-10 h-10 rounded-xl neon-button absolute top-1/2 -translate-y-1/2"
                >
                  <Send size={18} />
                </Button>
              </div>
              <p className="text-slate-600 mt-3 text-center text-sm">
                AI Coach may provide inaccurate info about people, places, or
                facts.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Right Sidebar: AI Suggestions & Stats */}
        <div className="xl:flex w-72 gap-4 hidden flex-col">
          <GlassCard className="p-5">
            <h3 className="text-sm font-bold text-white mb-4 gap-2 flex items-center">
              <Brain size={14} className="text-primary" /> Smart Insights
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: Target,
                  label: "Interview Goal",
                  val: "Google L4",
                  color: "#8b5cf6",
                },
                {
                  icon: TrendingUp,
                  label: "Growth Area",
                  val: "System Design",
                  color: "#3b82f6",
                },
                {
                  icon: DollarSign,
                  label: "Target Salary",
                  val: "$180k - $220k",
                  color: "#10b981",
                },
              ].map((item, i) => (
                <div key={i} className="gap-3 flex items-center">
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: `${item.color}15` }}
                  >
                    <item.icon size={14} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-500 text-sm uppercase">
                      {item.label}
                    </p>
                    <p className="text-sm font-bold text-white">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5 flex-1 overflow-hidden">
            <h3 className="text-sm font-bold text-white mb-4 gap-2 flex items-center">
              <Lightbulb size={14} className="text-yellow-400" /> Action Items
            </h3>
            <div className="space-y-3 scrollbar-hidden h-full overflow-y-auto">
              {[
                "Finish LeetCode 75 challenge",
                "Update LinkedIn experience",
                "Practice STAR method for Google",
                "Read System Design Primer",
                "Attend React Meetup next Tue",
              ].map((item, i) => (
                <div
                  key={i}
                  className="gap-3 p-3 rounded-xl bg-white/[0.02] border-white/5 group flex cursor-pointer items-center border transition-all hover:border-primary/30"
                >
                  <div className="w-4 h-4 border-white/20 flex items-center justify-center rounded border group-hover:border-primary/50">
                    <div className="w-2 h-2 rounded-sm bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <span className="text-slate-400 group-hover:text-slate-200 text-[11px] transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}
