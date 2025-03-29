"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Navbar} from "@/components/navbar";

export default function SignInPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex-1 container py-8'>
        <div className='max-w-sm mx-auto space-y-6'>
          <div>
            <h1 className='text-3xl font-bold'>Sign In</h1>
            <p className='text-muted-foreground'>Enter your credentials to access your account</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Sign in to your GitMate account to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input id='email' type='email' placeholder='Enter your email' required />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input id='password' type='password' placeholder='Enter your password' required />
                </div>

                <Button type='submit' className='w-full'>
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className='text-center text-sm'>
            <p className='text-muted-foreground'>
              Don't have an account?{" "}
              <Link href='/auth/signup' className='text-primary hover:underline'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
