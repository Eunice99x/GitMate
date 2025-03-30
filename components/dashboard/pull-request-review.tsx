"use client";

import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea} from "@/components/ui/scroll-area";
import {GitPullRequestIcon, MessageSquare, CheckCircle2, AlertCircle, Clock} from "lucide-react";

interface PullRequestReviewProps {
  pr: {
    id: string;
    title: string;
    author: {
      name: string;
      image: string;
      login: string;
    };
    status: "approved" | "changes_requested" | "pending";
    createdAt: string;
    comments: number;
    url: string;
    repo: string;
  };
}

export function PullRequestReview({pr}: PullRequestReviewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const statusIcons = {
    approved: <CheckCircle2 className='h-4 w-4 text-green-500' />,
    changes_requested: <AlertCircle className='h-4 w-4 text-yellow-500' />,
    pending: <Clock className='h-4 w-4 text-blue-500' />
  };

  const statusColors = {
    approved: "bg-green-500/10 text-green-500",
    changes_requested: "bg-yellow-500/10 text-yellow-500",
    pending: "bg-blue-500/10 text-blue-500"
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='space-y-1'>
            <CardTitle className='text-xl'>{pr.title}</CardTitle>
            <CardDescription>
              <div className='flex items-center gap-2'>
                <Avatar className='h-6 w-6'>
                  <AvatarImage src={pr.author.image} alt={pr.author.name} />
                  <AvatarFallback>{pr.author.name[0]}</AvatarFallback>
                </Avatar>
                <span>{pr.author.name}</span>
                <span className='text-muted-foreground'>•</span>
                <span className='text-muted-foreground'>{pr.repo}</span>
              </div>
            </CardDescription>
          </div>
          <Badge className={statusColors[pr.status]}>
            {statusIcons[pr.status]}
            <span className='ml-1 capitalize'>{pr.status.replace("_", " ")}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='changes'>Changes</TabsTrigger>
            <TabsTrigger value='comments'>Comments</TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='mt-4'>
            <div className='grid gap-4'>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div className='flex items-center gap-2'>
                  <GitPullRequestIcon className='h-5 w-5 text-muted-foreground' />
                  <span className='text-sm font-medium'>Pull Request</span>
                </div>
                <Button variant='outline' size='sm' asChild>
                  <a href={pr.url} target='_blank' rel='noopener noreferrer'>
                    View on GitHub
                  </a>
                </Button>
              </div>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div className='flex items-center gap-2'>
                  <MessageSquare className='h-5 w-5 text-muted-foreground' />
                  <span className='text-sm font-medium'>Comments</span>
                </div>
                <span className='text-sm text-muted-foreground'>{pr.comments} comments</span>
              </div>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div className='flex items-center gap-2'>
                  <Clock className='h-5 w-5 text-muted-foreground' />
                  <span className='text-sm font-medium'>Created</span>
                </div>
                <span className='text-sm text-muted-foreground'>{pr.createdAt}</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='changes' className='mt-4'>
            <ScrollArea className='h-[400px] rounded-md border p-4'>
              <div className='space-y-4'>
                {/* File changes would go here */}
                <div className='text-sm text-muted-foreground'>File changes will be displayed here</div>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value='comments' className='mt-4'>
            <ScrollArea className='h-[400px] rounded-md border p-4'>
              <div className='space-y-4'>
                {/* Comments would go here */}
                <div className='text-sm text-muted-foreground'>Comments will be displayed here</div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
