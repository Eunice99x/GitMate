import {generateText} from "ai";
import {openai} from "@ai-sdk/openai";
import {google} from "@ai-sdk/google";

export type ReviewTone = "Constructive Critic" | "Friendly Mentor" | "Enthusiastic Coach";
export type AIProvider = "openai" | "gemini";

// Get the AI provider from environment variable or default to gemini
const DEFAULT_AI_PROVIDER = (process.env.DEFAULT_AI_PROVIDER as AIProvider) || "gemini";

// Add timeout handling to the generateReview function
export async function generateReview(codeContent: string, tone: ReviewTone, provider?: AIProvider) {
  const useProvider = provider || DEFAULT_AI_PROVIDER;

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
  const truncatedContent = codeContent.length > 15000 ? codeContent.substring(0, 15000) + "\n\n[Content truncated due to size...]" : codeContent;

  const prompt = `Review the following code diff:

${truncatedContent}

Provide your review in markdown format with sections for:
1. Summary
2. Key Observations
3. Suggestions
4. Code Quality Score (1-10)`;

  try {
    console.log(`Using AI provider: ${useProvider}`);

    if (useProvider === "openai" && process.env.OPENAI_API_KEY) {
      console.log("Generating review with OpenAI...");
      const {text} = await generateText({
        model: openai("gpt-4o"),
        system: systemPrompts[tone],
        prompt
      });
      return text;
    } else {
      // Default to Gemini
      console.log("Generating review with Google Gemini...");
      const {text} = await generateText({
        model: google("gemini-1.5-pro"),
        system: systemPrompts[tone],
        prompt
      });
      return text;
    }
  } catch (error: any) {
    console.error(`Error generating review with ${useProvider}:`, error);

    // If the primary provider fails, try the fallback
    if (useProvider === "openai" && process.env.GOOGLE_API_KEY) {
      console.log("Falling back to Gemini...");
      return generateReview(codeContent, tone, "gemini");
    } else if (useProvider === "gemini" && process.env.OPENAI_API_KEY) {
      console.log("Falling back to OpenAI...");
      return generateReview(codeContent, tone, "openai");
    }

    // If we can't generate a review, return a simple message
    return `## Review Generation Failed

Unfortunately, there was an error generating a detailed review: ${error.message}

### Suggestions
- Try again later
- Check your API keys and environment variables
- If the problem persists, try a different AI provider`;
  }
}

export async function generateCommitMessage(diffContent: string, provider?: AIProvider) {
  const useProvider = provider || DEFAULT_AI_PROVIDER;

  const system = `You are an AI assistant that generates clear, concise, and descriptive commit messages based on code changes.
  Follow best practices for commit messages: use present tense, be specific but concise, and focus on what was changed and why.`;

  const prompt = `Based on the following code diff, generate an appropriate commit message:

${diffContent}

The commit message should have:
1. A brief summary line (50 chars or less)
2. A more detailed explanation if necessary (wrapped at 72 chars)`;

  try {
    if (useProvider === "openai" && process.env.OPENAI_API_KEY) {
      const {text} = await generateText({
        model: openai("gpt-4o"),
        system,
        prompt
      });
      return text;
    } else {
      // Default to Gemini
      const {text} = await generateText({
        model: google("gemini-1.5-pro"),
        system,
        prompt
      });
      return text;
    }
  } catch (error: any) {
    console.error(`Error generating commit message with ${useProvider}:`, error);

    // If the primary provider fails, try the fallback
    if (useProvider === "openai" && process.env.GOOGLE_API_KEY) {
      return generateCommitMessage(diffContent, "gemini");
    } else if (useProvider === "gemini" && process.env.OPENAI_API_KEY) {
      return generateCommitMessage(diffContent, "openai");
    }

    throw new Error(`Failed to generate commit message: ${error.message}`);
  }
}
