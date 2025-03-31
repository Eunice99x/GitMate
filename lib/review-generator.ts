import {generateText} from "ai";
import {openai} from "@ai-sdk/openai";
import {google, createGoogleGenerativeAI} from "@ai-sdk/google";
import {getOpenAIKey, getGoogleKey, getPreferredAIProvider} from "./storage-service";

export type ReviewTone = "Constructive Critic" | "Friendly Mentor" | "Enthusiastic Coach";
export type AIProvider = "openai" | "gemini";

// Add timeout handling to the generateReview function
export async function generateReview(codeContent: string, tone: ReviewTone, provider?: AIProvider, apiKeys?: {openaiKey?: string; googleKey?: string}) {
  // Get the preferred provider or use the specified one
  const useProvider = provider || getPreferredAIProvider();

  // Get API keys - either from passed parameters or from storage
  const openaiKey = apiKeys?.openaiKey || getOpenAIKey();
  const googleKey = apiKeys?.googleKey || getGoogleKey();

  console.log("Review generator received API keys:", {
    hasOpenAIKey: !!openaiKey,
    hasGoogleKey: !!googleKey,
    provider: useProvider
  });

  // Check if we have the required API key
  if (useProvider === "openai" && !openaiKey) {
    throw new Error("OpenAI API key is required but not found. Please add your key in Profile Settings.");
  }

  if (useProvider === "gemini" && !googleKey) {
    throw new Error("Google API key is required but not found. Please add your key in Profile Settings.");
  }

  const systemPrompts = {
    "Constructive Critic": `You are a professional code reviewer who provides detailed, actionable feedback. 
    Focus on code quality, potential bugs, and best practices. 
    Be direct but respectful, and prioritize the most important issues.`,

    "Friendly Mentor": `You are a supportive mentor who guides developers to better code practices.
    Focus on teaching and explaining why certain approaches are better than others.
    Be encouraging and highlight what's done well alongside suggestions for improvement.`,

    "Enthusiastic Coach": `You are an energetic coding coach who motivates developers to excel.
    Focus on celebrating wins while gently suggesting improvements.
    Be positive and uplifting, using encouraging language to inspire better coding practices.`
  };

  // Limit the code content size to prevent timeouts
  const truncatedContent = codeContent.length > 8000 ? codeContent.substring(0, 8000) + "\n\n[Content truncated due to size...]" : codeContent;

  const prompt = `Review the following code diff:

${truncatedContent}

Provide your review in markdown format with sections for:
1. Summary
2. Key Observations
3. Suggestions
4. Code Quality Score (1-10)`;

  try {
    console.log(`Using AI provider: ${useProvider}`);

    if (useProvider === "openai" && openaiKey) {
      console.log("Generating review with OpenAI...");

      const {text} = await generateText({
        model: openai("gpt-4"),
        system: systemPrompts[tone],
        prompt,
        apiKey: openaiKey
      });
      return text;
    } else if (useProvider === "gemini" && googleKey) {
      console.log("Generating review with Google Gemini... API Key:", googleKey.substring(0, 5) + "...");
      console.log("API Key length:", googleKey.length);

      // Create a custom Google provider instance with the API key
      const googleProvider = createGoogleGenerativeAI({
        apiKey: googleKey
      });

      const {text} = await generateText({
        model: googleProvider("gemini-1.5-pro"),
        system: systemPrompts[tone],
        prompt
      });
      return text;
    } else {
      throw new Error("No valid AI provider configuration found");
    }
  } catch (error: any) {
    console.error(`Error generating review with ${useProvider}:`, error);

    // If the primary provider fails, try the fallback
    if (useProvider === "openai" && googleKey) {
      console.log("Falling back to Gemini...");
      return generateReview(codeContent, tone, "gemini", apiKeys);
    } else if (useProvider === "gemini" && openaiKey) {
      console.log("Falling back to OpenAI...");
      return generateReview(codeContent, tone, "openai", apiKeys);
    }

    // If we can't generate a review, return a simple message
    return `## Review Generation Failed

Unfortunately, there was an error generating a detailed review: ${error.message}

### Suggestions
- Try again later
- Check your API keys in your profile settings
- If the problem persists, try a different AI provider`;
  }
}

export async function generateCommitMessage(diffContent: string, provider?: AIProvider, apiKeys?: {openaiKey?: string; googleKey?: string}) {
  // Get the preferred provider or use the specified one
  const useProvider = provider || getPreferredAIProvider();

  // Get API keys - either from passed parameters or from storage
  const openaiKey = apiKeys?.openaiKey || getOpenAIKey();
  const googleKey = apiKeys?.googleKey || getGoogleKey();

  // Check if we have the required API key
  if (useProvider === "openai" && !openaiKey) {
    throw new Error("OpenAI API key is required but not found. Please add your key in Profile Settings.");
  }

  if (useProvider === "gemini" && !googleKey) {
    throw new Error("Google API key is required but not found. Please add your key in Profile Settings.");
  }

  const system = `You are an AI assistant that generates clear, concise, and descriptive commit messages based on code changes.
Follow best practices for commit messages: use present tense, be specific but concise, and focus on what was changed and why.`;

  const prompt = `Based on the following code diff, generate an appropriate commit message:

${diffContent}

The commit message should have:
1. A brief summary line (50 chars or less)
2. A more detailed explanation if necessary (wrapped at 72 chars)`;

  try {
    if (useProvider === "openai" && openaiKey) {
      const {text} = await generateText({
        model: openai("gpt-4"),
        system,
        prompt,
        apiKey: openaiKey
      });
      return text;
    } else if (useProvider === "gemini" && googleKey) {
      // Set environment variable directly
      process.env.GOOGLE_GENERATIVE_AI_API_KEY = googleKey;

      const {text} = await generateText({
        model: google("gemini-1.5-pro"),
        system,
        prompt
      });
      return text;
    } else {
      throw new Error("No valid AI provider configuration found");
    }
  } catch (error: any) {
    console.error(`Error generating commit message with ${useProvider}:`, error);

    // If the primary provider fails, try the fallback
    if (useProvider === "openai" && googleKey) {
      return generateCommitMessage(diffContent, "gemini", apiKeys);
    } else if (useProvider === "gemini" && openaiKey) {
      return generateCommitMessage(diffContent, "openai", apiKeys);
    }

    throw new Error(`Failed to generate commit message: ${error.message}`);
  }
}
