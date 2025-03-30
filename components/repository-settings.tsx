"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {GitBranchIcon, GitPullRequestIcon, BellIcon, SaveIcon} from "lucide-react";

interface RepositorySettingsProps {
  settings: {
    automaticReviews: boolean;
    commandBasedReviews: boolean;
    reviewTone: string;
    aiProvider: string;
    notificationsEnabled: boolean;
    autoMergeEnabled: boolean;
  };
  onSave: (settings: any) => void;
}

export function RepositorySettings({settings, onSave}: RepositorySettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Repository Settings</CardTitle>
        <CardDescription>Configure how GitMate works with this repository</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Automatic Reviews</Label>
                <p className='text-sm text-muted-foreground'>Automatically review new pull requests</p>
              </div>
              <Switch checked={settings.automaticReviews} />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Command-Based Reviews</Label>
                <p className='text-sm text-muted-foreground'>Enable reviews triggered by comments</p>
              </div>
              <Switch checked={settings.commandBasedReviews} />
            </div>
          </div>

          <Separator />

          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label>Review Personality</Label>
              <Select value={settings.reviewTone}>
                <SelectTrigger>
                  <SelectValue placeholder='Select a review tone' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='constructive'>Constructive Critic</SelectItem>
                  <SelectItem value='friendly'>Friendly Mentor</SelectItem>
                  <SelectItem value='enthusiastic'>Enthusiastic Coach</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>AI Provider</Label>
              <Select value={settings.aiProvider}>
                <SelectTrigger>
                  <SelectValue placeholder='Select an AI provider' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='openai'>OpenAI</SelectItem>
                  <SelectItem value='gemini'>Google Gemini</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <div className='flex items-center gap-2'>
                  <BellIcon className='h-4 w-4' />
                  <Label>Notifications</Label>
                </div>
                <p className='text-sm text-muted-foreground'>Receive notifications for new reviews</p>
              </div>
              <Switch checked={settings.notificationsEnabled} />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <div className='flex items-center gap-2'>
                  <GitBranchIcon className='h-4 w-4' />
                  <Label>Auto-Merge</Label>
                </div>
                <p className='text-sm text-muted-foreground'>Automatically merge approved pull requests</p>
              </div>
              <Switch checked={settings.autoMergeEnabled} />
            </div>
          </div>

          <div className='flex justify-end'>
            <Button onClick={() => onSave(settings)}>
              <SaveIcon className='mr-2 h-4 w-4' />
              Save Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
