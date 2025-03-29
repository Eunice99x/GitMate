import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function IntroductionPage() {
  return (
    <div className="space-y-6 lg:space-y-10">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Introduction to GitMate</h1>
        <p className="text-lg text-muted-foreground">
          Learn about GitMate and how it can help improve your code quality.
        </p>
      </div>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          GitMate is currently in beta. Some features may change before the final release.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">What is GitMate?</h2>
        <p>
          GitMate is an AI-powered GitHub bot that reviews pull requests with helpful, constructive feedback. It
          analyzes your code changes and provides insights to help improve code quality, catch potential issues, and
          ensure best practices are followed.
        </p>
        <p>
          Unlike traditional linters or static analysis tools, GitMate uses advanced AI models to understand the context
          and intent of your code, providing more nuanced and helpful feedback.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Key Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>AI-Powered Code Reviews</strong> - Get detailed, helpful feedback on your pull requests using
            advanced AI models.
          </li>
          <li>
            <strong>Customizable Tone</strong> - Choose between different reviewer personalities to match your team's
            style.
          </li>
          <li>
            <strong>Code Quality Insights</strong> - Detect patterns, suggest better variable names, and identify
            unnecessary complexity.
          </li>
          <li>
            <strong>GitHub Integration</strong> - Seamlessly integrates with your GitHub workflow and repositories.
          </li>
          <li>
            <strong>Auto-Generated Commit Messages</strong> - Get AI-suggested commit messages based on your code
            changes.
          </li>
          <li>
            <strong>Team Performance Tracking</strong> - Monitor code quality trends and improvements across your
            repositories.
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">How It Works</h2>
        <p>
          GitMate integrates with your GitHub repositories through a GitHub App. When a pull request is created or
          updated, GitMate analyzes the changes and provides feedback as a comment on the pull request.
        </p>
        <p>
          You can also manually trigger a review by commenting{" "}
          <code className="rounded bg-muted-foreground/20 px-1">/gitmate review</code> on a pull request.
        </p>
        <p>
          GitMate uses advanced AI models to analyze your code and generate helpful, constructive feedback. It looks for
          potential issues, suggests improvements, and provides an overall code quality score.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Getting Started</h2>
        <p>To get started with GitMate, you'll need to:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Install the GitMate GitHub App on your repositories</li>
          <li>Configure your preferences in the GitMate dashboard</li>
          <li>Create a pull request to see GitMate in action</li>
        </ol>
        <p>
          Check out the{" "}
          <a href="/docs/getting-started/installation" className="text-primary hover:underline">
            Installation Guide
          </a>{" "}
          for detailed instructions.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Use Cases</h2>
        <div className="space-y-2">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">For Individual Developers</h3>
          <p>
            Get a second pair of eyes on your code, even when working solo. GitMate helps you catch issues and improve
            your code quality before sharing it with others.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">For Teams</h3>
          <p>
            Supplement human code reviews with AI-powered insights. GitMate helps maintain code quality standards and
            reduces the burden on human reviewers by catching common issues automatically.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">For Open Source Projects</h3>
          <p>
            Ensure consistent code quality across contributions from different developers. GitMate helps maintain
            project standards and provides helpful feedback to new contributors.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Next Steps</h2>
        <p>Ready to get started? Check out these resources:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <a href="/docs/getting-started/installation" className="text-primary hover:underline">
              Installation Guide
            </a>{" "}
            - Learn how to install GitMate on your repositories.
          </li>
          <li>
            <a href="/docs/getting-started/configuration" className="text-primary hover:underline">
              Configuration Guide
            </a>{" "}
            - Learn how to configure GitMate to suit your needs.
          </li>
          <li>
            <a href="/docs/features/code-reviews" className="text-primary hover:underline">
              Code Reviews
            </a>{" "}
            - Learn more about GitMate's code review capabilities.
          </li>
        </ul>
      </div>
    </div>
  )
}

