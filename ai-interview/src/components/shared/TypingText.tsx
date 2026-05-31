import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypingTextProps {
  texts: string[]
  speed?: number
  pause?: number
  className?: string
  cursorClassName?: string
}

export default function TypingText({
  texts,
  speed = 80,
  pause = 2000,
  className,
  cursorClassName,
}: TypingTextProps) {
  const [display, setDisplay] = useState("")
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx))
        setCharIdx((c) => c + 1)
      }, speed)
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      }, speed / 2)
    } else {
      setDeleting(false)
      setTextIdx((i) => (i + 1) % texts.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, textIdx, texts, speed, pause])

  return (
    <span className={className}>
      {display}
      <span className={cn("animate-pulse", cursorClassName)}>|</span>
    </span>
  )
}
