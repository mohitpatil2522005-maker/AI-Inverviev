import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Ripple {
  x: number
  y: number
  id: number
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  rippleColor?: string
}

export function RippleButton({
  children,
  className,
  rippleColor = "rgba(255, 255, 255, 0.35)",
  onClick,
  ...props
}: RippleButtonProps) {
  const { ...rest } = props
  const [ripples, setRipples] = useState<Ripple[]>([])

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const newRipple = { x, y, id: Date.now() }
    setRipples((prev) => [...prev, newRipple])

    if (onClick) onClick(event)
  }

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1))
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [ripples])

  return (
    <button
      className={`relative overflow-hidden transition-transform active:scale-95 ${className || ""}`}
      onClick={createRipple}
      {...rest}
    >
      <span className="gap-2 relative z-10 flex items-center justify-center">
        {children}
      </span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: ripple.x,
              top: ripple.y,
              width: "100%",
              height: "100%",
              backgroundColor: rippleColor,
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  )
}

export function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = clientX - (rect.left + rect.width / 2)
    const y = clientY - (rect.top + rect.height / 2)
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`inline-block ${className || ""}`}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
