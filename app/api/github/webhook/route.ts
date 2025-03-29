import {type NextRequest, NextResponse} from "next/server";
import {generateText} from "ai";
import {openai} from "@ai-sdk/openai";
import {GITHUB_TOKEN, OPENAI_API_KEY} from "@/lib/env";

if (!GITHUB_TOKEN) {
  throw new Error("Missing GitHub token. Please set GITHUB_TOKEN environment variable.");
}

if (!OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API key. Please set OPENAI_API_KEY environment variable.");
}

export async function POST(request: NextRequest) {
  try {
    // Verify GitHub webhook signature (implementation omitted for brevity)
    // const signature = request.headers.get("x-hub-signature-256");
    // if (!verifySignature(signature, await request.text())) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    const payload = await request.json();
    const event = request.headers.get("x-github-event");

    // Handle pull request events
    if ((event === "pull_request" && payload.action === "opened") || payload.action === "synchronize") {
      await handlePullRequest(payload);
    }

    // Handle issue comment events (for command-based reviews)
    if (event === "issue_comment" && payload.action === "created") {
      await handleIssueComment(payload);
    }

    return NextResponse.json({success: true});
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}

async function handlePullRequest(payload: any) {
  const {pull_request, repository} = payload;

  // Fetch the PR diff
  const diffUrl = pull_request.diff_url;
  const diffResponse = await fetch(diffUrl);
  const diffText = await diffResponse.text();

  // Generate code review using AI
  const review = await generateCodeReview(diffText, "Constructive Critic");

  // Post review comment to GitHub
  await postReviewComment(repository.full_name, pull_request.number, review);
}

async function handleIssueComment(payload: any) {
  const {comment, issue, repository} = payload;

  // Check if comment contains the review command
  if (comment.body.includes("/gitmate review")) {
    // Only proceed if this is a PR (issues with pull_request property)
    if (issue.pull_request) {
      // Fetch the PR diff
      const prNumber = issue.number;
      const diffUrl = `https://github.com/${repository.full_name}/pull/${prNumber}.diff`;
      const diffResponse = await fetch(diffUrl);
      const diffText = await diffResponse.text();

      // Generate code review using AI
      const review = await generateCodeReview(diffText, "Constructive Critic");

      // Post review comment to GitHub
      await postReviewComment(repository.full_name, prNumber, review);
    }
  }
}

async function generateCodeReview(diffText: string, tone: string) {
  // Use AI SDK to generate the review
  const {text} = await generateText({
    model: openai("gpt-3.5-turbo"),
    system: `You are GitMate, an AI code reviewer with a ${tone} personality. 
    Your goal is to provide helpful, constructive feedback on code changes.
    Focus on code quality, potential bugs, and best practices.
    Be concise but thorough, and maintain a friendly, professional tone.`,
    prompt: `Review the following code diff and provide feedback:
    
    ${diffText.substring(0, 8000)} // Truncate if too long
    
    Provide your review in markdown format with sections for:
    1. Summary
    2. Key Observations
    3. Suggestions
    4. Code Quality Score (1-10)`
  });

  return text;
}

async function postReviewComment(repoFullName: string, prNumber: number, reviewText: string) {
  // This would use the GitHub API to post the review
  console.log(`Posting review to ${repoFullName}#${prNumber}`);

  // Implementation using GitHub's REST API with token authentication
  const response = await fetch(`https://api.github.com/repos/${repoFullName}/issues/${prNumber}/comments`, {
    method: "POST",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({body: reviewText})
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`GitHub API error: ${response.statusText} - ${JSON.stringify(errorData)}`);
  }

  return response.json();
}
