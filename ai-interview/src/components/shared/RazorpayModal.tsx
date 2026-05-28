import api from "@/lib/api";
import { toast } from "sonner";

/* Replace handlePayment (lines 20-26) */
const handlePayment = async () => {
  setLoading(true);
  try {
    // 1. Create order on your backend
    const { data: order } = await api.post("/payments/create-order", {
      planId: plan.name.toLowerCase(),
      amount: plan.price
    });

    // 2. Open Razorpay Checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "InterviewAI",
      description: `Upgrade to ${plan.name} Plan`,
      order_id: order.id,
      handler: async (response: any) => {
        // 3. Verify payment on backend
        const verifyRes = await api.post("/payments/verify", response);
        if (verifyRes.data.success) {
          setStep(2);
          toast.success("Payment verified successfully!");
        }
      },
      prefill: {
        email: "user@example.com",
      },
      theme: { color: "#8b5cf6" }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (error) {
    toast.error("Payment initialization failed");
  } finally {
    setLoading(false);
  }
};import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShieldCheck, Zap, CreditCard, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import GlassCard from "./GlassCard"
import api from "@/lib/api"
import { toast } from "sonner"

interface RazorpayModalProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    name: string
    price: number
    features: string[]
  }
}

export default function RazorpayModal({ isOpen, onClose, plan }: RazorpayModalProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create order on backend
      const { data: order } = await api.post("/payments/create-order", {
        plan: plan.name,
        amount: plan.price
      });

      // 2. Open SDK
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "InterviewAI",
        order_id: order.id,
        handler: async (response: any) => {
          // 3. Verify on backend
          const verifyRes = await api.post("/payments/verify", response);
          if (verifyRes.data.success) {
            setStep(2);
          }
        },
        theme: { color: "#8b5cf6" }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Checkout failed to load");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md"
      >
        <GlassCard className="p-0 overflow-hidden border-white/10 shadow-2xl shadow-primary/20">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
                <Zap size={16} className="text-primary" />
              </div>
              <span className="font-bold text-white text-sm">Razorpay Checkout</span>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-white">{plan.name} Plan</h3>
                    <p className="text-xs text-slate-500">Subscription for 1 month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-white">${plan.price}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total Amount</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Preferred Method</span>
                      <span className="text-white font-bold flex items-center gap-1">
                        <CreditCard size={12} className="text-primary" /> •••• 4242
                      </span>
                    </div>
                    <Separator className="bg-white/5" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Account</span>
                      <span className="text-white font-bold">john@example.com</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-slate-500 justify-center">
                    <ShieldCheck size={12} className="text-green-500" />
                    <span>Securely handled by Razorpay Encrypted SSL</span>
                  </div>
                </div>

                <Button onClick={handlePayment} className="w-full h-12 neon-button gap-2" disabled={loading}>
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</>
                  ) : (
                    <>Pay Now <ArrowRight size={16} /></>
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-6">
                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10 }}>
                     <Check size={40} className="text-green-500" />
                   </motion.div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Payment Successful!</h3>
                <p className="text-sm text-slate-400 mb-8">
                  Welcome to the {plan.name} plan. Your pro features are now unlocked.
                </p>
                <Button onClick={onClose} className="w-full h-12 neon-button">
                  Back to Dashboard
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>
    </div>
  )
}
