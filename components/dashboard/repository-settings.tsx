"use client";

import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {GitBranch, Bell, Settings, CheckCircle2} from "lucide-react";

interface RepositorySettingsProps {
  repository: {
    name: string;
    description: string;
    enabled: boolean;
  };
}

export function RepositorySettings({repository}: RepositorySettingsProps) {
  const [settings, setSettings] = useState({
    automaticReviews: true,
    commandBasedReviews: false,
    reviewTone: "friendly",
    aiProvider: "openai",
    notificationsEnabled: true,
    autoMergeEnabled: false
  });

  const handleSave = () => {
    // Save settings logic would go here
    console.log("Saving settings:", settings);
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>{repository.name}</h2>
        <p className='text-muted-foreground'>{repository.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Review Settings</CardTitle>
          <CardDescription>Configure how GitMate reviews your code</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label>Automatic Reviews</Label>
              <p className='text-sm text-muted-foreground'>Automatically review pull requests when they are created or updated</p>
            </div>
            <Switch checked={settings.automaticReviews} onCheckedChange={checked => setSettings({...settings, automaticReviews: checked})} />
          </div>

          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label>Command-Based Reviews</Label>
              <p className='text-sm text-muted-foreground'>Only review when explicitly requested via comments</p>
            </div>
            <Switch checked={settings.commandBasedReviews} onCheckedChange={checked => setSettings({...settings, commandBasedReviews: checked})} />
          </div>

          <div className='space-y-2'>
            <Label>Review Tone</Label>
            <Select value={settings.reviewTone} onValueChange={value => setSettings({...settings, reviewTone: value})}>
              <SelectTrigger>
                <SelectValue placeholder='Select a tone' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='friendly'>Friendly</SelectItem>
                <SelectItem value='professional'>Professional</SelectItem>
                <SelectItem value='technical'>Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>AI Provider</Label>
            <Select value={settings.aiProvider} onValueChange={value => setSettings({...settings, aiProvider: value})}>
              <SelectTrigger>
                <SelectValue placeholder='Select an AI provider' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='openai'>OpenAI</SelectItem>
                <SelectItem value='anthropic'>Anthropic</SelectItem>
                <SelectItem value='custom'>Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label>Review Notifications</Label>
              <p className='text-sm text-muted-foreground'>Receive notifications when reviews are completed</p>
            </div>
            <Switch checked={settings.notificationsEnabled} onCheckedChange={checked => setSettings({...settings, notificationsEnabled: checked})} />
          </div>

          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label>Auto-Merge</Label>
              <p className='text-sm text-muted-foreground'>Automatically merge pull requests when they are approved</p>
            </div>
            <Switch checked={settings.autoMergeEnabled} onCheckedChange={checked => setSettings({...settings, autoMergeEnabled: checked})} />
          </div>
        </CardContent>
      </Card>

      <div className='flex justify-end'>
        <Button onClick={handleSave}>
          <CheckCircle2 className='mr-2 h-4 w-4' />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
