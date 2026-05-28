import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic, MicOff, Send, MessageSquare, Code2,
  Settings, Info, User, Bot, Sparkles, Zap,
  Clock, CheckCircle2, AlertCircle, Play, StopCircle,
  ChevronRight, Brain, Lightbulb
} from "lucide-react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import GlassCard from "@/components/shared/GlassCard"
import WaveformBars from "@/components/shared/WaveformBars"
import PageTransition from "@/components/shared/PageTransition"
import { Input } from "@/components/ui/input"
import api from "@/lib/api"
import { toast } from "sonner"

const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }) }

export default function LiveInterviewPage() {
  const [isListening, setIsListening] = useState(false)
  const [isCodingMode, setIsCodingMode] = useState(false)
  const [transcript, setTranscript] = useState([
    { role: "ai", text: "Hello John! I'm your AI interviewer for today. We'll be focusing on Frontend Engineering for your upcoming Google interview. Ready to start?", time: "10:00 AM" }
  ])
  const [userInput, setUserInput] = useState("")
  const [timeLeft, setTimeLeft] = useState(1800) // 30 mins
  const [isSpeaking, setIsSpeaking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [transcript])

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000)
    return () => clearInterval(timer)
  }, [])

  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";

      rec.onresult = (event: any) => {
        const current = event.results[event.results.length - 1];
        const text = current[0].transcript;
        setUserInput(text);
      };

      rec.onend = () => {
        if (isListening) rec.start(); // Keep listening if active
      };

      setRecognition(rec);
    }
  }, []);

  const toggleMic = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
    setIsListening(!isListening);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSend = async () => {
    if (!userInput.trim()) return
    const userMsg = { role: "user", text: userInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setTranscript([...transcript, userMsg])
    setUserInput("")
    
    try {
      setIsSpeaking(true);
      const { data } = await api.post("/ai/chat", { message: userMsg.text });
      const aiMsg = { role: "ai", text: data.reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setTranscript(prev => [...prev, aiMsg]);
    } catch (err) {
      toast.error("Failed to get AI response");
    } finally {
      setIsSpeaking(false);
    }
  }

  return (
    <PageTransition>
      <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-4 overflow-hidden">
        {/* Left Panel: AI Avatar & Controls */}
        <div className="w-full md:w-1/3 flex flex-col gap-4 overflow-hidden">
          <GlassCard className="flex-1 flex flex-col items-center justify-center relative group" hover={false}>
            {/* AI Avatar Visualizer */}
            <div className="relative">
              {/* Outer Pulse Rings */}
              <AnimatePresence>
                {isSpeaking && (
                  <>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 1 }}
                      exit={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2 border-primary/30"
                    />
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.8, opacity: 1 }}
                      exit={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute inset-0 rounded-full border-2 border-accent/20"
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Central AI Brain/Logo */}
              <motion.div
                animate={isSpeaking ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center relative z-10"
                style={{
                  background: "radial-gradient(circle, #8b5cf6 0%, #1e1b4b 100%)",
                  boxShadow: isSpeaking ? "0 0 60px rgba(139, 92, 246, 0.5)" : "0 0 40px rgba(139, 92, 246, 0.2)",
                  border: "2px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] rounded-full" />
                <Bot size={64} className="text-white relative z-10" />
                
                {/* Orbital elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-white/5 rounded-full scale-125"
                />
              </motion.div>

              {/* Status Indicator */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-card border-white/10 flex items-center gap-2 whitespace-nowrap">
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-primary animate-pulse" : "bg-green-500"}`} />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  {isSpeaking ? "AI Speaking..." : "AI Listening"}
                </span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-12 flex items-center gap-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className={`w-14 h-14 rounded-full border-2 transition-all duration-300 ${isListening ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(139,92,246,0.3)]" : "border-white/10 text-slate-400"}`}
                    onClick={toggleMic}
                  >
                    {isListening ? <Mic size={24} /> : <MicOff size={24} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isListening ? "Mute Microphone" : "Unmute Microphone"}</p>
                </TooltipContent>
              </Tooltip>
              
              <Button
                variant="outline"
                className="w-14 h-14 rounded-full border-2 border-white/10 text-slate-400"
                onClick={() => setIsCodingMode(!isCodingMode)}
              >
                <Code2 size={24} />
              </Button>
            </div>
            
            <div className="mt-6 flex flex-col items-center">
               <WaveformBars active={isListening} bars={20} className="h-6" color={isListening ? "#8b5cf6" : "#334155"} />
               <p className="text-[10px] text-slate-500 mt-2">REAL-TIME VOICE WAVEFORM</p>
            </div>
          </GlassCard>

          {/* User Info Card */}
          <GlassCard className="p-4 flex items-center gap-4 h-24">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
              <User size={24} className="text-slate-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">John Doe</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-white/10 text-slate-400">Frontend Engineer</Badge>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-white/10 text-slate-400">Level 4</Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-violet-400">{formatTime(timeLeft)}</p>
              <p className="text-[10px] text-slate-500 uppercase">Remaining</p>
            </div>
          </GlassCard>
        </div>

        {/* Center Panel: Transcript or Code Editor */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden relative">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  {isCodingMode ? <Code2 size={16} className="text-primary" /> : <MessageSquare size={16} className="text-primary" />}
                </div>
                <h3 className="font-bold text-white text-sm">{isCodingMode ? "Coding Editor" : "Live Transcript"}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge style={{ background: "rgba(255,255,255,0.04)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.06)" }}>
                   <Sparkles size={12} className="mr-1 inline" /> AI Assisted
                </Badge>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              {isCodingMode ? (
                <div className="h-full relative">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value="// Write your solution here\nfunction optimizeSystem(data) {\n  \n}"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: "on",
                      padding: { top: 20 },
                      backgroundColor: "transparent"
                    }}
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-900 border-white/10 text-xs">Run Tests</Button>
                    <Button size="sm" className="neon-button text-xs">Submit Code</Button>
                  </div>
                </div>
              ) : (
                <div ref={scrollRef} className="h-full overflow-y-auto p-6 space-y-6 scrollbar-hidden">
                  {transcript.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === "ai" ? "bg-primary/20 text-primary border border-primary/30" : "bg-slate-800 text-slate-400 border border-white/10"}`}>
                        {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
                      </div>
                      <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "ai" 
                          ? "bg-white/[0.03] border border-white/10 text-slate-200 rounded-tl-none" 
                          : "bg-primary/10 border border-primary/20 text-white rounded-tr-none"
                      }`}>
                        {msg.text}
                        <p className="text-[10px] mt-2 text-slate-500 opacity-60">{msg.time}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isSpeaking && (
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
                </div>
              )}
            </div>

            {/* Message Input */}
            {!isCodingMode && (
              <div className="p-4 bg-white/[0.02] border-t border-white/10">
                <div className="relative">
                  <Input
                    placeholder="Type your response or click the mic to speak..."
                    className="h-12 pl-4 pr-12 bg-white/5 border-white/10 text-white"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button
                    size="icon"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 neon-button"
                    onClick={handleSend}
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Right Panel: Insights & Analysis */}
        <div className="hidden xl:flex w-72 flex-col gap-4 overflow-hidden">
          <GlassCard className="flex-1 flex flex-col p-5">
            <h3 className="font-bold text-white text-xs mb-4 flex items-center gap-2">
              <Brain size={14} className="text-primary" /> Real-time Analysis
            </h3>
            
            <div className="space-y-6">
              {[
                { label: "Technical Depth", value: 82, color: "#8b5cf6" },
                { label: "Confidence", value: 74, color: "#3b82f6" },
                { label: "Clarity", value: 88, color: "#06b6d4" },
                { label: "Filler Words", value: 12, color: "#ef4444" },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between text-[10px] mb-1.5 font-bold uppercase tracking-wider">
                    <span style={{ color: "#475569" }}>{metric.label}</span>
                    <span style={{ color: metric.color }}>{metric.value}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: metric.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6 bg-white/5" />

            <div className="flex-1">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">AI Hints</h4>
              <div className="space-y-3">
                {[
                  { icon: Lightbulb, text: "Try to mention specific React hooks like useMemo for optimization.", color: "#f59e0b" },
                  { icon: Info, text: "Maintain a steady pace. You're speaking slightly too fast.", color: "#3b82f6" }
                ].map((hint, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex gap-2">
                    <hint.icon size={14} className="shrink-0 mt-0.5" style={{ color: hint.color }} />
                    <p className="text-[11px] leading-relaxed text-slate-400">{hint.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" className="mt-4 w-full h-11 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300">
              <StopCircle size={16} className="mr-2" /> End Interview
            </Button>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}
