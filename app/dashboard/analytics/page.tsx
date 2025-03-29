"use client";

import {useSession} from "next-auth/react";
import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ArrowLeftIcon, BarChart3Icon, TrendingUpIcon, GitPullRequestIcon, XCircleIcon} from "lucide-react";
import Link from "next/link";

export default function AnalyticsPage() {
  const {data: session} = useSession();
  const [timeRange, setTimeRange] = useState("30days");

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1 py-6 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Button variant='outline' size='icon' asChild>
                <Link href='/dashboard'>
                  <ArrowLeftIcon className='h-4 w-4' />
                </Link>
              </Button>
              <h1 className='text-2xl font-bold tracking-tight'>Analytics</h1>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select time range' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='7days'>Last 7 days</SelectItem>
                <SelectItem value='30days'>Last 30 days</SelectItem>
                <SelectItem value='90days'>Last 90 days</SelectItem>
                <SelectItem value='year'>Last year</SelectItem>
                <SelectItem value='all'>All time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Total Reviews</CardTitle>
                <GitPullRequestIcon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>0</div>
                <p className='text-xs text-muted-foreground'>No reviews yet</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Avg. Quality Score</CardTitle>
                <BarChart3Icon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>N/A</div>
                <p className='text-xs text-muted-foreground'>No data available</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Issues Found</CardTitle>
                <XCircleIcon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>0</div>
                <p className='text-xs text-muted-foreground'>No issues detected</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Quality Trend</CardTitle>
                <TrendingUpIcon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>N/A</div>
                <p className='text-xs text-muted-foreground'>No trend data</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue='overview'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='repositories'>Repositories</TabsTrigger>
              <TabsTrigger value='developers'>Developers</TabsTrigger>
              <TabsTrigger value='issues'>Common Issues</TabsTrigger>
            </TabsList>

            <TabsContent value='overview' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Review Activity</CardTitle>
                  <CardDescription>Code review activity over time</CardDescription>
                </CardHeader>
                <CardContent className='h-[300px] flex items-center justify-center'>
                  <div className='text-center'>
                    <BarChart3Icon className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
                    <h3 className='text-lg font-medium mb-2'>No review data available</h3>
                    <p className='text-sm text-muted-foreground max-w-md mx-auto'>Analytics will be available after GitMate has reviewed some pull requests. Start by reviewing a pull request in one of your repositories.</p>
                    <Button className='mt-4' asChild>
                      <Link href='/dashboard/repositories'>Go to Repositories</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='repositories' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Repository Performance</CardTitle>
                  <CardDescription>Code quality metrics by repository</CardDescription>
                </CardHeader>
                <CardContent className='h-[300px] flex items-center justify-center'>
                  <div className='text-center'>
                    <BarChart3Icon className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
                    <h3 className='text-lg font-medium mb-2'>No repository data available</h3>
                    <p className='text-sm text-muted-foreground max-w-md mx-auto'>Repository analytics will be available after GitMate has reviewed some pull requests.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='developers' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Developer Metrics</CardTitle>
                  <CardDescription>Code quality metrics by developer</CardDescription>
                </CardHeader>
                <CardContent className='h-[300px] flex items-center justify-center'>
                  <div className='text-center'>
                    <BarChart3Icon className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
                    <h3 className='text-lg font-medium mb-2'>No developer data available</h3>
                    <p className='text-sm text-muted-foreground max-w-md mx-auto'>Developer analytics will be available after GitMate has reviewed some pull requests.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='issues' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Common Issues</CardTitle>
                  <CardDescription>Most frequent code issues detected by GitMate</CardDescription>
                </CardHeader>
                <CardContent className='h-[300px] flex items-center justify-center'>
                  <div className='text-center'>
                    <BarChart3Icon className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
                    <h3 className='text-lg font-medium mb-2'>No issue data available</h3>
                    <p className='text-sm text-muted-foreground max-w-md mx-auto'>Issue analytics will be available after GitMate has reviewed some pull requests.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
