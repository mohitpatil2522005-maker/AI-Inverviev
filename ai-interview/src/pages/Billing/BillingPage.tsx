import { useState } from "react"
import { motion } from "framer-motion"
import {
  Check, Zap, CreditCard,
  Download, ArrowRight, ShieldCheck,
  Star, Crown, Building, HelpCircle,
  PlusCircle, RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import GlassCard from "@/components/shared/GlassCard"
import PageTransition from "@/components/shared/PageTransition"
import RazorpayModal from "@/components/shared/RazorpayModal"

const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }) }

const pricingPlans = [
  {
    name: "Free",
    price: 0,
    desc: "Perfect to get started",
    features: ["5 AI interviews / month", "Basic feedback report", "Resume ATS score", "Email support"],
    cta: "Current Plan",
    current: true,
    icon: Star,
    color: "#94a3b8"
  },
  {
    name: "Pro",
    price: 29,
    desc: "For serious job seekers",
    features: [
      "Unlimited AI interviews",
      "Advanced competency analytics",
      "Real-time voice analysis",
      "Coding interview mode",
      "Company-specific prep",
      "AI Career Coach access",
      "Priority priority support"
    ],
    cta: "Upgrade to Pro",
    current: false,
    highlight: true,
    icon: Crown,
    color: "#8b5cf6"
  },
  {
    name: "Enterprise",
    price: 99,
    desc: "For bootcamps & teams",
    features: [
      "Everything in Pro",
      "Multi-user dashboard",
      "Custom question banks",
      "Bulk resume analyzer",
      "API access",
      "Dedicated account manager",
      "SSO & Custom branding"
    ],
    cta: "Contact Sales",
    current: false,
    icon: Building,
    color: "#3b82f6"
  }
]

