import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import {generateReview} from "@/lib/review-generator";
import {fetchPullRequestDiff, postReviewComment} from "@/lib/github";
import {saveReview} from "@/lib/storage-service";

export const maxDuration = 60; // 60 seconds timeout (Vercel Hobby plan limit)

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
    const {repositoryName, pullRequestNumber, tone, provider, githubToken, openaiKey, googleApiKey} = body;

    if (!repositoryName || !pullRequestNumber) {
      console.error("Missing required parameters:", {repositoryName, pullRequestNumber});
      return NextResponse.json({error: "Missing required parameters"}, {status: 400});
    }

    if (!githubToken) {
      console.error("Missing GitHub token");
      return NextResponse.json({error: "GitHub token is required"}, {status: 400});
    }

    console.log(`Generating review for ${repositoryName} PR #${pullRequestNumber} with tone: ${tone}, provider: ${provider}`);

    // Map tone string to ReviewTone type
    const reviewTone = mapToneToReviewTone(tone);

    try {
      console.log(`Fetching diff for ${repositoryName} PR #${pullRequestNumber}...`);
      const diffText = await fetchPullRequestDiff(repositoryName, pullRequestNumber, githubToken);
      console.log(`Diff fetched successfully. Size: ${diffText.length} characters`);

      // Generate review using AI with a timeout
      console.log(`Generating review using ${provider}...`);
      const startTime = Date.now();

      // Pass the API keys to the generateReview function
      const review = await generateReview(diffText, reviewTone, provider, {openaiKey, googleKey: googleApiKey});

      console.log(`Review generated in ${(Date.now() - startTime) / 1000} seconds`);

      // Post review comment to GitHub
      console.log(`Posting review comment to GitHub...`);
      await postReviewComment(repositoryName, pullRequestNumber, review, githubToken);
      console.log(`Review posted successfully`);

      // Save review to localStorage
      const reviewId = `review-${Date.now()}`;
      saveReview({
        id: reviewId,
        repoId: repositoryName,
        repoName: repositoryName,
        prNumber: pullRequestNumber,
        prTitle: `Pull Request #${pullRequestNumber}`,
        authorName: (token.name as string) || "Unknown",
        reviewContent: review,
        aiProvider: provider,
        reviewTone: reviewTone,
        createdAt: new Date().toISOString()
      });

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
