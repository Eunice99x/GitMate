"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { GitlabIcon as GitHubLogoIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { useState } from "react"

interface GitHubAuthButtonProps extends ButtonProps {
  callbackUrl?: string
  mode?: "signin" | "install"
}

export function GitHubAuthButton({
  callbackUrl = "/dashboard",
  mode = "signin",
  children,
  ...props
}: GitHubAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = async () => {
    setIsLoading(true)
    try {
      await signIn("github", { callbackUrl })
    } catch (error) {
      console.error("Authentication error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleAuth} disabled={isLoading} {...props}>
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {mode === "signin" ? "Signing in..." : "Installing..."}
        </span>
      ) : (
        <>
          <GitHubLogoIcon className="mr-2 h-5 w-5" />
          {children || (mode === "signin" ? "Sign in with GitHub" : "Install on GitHub")}
        </>
      )}
    </Button>
  )
}

