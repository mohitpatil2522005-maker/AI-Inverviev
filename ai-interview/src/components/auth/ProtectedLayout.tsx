import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import api from "@/lib/api"

export default function ProtectedLayout() {
  const [loading, setLoading] = useState(true)
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    let isMounted = true

    const syncSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (!isMounted) {
        return
      }

      const session = data.session
      setHasSession(Boolean(session))

      if (session) {
        api.post("/users/sync").catch(() => {
          // Ignore sync failures here; API calls will surface real errors later.
        })
      }

      setLoading(false)
    }

    syncSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) {
        return
      }

      setHasSession(Boolean(session))

      if (session) {
        api.post("/users/sync").catch(() => {
          // Ignore sync failures here; API calls will surface real errors later.
        })
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080812] text-slate-300">
        Loading your workspace...
      </div>
    )
  }

  if (!hasSession) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}