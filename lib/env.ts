// Environment variables with validation

// GitHub OAuth credentials
export const GITHUB_ID = process.env.GITHUB_ID;
export const GITHUB_SECRET = process.env.GITHUB_SECRET;
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// export const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

// AI provider API keys
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
export const DEFAULT_AI_PROVIDER = process.env.DEFAULT_AI_PROVIDER || "gemini";

// Next Auth
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

// Database
// export const DATABASE_URL = process.env.DATABASE_URL;

// Validate required environment variables
export function validateEnvironment() {
  const missingVars = [];

  if (!GITHUB_ID) missingVars.push("GITHUB_ID");
  if (!GITHUB_SECRET) missingVars.push("GITHUB_SECRET");
  if (!GITHUB_TOKEN) missingVars.push("GITHUB_TOKEN");
  if (!NEXTAUTH_SECRET) missingVars.push("NEXTAUTH_SECRET");
  // if (!DATABASE_URL) missingVars.push("DATABASE_URL");

  // At least one AI provider is required
  if (!OPENAI_API_KEY && !GOOGLE_API_KEY) {
    missingVars.push("OPENAI_API_KEY or GOOGLE_API_KEY");
  }

  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(", ")}`);
    return false;
  }

  return true;
}
