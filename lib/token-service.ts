// Token management service

// Get GitHub token from localStorage
export function getGitHubToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("githubToken")
}

// Get OpenAI API key from localStorage
export function getOpenAIKey(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("openaiKey")
}

// Get Google API key from localStorage
export function getGoogleKey(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("googleKey")
}

// Get preferred AI provider
export function getPreferredAIProvider(): "openai" | "gemini" {
  if (typeof window === "undefined") return "gemini"

  const openaiKey = getOpenAIKey()
  const googleKey = getGoogleKey()

  // If only one key is available, use that provider
  if (openaiKey && !googleKey) return "openai"
  if (!openaiKey && googleKey) return "gemini"

  // If both are available, check user preference
  const preference = localStorage.getItem("preferredAIProvider")
  return preference === "openai" ? "openai" : "gemini"
}

// Set preferred AI provider
export function setPreferredAIProvider(provider: "openai" | "gemini"): void {
  if (typeof window === "undefined") return
  localStorage.setItem("preferredAIProvider", provider)
}

// Check if user has set up required tokens
export function hasRequiredTokens(): boolean {
  const githubToken = getGitHubToken()
  const hasAIProvider = getOpenAIKey() || getGoogleKey()

  return !!githubToken && !!hasAIProvider
}

