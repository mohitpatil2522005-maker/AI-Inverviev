import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ShieldCheck,
  Zap,
  CreditCard,
  ArrowRight,
  Check,
} from "lucide-react"
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

export default function RazorpayModal({
  isOpen,
  onClose,
  plan,
}: RazorpayModalProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      // 1. Create order on backend
      const { data: order } = await api.post("/payments/create-order", {
        plan: plan.name,
        amount: plan.price,
      })

      // 2. Open SDK
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "InterviewAI",
        order_id: order.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async (response: any) => {
            // 3. Verify on backend
            const verifyRes = await api.post("/payments/verify", response)
            if (verifyRes.data.success) {
              setStep(2)
            }
          },
        theme: { color: "#8b5cf6" },
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch {
      toast.error("Checkout failed to load")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="inset-0 p-4 fixed z-[100] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="inset-0 bg-black/60 backdrop-blur-sm absolute"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="max-w-md relative w-full"
      >
        <GlassCard className="p-0 border-white/10 shadow-2xl overflow-hidden shadow-primary/20">
          {/* Header */}
          <div className="p-5 border-white/10 bg-white/[0.02] flex items-center justify-between border-b">
            <div className="gap-2 flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded border border-primary/30 bg-primary/20">
                <Zap size={16} className="text-primary" />
              </div>
              <span className="font-bold text-white text-sm">
                Razorpay Checkout
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white">{plan.name} Plan</h3>
                    <p className="text-sm text-slate-500">
                      Subscription for 1 month
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-white">
                      ${plan.price}
                    </p>
                    <p className="text-slate-500 font-bold tracking-widest text-sm uppercase">
                      Total Amount
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 rounded-xl bg-white/[0.02] border-white/5 space-y-3 border">
                    <div className="text-sm flex items-center justify-between">
                      <span className="text-slate-400">Preferred Method</span>
                      <span className="text-white font-bold gap-1 flex items-center">
                        <CreditCard size={12} className="text-primary" /> ••••
                        4242
                      </span>
                    </div>
                    <Separator className="bg-white/5" />
                    <div className="text-sm flex items-center justify-between">
                      <span className="text-slate-400">Account</span>
                      <span className="text-white font-bold">
                        john@example.com
                      </span>
                    </div>
                  </div>

                  <div className="gap-2 text-slate-500 flex items-center justify-center text-sm">
                    <ShieldCheck size={12} className="text-green-500" />
                    <span>Securely handled by Razorpay Encrypted SSL</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  className="h-12 neon-button gap-2 w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-white/30 border-t-white animate-spin rounded-full border-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay Now <ArrowRight size={16} />
                    </>
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 border-green-500/40 mb-6 mx-auto flex items-center justify-center rounded-full border-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                  >
                    <Check size={40} className="text-green-500" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Payment Successful!
                </h3>
                <p className="text-sm text-slate-400 mb-8">
                  Welcome to the {plan.name} plan. Your pro features are now
                  unlocked.
                </p>
                <Button onClick={onClose} className="h-12 neon-button w-full">
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
