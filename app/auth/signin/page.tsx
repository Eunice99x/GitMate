"use client";

import {signIn} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {Github, Rocket} from "lucide-react";
import type {Metadata} from "next";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Navbar} from "@/components/navbar";

export const metadata: Metadata = {
  title: "Sign In - GitMate",
  description: "Sign in to your GitMate account"
};

export default function SignIn() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <div className='flex flex-1 items-center justify-center bg-muted/40 px-4'>
        <Card className='w-full max-w-md'>
          <CardHeader className='space-y-1 text-center'>
            <div className='flex justify-center'>
              <Rocket className='h-10 w-10 text-primary' />
            </div>
            <CardTitle className='text-2xl font-bold'>Welcome to GitMate</CardTitle>
            <CardDescription>Sign in with GitHub to connect your repositories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <Button variant='outline' type='button' onClick={() => signIn("github", {callbackUrl: "/"})}>
                <Github className='mr-2 h-4 w-4' />
                Sign in with GitHub
              </Button>
              <div className='text-center text-sm text-muted-foreground'>
                By signing in, you agree to our{" "}
                <Link href='/terms' className='underline underline-offset-4 hover:text-primary'>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href='/privacy' className='underline underline-offset-4 hover:text-primary'>
                  Privacy Policy
                </Link>
                .
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
