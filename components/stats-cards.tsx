"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {GitPullRequestIcon, CheckCircleIcon, XCircleIcon, BarChart3Icon} from "lucide-react";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

interface Stats {
  totalReviews: number;
  approvedPRs: number;
  changesRequested: number;
  codeQualityScore: number;
  loading: boolean;
}

export function StatsCards() {
  const {data: session} = useSession();
  const [stats, setStats] = useState<Stats>({
    totalReviews: 0,
    approvedPRs: 0,
    changesRequested: 0,
    codeQualityScore: 0,
    loading: true
  });

  useEffect(() => {
    // In a real app, you would fetch these stats from your backend
    // For now, we'll simulate a fetch with a timeout and random data
    const timer = setTimeout(() => {
      if (session) {
        // Generate some random stats for demo purposes
        const totalReviews = Math.floor(Math.random() * 200) + 50;
        const approvedPRs = Math.floor(totalReviews * (Math.random() * 0.3 + 0.6)); // 60-90% of total
        const changesRequested = totalReviews - approvedPRs;
        const codeQualityScore = (Math.random() * 2 + 7).toFixed(1); // Score between 7.0 and 9.0

        setStats({
          totalReviews,
          approvedPRs,
          changesRequested,
          codeQualityScore: Number.parseFloat(codeQualityScore),
          loading: false
        });
      }
    }, 1500); // Simulate loading delay

    return () => clearTimeout(timer);
  }, [session]);

  if (stats.loading) {
    return (
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i} className='animate-pulse'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                <div className='h-4 w-24 bg-muted rounded'></div>
              </CardTitle>
              <div className='h-4 w-4 bg-muted rounded-full'></div>
            </CardHeader>
            <CardContent>
              <div className='h-7 w-16 bg-muted rounded mb-1'></div>
              <div className='h-4 w-32 bg-muted rounded'></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Reviews</CardTitle>
          <GitPullRequestIcon className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.totalReviews}</div>
          <p className='text-xs text-muted-foreground'>+14% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Approved PRs</CardTitle>
          <CheckCircleIcon className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.approvedPRs}</div>
          <p className='text-xs text-muted-foreground'>+5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Changes Requested</CardTitle>
          <XCircleIcon className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.changesRequested}</div>
          <p className='text-xs text-muted-foreground'>-2% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Code Quality Score</CardTitle>
          <BarChart3Icon className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.codeQualityScore}/10</div>
          <p className='text-xs text-muted-foreground'>+0.3 from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}
