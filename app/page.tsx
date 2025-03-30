"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {GitPullRequestIcon, Sparkles, Zap, Shield, Brain, ArrowRightIcon, MessageSquare} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Navbar} from "@/components/navbar";
import {GitHubAuthButton} from "@/components/github-auth-button";
import {Footer} from "@/components/footer";
import {motion} from "framer-motion";

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1'>
        {/* Hero Section */}
        <section className='relative overflow-hidden'>
          {/* Background gradient */}
          <div className='absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/60' />

          {/* Animated grid pattern */}
          <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]' />

          <div className='relative container px-4 md:px-6 py-24 sm:py-32'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <div className='flex flex-col justify-center space-y-4'>
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className='space-y-2'>
                  <div className='inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20'>
                    <Sparkles className='mr-2 h-4 w-4' />
                    AI-Powered Code Reviews
                  </div>
                  <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60'>Supercharge Your Code Reviews with AI</h1>
                  <p className='max-w-[600px] text-muted-foreground md:text-xl'>Get instant, intelligent feedback on your code changes. Save time, catch issues early, and improve code quality automatically.</p>
                </motion.div>
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.1}} className='flex flex-col sm:flex-row gap-4'>
                  <GitHubAuthButton size='lg' mode='install' callbackUrl='/dashboard'>
                    Install on GitHub
                  </GitHubAuthButton>
                  <Link href='/features'>
                    <Button size='lg' variant='outline' className='gap-2'>
                      Learn More
                      <ArrowRightIcon className='h-4 w-4' />
                    </Button>
                  </Link>
                </motion.div>
              </div>
              <motion.div initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.5, delay: 0.2}} className='relative h-full'>
                <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl' />
                <div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border p-8 shadow-lg h-full flex flex-col justify-center'>
                  <div className='space-y-8'>
                    <div className='flex items-center gap-3'>
                      <div className='rounded-full bg-primary/10 p-2'>
                        <Zap className='h-5 w-5 text-primary' />
                      </div>
                      <div className='flex-1 text-center'>
                        <h3 className='font-semibold'>Lightning Fast Reviews</h3>
                        <p className='text-sm text-muted-foreground'>Get feedback in seconds, not hours</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='rounded-full bg-primary/10 p-2'>
                        <Shield className='h-5 w-5 text-primary' />
                      </div>
                      <div className='flex-1 text-center'>
                        <h3 className='font-semibold'>Security First</h3>
                        <p className='text-sm text-muted-foreground'>Catch vulnerabilities early</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='rounded-full bg-primary/10 p-2'>
                        <Brain className='h-5 w-5 text-primary' />
                      </div>
                      <div className='flex-1 text-center'>
                        <h3 className='font-semibold'>Smart Suggestions</h3>
                        <p className='text-sm text-muted-foreground'>AI-powered code improvements</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.5}} className='space-y-2'>
                <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>Key Features</div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>Why Choose GitMate?</h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl'>GitMate combines AI-powered code analysis with a personalized approach to help you write better code.</p>
              </motion.div>
            </div>
            <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8'>
              <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.5, delay: 0.1}}>
                <Card className='h-full hover:shadow-lg transition-shadow duration-200'>
                  <CardHeader className='text-center'>
                    <div className='rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-2 mx-auto'>
                      <Brain className='h-6 w-6 text-primary' />
                    </div>
                    <CardTitle className='text-center'>AI-Powered Reviews</CardTitle>
                    <CardDescription className='text-center'>Get instant, intelligent feedback on your code changes.</CardDescription>
                  </CardHeader>
                  <CardContent className='flex-1'>
                    <ul className='space-y-3 text-sm text-muted-foreground'>
                      <li className='flex items-center gap-2'>
                        <div className='h-1.5 w-1.5 rounded-full bg-primary/50' />
                        Smart code analysis
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1.5 w-1.5 rounded-full bg-primary/50' />
                        Contextual suggestions
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1.5 w-1.5 rounded-full bg-primary/50' />
                        Best practices guidance
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.5, delay: 0.2}}>
                <Card className='h-full hover:shadow-lg transition-shadow duration-200'>
                  <CardHeader className='text-center'>
                    <div className='rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-2 mx-auto'>
                      <Zap className='h-6 w-6 text-primary' />
                    </div>
                    <CardTitle className='text-center'>Lightning Fast</CardTitle>
                    <CardDescription className='text-center'>Get reviews in seconds, not hours.</CardDescription>
                  </CardHeader>
                  <CardContent className='flex-1'>
                    <ul className='space-y-3 text-sm text-muted-foreground'>
                      <li className='flex items-center gap-2'>
                        <div className='h-1.5 w-1.5 rounded-full bg-primary/50' />
                        Instant feedback
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1.5 w-1.5 rounded-full bg-primary/50' />
                        Quick iterations
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1.5 w-1.5 rounded-full bg-primary/50' />
                        Efficient workflow
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.5, delay: 0.3}}>
                <Card className='h-full hover:shadow-lg transition-shadow duration-200'>
                  <CardHeader className='text-center'>
                    <div className='rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-2 mx-auto'>
                      <MessageSquare className='h-6 w-6 text-primary' />
                    </div>
                    <CardTitle className='text-center'>Smart Comments</CardTitle>
                    <CardDescription className='text-center'>Get contextual suggestions for improvements.</CardDescription>
                  </CardHeader>
                  <CardContent className='flex-1'>
                    <ul className='space-y-3 text-sm text-muted-foreground'>
                      <li className='flex items-center gap-2'>
                        <div className='h-1.5 w-1.5 rounded-full bg-primary/50' />
                        Contextual feedback
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1.5 w-1.5 rounded-full bg-primary/50' />
                        Code explanations
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1.5 w-1.5 rounded-full bg-primary/50' />
                        Best practices tips
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.5}} className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>Ready to improve your code quality?</h2>
                <p className='mx-auto max-w-[600px] md:text-xl'>Get started with GitMate today and experience smarter code reviews.</p>
              </motion.div>
              <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.5, delay: 0.1}} className='flex flex-col sm:flex-row gap-4'>
                <GitHubAuthButton size='lg' mode='install' callbackUrl='/dashboard' variant='secondary'>
                  Install on GitHub
                </GitHubAuthButton>
                <Link href='/docs'>
                  <Button size='lg' variant='outline' className='gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10'>
                    Read the Docs
                    <ArrowRightIcon className='h-4 w-4' />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
