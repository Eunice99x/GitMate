import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {GitPullRequestIcon, Zap, Brain, Shield} from "lucide-react";

export default function IntroductionPage() {
  return (
    <div className='container py-6 md:py-10'>
      <div className='max-w-3xl mx-auto space-y-8'>
        <div className='space-y-4'>
          <h1 className='text-3xl font-bold tracking-tight'>Welcome to GitMate</h1>
          <p className='text-muted-foreground text-lg'>GitMate is your AI-powered code review assistant that helps you write better code and save time.</p>
        </div>

        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <GitPullRequestIcon className='h-5 w-5 text-primary' />
              <CardTitle>What is GitMate?</CardTitle>
            </div>
            <CardDescription>Your intelligent companion for code reviews and quality assurance.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-sm text-muted-foreground'>
              GitMate is a powerful tool that integrates with your GitHub repositories to provide automated, intelligent code reviews. Using advanced AI models, it analyzes your code changes and provides actionable feedback to help improve code
              quality.
            </p>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='rounded-lg border p-4 space-y-2'>
                <div className='flex items-center gap-2'>
                  <Brain className='h-4 w-4 text-primary' />
                  <h3 className='font-semibold'>AI-Powered Analysis</h3>
                </div>
                <p className='text-sm text-muted-foreground'>Get intelligent feedback on code quality, potential bugs, and best practices.</p>
              </div>
              <div className='rounded-lg border p-4 space-y-2'>
                <div className='flex items-center gap-2'>
                  <Zap className='h-4 w-4 text-primary' />
                  <h3 className='font-semibold'>Lightning Fast</h3>
                </div>
                <p className='text-sm text-muted-foreground'>Receive instant feedback on your pull requests and code changes.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Shield className='h-5 w-5 text-primary' />
              <CardTitle>Key Features</CardTitle>
            </div>
            <CardDescription>Discover what makes GitMate your essential code review companion.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='rounded-lg border p-4 space-y-2'>
                <h3 className='font-semibold'>Automated Code Reviews</h3>
                <ul className='list-disc list-inside text-sm text-muted-foreground space-y-1'>
                  <li>Instant feedback on pull requests</li>
                  <li>Smart suggestions for code improvements</li>
                  <li>Best practices enforcement</li>
                </ul>
              </div>
              <div className='rounded-lg border p-4 space-y-2'>
                <h3 className='font-semibold'>Customizable Experience</h3>
                <ul className='list-disc list-inside text-sm text-muted-foreground space-y-1'>
                  <li>Choose between different AI providers</li>
                  <li>Select review tone and style</li>
                  <li>Configure repository-specific settings</li>
                </ul>
              </div>
              <div className='rounded-lg border p-4 space-y-2'>
                <h3 className='font-semibold'>GitHub Integration</h3>
                <ul className='list-disc list-inside text-sm text-muted-foreground space-y-1'>
                  <li>Seamless GitHub integration</li>
                  <li>Automatic review on pull requests</li>
                  <li>Command-based review triggers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='rounded-lg bg-muted p-4'>
          <h3 className='font-semibold mb-2'>Ready to Get Started?</h3>
          <p className='text-sm text-muted-foreground mb-4'>Configure GitMate for your repositories and start getting intelligent code reviews.</p>
          <Button asChild>
            <a href='/docs/configuration/github-setup'>Set Up GitMate</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
