"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {BrainIcon, HeartIcon, StarIcon} from "lucide-react";

interface ReviewPersonalityProps {
  value: string;
  onChange: (value: string) => void;
}

export function ReviewPersonality({value, onChange}: ReviewPersonalityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Personality</CardTitle>
        <CardDescription>Choose how GitMate should review your code</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={value} onValueChange={onChange} className='grid gap-4 md:grid-cols-3'>
          <div>
            <RadioGroupItem value='constructive' id='constructive' className='peer sr-only' />
            <Label
              htmlFor='constructive'
              className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
            >
              <BrainIcon className='mb-3 h-6 w-6' />
              <div className='space-y-1 text-center'>
                <p className='font-medium leading-none'>Constructive Critic</p>
                <p className='text-sm text-muted-foreground'>Focused on strict code quality and best practices</p>
              </div>
            </Label>
          </div>
          <div>
            <RadioGroupItem value='friendly' id='friendly' className='peer sr-only' />
            <Label
              htmlFor='friendly'
              className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
            >
              <HeartIcon className='mb-3 h-6 w-6' />
              <div className='space-y-1 text-center'>
                <p className='font-medium leading-none'>Friendly Mentor</p>
                <p className='text-sm text-muted-foreground'>Supportive guidance with helpful explanations</p>
              </div>
            </Label>
          </div>
          <div>
            <RadioGroupItem value='enthusiastic' id='enthusiastic' className='peer sr-only' />
            <Label
              htmlFor='enthusiastic'
              className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
            >
              <StarIcon className='mb-3 h-6 w-6' />
              <div className='space-y-1 text-center'>
                <p className='font-medium leading-none'>Enthusiastic Coach</p>
                <p className='text-sm text-muted-foreground'>Positive and motivational feedback</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
