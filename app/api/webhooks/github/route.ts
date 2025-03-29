import {NextResponse} from "next/server";
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
    // In a production app, you would verify the GitHub webhook signature
    // const signature = request.headers.get("x-hub-signature-256");
    // if (!verifySignature(signature, await request.text())) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    const payload = await request.json();
    const event = request.headers.get("x-github-event");

    console.log(`Received GitHub webhook: ${event} - ${payload.action}`);

    // Handle pull request events
    if (event === "pull_request" && (payload.action === "opened" || payload.action === "synchronize")) {
      await handlePullRequest(payload);
    }

    // Handle issue comment events (for command-based reviews)
    if (event === "issue_comment" && payload.action === "created") {
      await handleIssueComment(payload);
    }

    return NextResponse.json({success: true});
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      {
        error: `Internal server error: ${error.message}`
      },
      {status: 500}
    );
  }
}

async function handlePullRequest(payload: any) {
  const {pull_request, repository} = payload;

  // Check if the repository has GitMate enabled
  // In a real app, you would check this in your database
  const isEnabled = true; // For demo purposes, assume it's enabled

  if (!isEnabled) {
    console.log(`Repository ${repository.full_name} has GitMate disabled. Skipping review.`);
    return;
  }

  try {
    // Fetch the PR diff
    const diffText = await fetchPullRequestDiff(repository.full_name, pull_request.number, GITHUB_TOKEN);

    // Get the repository's preferred review tone
    // In a real app, you would fetch this from your database
    const reviewTone = "Constructive Critic"; // Default tone

    // Generate code review using AI
    const review = await generateReview(diffText, reviewTone);

    // Post review comment to GitHub
    await postReviewComment(repository.full_name, pull_request.number, review, GITHUB_TOKEN);

    console.log(`Successfully posted review for ${repository.full_name} PR #${pull_request.number}`);
  } catch (error) {
    console.error(`Error reviewing PR #${pull_request.number} in ${repository.full_name}:`, error);
  }
}

async function handleIssueComment(payload: any) {
  const {comment, issue, repository} = payload;

  // Check if comment contains the review command
  if (comment.body.includes("/gitmate review")) {
    // Only proceed if this is a PR (issues with pull_request property)
    if (issue.pull_request) {
      try {
        // Fetch the PR diff
        const prNumber = issue.number;
        const diffText = await fetchPullRequestDiff(repository.full_name, prNumber, GITHUB_TOKEN);

        // Get the repository's preferred review tone
        // In a real app, you would fetch this from your database
        const reviewTone = "Constructive Critic"; // Default tone

        // Generate code review using AI
        const review = await generateReview(diffText, reviewTone);

        // Post review comment to GitHub
        await postReviewComment(repository.full_name, prNumber, review, GITHUB_TOKEN);

        console.log(`Successfully posted command-triggered review for ${repository.full_name} PR #${prNumber}`);
      } catch (error) {
        console.error(`Error processing command-triggered review for PR #${issue.number} in ${repository.full_name}:`, error);
      }
    }
  }
}
