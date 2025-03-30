"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ArrowLeftIcon, Settings2Icon } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [reviewTone, setReviewTone] = useState("constructive")
  const [aiProvider, setAiProvider] = useState("gemini")
  const [autoReview, setAutoReview] = useState(true)
  const [commandEnabled, setCommandEnabled] = useState(true)
  const [maxReviewSize, setMaxReviewSize] = useState(1000)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const { toast } = useToast()

  const handleSaveSettings = () => {
    // In a real app, this would save the settings to a database
    toast({
      title: "Settings saved",
      description: "Your GitMate settings have been updated successfully.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Review Settings</CardTitle>
                <CardDescription>Configure how GitMate reviews your code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Default Review Tone</Label>
                  <RadioGroup
                    defaultValue={reviewTone}
                    onValueChange={setReviewTone}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="constructive" id="constructive" />
                      <Label htmlFor="constructive">Constructive Critic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="friendly" id="friendly" />
                      <Label htmlFor="friendly">Friendly Mentor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="enthusiastic" id="enthusiastic" />
                      <Label htmlFor="enthusiastic">Enthusiastic Coach</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>AI Provider</Label>
                  <RadioGroup
                    defaultValue={aiProvider}
                    onValueChange={setAiProvider}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gemini" id="gemini" />
                      <Label htmlFor="gemini">Google Gemini (Recommended)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="openai" id="openai" />
                      <Label htmlFor="openai">OpenAI</Label>
                    </div>
                  </RadioGroup>
                  <p className="text-xs text-muted-foreground">
                    {aiProvider === "gemini"
                      ? "Gemini offers a generous free tier and excellent code review capabilities."
                      : "OpenAI may require a paid subscription for regular usage."}
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-review">Automatic PR reviews</Label>
                    <Switch id="auto-review" checked={autoReview} onCheckedChange={setAutoReview} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="command-enabled">Command-based reviews</Label>
                    <Switch id="command-enabled" checked={commandEnabled} onCheckedChange={setCommandEnabled} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Maximum Review Size (lines)</Label>
                  <div className="space-y-2">
                    <Slider
                      defaultValue={[maxReviewSize]}
                      max={5000}
                      min={100}
                      step={100}
                      onValueChange={(value) => setMaxReviewSize(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>100</span>
                      <span>{maxReviewSize} lines</span>
                      <span>5000</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you receive notifications from GitMate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications-enabled">Enable notifications</Label>
                    <Switch
                      id="notifications-enabled"
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email notifications</Label>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    disabled={!emailNotifications || !notificationsEnabled}
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll send notifications about new reviews and important updates.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage your API keys and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Google Gemini API Key</Label>
                <div className="flex gap-2">
                  <Input type="password" placeholder="Enter your Google API key" className="flex-1" />
                  <Button variant="outline">Update</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get a free API key from{" "}
                  <a
                    href="https://ai.google.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google AI Studio
                  </a>
                  .
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>OpenAI API Key (Optional)</Label>
                <div className="flex gap-2">
                  <Input type="password" placeholder="Enter your OpenAI API key" className="flex-1" />
                  <Button variant="outline">Update</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get an API key from{" "}
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    OpenAI
                  </a>
                  .
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>GitHub Integration</Label>
                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">GitHub App</p>
                      <p className="text-sm text-muted-foreground">Connected to your GitHub account</p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} className="gap-2">
              <Settings2Icon className="h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

