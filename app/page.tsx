import Link from "next/link";
import {Button} from "@/components/ui/button";
import {GitlabIcon as GitHubLogoIcon, RocketIcon, GemIcon as GearIcon, BarChartIcon, CheckIcon, ArrowRightIcon} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Navbar} from "@/components/navbar";
import {GitHubAuthButton} from "@/components/github-auth-button";

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>GitMate – The AI Code Reviewer with Personality</h1>
                  <p className='max-w-[600px] text-muted-foreground md:text-xl'>Improve your code quality with helpful, personalized code reviews that make coding more fun.</p>
                </div>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <GitHubAuthButton size='lg' mode='install' callbackUrl='/dashboard'>
                    Install on GitHub
                  </GitHubAuthButton>
                  <Link href='/features'>
                    <Button size='lg' variant='outline' className='gap-2'>
                      Learn More
                      <ArrowRightIcon className='h-4 w-4' />
                    </Button>
                  </Link>
                </div>
                <div className='flex items-center gap-4 text-sm'>
                  <div className='flex items-center gap-1'>
                    <CheckIcon className='h-4 w-4 text-primary' />
                    <span>Free for open source</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <CheckIcon className='h-4 w-4 text-primary' />
                    <span>No credit card required</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <CheckIcon className='h-4 w-4 text-primary' />
                    <span>14-day free trial</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div className='rounded-lg border bg-background p-8 shadow-lg'>
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                        <GitHubLogoIcon className='h-4 w-4' />
                        <span>acme/frontend</span>
                        <span className='ml-auto'>PR #42</span>
                      </div>
                      <h3 className='text-lg font-medium'>Add new dashboard components</h3>
                    </div>
                    <div className='rounded-md bg-muted p-4'>
                      <div className='space-y-4'>
                        <div>
                          <h4 className='font-bold'>Summary</h4>
                          <p className='text-sm text-muted-foreground'>The PR adds new dashboard components with good structure but has some potential performance issues.</p>
                        </div>
                        <div>
                          <h4 className='font-bold'>Key Observations</h4>
                          <ul className='list-disc pl-5 text-sm text-muted-foreground'>
                            <li>Well-structured component hierarchy</li>
                            <li>Potential re-render issues in ChartComponent</li>
                            <li>Missing accessibility attributes on interactive elements</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='font-bold'>Suggestions</h4>
                          <ul className='list-disc pl-5 text-sm text-muted-foreground'>
                            <li>Memoize the ChartComponent to prevent unnecessary re-renders</li>
                            <li>Add aria-label attributes to interactive elements</li>
                            <li>Consider extracting the data fetching logic to a custom hook</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='font-bold'>Code Quality Score</h4>
                          <p className='text-sm text-muted-foreground'>7/10 - Good structure with room for optimization</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>Key Features</div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>Why Choose GitMate?</h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl'>GitMate combines AI-powered code analysis with a personalized approach to help you write better code.</p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8'>
              <Card className='flex flex-col'>
                <CardHeader>
                  <div className='rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-2'>
                    <GearIcon className='h-6 w-6 text-primary' />
                  </div>
                  <CardTitle>Customizable Tone</CardTitle>
                  <CardDescription>Choose between different reviewer personalities to match your team's style.</CardDescription>
                </CardHeader>
                <CardContent className='flex-1'>
                  <ul className='list-disc pl-5 space-y-2 text-sm text-muted-foreground'>
                    <li>Constructive Critic for detailed feedback</li>
                    <li>Friendly Mentor for supportive guidance</li>
                    <li>Enthusiastic Coach for positive reinforcement</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className='flex flex-col'>
                <CardHeader>
                  <div className='rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-2'>
                    <BarChartIcon className='h-6 w-6 text-primary' />
                  </div>
                  <CardTitle>Code Quality Insights</CardTitle>
                  <CardDescription>Get detailed feedback on your code quality and suggestions for improvement.</CardDescription>
                </CardHeader>
                <CardContent className='flex-1'>
                  <ul className='list-disc pl-5 space-y-2 text-sm text-muted-foreground'>
                    <li>Detect code smells and anti-patterns</li>
                    <li>Suggest better variable names and structures</li>
                    <li>Identify performance bottlenecks</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className='flex flex-col'>
                <CardHeader>
                  <div className='rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-2'>
                    <GitHubLogoIcon className='h-6 w-6 text-primary' />
                  </div>
                  <CardTitle>GitHub Integration</CardTitle>
                  <CardDescription>Seamlessly integrates with your GitHub workflow and repositories.</CardDescription>
                </CardHeader>
                <CardContent className='flex-1'>
                  <ul className='list-disc pl-5 space-y-2 text-sm text-muted-foreground'>
                    <li>Automatic PR reviews</li>
                    <li>Command-based reviews (/gitmate review)</li>
                    <li>Detailed inline comments</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-10 lg:grid-cols-2'>
              <div className='space-y-4'>
                <div className='inline-block rounded-lg bg-background px-3 py-1 text-sm'>How It Works</div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>Improve Your Code Quality in 3 Simple Steps</h2>
                <ul className='space-y-6 mt-6'>
                  <li className='flex items-start gap-4'>
                    <div className='rounded-full bg-primary/10 p-2 mt-1'>
                      <span className='font-bold text-primary'>1</span>
                    </div>
                    <div>
                      <h3 className='font-bold'>Install GitMate on GitHub</h3>
                      <p className='text-muted-foreground'>Add GitMate to your GitHub repositories with just a few clicks. No complex setup required.</p>
                    </div>
                  </li>
                  <li className='flex items-start gap-4'>
                    <div className='rounded-full bg-primary/10 p-2 mt-1'>
                      <span className='font-bold text-primary'>2</span>
                    </div>
                    <div>
                      <h3 className='font-bold'>Configure Your Preferences</h3>
                      <p className='text-muted-foreground'>Choose your preferred reviewer tone and customize settings to match your team's workflow.</p>
                    </div>
                  </li>
                  <li className='flex items-start gap-4'>
                    <div className='rounded-full bg-primary/10 p-2 mt-1'>
                      <span className='font-bold text-primary'>3</span>
                    </div>
                    <div>
                      <h3 className='font-bold'>Get AI-Powered Code Reviews</h3>
                      <p className='text-muted-foreground'>GitMate automatically reviews your pull requests and provides helpful feedback to improve your code.</p>
                    </div>
                  </li>
                </ul>
                <div className='mt-6'>
                  <Button size='lg' className='gap-2'>
                    <GitHubLogoIcon className='h-5 w-5' />
                    Get Started
                  </Button>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div className='relative'>
                  <div className='absolute -top-4 -left-4 right-4 bottom-4 rounded-lg border border-primary/20 bg-muted'></div>
                  <div className='relative rounded-lg border bg-background p-6 shadow-lg'>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <div className='h-2 w-2 rounded-full bg-red-500'></div>
                          <div className='h-2 w-2 rounded-full bg-yellow-500'></div>
                          <div className='h-2 w-2 rounded-full bg-green-500'></div>
                        </div>
                        <div className='text-xs text-muted-foreground'>pull_request.js</div>
                      </div>
                      <div className='space-y-2'>
                        <div className='rounded bg-muted px-2 py-1 font-mono text-xs'>
                          <span className='text-muted-foreground'>1</span> <span className='text-blue-500'>function</span> <span className='text-yellow-500'>fetchData</span>() {"{"}
                        </div>
                        <div className='rounded bg-muted px-2 py-1 font-mono text-xs'>
                          <span className='text-muted-foreground'>2</span> <span className='text-blue-500'>const</span> data = [];
                        </div>
                        <div className='rounded bg-muted px-2 py-1 font-mono text-xs'>
                          <span className='text-muted-foreground'>3</span> <span className='text-green-500'>// TODO: Implement API call</span>
                        </div>
                        <div className='rounded bg-muted px-2 py-1 font-mono text-xs'>
                          <span className='text-muted-foreground'>4</span> <span className='text-blue-500'>return</span> data;
                        </div>
                        <div className='rounded bg-muted px-2 py-1 font-mono text-xs'>
                          <span className='text-muted-foreground'>5</span> {"}"}
                        </div>
                      </div>
                      <div className='rounded-md border-l-4 border-yellow-500 bg-yellow-500/10 p-3'>
                        <div className='flex items-center gap-2'>
                          <RocketIcon className='h-4 w-4 text-yellow-500' />
                          <span className='font-medium text-sm'>GitMate Comment:</span>
                        </div>
                        <p className='text-sm text-muted-foreground mt-1'>This function is missing the actual API call implementation. Consider using async/await with proper error handling for better reliability.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>Trusted by Developers Worldwide</h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl'>Join thousands of developers who use GitMate to improve their code quality.</p>
              </div>
              <div className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 mt-8'>
                <div className='flex flex-col items-center space-y-2'>
                  <div className='text-4xl font-bold text-primary'>5,000+</div>
                  <p className='text-sm text-muted-foreground'>Repositories</p>
                </div>
                <div className='flex flex-col items-center space-y-2'>
                  <div className='text-4xl font-bold text-primary'>10,000+</div>
                  <p className='text-sm text-muted-foreground'>Developers</p>
                </div>
                <div className='flex flex-col items-center space-y-2'>
                  <div className='text-4xl font-bold text-primary'>100,000+</div>
                  <p className='text-sm text-muted-foreground'>PRs Reviewed</p>
                </div>
                <div className='flex flex-col items-center space-y-2'>
                  <div className='text-4xl font-bold text-primary'>98%</div>
                  <p className='text-sm text-muted-foreground'>Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>Ready to improve your code quality?</h2>
                <p className='mx-auto max-w-[600px] md:text-xl'>Start your 14-day free trial today. No credit card required.</p>
              </div>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Button size='lg' variant='secondary' className='gap-2'>
                  <GitHubLogoIcon className='h-5 w-5' />
                  Install on GitHub
                </Button>
                <Link href='/docs'>
                  <Button size='lg' variant='outline' className='gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10'>
                    Read the Docs
                    <ArrowRightIcon className='h-4 w-4' />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='border-t py-6 md:py-0'>
        <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
          <div className='flex items-center gap-2'>
            <RocketIcon className='h-5 w-5' />
            <p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>© 2025 GitMate. All rights reserved.</p>
          </div>
          <div className='flex gap-4'>
            <Link href='/terms' className='text-sm text-muted-foreground hover:underline'>
              Terms
            </Link>
            <Link href='/privacy' className='text-sm text-muted-foreground hover:underline'>
              Privacy
            </Link>
            <Link href='/docs' className='text-sm text-muted-foreground hover:underline'>
              Docs
            </Link>
            <Link href='/blog' className='text-sm text-muted-foreground hover:underline'>
              Blog
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
