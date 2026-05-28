import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Brain, Mic, Code, BarChart3, FileText, Star, Check, ChevronDown,
  ArrowRight, Play, Zap, Users, Trophy, TrendingUp, MessageSquare,
  Target, Globe, Repeat, Bot, Sparkles, Github, Linkedin, Twitter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import AnimatedBackground from "@/components/shared/AnimatedBackground"
import GradientText from "@/components/shared/GradientText"
import WaveformBars from "@/components/shared/WaveformBars"
import CountUp from "@/components/shared/CountUp"
import TypingText from "@/components/shared/TypingText"
import { RippleButton, MagneticButton } from "@/components/shared/AnimatedButtons"
import RazorpayModal from "@/components/shared/RazorpayModal"
import GlassCard from "@/components/shared/GlassCard"

/* ── helpers ─────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55 } }),
}

const companies = ["Google", "Amazon", "Meta", "Netflix", "Microsoft", "OpenAI", "Stripe", "Uber"]

const features = [
  { icon: Brain, title: "AI Mock Interviews", desc: "Practice with an adaptive AI trained on 10,000+ real interviews.", color: "#8b5cf6" },
  { icon: FileText, title: "Resume Analyzer", desc: "Get ATS scores, keyword gaps, and improvement suggestions instantly.", color: "#3b82f6" },
  { icon: Mic, title: "Voice Interviews", desc: "Real-time voice recognition with live transcription and emotion analysis.", color: "#06b6d4" },
  { icon: Code, title: "Coding Interviews", desc: "Monaco editor with auto-complete, test cases, and AI hints.", color: "#10b981" },
  { icon: BarChart3, title: "AI Feedback Reports", desc: "Detailed analytics on technical depth, confidence, and fluency.", color: "#f59e0b" },
  { icon: Target, title: "ATS Resume Scoring", desc: "Optimise your resume against specific job descriptions.", color: "#ef4444" },
  { icon: Users, title: "Company-Specific", desc: "Tailored questions from Google, Amazon, Meta, and 200+ companies.", color: "#8b5cf6" },
  { icon: Bot, title: "AI Career Coach", desc: "ChatGPT-style career guidance, salary intel, and roadmaps.", color: "#3b82f6" },
  { icon: Globe, title: "Live Transcription", desc: "Real-time captions in 20+ languages with sentiment detection.", color: "#06b6d4" },
  { icon: TrendingUp, title: "Performance Analytics", desc: "Track improvement trends with heatmaps and skill graphs.", color: "#10b981" },
  { icon: MessageSquare, title: "AI Follow-ups", desc: "Dynamic follow-up questions that adapt to your answers.", color: "#f59e0b" },
  { icon: Repeat, title: "Interview Replay", desc: "Re-watch sessions with AI annotations and timestamp bookmarks.", color: "#ef4444" },
]

const testimonials = [
  { name: "Sarah Chen", role: "SWE @ Google", text: "I went from failing every FAANG interview to landing my dream job at Google in 6 weeks. The AI feedback is unreal.", rating: 5, avatar: "https://i.pravatar.cc/64?u=sarah" },
  { name: "Raj Patel", role: "PM @ Amazon", text: "The behavioral interview prep alone is worth 10x the subscription. It literally coaches you in real time.", rating: 5, avatar: "https://i.pravatar.cc/64?u=raj" },
  { name: "Mia Torres", role: "Data Scientist @ Meta", text: "No other platform comes close. The coding interview environment feels exactly like LeetCode meets actual interviews.", rating: 5, avatar: "https://i.pravatar.cc/64?u=mia" },
]

const pricingPlans = [
  {
    name: "Free", price: 0, desc: "Perfect to get started",
    features: ["5 AI interviews / month", "Basic feedback report", "Resume ATS score", "Email support"],
    cta: "Start Free", highlight: false,
  },
  {
    name: "Pro", price: 29, desc: "For serious job seekers",
    features: ["Unlimited interviews", "Advanced analytics", "Voice interviews", "Coding interview mode", "Company-specific prep", "AI Career Coach", "Priority support"],
    cta: "Start Pro", highlight: true,
  },
  {
    name: "Enterprise", price: 99, desc: "For teams & bootcamps",
    features: ["Everything in Pro", "Team dashboards", "Custom question banks", "Bulk invites", "Dedicated account manager", "API access", "Custom branding"],
    cta: "Contact Sales", highlight: false,
  },
]

const faqs = [
  { q: "How does AI interviewing work?", a: "Our AI engine is trained on thousands of real interview transcripts and uses NLP to evaluate your answers across multiple dimensions: technical accuracy, communication clarity, confidence signals, and relevance to the role." },
  { q: "Is voice interview supported?", a: "Yes! Our platform uses Web Speech API and proprietary voice analysis to transcribe your answers in real time, detect filler words, measure speech pace, and flag emotion markers." },
  { q: "Can I practice coding interviews?", a: "Absolutely. We embed a full Monaco editor with syntax highlighting, autocomplete, and test-case execution. The AI reviewer scores your solution on correctness, time complexity, and code quality." },
  { q: "How accurate is the AI feedback?", a: "Our feedback engine achieves 91% alignment with expert human interviewers in blind tests. We continuously improve the model with new data from successful placements." },
  { q: "Does it support multiple languages?", a: "We currently support English, Spanish, French, German, Hindi, Japanese, and Mandarin for voice interviews, with more languages being added quarterly." },
]

/* ── subcomponents ───────────────────────────────────────────────── */
function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
      style={{ background: "rgba(8,8,18,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
          <Zap size={16} className="text-white" />
        </div>
        <span className="font-bold text-white text-lg" style={{ fontFamily: "Space Grotesk, sans-serif" }}>InterviewAI</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {["Features", "Demo", "Pricing", "FAQ"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-sm transition-colors hover:text-white" style={{ color: "#94a3b8" }}>{item}</a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Link to="/login"><Button variant="ghost" className="text-slate-300 hover:text-white">Log in</Button></Link>
        <Link to="/signup"><Button className="neon-button text-sm">Get Started</Button></Link>
      </div>
    </motion.nav>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <AnimatedBackground />
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <Badge className="mb-6 px-4 py-1.5 text-sm" style={{ background: "rgba(139,92,246,0.15)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.3)" }}>
            <Sparkles size={12} className="mr-1.5 inline" />
            Powered by GPT-4 + Claude
          </Badge>
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
          <span className="text-white">Ace Your Next</span>
          <br />
          <GradientText>Interview with AI</GradientText>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="text-lg md:text-xl mb-4 max-w-2xl mx-auto leading-relaxed" style={{ color: "#94a3b8" }}>
          Practice technical, behavioral, and HR interviews with an AI interviewer trained on real hiring conversations.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mb-8 h-8">
          <TypingText
            texts={["Software Engineer at Google", "Product Manager at Amazon", "Data Scientist at Meta", "ML Engineer at OpenAI"]}
            className="text-base font-medium"
            cursorClassName="text-violet-400 ml-0.5"
          />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup">
            <MagneticButton>
              <RippleButton className="neon-button px-8 h-12 text-base gap-2 rounded-xl">
                <Zap size={18} /> Start Free
              </RippleButton>
            </MagneticButton>
          </Link>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2"
            style={{ borderColor: "rgba(255,255,255,0.1)", color: "#c4b5fd", background: "rgba(255,255,255,0.03)" }}>
            <Play size={18} /> Watch Demo
          </Button>
        </motion.div>

        {/* Live AI Demo Preview */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}
          className="mt-16 max-w-4xl mx-auto relative group"
        >
          {/* Background Mockup */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-[2.5rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative glass-card p-2 md:p-4 rounded-[2rem] overflow-hidden border-white/10">
            <div className="rounded-[1.5rem] overflow-hidden relative">
               <img 
                 src="https://images.pexels.com/photos/28428591/pexels-photo-28428591.jpeg" 
                 alt="Dashboard Mockup" 
                 className="w-full h-auto opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#080812] via-transparent to-transparent" />
               
               {/* Overlaying UI elements to make it look like a mockup */}
               <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
                  <div className="max-w-md glass-card p-6 border-primary/20 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}>
                        <Bot size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">AI Interviewer</p>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs" style={{ color: "#94a3b8" }}>Live session</span>
                        </div>
                      </div>
                      <WaveformBars active bars={8} className="ml-auto" />
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.15)" }}>
                        <p className="text-sm text-white">"Tell me about a time you had to optimize a system under tight deadlines. Walk me through your thought process."</p>
                      </div>
                      <div className="flex items-start gap-2 pl-4">
                        <div className="w-6 h-6 rounded-full bg-slate-600 shrink-0 mt-0.5" style={{ backgroundImage: "url(https://i.pravatar.cc/24?u=user)" }} />
                        <TypingText
                          texts={["In my previous role at a startup, we had a database query taking 8 seconds on production..."]}
                          speed={40}
                          pause={99999}
                          className="text-sm text-slate-300"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs" style={{ color: "#94a3b8" }}>Analyzing response...</span>
                      </div>
                      <div className="ml-auto flex gap-3 text-xs" style={{ color: "#94a3b8" }}>
                        <span className="text-violet-400 font-bold">Confidence: 87%</span>
                        <span className="text-cyan-400 font-bold">Clarity: 92%</span>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown size={24} style={{ color: "#475569" }} />
      </motion.div>
    </section>
  )
}

function CompaniesSection() {
  return (
    <section className="py-20 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="text-center mb-10">
        <p className="text-sm font-medium uppercase tracking-widest" style={{ color: "#475569" }}>Trusted by candidates from</p>
      </div>
      <div className="flex gap-12 items-center justify-center flex-wrap px-6">
        {companies.map((co, i) => (
          <motion.span
            key={co}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ opacity: 1, color: "#c4b5fd" }}
            className="text-lg font-bold transition-all cursor-default"
            style={{ color: "#2d2d50", fontFamily: "Space Grotesk, sans-serif" }}
          >
            {co}
          </motion.span>
        ))}
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "#8b5cf6" }}>Features</motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" custom={1} className="text-4xl md:text-5xl font-black text-white mb-4">
          Everything you need to <GradientText>land the role</GradientText>
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" custom={2} className="text-lg max-w-2xl mx-auto" style={{ color: "#94a3b8" }}>
          From AI-powered mock interviews to ATS resume scoring, we've built the most comprehensive interview prep platform on the planet.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={i * 0.05}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass-card p-5 cursor-pointer group transition-all duration-300 hover:border-opacity-50"
            style={{ border: `1px solid rgba(255,255,255,0.06)` }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${f.color}20` }}>
              <f.icon size={20} style={{ color: f.color }} />
            </div>
            <h3 className="font-semibold text-white mb-1.5 text-sm">{f.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
    { icon: Users, label: "Interviews Conducted", value: 1000000, suffix: "+", prefix: "" },
    { icon: Trophy, label: "Success Rate", value: 92, suffix: "%", prefix: "" },
    { icon: TrendingUp, label: "Active Users", value: 500000, suffix: "+", prefix: "" },
    { icon: Star, label: "Average Rating", value: 4.9, suffix: "/5", prefix: "", decimals: 1 },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card p-8 md:p-12" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.05))", border: "1px solid rgba(139,92,246,0.15)" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.1} viewport={{ once: true }}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: "rgba(139,92,246,0.15)" }}>
                  <s.icon size={22} style={{ color: "#8b5cf6" }} />
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-1">
                  <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <p className="text-xs font-medium" style={{ color: "#94a3b8" }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" className="text-4xl font-black text-white mb-4">
          Loved by <GradientText>10,000+ candidates</GradientText>
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div key={t.name} variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.1} viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="glass-card p-6 cursor-default transition-all duration-300 hover:border-violet-500/20 hover:shadow-lg hover:shadow-violet-500/10">
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#cbd5e1" }}>"{t.text}"</p>
            <div className="flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold text-sm text-white">{t.name}</p>
                <p className="text-xs" style={{ color: "#94a3b8" }}>{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  return (
    <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" className="text-4xl font-black text-white mb-4">
          Simple, transparent <GradientText>pricing</GradientText>
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" custom={1} className="text-lg mb-8" style={{ color: "#94a3b8" }}>
          Start free. Upgrade when you're ready.
        </motion.p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${!isYearly ? "text-white" : "text-slate-500"}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="w-12 h-6 rounded-full bg-white/5 border border-white/10 relative p-1 transition-all"
          >
            <motion.div
              animate={{ x: isYearly ? 24 : 0 }}
              className="w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            />
          </button>
          <span className={`text-sm ${isYearly ? "text-white" : "text-slate-500"}`}>Yearly <Badge className="ml-1 bg-green-500/20 text-green-400 border-green-500/20">-20%</Badge></span>
        </div>
      </div>

        {pricingPlans.map((plan, i) => {
          const price = isYearly ? Math.floor(plan.price * 0.8) : plan.price
          return (
            <motion.div key={plan.name} variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.1} viewport={{ once: true }}
              className={plan.highlight ? "scale-105 z-10" : ""}
            >
              <GlassCard 
                tilt={plan.highlight}
                className={`p-8 relative overflow-hidden h-full`}
                style={{ border: plan.highlight ? "1px solid rgba(139,92,246,0.5)" : "1px solid rgba(255,255,255,0.06)" }}
              >
                {plan.highlight && (
                  <>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08), transparent)" }} />
                    <div className="absolute top-4 right-4">
                      <Badge style={{ background: "rgba(139,92,246,0.3)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.4)" }}>
                        Most Popular
                      </Badge>
                    </div>
                  </>
                )}
                <h3 className="font-bold text-white text-lg mb-1">{plan.name}</h3>
                <p className="text-sm mb-4" style={{ color: "#94a3b8" }}>{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-white">${price}</span>
                  <span className="text-sm" style={{ color: "#94a3b8" }}>/mo</span>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm" style={{ color: "#cbd5e1" }}>
                      <Check size={14} className="text-violet-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.highlight ? "neon-button" : ""}`}
                  variant={plan.highlight ? "default" : "outline"}
                  style={!plan.highlight ? { borderColor: "rgba(255,255,255,0.1)", color: "#c4b5fd" } : {}}
                  onClick={() => setSelectedPlan({ ...plan, price })}
                >
                  {plan.cta} <ArrowRight size={16} className="ml-2" />
                </Button>
              </GlassCard>
            </motion.div>
          )
        })}

      <RazorpayModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        plan={selectedPlan || { name: "", price: 0, features: [] }}
      />
    </section>
  )
}

