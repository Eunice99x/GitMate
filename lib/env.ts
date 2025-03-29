// Environment variable validation and access

// GitHub Authentication
export const GITHUB_ID = process.env.GITHUB_ID;
export const GITHUB_SECRET = process.env.GITHUB_SECRET;
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// AI Providers
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
export const DEFAULT_AI_PROVIDER = process.env.DEFAULT_AI_PROVIDER || "gemini";

// Next.js and Auth
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

// Validate required environment variables
export function validateEnv() {
  const requiredEnvVars = [
    {name: "GITHUB_ID", value: GITHUB_ID},
    {name: "GITHUB_SECRET", value: GITHUB_SECRET},
    {name: "GITHUB_TOKEN", value: GITHUB_TOKEN},
    {name: "NEXTAUTH_URL", value: NEXTAUTH_URL},
    {name: "NEXTAUTH_SECRET", value: NEXTAUTH_SECRET}
  ];

  // At least one AI provider is required
  if (!OPENAI_API_KEY && !GOOGLE_API_KEY) {
    console.error("At least one AI provider API key (OPENAI_API_KEY or GOOGLE_API_KEY) is required");
    return false;
  }

  const missingEnvVars = requiredEnvVars.filter(({value}) => !value).map(({name}) => name);

  if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
    return false;
  }

  return true;
}
