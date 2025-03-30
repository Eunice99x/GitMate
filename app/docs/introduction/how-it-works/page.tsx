import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {GitPullRequestIcon, Brain, Sparkles, Shield, Clock, MessageSquare, Settings} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className='container py-6 md:py-10'>
      <div className='max-w-3xl mx-auto space-y-8'>
        <div className='space-y-4'>
          <h1 className='text-3xl font-bold tracking-tight'>How GitMate Works</h1>
          <p className='text-muted-foreground text-lg'>Learn how GitMate uses AI to enhance your code review process.</p>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          <Card className='border-primary/20'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <GitPullRequestIcon className='h-5 w-5 text-primary' />
                <CardTitle>Pull Request Creation</CardTitle>
              </div>
              <CardDescription>Start your code review journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='rounded-lg bg-muted/50 p-4'>
                  <h3 className='font-semibold mb-2'>Process</h3>
                  <ol className='list-decimal list-inside text-sm text-muted-foreground space-y-2'>
                    <li>Create a pull request on GitHub</li>
                    <li>GitMate automatically detects the PR</li>
                    <li>AI analysis begins immediately</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='border-primary/20'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Brain className='h-5 w-5 text-primary' />
                <CardTitle>AI Analysis</CardTitle>
              </div>
              <CardDescription>Intelligent code review in action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='rounded-lg bg-muted/50 p-4'>
                  <h3 className='font-semibold mb-2'>Features</h3>
                  <ul className='list-disc list-inside text-sm text-muted-foreground space-y-1'>
                    <li>Code quality assessment</li>
                    <li>Security vulnerability checks</li>
                    <li>Best practices review</li>
                    <li>Performance optimization tips</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className='border-primary/20'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <MessageSquare className='h-5 w-5 text-primary' />
              <CardTitle>Review Feedback</CardTitle>
            </div>
            <CardDescription>Get detailed insights and suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              <div className='rounded-lg border border-primary/20 p-4 space-y-4'>
                <h3 className='font-semibold'>What You'll Receive</h3>
                <ul className='list-disc list-inside text-sm text-muted-foreground space-y-2'>
                  <li>Detailed code analysis with explanations</li>
                  <li>Specific suggestions for improvements</li>
                  <li>Security and performance recommendations</li>
                  <li>Best practices guidance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='grid gap-6 md:grid-cols-2'>
          <Card className='border-primary/20'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Clock className='h-5 w-5 text-primary' />
                <CardTitle>Time-Saving Features</CardTitle>
              </div>
              <CardDescription>Streamline your review process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='rounded-lg bg-muted/50 p-4'>
                  <h3 className='font-semibold mb-2'>Benefits</h3>
                  <ul className='list-disc list-inside text-sm text-muted-foreground space-y-1'>
                    <li>Instant initial review</li>
                    <li>Automated checks</li>
                    <li>Focused human review time</li>
                    <li>Consistent feedback</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='border-primary/20'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Settings className='h-5 w-5 text-primary' />
                <CardTitle>Customization</CardTitle>
              </div>
              <CardDescription>Tailor GitMate to your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='rounded-lg bg-muted/50 p-4'>
                  <h3 className='font-semibold mb-2'>Options</h3>
                  <ul className='list-disc list-inside text-sm text-muted-foreground space-y-1'>
                    <li>Choose AI provider</li>
                    <li>Set review preferences</li>
                    <li>Configure triggers</li>
                    <li>Customize feedback style</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='rounded-lg bg-muted/50 p-4 border border-primary/20'>
          <div className='flex items-start gap-2'>
            <Sparkles className='h-5 w-5 text-primary mt-0.5' />
            <div>
              <h3 className='font-semibold mb-2'>Ready to Get Started?</h3>
              <p className='text-sm text-muted-foreground mb-4'>Install GitMate on your GitHub repositories and experience smarter code reviews.</p>
              <Button asChild>
                <a href='/docs/configuration/github-setup'>Set Up GitMate</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
