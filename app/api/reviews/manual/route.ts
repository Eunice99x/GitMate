import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import {generateReview} from "@/lib/review-generator";
import {GITHUB_TOKEN, GOOGLE_API_KEY, OPENAI_API_KEY} from "@/lib/env";
import {fetchPullRequestDiff, postReviewComment} from "@/lib/github";

if (!GITHUB_TOKEN) {
  throw new Error("Missing GitHub token. Please set GITHUB_TOKEN environment variable.");
}

// Check if at least one AI provider is available
if (!GOOGLE_API_KEY && !OPENAI_API_KEY) {
  throw new Error("At least one AI provider API key (OPENAI_API_KEY or GOOGLE_API_KEY) is required");
}

export async function POST(request: Request) {
  try {
    // Verify authentication
    const token = await getToken({req: request});
    if (!token) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    // Parse request body
    const body = await request.json();
    const {repositoryName, pullRequestNumber, tone, provider} = body;

    if (!repositoryName || !pullRequestNumber) {
      return NextResponse.json({error: "Missing required parameters"}, {status: 400});
    }

    console.log(`Generating review for ${repositoryName} PR #${pullRequestNumber} with tone: ${tone}`);

    // Map tone string to ReviewTone type
    const reviewTone = mapToneToReviewTone(tone);

    // Check if we have the required API keys
    if (provider === "openai" && !process.env.OPENAI_API_KEY) {
      return NextResponse.json({error: "OpenAI API key is required but not configured"}, {status: 500});
    }

    if (provider === "gemini" && !process.env.GOOGLE_API_KEY) {
      return NextResponse.json({error: "Google API key is required but not configured"}, {status: 500});
    }

    // Fetch the PR diff from GitHub
    try {
      const diffText = await fetchPullRequestDiff(repositoryName, pullRequestNumber, (token.accessToken as string) || GITHUB_TOKEN);

      // Generate review using AI
      const review = await generateReview(diffText, reviewTone, provider);

      // Post review comment to GitHub
      await postReviewComment(repositoryName, pullRequestNumber, review, (token.accessToken as string) || GITHUB_TOKEN);

      return NextResponse.json({
        success: true,
        message: "Review generated and posted successfully"
      });
    } catch (error: any) {
      console.error("Error in review process:", error);
      return NextResponse.json({error: `Failed to process review: ${error.message}`}, {status: 500});
    }
  } catch (error: any) {
    console.error("Error processing manual review:", error);
    return NextResponse.json({error: `Failed to generate or post review: ${error.message}`}, {status: 500});
  }
}

function mapToneToReviewTone(tone?: string): "Constructive Critic" | "Friendly Mentor" | "Enthusiastic Coach" {
  switch (tone) {
    case "friendly":
      return "Friendly Mentor";
    case "enthusiastic":
      return "Enthusiastic Coach";
    case "constructive":
    default:
      return "Constructive Critic";
  }
}
