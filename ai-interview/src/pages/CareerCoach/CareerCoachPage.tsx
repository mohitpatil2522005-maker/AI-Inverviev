import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send, Bot, User, Sparkles, Brain, Target,
  TrendingUp, Briefcase, DollarSign, Map,
  ChevronRight, Search, PlusCircle, History,
  Lightbulb, Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import GlassCard from "@/components/shared/GlassCard"
import PageTransition from "@/components/shared/PageTransition"
import TypingText from "@/components/shared/TypingText"

const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }) }

const suggestedPrompts = [
  "How can I improve my system design skills?",
  "What is the salary range for L4 SWE at Google?",
  "Review my resume for a PM role at Amazon.",
  "Give me a 3-month roadmap for DevOps.",
]

export default function CareerCoachPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello John! I'm your AI Career Coach. I can help you with interview prep, resume advice, salary guidance, and career roadmaps. How can I assist you today?", time: "12:00 PM" }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg = { role: "user", text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages([...messages, newMsg])
    setInput("")
    setIsTyping(true)
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      const aiResponse = { 
        role: "ai", 
        text: "That's a great question. Improving your system design skills requires a combination of understanding architectural patterns and practicing real-world scenarios. I recommend starting with 'Grokking the System Design Interview' and focusing on scalability, availability, and reliability concepts.", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 2000)
  }

  return (
    <PageTransition>
      <div className="h-[calc(100vh-8rem)] flex gap-4 overflow-hidden">
        {/* Left Sidebar: History & Quick Actions */}
        <div className="hidden lg:flex w-72 flex-col gap-4">
          <Button className="w-full neon-button gap-2 py-6">
            <PlusCircle size={18} /> New Coaching Session
          </Button>
          
          <GlassCard className="flex-1 p-4 flex flex-col overflow-hidden">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <History size={14} /> Recent Sessions
            </h3>
            <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hidden">
              {[
                "Google L4 Prep Strategy",
                "Resume Review - SWE",
                "Salary Negotiation Tips",
                "System Design Basics",
                "Behavioral Prep - STAR",
              ].map((session, i) => (
                <button key={i} className="w-full text-left p-2.5 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-all truncate border border-transparent hover:border-white/5">
                  {session}
                </button>
              ))}
            </div>
            
            <Separator className="my-4 bg-white/5" />
            
            <div className="space-y-4">
               <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <Sparkles size={14} className="text-primary" /> Career Roadmap
               </h3>
               <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-[11px] text-slate-300 mb-2">Target: Staff Engineer</p>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} className="h-full bg-primary" />
                  </div>
                  <p className="text-[9px] text-slate-500 mt-2 text-right">65% Complete</p>
               </div>
            </div>
          </GlassCard>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden relative">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Bot size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">AI Career Coach</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-slate-500">Online & Ready to help</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-slate-400"><Search size={18} /></Button>
                <Button variant="ghost" size="icon" className="text-slate-400"><Info size={18} /></Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hidden">
              {messages.length === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {suggestedPrompts.map((prompt, i) => (
                    <motion.button
                      key={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                      onClick={() => { setInput(prompt); handleSend(); }}
                      className="text-left p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-primary/30 transition-all text-xs text-slate-400 group"
                    >
                      <p className="group-hover:text-white transition-colors">{prompt}</p>
                      <ChevronRight size={14} className="mt-2 text-slate-600 group-hover:text-primary transition-colors" />
                    </motion.button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse text-right" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                    msg.role === "ai" 
                      ? "bg-primary/20 text-primary border border-primary/30" 
                      : "bg-slate-800 text-slate-400 border border-white/10"
                  }`}>
                    {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "ai" 
                      ? "bg-white/[0.03] border border-white/10 text-slate-200 rounded-tl-none" 
                      : "bg-primary/10 border border-primary/20 text-white rounded-tr-none text-left"
                  }`}>
                    {msg.text}
                    <p className="text-[10px] mt-2 text-slate-500 opacity-60">{msg.time}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary border border-primary/30 flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 rounded-tl-none flex gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-6 bg-white/[0.02] border-t border-white/10">
              <div className="relative max-w-4xl mx-auto">
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl neon-button"
                >
                  <Send size={18} />
                </Button>
              </div>
              <p className="text-[10px] text-center text-slate-600 mt-3">
                AI Coach may provide inaccurate info about people, places, or facts.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Right Sidebar: AI Suggestions & Stats */}
        <div className="hidden xl:flex w-72 flex-col gap-4">
           <GlassCard className="p-5">
              <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-2">
                <Brain size={14} className="text-primary" /> Smart Insights
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Target, label: "Interview Goal", val: "Google L4", color: "#8b5cf6" },
                  { icon: TrendingUp, label: "Growth Area", val: "System Design", color: "#3b82f6" },
                  { icon: DollarSign, label: "Target Salary", val: "$180k - $220k", color: "#10b981" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ background: `${item.color}15` }}>
                      <item.icon size={14} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">{item.label}</p>
                      <p className="text-xs font-bold text-white">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
           </GlassCard>

           <GlassCard className="flex-1 p-5 overflow-hidden">
              <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb size={14} className="text-yellow-400" /> Action Items
              </h3>
              <div className="space-y-3 overflow-y-auto scrollbar-hidden h-full">
                {[
                  "Finish LeetCode 75 challenge",
                  "Update LinkedIn experience",
                  "Practice STAR method for Google",
                  "Read System Design Primer",
                  "Attend React Meetup next Tue"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 group cursor-pointer hover:border-primary/30 transition-all">
                    <div className="w-4 h-4 rounded border border-white/20 flex items-center justify-center group-hover:border-primary/50">
                       <div className="w-2 h-2 rounded-sm bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[11px] text-slate-400 group-hover:text-slate-200 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
           </GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}
