"use client";

import {useSearchParams} from "next/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "An error occurred during authentication.";
  let errorDescription = "Please try again or contact support if the problem persists.";

  switch (error) {
    case "OAuthSignin":
      errorMessage = "GitHub OAuth Error";
      errorDescription = "There was a problem signing in with GitHub. Please make sure you have configured your GitHub OAuth credentials correctly.";
      break;
    case "OAuthCallback":
      errorMessage = "OAuth Callback Error";
      errorDescription = "There was a problem completing the sign-in process. Please try again.";
      break;
    case "OAuthCreateAccount":
      errorMessage = "Account Creation Error";
      errorDescription = "There was a problem creating your account. Please try again.";
      break;
    case "EmailCreateAccount":
      errorMessage = "Email Account Error";
      errorDescription = "There was a problem creating your account with email. Please try again.";
      break;
    case "Callback":
      errorMessage = "Callback Error";
      errorDescription = "There was a problem with the authentication callback. Please try again.";
      break;
    case "OAuthAccountNotLinked":
      errorMessage = "Account Not Linked";
      errorDescription = "This account is not linked to any existing account. Please sign in with the correct provider.";
      break;
    case "EmailSignin":
      errorMessage = "Email Sign-in Error";
      errorDescription = "There was a problem signing in with email. Please try again.";
      break;
    case "CredentialsSignin":
      errorMessage = "Credentials Error";
      errorDescription = "The provided credentials are incorrect. Please try again.";
      break;
    case "SessionRequired":
      errorMessage = "Session Required";
      errorDescription = "Please sign in to access this page.";
      break;
    case "Default":
      errorMessage = "Authentication Error";
      errorDescription = "An unexpected error occurred. Please try again.";
      break;
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>Authentication Error</CardTitle>
          <CardDescription className='text-center'>There was a problem with the authentication process.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant='destructive' className='mb-6'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>{errorMessage}</AlertTitle>
            <AlertDescription>{errorDescription}</AlertDescription>
          </Alert>
          <div className='space-y-4'>
            <Button className='w-full' onClick={() => (window.location.href = "/auth/signin")}>
              Try Again
            </Button>
            <Button variant='outline' className='w-full' onClick={() => (window.location.href = "/settings")}>
              Configure GitHub OAuth
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
