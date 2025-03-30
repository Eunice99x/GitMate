"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {CheckCircleIcon, XCircleIcon, AlertCircleIcon, MessageSquareIcon, CodeIcon, BugIcon} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";

interface ReviewFeedbackProps {
  review: {
    summary: string;
    score: number;
    observations: string[];
    suggestions: string[];
    status: "approved" | "changes" | "pending";
  };
}

export function ReviewFeedback({review}: ReviewFeedbackProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>AI Review Feedback</CardTitle>
            <CardDescription>Generated code review analysis</CardDescription>
          </div>
          <Badge variant={review.status === "approved" ? "default" : review.status === "changes" ? "destructive" : "outline"} className='ml-auto'>
            {review.status === "approved" && <CheckCircleIcon className='mr-1 h-3 w-3' />}
            {review.status === "changes" && <XCircleIcon className='mr-1 h-3 w-3' />}
            {review.status === "pending" && <AlertCircleIcon className='mr-1 h-3 w-3' />}
            {review.status === "approved" ? "Approved" : review.status === "changes" ? "Changes Requested" : "Pending"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          <div>
            <div className='mb-2 flex items-center gap-2'>
              <MessageSquareIcon className='h-4 w-4' />
              <h3 className='font-medium'>Summary</h3>
            </div>
            <p className='text-sm text-muted-foreground'>{review.summary}</p>
          </div>

          <div>
            <div className='mb-2 flex items-center gap-2'>
              <CodeIcon className='h-4 w-4' />
              <h3 className='font-medium'>Key Observations</h3>
            </div>
            <ScrollArea className='h-[120px] rounded-md border p-4'>
              <div className='space-y-2'>
                {review.observations.map((observation, index) => (
                  <div key={index} className='flex items-start gap-2 text-sm'>
                    <span className='text-muted-foreground'>•</span>
                    <span>{observation}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div>
            <div className='mb-2 flex items-center gap-2'>
              <BugIcon className='h-4 w-4' />
              <h3 className='font-medium'>Suggestions</h3>
            </div>
            <ScrollArea className='h-[120px] rounded-md border p-4'>
              <div className='space-y-2'>
                {review.suggestions.map((suggestion, index) => (
                  <div key={index} className='flex items-start gap-2 text-sm'>
                    <span className='text-muted-foreground'>•</span>
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Separator />

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium'>Code Quality Score</span>
              <Badge variant='outline'>{review.score}/10</Badge>
            </div>
            <div className='flex h-2 w-24 overflow-hidden rounded-full bg-muted'>
              <div
                className='bg-primary transition-all'
                style={{
                  width: `${(review.score / 10) * 100}%`,
                  backgroundColor: review.score >= 8 ? "var(--success)" : review.score >= 6 ? "var(--warning)" : "var(--destructive)"
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
