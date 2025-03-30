import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoIcon, GitlabIcon as GitHubLogoIcon, KeyIcon, RocketIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

export default function SetupGuidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[800px] space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Environment Setup Guide</h1>
              <p className="text-muted-foreground">
                Follow these steps to set up the required environment variables for GitMate.
              </p>
            </div>

            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Keep your API keys and tokens secure. Never commit them to your repository or share them publicly.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Required Environment Variables</h2>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitHubLogoIcon className="h-5 w-5" />
                    GitHub Authentication
                  </CardTitle>
                  <CardDescription>These variables are required for GitHub OAuth and API access.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-mono text-sm">GITHUB_ID</div>
                    <p className="text-sm text-muted-foreground">The Client ID of your GitHub OAuth App.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="font-mono text-sm">GITHUB_SECRET</div>
                    <p className="text-sm text-muted-foreground">The Client Secret of your GitHub OAuth App.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="font-mono text-sm">GITHUB_TOKEN</div>
                    <p className="text-sm text-muted-foreground">
                      A Personal Access Token with appropriate permissions to access repositories and create comments.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <KeyIcon className="h-5 w-5" />
                    AI API Keys
                  </CardTitle>
                  <CardDescription>
                    Required for AI-powered code reviews. At least one provider is required.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-mono text-sm">GOOGLE_API_KEY</div>
                    <p className="text-sm text-muted-foreground">
                      Your Google Gemini API key for accessing Gemini models (recommended).
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Get a free API key from{" "}
                      <a
                        href="https://ai.google.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google AI Studio
                      </a>
                      .
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="font-mono text-sm">OPENAI_API_KEY</div>
                    <p className="text-sm text-muted-foreground">
                      Your OpenAI API key for accessing GPT models (optional).
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="font-mono text-sm">DEFAULT_AI_PROVIDER</div>
                    <p className="text-sm text-muted-foreground">
                      The default AI provider to use ("gemini" or "openai"). Defaults to "gemini" if not specified.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RocketIcon className="h-5 w-5" />
                    Next.js and Auth
                  </CardTitle>
                  <CardDescription>Required for authentication and secure sessions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-mono text-sm">NEXTAUTH_URL</div>
                    <p className="text-sm text-muted-foreground">
                      The base URL of your application (e.g., http://localhost:3000 for development).
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="font-mono text-sm">NEXTAUTH_SECRET</div>
                    <p className="text-sm text-muted-foreground">
                      A random string used to hash tokens and sign cookies. Generate a secure random string.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Setting Up Environment Variables</h2>

              <Tabs defaultValue="local" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                  <TabsTrigger value="local">Local Development</TabsTrigger>
                  <TabsTrigger value="production">Production (Vercel)</TabsTrigger>
                </TabsList>
                <TabsContent value="local" className="space-y-4 mt-4">
                  <p>
                    For local development, create a{" "}
                    <code className="font-mono text-sm bg-muted px-1 py-0.5 rounded">.env.local</code> file in the root
                    of your project with the following variables:
                  </p>

                  <div className="rounded-md bg-muted p-4 font-mono text-sm overflow-x-auto">
                    <pre>{`# GitHub Authentication
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GITHUB_TOKEN=your_github_personal_access_token

# AI API Keys (at least one is required)
GOOGLE_API_KEY=your_google_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
DEFAULT_AI_PROVIDER=gemini

# Next.js and Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_string`}</pre>
                  </div>

                  <Alert className="bg-muted/50 mt-4">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Tip</AlertTitle>
                    <AlertDescription>
                      You can generate a secure random string for NEXTAUTH_SECRET using the command:{" "}
                      <code className="font-mono text-sm bg-muted px-1 py-0.5 rounded">openssl rand -base64 32</code>
                    </AlertDescription>
                  </Alert>
                </TabsContent>
                <TabsContent value="production" className="space-y-4 mt-4">
                  <p>For production deployment on Vercel, add these environment variables in your project settings:</p>

                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Go to your Vercel dashboard and select your project</li>
                    <li>Navigate to the "Settings" tab</li>
                    <li>Click on "Environment Variables"</li>
                    <li>Add each of the required variables listed above</li>
                    <li>For NEXTAUTH_URL, use your production URL (e.g., https://your-app.vercel.app)</li>
                    <li>Deploy your application to apply the changes</li>
                  </ol>

                  <div className="mt-4">
                    <Button asChild>
                      <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer">
                        Go to Vercel Dashboard
                      </a>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Obtaining API Keys and Tokens</h2>

              <Card>
                <CardHeader>
                  <CardTitle>Google Gemini API Key</CardTitle>
                  <CardDescription>Get a free API key from Google AI Studio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      Go to{" "}
                      <a
                        href="https://ai.google.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google AI Studio
                      </a>
                    </li>
                    <li>Sign in with your Google account</li>
                    <li>Click on "Get API key" or navigate to the API keys section</li>
                    <li>Create a new API key</li>
                    <li>Copy the API key and add it to your environment variables as GOOGLE_API_KEY</li>
                  </ol>
                  <Alert className="mt-4">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Recommended</AlertTitle>
                    <AlertDescription>
                      Google Gemini offers a generous free tier that's suitable for most GitMate usage.
                    </AlertDescription>
                  </Alert>
                  <div className="mt-4">
                    <Button asChild variant="outline">
                      <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer">
                        Google AI Studio
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>GitHub OAuth App</CardTitle>
                  <CardDescription>Create a GitHub OAuth App to get your Client ID and Secret.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Go to your GitHub account settings</li>
                    <li>Navigate to "Developer settings" → "OAuth Apps"</li>
                    <li>Click "New OAuth App"</li>
                    <li>
                      Fill in the application details:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Application name: GitMate</li>
                        <li>Homepage URL: Your application URL</li>
                        <li>Authorization callback URL: Your application URL + /api/auth/callback/github</li>
                      </ul>
                    </li>
                    <li>Click "Register application"</li>
                    <li>Copy the Client ID and generate a Client Secret</li>
                  </ol>

                  <div className="mt-4">
                    <Button asChild variant="outline">
                      <a href="https://github.com/settings/developers" target="_blank" rel="noopener noreferrer">
                        GitHub Developer Settings
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>GitHub Personal Access Token</CardTitle>
                  <CardDescription>Create a Personal Access Token for API access.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Go to your GitHub account settings</li>
                    <li>Navigate to "Developer settings" → "Personal access tokens" → "Tokens (classic)"</li>
                    <li>Click "Generate new token" → "Generate new token (classic)"</li>
                    <li>Give your token a descriptive name</li>
                    <li>
                      Select the following scopes:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>repo (Full control of private repositories)</li>
                        <li>read:user (Read user profile data)</li>
                        <li>user:email (Access user email addresses)</li>
                      </ul>
                    </li>
                    <li>Click "Generate token"</li>
                    <li>Copy the token immediately (you won't be able to see it again)</li>
                  </ol>

                  <div className="mt-4">
                    <Button asChild variant="outline">
                      <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
                        GitHub Personal Access Tokens
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>OpenAI API Key (Optional)</CardTitle>
                  <CardDescription>Get an API key from OpenAI.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Create or log in to your OpenAI account</li>
                    <li>Navigate to the API section</li>
                    <li>Go to "API Keys"</li>
                    <li>Click "Create new secret key"</li>
                    <li>Give your key a name and click "Create"</li>
                    <li>Copy the API key immediately (you won't be able to see it again)</li>
                  </ol>

                  <div className="mt-4">
                    <Button asChild variant="outline">
                      <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
                        OpenAI API Keys
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
              <p>
                Once you've set up all the required environment variables, you can start using GitMate. Check out the
                documentation for more information on how to use the application.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/docs">Read the Docs</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
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

