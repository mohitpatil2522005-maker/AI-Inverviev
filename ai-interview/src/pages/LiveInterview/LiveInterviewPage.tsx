/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic,
  MicOff,
  Send,
  MessageSquare,
  Info,
  Bot,
  Lightbulb,
  Activity,
  Terminal,
} from "lucide-react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import api from "@/lib/api"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// Reusing existing shared components
import PageTransition from "@/components/shared/PageTransition"

export default function LiveInterviewPage() {
  const [activeTab, setActiveTab] = useState<"chat" | "editor">("chat")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [timeLeft, setTimeLeft] = useState(1800) // 30 mins
  const [transcript, setTranscript] = useState([
    {
      role: "ai",
      text: "Great to have you here, John! Let's dive into some technical challenges. Could you explain your approach to handling state management in large-scale React applications?",
      time: "10:02 AM",
    },
    {
      role: "user",
      text: "In large-scale apps, I typically analyze the state's scope first. For global UI state, Context is fine, but for complex business logic, I prefer Zustand for its efficiency and selector-based updates.",
      time: "10:03 AM",
    },
  ])

  const scrollRef = useRef<HTMLDivElement>(null)
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [transcript])

  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    )
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      const rec = new SpeechRecognition()
      rec.continuous = true
      rec.interimResults = true
      rec.lang = "en-US"

      rec.onresult = (event: any) => {
        const current = event.results[event.results.length - 1]
        const text = current[0].transcript
        setUserInput(text)
      }

      rec.onend = () => {
        if (isListening) rec.start() // Keep listening if active
      }

      setTimeout(() => setRecognition(rec), 0)
    }
  }, [isListening])

  const toggleMic = () => {
    if (isListening) {
      recognition?.stop()
    } else {
      recognition?.start()
    }
    setIsListening(!isListening)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSend = async () => {
    if (!userInput.trim()) return
    const userMsg = {
      role: "user",
      text: userInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
    setTranscript(prev => [...prev, userMsg])
    setUserInput("")

    try {
      setIsSpeaking(true)
      const { data } = await api.post("/ai/chat", { message: userMsg.text })
      const aiMsg = {
        role: "ai",
        text: data.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setTranscript((prev) => [...prev, aiMsg])
    } catch {
      toast.error("Failed to get AI response")
    } finally {
      setIsSpeaking(false)
    }
  }

  return (
    <PageTransition>
      <TooltipProvider>
        <div className="w-full bg-[#080812] text-slate-200 font-sans p-6 overflow-hidden selection:bg-primary/30 selection:text-white min-h-[950px]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6 h-[880px]">
            
            {/* Left Sidebar: AI Visualizer & User Info */}
            <aside className="col-span-3 flex flex-col gap-6 h-full">
              <div className="flex-1 glass-panel rounded-3xl p-8 flex flex-col items-center justify-between relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-15 pointer-events-none"></div>
                
                <div className="relative w-52 h-52 flex items-center justify-center mt-4">
                  <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse-custom"></div>
                  <div className="absolute inset-[-15px] rounded-full border border-accent/10 animate-[pulse-custom_4s_infinite_1s]"></div>
                  <div className="absolute inset-[-30px] rounded-full border border-dashed border-white/5 animate-rotate-slow"></div>

                  <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#1e1b4b] border-2 border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.4)] transition-transform group-hover:scale-105 duration-500 overflow-hidden">
                    <Bot className="w-14 h-14 text-white relative z-10" />
                  </div>

                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 glass-panel rounded-full flex items-center gap-2.5 border border-white/20 shadow-2xl z-20">
                    <div className={cn(
                      "w-2 h-2 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.8)] transition-colors duration-300", 
                      isSpeaking ? "bg-primary animate-pulse" : "bg-emerald-500"
                    )}></div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.25em] whitespace-nowrap">
                      {isSpeaking ? "AI Speaking" : "AI Listening"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center w-full mb-4">
                  <div className="flex items-end justify-center gap-1.5 h-10">
                    {[0.8, 1.2, 0.6, 1.0, 0.7, 1.3, 0.9, 1.1].map((dur, i) => (
                      <motion.div 
                        key={i} 
                        animate={isSpeaking || isListening ? {
                          height: ["4px", i % 2 === 0 ? "28px" : "18px", "4px"],
                          opacity: [0.5, 1, 0.5]
                        } : { height: "4px", opacity: 0.3 }}
                        transition={{
                          duration: dur,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className={cn(
                          "w-1.5 rounded-full", 
                          i % 3 === 0 ? "bg-accent" : "bg-primary"
                        )} 
                      />
                    ))}
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.35em] mt-6 text-center">Audio Activity Frequency</p>
                </div>
              </div>

              <div className="h-[92px] glass-panel rounded-3xl p-5 flex items-center gap-4 border border-white/10 shadow-lg shadow-black/20">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden ring-1 ring-white/5">
                  <img src="https://i.pravatar.cc/100?u=john" alt="User Profile" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-white font-heading">Johnathan Doe</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-medium">L4 Frontend Engineer</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-primary font-mono tracking-tighter">{formatTime(timeLeft)}</p>
                  <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest mt-1">Remaining</p>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="col-span-6 flex flex-col h-full">
              <div className="flex-1 glass-panel rounded-3xl overflow-hidden flex flex-col border border-white/10">
                <header className="px-8 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/20 border border-primary/30">
                      <MessageSquare className="w-[18px] h-[18px] text-[#a78bfa]" />
                    </div>
                    <h2 className="text-sm font-bold text-white font-heading tracking-tight">Session Workspace</h2>
                  </div>
                  
                  <div className="flex bg-black/50 p-1 rounded-xl border border-white/10 shadow-inner">
                    <button 
                      onClick={() => setActiveTab("chat")}
                      className={cn(
                        "px-5 py-2 rounded-lg text-[11px] font-bold transition-all relative",
                        activeTab === "chat" ? "text-white" : "text-slate-500 hover:text-slate-300"
                      )}
                    >
                      {activeTab === "chat" && (
                        <motion.div 
                          layoutId="activeTab" 
                          className="absolute inset-0 bg-primary/90 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.3)]" 
                        />
                      )}
                      <span className="relative z-10">Chat</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab("editor")}
                      className={cn(
                        "px-5 py-2 rounded-lg text-[11px] font-bold transition-all relative",
                        activeTab === "editor" ? "text-white" : "text-slate-500 hover:text-slate-300"
                      )}
                    >
                      {activeTab === "editor" && (
                        <motion.div 
                          layoutId="activeTab" 
                          className="absolute inset-0 bg-primary/90 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.3)]" 
                        />
                      )}
                      <span className="relative z-10">Editor</span>
                    </button>
                  </div>
                </header>

                <div className="flex-1 overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    {activeTab === "chat" ? (
                      <motion.div 
                        key="chat"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="h-full flex flex-col"
                      >
                        <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-8 scrollbar-hidden bg-black/15">
                          {transcript.map((msg, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={cn("flex gap-6 items-start", msg.role === "user" && "flex-row-reverse")}
                            >
                              <div className={cn(
                                "w-10 h-10 rounded-xl shrink-0 flex items-center justify-center shadow-lg transition-transform hover:scale-105",
                                msg.role === "ai" ? "bg-primary/20 border border-primary/40" : "bg-slate-800 border border-white/10 overflow-hidden"
                              )}>
                                {msg.role === "ai" ? (
                                  <Bot className="w-5 h-5 text-[#a78bfa]" />
                                ) : (
                                  <img src="https://i.pravatar.cc/100?u=john" alt="User Avatar" className="w-full h-full object-cover" />
                                )}
                              </div>
                              <div className={cn("flex flex-col gap-2 max-w-[85%]", msg.role === "user" && "items-end")}>
                                <div className={cn(
                                  "px-6 py-4 rounded-3xl text-[13px] leading-relaxed shadow-sm border transition-colors",
                                  msg.role === "ai" 
                                    ? "rounded-tl-none bg-white/[0.06] border-primary/20 text-slate-200 hover:bg-white/[0.08]" 
                                    : "rounded-tr-none bg-primary/25 border-primary/40 text-white hover:bg-primary/30"
                                )}>
                                  {msg.text}
                                </div>
                                <span className={cn("text-[9px] text-slate-500 font-bold uppercase tracking-widest", msg.role === "ai" ? "ml-1" : "mr-1")}>
                                  {msg.role === "ai" ? "AI Interviewer" : "John Doe"} • {msg.time}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                          {isSpeaking && (
                            <motion.div 
                              initial={{ opacity: 0 }} 
                              animate={{ opacity: 1 }} 
                              className="flex gap-6 items-start"
                            >
                              <div className="w-10 h-10 rounded-xl shrink-0 bg-primary/20 border border-primary/40 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-[#a78bfa]" />
                              </div>
                              <div className="px-6 py-4 rounded-3xl rounded-tl-none bg-white/[0.06] border border-primary/20 flex gap-1">
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 rounded-full bg-primary" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 rounded-full bg-primary" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 rounded-full bg-primary" />
                              </div>
                            </motion.div>
                          )}
                        </div>

                        <footer className="p-6 bg-black/40 border-t border-white/10 h-[92px] flex items-center">
                          <div className="flex items-center gap-4 w-full">
                            <Tooltip>
                              <TooltipTrigger 
                                onClick={toggleMic}
                                className={cn(
                                  "p-3.5 rounded-xl border transition-all active:scale-95",
                                  isListening 
                                    ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(139,92,246,0.3)]" 
                                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                                )}
                              >
                                {isListening ? <Mic className="w-[18px] h-[18px]" /> : <MicOff className="w-[18px] h-[18px]" />}
                              </TooltipTrigger>
                              <TooltipContent>{isListening ? "Stop Voice Input" : "Start Voice Input"}</TooltipContent>
                            </Tooltip>
                            
                            <div className="flex-1 relative group">
                              <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                              <input 
                                type="text" 
                                placeholder="Type your response..." 
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                className="relative w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-3.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-600 shadow-inner" 
                              />
                              <button 
                                onClick={handleSend}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:scale-105 active:scale-95 transition-transform"
                                aria-label="Send message"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </footer>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="editor"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full bg-[#1e1e1e]"
                      >
                        <div className="h-full flex flex-col">
                          <div className="flex items-center justify-between px-6 py-2 bg-black/40 border-b border-white/5">
                            <div className="flex items-center gap-2">
                              <Terminal className="w-3.5 h-3.5 text-slate-500" />
                              <span className="text-[10px] font-mono text-slate-400">solution.ts</span>
                            </div>
                            <Badge variant="outline" className="text-[10px] border-emerald-500/20 text-emerald-500 bg-emerald-500/5">Typescript</Badge>
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <Editor
                              height="100%"
                              defaultLanguage="typescript"
                              theme="vs-dark"
                              value={`// Handling state in large-scale React apps\nimport { create } from 'zustand';\n\ninterface AppState {\n  count: number;\n  increment: () => void;\n}\n\nexport const useStore = create<AppState>((set) => ({\n  count: 0,\n  increment: () => set((state) => ({ count: state.count + 1 })),\n}));`}
                              options={{
                                minimap: { enabled: false },
                                fontSize: 13,
                                padding: { top: 20, bottom: 20 },
                                scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
                                lineNumbers: 'on',
                                glyphMargin: false,
                                folding: true,
                                lineDecorationsWidth: 10,
                                lineNumbersMinChars: 3,
                                fontFamily: "var(--font-mono)"
                              }}
                            />
                          </div>
                          <div className="p-4 border-t border-white/5 bg-black/20 flex justify-end gap-3">
                            <Button variant="outline" size="sm" className="h-8 text-[11px] border-white/10 hover:bg-white/5">Reset</Button>
                            <Button size="sm" className="h-8 text-[11px] neon-button">Compile & Run</Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </main>

            {/* Right Sidebar */}
            <aside className="col-span-3 flex flex-col gap-6 h-full">
              <div className="flex-1 glass-panel rounded-3xl p-7 flex flex-col border border-white/10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-[#06b6d4]" />
                  </div>
                  <h3 className="text-sm font-bold text-white font-heading uppercase tracking-wider">Metrics Console</h3>
                </div>

                <div className="space-y-7">
                  {[
                    { label: "Technical Depth", value: 82 },
                    { label: "Confidence", value: 74 },
                    { label: "Clarity", value: 91 }
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{metric.label}</span>
                        <span className="text-xs font-bold" style={{ color: `var(--color-${metric.label.toLowerCase().split(' ')[0]})` }}>{metric.value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="h-full rounded-full" 
                          style={{ backgroundColor: `var(--color-${metric.label.toLowerCase().split(' ')[0]})` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="my-8 h-px bg-white/10"></div>

                <div className="flex-1 space-y-4">
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 flex gap-4 items-start hover:bg-white/[0.06] transition-all group cursor-default">
                    <Lightbulb className="w-3.5 h-3.5 text-[#f59e0b] mt-1 shrink-0 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.4)] transition-all" />
                    <p className="text-[11px] text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                      Mention how <span className="text-slate-200 font-medium">Zustand selectors</span> prevent unnecessary re-renders.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 flex gap-4 items-start hover:bg-white/[0.06] transition-all group cursor-default">
                    <Info className="w-3.5 h-3.5 text-[#3b82f6] mt-1 shrink-0 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.4)] transition-all" />
                    <p className="text-[11px] text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                      Your pace is good. Use more <span className="text-slate-200 font-medium">action words</span>.
                    </p>
                  </div>
                </div>

                <button className="mt-8 w-full h-[52px] rounded-2xl border border-red-500/30 bg-red-500/5 text-red-400 text-[11px] font-bold uppercase tracking-widest hover:bg-red-500/10 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 group">
                  <div className="w-2 h-2 rounded-full bg-red-500 group-hover:animate-ping"></div>
                  End Session
                </button>
              </div>
            </aside>

          </div>
        </div>
      </TooltipProvider>
    </PageTransition>
  )
}
