import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import {generateReview} from "@/lib/review-generator";
import {GITHUB_TOKEN, GOOGLE_API_KEY, OPENAI_API_KEY} from "@/lib/env";
import {fetchPullRequestDiff, postReviewComment} from "@/lib/github";

if (!GITHUB_TOKEN) {
  console.error("Missing GitHub token. Please set GITHUB_TOKEN environment variable.");
  throw new Error("Missing GitHub token. Please set GITHUB_TOKEN environment variable.");
}

// Check if at least one AI provider is available
if (!GOOGLE_API_KEY && !OPENAI_API_KEY) {
  console.error("At least one AI provider API key (OPENAI_API_KEY or GOOGLE_API_KEY) is required");
  throw new Error("At least one AI provider API key (OPENAI_API_KEY or GOOGLE_API_KEY) is required");
}

export async function POST(request: Request) {
  try {
    // Verify authentication
    const token = await getToken({req: request});
    if (!token) {
      console.error("Unauthorized request to manual review endpoint");
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    // Parse request body
    const body = await request.json();
    const {repositoryName, pullRequestNumber, tone, provider} = body;

    if (!repositoryName || !pullRequestNumber) {
      console.error("Missing required parameters:", {repositoryName, pullRequestNumber});
      return NextResponse.json({error: "Missing required parameters"}, {status: 400});
    }

    console.log(`Generating review for ${repositoryName} PR #${pullRequestNumber} with tone: ${tone}, provider: ${provider}`);

    // Map tone string to ReviewTone type
    const reviewTone = mapToneToReviewTone(tone);

    // Check if we have the required API keys
    if (provider === "openai" && !process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is required but not configured");
      return NextResponse.json({error: "OpenAI API key is required but not configured"}, {status: 500});
    }

    if (provider === "gemini" && !process.env.GOOGLE_API_KEY) {
      console.error("Google API key is required but not configured");
      return NextResponse.json({error: "Google API key is required but not configured"}, {status: 500});
    }

    // Log the API keys (masked for security)
    console.log(
      `Using ${provider === "openai" ? "OpenAI" : "Google"} API key: ${
        provider === "openai" ? (process.env.OPENAI_API_KEY ? "****" + process.env.OPENAI_API_KEY.slice(-4) : "Not set") : process.env.GOOGLE_API_KEY ? "****" + process.env.GOOGLE_API_KEY.slice(-4) : "Not set"
      }`
    );

    // Fetch the PR diff from GitHub
    try {
      console.log(`Fetching diff for ${repositoryName} PR #${pullRequestNumber}...`);
      const diffText = await fetchPullRequestDiff(repositoryName, pullRequestNumber, (token.accessToken as string) || GITHUB_TOKEN);
      console.log(`Diff fetched successfully. Size: ${diffText.length} characters`);

      // Generate review using AI with a timeout
      console.log(`Generating review using ${provider}...`);
      const startTime = Date.now();
      const review = await generateReview(diffText, reviewTone, provider);
      console.log(`Review generated in ${(Date.now() - startTime) / 1000} seconds`);

      // Post review comment to GitHub
      console.log(`Posting review comment to GitHub...`);
      await postReviewComment(repositoryName, pullRequestNumber, review, (token.accessToken as string) || GITHUB_TOKEN);
      console.log(`Review posted successfully`);

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
