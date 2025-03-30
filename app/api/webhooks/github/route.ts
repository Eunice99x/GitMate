import {NextResponse} from "next/server";
import crypto from "crypto";
import {generateReview} from "@/lib/review-generator";
import {fetchPullRequestDiff, postReviewComment} from "@/lib/github";
import {GITHUB_TOKEN, GITHUB_WEBHOOK_SECRET} from "@/lib/env";

type ReviewTone = "Constructive Critic" | "Friendly Mentor" | "Enthusiastic Coach";

// In-memory storage for repository settings
const repositorySettings = new Map<string, {automaticReviews: boolean; commandBasedReviews: boolean; reviewTone: ReviewTone; aiProvider: string}>();

// Verify GitHub webhook signature
function verifySignature(payload: string, signature: string): boolean {
  if (!GITHUB_WEBHOOK_SECRET) {
    console.error("GITHUB_WEBHOOK_SECRET is not set");
    return false;
  }

  const hmac = crypto.createHmac("sha256", GITHUB_WEBHOOK_SECRET);
  const digest = `sha256=${hmac.update(payload).digest("hex")}`;
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export async function POST(request: Request) {
  try {
    // Get the signature from the headers
    const signature = request.headers.get("x-hub-signature-256");
    if (!signature) {
      console.error("No signature found in webhook request");
      return NextResponse.json({error: "No signature found"}, {status: 401});
    }

    // Get the payload
    const payload = await request.text();

    // Verify the signature
    if (!verifySignature(payload, signature)) {
      console.error("Invalid signature in webhook request");
      return NextResponse.json({error: "Invalid signature"}, {status: 401});
    }

    // Parse the payload
    const data = JSON.parse(payload);
    const event = request.headers.get("x-github-event");

    console.log(`Received GitHub webhook event: ${event}`);

    // Handle pull request events
    if (event === "pull_request") {
      const action = data.action;
      const pullRequest = data.pull_request;
      const repository = data.repository;

      // Only process newly opened PRs or when requested for review
      if (action === "opened" || action === "ready_for_review") {
        console.log(`Processing ${action} PR #${pullRequest.number} in ${repository.full_name}`);

        // Check if the repository is enabled for automatic reviews
        const settings = repositorySettings.get(repository.id.toString()) || {
          automaticReviews: true,
          commandBasedReviews: true,
          reviewTone: "Constructive Critic" as ReviewTone,
          aiProvider: "gemini"
        };

        if (!settings.automaticReviews) {
          console.log(`Automatic reviews are disabled for repository ${repository.full_name}`);
          return NextResponse.json({message: "Automatic reviews are disabled for this repository"});
        }

        // Get the PR diff
        const diffText = await fetchPullRequestDiff(repository.full_name, pullRequest.number, GITHUB_TOKEN);

        // Generate review based on repository settings
        const reviewTone = settings.reviewTone;
        const aiProvider = settings.aiProvider;

        console.log(`Generating review using ${aiProvider} with tone: ${reviewTone}`);
        const review = await generateReview(diffText, reviewTone, aiProvider);

        // Post the review as a comment
        await postReviewComment(repository.full_name, pullRequest.number, review, GITHUB_TOKEN);

        console.log(`Successfully processed PR #${pullRequest.number}`);
        return NextResponse.json({success: true});
      }
    }

    // Handle issue comment events (for command-based reviews)
    if (event === "issue_comment" && data.action === "created") {
      const comment = data.comment;
      const issue = data.issue;
      const repository = data.repository;

      // Check if this is a PR comment (GitHub considers PRs as issues)
      if (issue.pull_request) {
        // Check if the comment contains the review command
        if (comment.body.trim().toLowerCase().startsWith("/gitmate review")) {
          console.log(`Processing review command for PR #${issue.number} in ${repository.full_name}`);

          // Check if the repository is enabled for command-based reviews
          const settings = repositorySettings.get(repository.id.toString()) || {
            automaticReviews: true,
            commandBasedReviews: true,
            reviewTone: "Constructive Critic" as ReviewTone,
            aiProvider: "gemini"
          };

          if (!settings.commandBasedReviews) {
            console.log(`Command-based reviews are disabled for repository ${repository.full_name}`);
            return NextResponse.json({message: "Command-based reviews are disabled for this repository"});
          }

          // Parse command options (if any)
          const commandParts = comment.body.trim().split(" ");
          let tone = settings.reviewTone;
          let provider = settings.aiProvider;

          // Check for tone option
          if (commandParts.includes("--tone")) {
            const toneIndex = commandParts.indexOf("--tone") + 1;
            if (toneIndex < commandParts.length) {
              const requestedTone = commandParts[toneIndex].toLowerCase();
              if (["constructive", "friendly", "enthusiastic"].includes(requestedTone)) {
                tone = requestedTone === "constructive" ? "Constructive Critic" : requestedTone === "friendly" ? "Friendly Mentor" : "Enthusiastic Coach";
              }
            }
          }

          // Check for provider option
          if (commandParts.includes("--provider")) {
            const providerIndex = commandParts.indexOf("--provider") + 1;
            if (providerIndex < commandParts.length) {
              const requestedProvider = commandParts[providerIndex].toLowerCase();
              if (["openai", "gemini"].includes(requestedProvider)) {
                provider = requestedProvider;
              }
            }
          }

          // Get the PR diff
          const diffText = await fetchPullRequestDiff(repository.full_name, issue.number, GITHUB_TOKEN);

          // Generate review
          console.log(`Generating review using ${provider} with tone: ${tone}`);
          const review = await generateReview(diffText, tone, provider);

          // Post the review as a comment
          await postReviewComment(repository.full_name, issue.number, review, GITHUB_TOKEN);

          console.log(`Successfully processed command-based review for PR #${issue.number}`);
          return NextResponse.json({success: true});
        }
      }
    }

    // Return success for other events
    return NextResponse.json({message: "Webhook received"});
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
