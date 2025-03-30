"use client"

import type React from "react"
import { SessionProvider } from "next-auth/react"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Provide the session to all components in the app
  return <SessionProvider>{children}</SessionProvider>
}

