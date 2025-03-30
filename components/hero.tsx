"use client";

import {Button} from "@/components/ui/button";
import {GitHubAuthButton} from "@/components/github-auth-button";
import {GitPullRequestIcon, Sparkles, Zap, Shield, Brain} from "lucide-react";
import {motion} from "framer-motion";

export function Hero() {
  return (
    <div className='relative overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/60' />

      {/* Animated grid pattern */}
      <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]' />

      <div className='relative container px-4 sm:px-6 lg:px-8 py-24 sm:py-32'>
        <div className='mx-auto max-w-2xl text-center'>
          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className='flex items-center justify-center gap-2 mb-8'>
            <span className='inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20'>
              <Sparkles className='mr-2 h-4 w-4' />
              AI-Powered Code Reviews
            </span>
          </motion.div>

          <motion.h1
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.1}}
            className='text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60'
          >
            Supercharge Your Code Reviews with AI
          </motion.h1>

          <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.2}} className='mt-6 text-lg leading-8 text-muted-foreground'>
            GitMate uses advanced AI to provide instant, intelligent code reviews. Save time, catch issues early, and improve code quality automatically.
          </motion.p>

          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.3}} className='mt-10 flex items-center justify-center gap-x-6'>
            <GitHubAuthButton size='lg' mode='signin' />
            <Button variant='outline' size='lg' asChild>
              <a href='#features'>Learn more</a>
            </Button>
          </motion.div>
        </div>

        {/* Feature highlights */}
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.4}} className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
            <div className='flex flex-col'>
              <dt className='flex items-center gap-x-3 text-base font-semibold leading-7'>
                <Zap className='h-5 w-5 flex-none text-primary' />
                Lightning Fast Reviews
              </dt>
              <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground'>
                <p className='flex-auto'>Get instant feedback on your pull requests with AI-powered analysis.</p>
              </dd>
            </div>
            <div className='flex flex-col'>
              <dt className='flex items-center gap-x-3 text-base font-semibold leading-7'>
                <Shield className='h-5 w-5 flex-none text-primary' />
                Code Quality Guard
              </dt>
              <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground'>
                <p className='flex-auto'>Catch bugs, security issues, and maintainability problems before they reach production.</p>
              </dd>
            </div>
            <div className='flex flex-col'>
              <dt className='flex items-center gap-x-3 text-base font-semibold leading-7'>
                <Brain className='h-5 w-5 flex-none text-primary' />
                Smart Suggestions
              </dt>
              <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground'>
                <p className='flex-auto'>Receive intelligent suggestions for code improvements and best practices.</p>
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </div>
  );
}
