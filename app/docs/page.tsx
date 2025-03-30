import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {InfoIcon, BookIcon, RocketIcon, GitlabIcon as GitHubLogoIcon} from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className='space-y-6 lg:space-y-10'>
      <div className='space-y-2'>
        <h1 className='scroll-m-20 text-4xl font-bold tracking-tight'>Documentation</h1>
        <p className='text-lg text-muted-foreground'>Learn how to install, configure, and use GitMate to improve your code quality.</p>
      </div>

      <Alert>
        <InfoIcon className='h-4 w-4' />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>GitMate is currently in beta. Some features may change before the final release.</AlertDescription>
      </Alert>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='flex flex-col'>
          <CardHeader>
            <BookIcon className='h-5 w-5 text-primary mb-2' />
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Learn the basics of GitMate and how to set it up for your repositories.</CardDescription>
          </CardHeader>
          <CardContent className='flex-1'>
            <ul className='list-disc pl-5 space-y-2'>
              <li>
                <Link href='/docs/getting-started/introduction' className='text-primary hover:underline'>
                  Introduction
                </Link>
              </li>
              <li>
                <Link href='/docs/getting-started/installation' className='text-primary hover:underline'>
                  Installation
                </Link>
              </li>
              <li>
                <Link href='/docs/getting-started/configuration' className='text-primary hover:underline'>
                  Configuration
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className='flex flex-col'>
          <CardHeader>
            <RocketIcon className='h-5 w-5 text-primary mb-2' />
            <CardTitle>Features</CardTitle>
            <CardDescription>Explore GitMate's features and how to use them effectively.</CardDescription>
          </CardHeader>
          <CardContent className='flex-1'>
            <ul className='list-disc pl-5 space-y-2'>
              <li>
                <Link href='/docs/features/code-reviews' className='text-primary hover:underline'>
                  AI Code Reviews
                </Link>
              </li>
              <li>
                <Link href='/docs/features/reviewer-tones' className='text-primary hover:underline'>
                  Reviewer Tones
                </Link>
              </li>
              <li>
                <Link href='/docs/features/analytics' className='text-primary hover:underline'>
                  Analytics Dashboard
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className='flex flex-col'>
          <CardHeader>
            <GitHubLogoIcon className='h-5 w-5 text-primary mb-2' />
            <CardTitle>GitHub Integration</CardTitle>
            <CardDescription>Learn how GitMate integrates with GitHub and your workflow.</CardDescription>
          </CardHeader>
          <CardContent className='flex-1'>
            <ul className='list-disc pl-5 space-y-2'>
              <li>
                <Link href='/docs/github/permissions' className='text-primary hover:underline'>
                  Required Permissions
                </Link>
              </li>
              <li>
                <Link href='/docs/github/webhooks' className='text-primary hover:underline'>
                  Webhook Events
                </Link>
              </li>
              <li>
                <Link href='/docs/github/commands' className='text-primary hover:underline'>
                  Bot Commands
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-4'>
        <h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Quick Start Guide</h2>

        <Tabs defaultValue='github-app' className='w-full'>
          <TabsList className='grid w-full grid-cols-2 md:w-[400px]'>
            <TabsTrigger value='github-app'>GitHub App</TabsTrigger>
            <TabsTrigger value='self-hosted'>Self-Hosted</TabsTrigger>
          </TabsList>
          <TabsContent value='github-app' className='space-y-4'>
            <div className='rounded-md bg-muted p-4 space-y-4'>
              <h3 className='font-medium'>1. Install the GitHub App</h3>
              <p className='text-sm text-muted-foreground'>
                Visit the{" "}
                <Link href='#' className='text-primary hover:underline'>
                  GitMate GitHub App
                </Link>{" "}
                page and click "Install".
              </p>

              <h3 className='font-medium'>2. Select repositories</h3>
              <p className='text-sm text-muted-foreground'>Choose which repositories you want GitMate to have access to.</p>

              <h3 className='font-medium'>3. Configure settings</h3>
              <p className='text-sm text-muted-foreground'>After installation, you'll be redirected to the GitMate dashboard where you can configure your settings.</p>

              <h3 className='font-medium'>4. Create a pull request</h3>
              <p className='text-sm text-muted-foreground'>GitMate will automatically review new pull requests in the repositories where it's installed.</p>
            </div>
          </TabsContent>
          <TabsContent value='self-hosted' className='space-y-4'>
            <div className='rounded-md bg-muted p-4 space-y-4'>
              <h3 className='font-medium'>1. Clone the repository</h3>
              <p className='text-sm text-muted-foreground'>
                <code className='rounded bg-muted-foreground/20 px-1'>git clone https://github.com/gitmate/gitmate.git</code>
              </p>

              <h3 className='font-medium'>2. Install dependencies</h3>
              <p className='text-sm text-muted-foreground'>
                <code className='rounded bg-muted-foreground/20 px-1'>npm install</code>
              </p>

              <h3 className='font-medium'>3. Configure environment variables</h3>
              <p className='text-sm text-muted-foreground'>
                Copy <code className='rounded bg-muted-foreground/20 px-1'>.env.example</code> to <code className='rounded bg-muted-foreground/20 px-1'>.env.local</code> and fill in your GitHub and OpenAI API keys.
              </p>

              <h3 className='font-medium'>4. Start the server</h3>
              <p className='text-sm text-muted-foreground'>
                <code className='rounded bg-muted-foreground/20 px-1'>npm run dev</code>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className='space-y-4'>
        <h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Configuration Options</h2>

        <div className='rounded-md border'>
          <div className='grid grid-cols-5 border-b px-4 py-2 font-medium'>
            <div className='col-span-2'>Option</div>
            <div className='col-span-2'>Description</div>
            <div>Default</div>
          </div>
          <div className='grid grid-cols-5 border-b px-4 py-3'>
            <div className='col-span-2 font-mono text-sm'>reviewTone</div>
            <div className='col-span-2 text-sm text-muted-foreground'>The personality tone used for code reviews</div>
            <div className='text-sm'>"Constructive Critic"</div>
          </div>
          <div className='grid grid-cols-5 border-b px-4 py-3'>
            <div className='col-span-2 font-mono text-sm'>autoReview</div>
            <div className='col-span-2 text-sm text-muted-foreground'>Automatically review new pull requests</div>
            <div className='text-sm'>true</div>
          </div>
          <div className='grid grid-cols-5 border-b px-4 py-3'>
            <div className='col-span-2 font-mono text-sm'>commandEnabled</div>
            <div className='col-span-2 text-sm text-muted-foreground'>Enable the /gitmate review command</div>
            <div className='text-sm'>true</div>
          </div>
          <div className='grid grid-cols-5 px-4 py-3'>
            <div className='col-span-2 font-mono text-sm'>maxReviewSize</div>
            <div className='col-span-2 text-sm text-muted-foreground'>Maximum diff size in lines to review</div>
            <div className='text-sm'>1000</div>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        <h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>API Reference</h2>
        <p className='text-muted-foreground'>GitMate provides a REST API for integrating with your own tools and workflows.</p>

        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>All API requests require authentication using an API key.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground mb-4'>Include your API key in the Authorization header:</p>
            <pre className='rounded-md bg-muted p-4 overflow-x-auto'>
              <code>Authorization: Bearer your-api-key</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Endpoints</CardTitle>
            <CardDescription>Available API endpoints and their usage.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='font-medium mb-2'>GET /api/repositories</h3>
              <p className='text-sm text-muted-foreground'>Returns a list of repositories connected to your GitMate account.</p>
            </div>
            <div>
              <h3 className='font-medium mb-2'>POST /api/reviews</h3>
              <p className='text-sm text-muted-foreground'>Manually trigger a code review for a specific pull request.</p>
            </div>
            <div>
              <h3 className='font-medium mb-2'>GET /api/analytics</h3>
              <p className='text-sm text-muted-foreground'>Retrieve analytics data for your repositories.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