function FAQSection() {
  return (
    <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" className="text-4xl font-black text-white mb-4">
          Frequently asked <GradientText>questions</GradientText>
        </motion.h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.05} viewport={{ once: true }}>
            <AccordionItem value={`faq-${i}`} className="glass-card px-5 border-0" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <AccordionTrigger className="text-sm font-semibold text-white hover:no-underline py-4">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm pb-4" style={{ color: "#94a3b8" }}>{faq.a}</AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t py-12 px-6" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>InterviewAI</span>
        </div>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          {["Terms", "Privacy", "Contact", "API Docs"].map((link) => (
            <a key={link} href="#" className="text-sm transition-colors hover:text-white" style={{ color: "#475569" }}>{link}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {[Github, Linkedin, Twitter].map((Icon, i) => (
            <a key={i} href="#" className="p-2 rounded-lg transition-all hover:scale-110"
              style={{ color: "#475569", background: "rgba(255,255,255,0.04)" }}>
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
      <p className="text-center text-xs mt-8" style={{ color: "#1e293b" }}>© 2025 InterviewAI. All rights reserved.</p>
    </footer>
  )
}

/* ── page ────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={heroRef} className="min-h-screen" style={{ background: "#080812" }}>
      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 z-[100] origin-left"
        style={{ scaleX, background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4)" }} />

      <Navbar />
      <HeroSection />
      <CompaniesSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
