import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckIcon,
  GitlabIcon as GitHubLogoIcon,
  RocketIcon,
  BarChart3Icon,
  MessageSquareIcon,
  GemIcon as GearIcon,
  CodeIcon,
  ArrowRightIcon,
  XIcon,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"

export default function FeaturesPage() {
  const features = [
    {
      title: "AI-Powered Code Reviews",
      description: "Get detailed, helpful feedback on your pull requests using advanced AI models.",
      icon: <MessageSquareIcon className="h-12 w-12 text-primary" />,
      details: [
        "Detect code smells and anti-patterns",
        "Suggest better variable names and structures",
        "Identify performance bottlenecks",
        "Provide actionable recommendations",
      ],
    },
    {
      title: "Customizable Tone",
      description: "Choose between different reviewer personalities to match your team's style.",
      icon: <GearIcon className="h-12 w-12 text-primary" />,
      details: [
        "Constructive Critic for detailed feedback",
        "Friendly Mentor for supportive guidance",
        "Enthusiastic Coach for positive reinforcement",
        "Custom tones for Team plan subscribers",
      ],
    },
    {
      title: "Code Quality Insights",
      description: "Detect patterns, suggest better variable names, and identify unnecessary complexity.",
      icon: <BarChart3Icon className="h-12 w-12 text-primary" />,
      details: [
        "Track code quality trends over time",
        "Identify recurring issues across repositories",
        "Get personalized improvement suggestions",
        "Compare against industry best practices",
      ],
    },
    {
      title: "GitHub Integration",
      description: "Seamlessly integrates with your GitHub workflow and repositories.",
      icon: <GitHubLogoIcon className="h-12 w-12 text-primary" />,
      details: [
        "Automatic PR reviews",
        "Command-based reviews (/gitmate review)",
        "Detailed inline comments",
        "Status checks integration",
      ],
    },
    {
      title: "Auto-Generated Commit Messages",
      description: "Get AI-suggested commit messages based on your code changes.",
      icon: <CodeIcon className="h-12 w-12 text-primary" />,
      details: [
        "Generate clear, descriptive commit messages",
        "Follow best practices automatically",
        "Save time on routine commits",
        "Maintain consistent commit style",
      ],
    },
    {
      title: "Team Performance Tracking",
      description: "Monitor code quality trends and improvements across your repositories.",
      icon: <BarChart3Icon className="h-12 w-12 text-primary" />,
      details: [
        "Track team-wide code quality metrics",
        "Identify areas for improvement",
        "Celebrate quality improvements",
        "Set and monitor quality goals",
      ],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <RocketIcon className="h-6 w-6" />
            <span>GitMate</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:underline">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm font-medium hover:underline">
              Docs
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Features</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover how GitMate can improve your code quality and development workflow
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="overflow-hidden flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardDescription className="text-base mb-4">{feature.description}</CardDescription>
                    <ul className="space-y-2">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Feature Spotlight</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">AI-Powered Code Reviews</h2>
                <p className="text-muted-foreground md:text-xl">
                  GitMate uses advanced AI models to provide detailed, helpful code reviews that go beyond what
                  traditional static analysis tools can offer.
                </p>
                <Tabs defaultValue="what" className="w-full mt-6">
                  <TabsList>
                    <TabsTrigger value="what">What It Does</TabsTrigger>
                    <TabsTrigger value="how">How It Works</TabsTrigger>
                    <TabsTrigger value="why">Why It Matters</TabsTrigger>
                  </TabsList>
                  <TabsContent value="what" className="space-y-4 mt-4">
                    <p>GitMate analyzes your code changes and provides:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckIcon className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Detailed feedback on code quality, structure, and potential issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Suggestions for improvements and best practices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Explanations of why certain approaches might be problematic</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Code quality score to track improvements over time</span>
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="how" className="space-y-4 mt-4">
                    <p>GitMate's AI-powered code review process:</p>
                    <ol className="space-y-2 list-decimal pl-5">
                      <li className="pl-2">When a pull request is created or updated, GitMate analyzes the diff</li>
                      <li className="pl-2">The AI model examines the code changes in context of the entire codebase</li>
                      <li className="pl-2">GitMate generates a comprehensive review with actionable feedback</li>
                      <li className="pl-2">The review is posted as a comment on the pull request</li>
                    </ol>
                  </TabsContent>
                  <TabsContent value="why" className="space-y-4 mt-4">
                    <p>AI-powered code reviews matter because they:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckIcon className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Catch issues that human reviewers might miss</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Provide consistent feedback across all pull requests</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Save time for human reviewers to focus on higher-level concerns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                        <span>Help developers learn and improve their coding skills</span>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
                <Button size="lg" className="mt-4 gap-2">
                  <GitHubLogoIcon className="mr-2 h-5 w-5" />
                  Try It Now
                </Button>
              </div>
              <div className="rounded-lg border bg-background p-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <GitHubLogoIcon className="h-4 w-4" />
                      <span>acme/frontend</span>
                      <span className="ml-auto">PR #42</span>
                    </div>
                    <h3 className="text-lg font-medium">Add new dashboard components</h3>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold">Summary</h4>
                        <p className="text-sm text-muted-foreground">
                          The PR adds new dashboard components with good structure but has some potential performance
                          issues.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold">Key Observations</h4>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground">
                          <li>Well-structured component hierarchy</li>
                          <li>Potential re-render issues in ChartComponent</li>
                          <li>Missing accessibility attributes on interactive elements</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold">Suggestions</h4>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground">
                          <li>Memoize the ChartComponent to prevent unnecessary re-renders</li>
                          <li>Add aria-label attributes to interactive elements</li>
                          <li>Consider extracting the data fetching logic to a custom hook</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold">Code Quality Score</h4>
                        <p className="text-sm text-muted-foreground">
                          7/10 - Good structure with room for optimization
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Compare Plans</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Choose the plan that best fits your needs
                </p>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 text-left font-medium">Features</th>
                    <th className="py-4 text-center font-medium">Free</th>
                    <th className="py-4 text-center font-medium">Pro</th>
                    <th className="py-4 text-center font-medium">Team</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4">AI Code Reviews</td>
                    <td className="py-4 text-center">Basic</td>
                    <td className="py-4 text-center">Advanced</td>
                    <td className="py-4 text-center">Advanced</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">Reviewer Tones</td>
                    <td className="py-4 text-center">1</td>
                    <td className="py-4 text-center">3</td>
                    <td className="py-4 text-center">3 + Custom</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">Code Quality Insights</td>
                    <td className="py-4 text-center">Basic</td>
                    <td className="py-4 text-center">Advanced</td>
                    <td className="py-4 text-center">Advanced</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">Auto-Generated Commit Messages</td>
                    <td className="py-4 text-center">
                      <XIcon className="mx-auto h-4 w-4 text-muted-foreground" />
                    </td>
                    <td className="py-4 text-center">
                      <CheckIcon className="mx-auto h-4 w-4 text-primary" />
                    </td>
                    <td className="py-4 text-center">
                      <CheckIcon className="mx-auto h-4 w-4 text-primary" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4">Team Analytics</td>
                    <td className="py-4 text-center">
                      <XIcon className="mx-auto h-4 w-4 text-muted-foreground" />
                    </td>
                    <td className="py-4 text-center">Basic</td>
                    <td className="py-4 text-center">Advanced</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <Link href="/pricing">
                <Button size="lg" className="gap-2">
                  View Pricing
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to improve your code quality?</h2>
                <p className="mx-auto max-w-[600px] md:text-xl">
                  Start your 14-day free trial today. No credit card required.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="gap-2">
                  <GitHubLogoIcon className="h-5 w-5" />
                  Install on GitHub
                </Button>
                <Link href="/docs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Read the Docs
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 GitMate. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