const invoices = [
  { id: "INV-001", date: "May 01, 2026", amount: "$0.00", status: "Paid" },
  { id: "INV-002", date: "Apr 01, 2026", amount: "$0.00", status: "Paid" },
  { id: "INV-003", date: "Mar 01, 2026", amount: "$0.00", status: "Paid" },
]

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <h2 className="text-2xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Billing & Subscription</h2>
          <p className="text-sm text-slate-400">Manage your subscription, credits, and payment history.</p>
        </motion.div>

        {/* Usage Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="lg:col-span-2 p-6">
             <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Zap size={20} className="text-primary" />
                 </div>
                 <div>
                   <h3 className="font-bold text-white text-sm">Credits Remaining</h3>
                   <p className="text-xs text-slate-500">Your credits reset on June 1st, 2026</p>
                 </div>
               </div>
               <Button variant="outline" size="sm" className="h-9 bg-white/5 border-white/10 text-xs gap-2">
                 <RefreshCw size={14} /> Buy Credits
               </Button>
             </div>
             
             <div className="space-y-6">
               <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Interview Credits</span>
                    <span className="text-xs font-bold text-white">4 / 5</span>
                  </div>
                  <Progress value={80} className="h-2" style={{ background: "rgba(255,255,255,0.06)" }} />
               </div>
               <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Resume Scans</span>
                    <span className="text-xs font-bold text-white">12 / 20</span>
                  </div>
                  <Progress value={60} className="h-2" style={{ background: "rgba(255,255,255,0.06)" }} />
               </div>
             </div>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col justify-between">
             <div>
               <h3 className="font-bold text-white text-sm mb-1">Active Plan</h3>
               <Badge className="mb-4" style={{ background: "rgba(139,92,246,0.15)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.3)" }}>Free Plan</Badge>
               <p className="text-xs leading-relaxed text-slate-400">
                 You are currently on the Free plan. Upgrade to Pro for unlimited interviews and advanced analytics.
               </p>
             </div>
             <Button className="w-full neon-button gap-2 mt-6">
               Upgrade Now <ArrowRight size={16} />
             </Button>
          </GlassCard>
        </div>

        {/* Pricing Table */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">Choose the right plan</h3>
            <div className="inline-flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
               <button 
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${billingCycle === "monthly" ? "bg-primary text-white" : "text-slate-500"}`}
               >
                 Monthly
               </button>
               <button 
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${billingCycle === "yearly" ? "bg-primary text-white" : "text-slate-500"}`}
               >
                 Yearly <span className="text-[10px] text-green-400 ml-1">-20%</span>
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <GlassCard 
                  className={`p-8 h-full relative overflow-hidden flex flex-col ${plan.highlight ? "border-primary/50" : "border-white/5"}`}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 right-0 p-0.5">
                       <Badge className="rounded-none rounded-bl-lg" style={{ background: "#8b5cf6" }}>POPULAR</Badge>
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${plan.color}15`, border: `1px solid ${plan.color}30` }}>
                       <plan.icon size={24} style={{ color: plan.color }} />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">{plan.name}</h4>
                    <p className="text-xs text-slate-500 mb-4">{plan.desc}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">${billingCycle === "yearly" ? Math.floor(plan.price * 0.8) : plan.price}</span>
                      <span className="text-sm text-slate-500">/mo</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-slate-400">
                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full h-11 ${plan.highlight ? "neon-button" : "bg-white/5 border-white/10 hover:bg-white/10"} gap-2`}
                    variant={plan.highlight ? "default" : "outline"}
                    disabled={plan.current}
                    onClick={() => setSelectedPlan({ ...plan, price: billingCycle === "yearly" ? Math.floor(plan.price * 0.8) : plan.price })}
                  >
                    {plan.cta}
                  </Button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        <RazorpayModal 
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          plan={selectedPlan || { name: "", price: 0, features: [] }}
        />

        {/* Invoice History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Invoice History</h3>
            <Button variant="ghost" size="sm" className="text-xs text-slate-500 hover:text-white gap-2">
               <HelpCircle size={14} /> Need help?
            </Button>
          </div>
          
          <GlassCard className="p-0 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/[0.02]">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-widest">Invoice ID</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-widest">Date</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-widest">Amount</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                    <TableCell className="text-xs font-medium text-white">{invoice.id}</TableCell>
                    <TableCell className="text-xs text-slate-400">{invoice.date}</TableCell>
                    <TableCell className="text-xs text-slate-400">{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge className="text-[10px] px-2 py-0" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white">
                        <Download size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </GlassCard>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="font-bold text-white text-sm mb-6 flex items-center gap-2">
              <CreditCard size={16} className="text-primary" /> Payment Method
            </h3>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-12 h-8 rounded bg-slate-800 flex items-center justify-center border border-white/10 shrink-0">
                 <span className="text-[10px] font-black text-white italic">VISA</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">•••• •••• •••• 4242</p>
                <p className="text-xs text-slate-500">Expires 12/28</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary hover:bg-primary/10">Edit</Button>
            </div>
            <Button variant="outline" className="w-full mt-6 bg-white/5 border-white/10 text-xs h-11 gap-2">
               <PlusCircle size={16} /> Add Payment Method
            </Button>
          </GlassCard>

          <GlassCard className="p-6">
             <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
               <ShieldCheck size={16} className="text-green-400" /> Secure Payments
             </h3>
             <p className="text-xs leading-relaxed text-slate-400 mb-6">
               All payments are processed securely via Razorpay. We do not store your credit card information on our servers.
             </p>
             <div className="flex items-center gap-4 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                {/* Simulated payment logos */}
                <div className="px-3 py-1 rounded border border-white/10 text-[10px] font-bold text-white">Razorpay</div>
                <div className="px-3 py-1 rounded border border-white/10 text-[10px] font-bold text-white">Stripe</div>
                <div className="px-3 py-1 rounded border border-white/10 text-[10px] font-bold text-white">PayPal</div>
             </div>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}
