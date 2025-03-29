"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useSettings} from "@/hooks/use-settings";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Navbar} from "@/components/navbar";
import {toast} from "sonner";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function SettingsPage() {
  const router = useRouter();
  const {settings, updateSettings} = useSettings();

  useEffect(() => {
    // Check if all required settings are configured
    const hasRequiredSettings = settings.githubToken && (settings.googleApiKey || settings.openaiApiKey) && settings.defaultAiProvider;

    if (hasRequiredSettings) {
      router.push("/dashboard");
    }
  }, [settings, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSettings = {
      githubToken: formData.get("githubToken") as string,
      googleApiKey: formData.get("googleApiKey") as string,
      openaiApiKey: formData.get("openaiApiKey") as string,
      githubSecret: formData.get("githubSecret") as string,
      googleGenerativeAiApiKey: formData.get("googleGenerativeAiApiKey") as string,
      defaultAiProvider: formData.get("defaultAiProvider") as "gemini" | "openai"
    };

    updateSettings(newSettings);
    toast.success("Settings saved successfully!");
    router.push("/dashboard");
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex-1 container py-8'>
        <div className='max-w-2xl mx-auto space-y-6'>
          <div>
            <h1 className='text-3xl font-bold'>Settings</h1>
            <p className='text-muted-foreground'>Manage your API keys and tokens</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Keys & Tokens</CardTitle>
              <CardDescription>Configure your API keys and tokens for GitMate to function properly. These are stored securely in your browser.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='githubToken'>GitHub Token</Label>
                  <Input id='githubToken' name='githubToken' type='password' defaultValue={settings.githubToken} required />
                  <p className='text-sm text-muted-foreground'>Required for accessing your repositories</p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='githubSecret'>GitHub Webhook Secret</Label>
                  <Input id='githubSecret' name='githubSecret' type='password' defaultValue={settings.githubSecret} required />
                  <p className='text-sm text-muted-foreground'>Required for secure webhook communication</p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='defaultAiProvider'>Default AI Provider</Label>
                  <Select name='defaultAiProvider' defaultValue={settings.defaultAiProvider || "gemini"}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select AI provider' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='gemini'>Gemini</SelectItem>
                      <SelectItem value='openai'>OpenAI</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className='text-sm text-muted-foreground'>Choose your preferred AI provider for code reviews</p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='googleApiKey'>Google API Key</Label>
                  <Input id='googleApiKey' name='googleApiKey' type='password' defaultValue={settings.googleApiKey} />
                  <p className='text-sm text-muted-foreground'>Required for Gemini AI provider</p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='googleGenerativeAiApiKey'>Google Generative AI API Key</Label>
                  <Input id='googleGenerativeAiApiKey' name='googleGenerativeAiApiKey' type='password' defaultValue={settings.googleGenerativeAiApiKey} />
                  <p className='text-sm text-muted-foreground'>Required for Gemini AI provider</p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='openaiApiKey'>OpenAI API Key</Label>
                  <Input id='openaiApiKey' name='openaiApiKey' type='password' defaultValue={settings.openaiApiKey} />
                  <p className='text-sm text-muted-foreground'>Required for OpenAI provider</p>
                </div>

                <Button type='submit' className='w-full'>
                  Save Settings
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
              <CardDescription>View the status of your configured integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Google Generative AI</p>
                    <p className='text-sm text-muted-foreground'>{settings.googleGenerativeAiApiKey ? "Configured" : "Not configured"}</p>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${settings.googleGenerativeAiApiKey ? "bg-green-500" : "bg-red-500"}`} />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Google API</p>
                    <p className='text-sm text-muted-foreground'>{settings.googleApiKey ? "Configured" : "Not configured"}</p>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${settings.googleApiKey ? "bg-green-500" : "bg-red-500"}`} />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>OpenAI API</p>
                    <p className='text-sm text-muted-foreground'>{settings.openaiApiKey ? "Configured" : "Not configured"}</p>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${settings.openaiApiKey ? "bg-green-500" : "bg-red-500"}`} />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>GitHub Token</p>
                    <p className='text-sm text-muted-foreground'>{settings.githubToken ? "Configured" : "Not configured"}</p>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${settings.githubToken ? "bg-green-500" : "bg-red-500"}`} />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>GitHub Secret</p>
                    <p className='text-sm text-muted-foreground'>{settings.githubSecret ? "Configured" : "Not configured"}</p>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${settings.githubSecret ? "bg-green-500" : "bg-red-500"}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
