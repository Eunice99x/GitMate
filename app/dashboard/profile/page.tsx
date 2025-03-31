"use client";

import {useSession} from "next-auth/react";
import {useState, useEffect} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {Switch} from "@/components/ui/switch";
import {ArrowLeftIcon, GithubIcon, LogOutIcon, EyeIcon, EyeOffIcon, KeyIcon, CheckCircleIcon, AlertCircleIcon} from "lucide-react";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useToast} from "@/hooks/use-toast";
import {signOut} from "next-auth/react";
import {getGitHubToken, setGitHubToken, getOpenAIKey, setOpenAIKey, getGoogleKey, setGoogleKey, getPreferredAIProvider, setPreferredAIProvider} from "@/lib/storage-service";
import {GitHubTokenGuide} from "@/components/github-token-guide";

export default function ProfilePage() {
  const {data: session} = useSession();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [githubToken, setGithubTokenState] = useState("");
  const [openaiKey, setOpenaiKeyState] = useState("");
  const [googleKey, setGoogleKeyState] = useState("");
  const [preferredProvider, setPreferredProviderState] = useState<"openai" | "gemini">("gemini");
  const [showGithubToken, setShowGithubToken] = useState(false);
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showGoogleKey, setShowGoogleKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const {toast} = useToast();

  const [notificationEmail, setNotificationEmail] = useState("younesouterbah1@gmail.com");

  // Load saved tokens from localStorage on component mount
  useEffect(() => {
    const savedGithubToken = getGitHubToken() || "";
    const savedOpenaiKey = getOpenAIKey() || "";
    const savedGoogleKey = getGoogleKey() || "";
    const savedPreferredProvider = getPreferredAIProvider();

    setGithubTokenState(savedGithubToken);
    setOpenaiKeyState(savedOpenaiKey);
    setGoogleKeyState(savedGoogleKey);
    setPreferredProviderState(savedPreferredProvider);

    // Load notification preferences from localStorage
    const emailNotifs = localStorage.getItem("emailNotifications") === "true";
    const weeklyDigestPref = localStorage.getItem("weeklyDigest") === "true";
    const savedEmail = localStorage.getItem("notificationEmail") || "younesouterbah1@gmail.com";

    setEmailNotifications(emailNotifs);
    setWeeklyDigest(weeklyDigestPref);
    setNotificationEmail(savedEmail);
  }, []);

  const handleSaveProfile = () => {
    // Save tokens to localStorage
    setGitHubToken(githubToken);
    setOpenAIKey(openaiKey);
    setGoogleKey(googleKey);
    setPreferredAIProvider(preferredProvider);

    // Save notification preferences
    localStorage.setItem("emailNotifications", emailNotifications.toString());
    localStorage.setItem("weeklyDigest", weeklyDigest.toString());
    localStorage.setItem("notificationEmail", notificationEmail);

    // Show success message and indicator
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);

    toast({
      title: "Profile updated",
      description: "Your profile settings and API keys have been saved successfully."
    });
  };

  const handleSignOut = () => {
    signOut({callbackUrl: "/"});
  };

  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1 py-6 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-8'>
          <div className='flex items-center gap-4'>
            <Button variant='outline' size='icon' asChild>
              <Link href='/dashboard'>
                <ArrowLeftIcon className='h-4 w-4' />
              </Link>
            </Button>
            <h1 className='text-2xl font-bold tracking-tight'>Profile</h1>
          </div>

          <div className='grid gap-6 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your personal information and account settings</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='flex flex-col items-center space-y-4'>
                  <Avatar className='h-24 w-24'>
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                    <AvatarFallback className='text-2xl'>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className='text-center'>
                    <h3 className='text-lg font-medium'>{session?.user?.name || "User"}</h3>
                    <p className='text-sm text-muted-foreground'>{session?.user?.email || ""}</p>
                  </div>
                </div>

                <Separator />

                <div className='space-y-3'>
                  <div className='space-y-1'>
                    <Label htmlFor='name'>Name</Label>
                    <div className='flex gap-2'>
                      <Input id='name' defaultValue={session?.user?.name || ""} />
                    </div>
                  </div>
                  <div className='space-y-1'>
                    <Label htmlFor='email'>Email</Label>
                    <div className='flex gap-2'>
                      <Input id='email' defaultValue={session?.user?.email || ""} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  API Keys
                  {saveSuccess && <CheckCircleIcon className='h-5 w-5 text-green-500' />}
                </CardTitle>
                <CardDescription>Manage your API keys for GitHub and AI providers</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-3'>
                  <div className='space-y-1'>
                    <Label htmlFor='github-token' className='flex items-center gap-2'>
                      <GithubIcon className='h-4 w-4' />
                      GitHub Personal Access Token <span className='text-red-500'>*</span>
                    </Label>
                    <div className='flex'>
                      <Input id='github-token' type={showGithubToken ? "text" : "password"} value={githubToken} onChange={e => setGithubTokenState(e.target.value)} placeholder='ghp_xxxxxxxxxxxxxxxx' className='flex-1' />
                      <Button variant='ghost' size='icon' onClick={() => setShowGithubToken(!showGithubToken)} type='button'>
                        {showGithubToken ? <EyeOffIcon className='h-4 w-4' /> : <EyeIcon className='h-4 w-4' />}
                      </Button>
                    </div>
                    <GitHubTokenGuide />
                  </div>
                  <Separator />
                  <div className='space-y-1'>
                    <Label htmlFor='openai-key' className='flex items-center gap-2'>
                      <KeyIcon className='h-4 w-4' />
                      OpenAI API Key
                    </Label>
                    <div className='flex'>
                      <Input id='openai-key' type={showOpenaiKey ? "text" : "password"} value={openaiKey} onChange={e => setOpenaiKeyState(e.target.value)} placeholder='sk-xxxxxxxxxxxxxxxx' className='flex-1' />
                      <Button variant='ghost' size='icon' onClick={() => setShowOpenaiKey(!showOpenaiKey)} type='button'>
                        {showOpenaiKey ? <EyeOffIcon className='h-4 w-4' /> : <EyeIcon className='h-4 w-4' />}
                      </Button>
                    </div>
                    <p className='text-xs text-muted-foreground mt-1'>
                      Optional. For using OpenAI models for code reviews.{" "}
                      <a href='https://platform.openai.com/api-keys' target='_blank' rel='noopener noreferrer' className='text-primary hover:underline'>
                        Get an API key
                      </a>
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <Label htmlFor='google-key' className='flex items-center gap-2'>
                      <KeyIcon className='h-4 w-4' />
                      Google Gemini API Key <span className='text-red-500'>*</span>
                    </Label>
                    <div className='flex'>
                      <Input id='google-key' type={showGoogleKey ? "text" : "password"} value={googleKey} onChange={e => setGoogleKeyState(e.target.value)} placeholder='AIza...' className='flex-1' />
                      <Button variant='ghost' size='icon' onClick={() => setShowGoogleKey(!showGoogleKey)} type='button'>
                        {showGoogleKey ? <EyeOffIcon className='h-4 w-4' /> : <EyeIcon className='h-4 w-4' />}
                      </Button>
                    </div>
                    <div className='flex items-center gap-2 mt-1'>
                      <AlertCircleIcon className='h-4 w-4 text-amber-500' />
                      <p className='text-xs text-amber-500'>
                        Required for code reviews with Gemini.{" "}
                        <a href='https://aistudio.google.com/app/apikey' target='_blank' rel='noopener noreferrer' className='font-medium underline'>
                          Get a free API key from Google AI Studio
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className='space-y-1 pt-2'>
                    <Label>Preferred AI Provider</Label>
                    <div className='flex items-center space-x-4 pt-2'>
                      <div className='flex items-center space-x-2'>
                        <input type='radio' id='provider-openai' name='ai-provider' value='openai' checked={preferredProvider === "openai"} onChange={() => setPreferredProviderState("openai")} className='h-4 w-4' />
                        <Label htmlFor='provider-openai' className='cursor-pointer'>
                          OpenAI
                        </Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <input type='radio' id='provider-gemini' name='ai-provider' value='gemini' checked={preferredProvider === "gemini"} onChange={() => setPreferredProviderState("gemini")} className='h-4 w-4' />
                        <Label htmlFor='provider-gemini' className='cursor-pointer'>
                          Google Gemini (Recommended)
                        </Label>
                      </div>
                    </div>
                    <p className='text-xs text-muted-foreground mt-1'>Select which AI provider to use when both are available.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile} className='ml-auto'>
                  Save API Keys
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications from GitMate</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='email-notifications'>Email notifications</Label>
                  <Switch id='email-notifications' checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='weekly-digest'>Weekly digest</Label>
                  <Switch id='weekly-digest' checked={weeklyDigest} onCheckedChange={setWeeklyDigest} disabled={!emailNotifications} />
                </div>
              </div>

              <Separator />

              <div className='space-y-3'>
                <Label htmlFor='notification-email'>Notification Email</Label>
                <Input id='notification-email' type='email' value={notificationEmail} onChange={e => setNotificationEmail(e.target.value)} placeholder='your.email@example.com' disabled={!emailNotifications} />
                <p className='text-xs text-muted-foreground'>We'll send notifications about reviews and important updates to this email.</p>
              </div>

              <Separator />

              <div className='space-y-3'>
                <h3 className='text-sm font-medium'>Notification Events</h3>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='new-reviews'>New reviews</Label>
                    <Switch id='new-reviews' defaultChecked disabled={!emailNotifications} />
                  </div>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='mentions'>Mentions</Label>
                    <Switch id='mentions' defaultChecked disabled={!emailNotifications} />
                  </div>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='quality-alerts'>Quality alerts</Label>
                    <Switch id='quality-alerts' defaultChecked disabled={!emailNotifications} />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='mr-auto' onClick={handleSignOut}>
                <LogOutIcon className='h-4 w-4 mr-2' />
                Sign Out
              </Button>
              <Button onClick={handleSaveProfile}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
