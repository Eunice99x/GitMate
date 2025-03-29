"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {PlusIcon} from "lucide-react";
import {RecentReviews} from "@/components/recent-reviews";
import {RepositoryList} from "@/components/repository-list";
import {StatsCards} from "@/components/stats-cards";
import Link from "next/link";
import {useToast} from "@/hooks/use-toast";

export default function DashboardPage() {
  const {toast} = useToast();

  const handleAddRepository = () => {
    // In a real app, this would open a modal or redirect to GitHub app installation
    toast({
      title: "Add Repository",
      description: "This would redirect you to GitHub to install the GitMate app on your repositories."
    });

    // For demo purposes, we'll open GitHub's new repository page
    window.open("https://github.com/new", "_blank");
  };

  return (
    <div className='py-6 px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col gap-8'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
          <Button className='gap-2' onClick={handleAddRepository}>
            <PlusIcon className='h-4 w-4' />
            Add Repository
          </Button>
        </div>

        <StatsCards />

        <Tabs defaultValue='reviews'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='reviews'>Recent Reviews</TabsTrigger>
            <TabsTrigger value='repositories'>Repositories</TabsTrigger>
            <TabsTrigger value='settings'>Settings</TabsTrigger>
          </TabsList>
          <TabsContent value='reviews' className='mt-6'>
            <RecentReviews />
          </TabsContent>
          <TabsContent value='repositories' className='mt-6'>
            <RepositoryList />
          </TabsContent>
          <TabsContent value='settings' className='mt-6'>
            <Card>
              <CardHeader>
                <CardTitle>Bot Settings</CardTitle>
                <CardDescription>Configure how GitMate interacts with your repositories</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-4'>
                  <h3 className='text-lg font-medium'>Quick Settings</h3>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <Link href='/dashboard/settings' className='w-full'>
                      <Button variant='outline' className='w-full'>
                        Review Settings
                      </Button>
                    </Link>
                    <Link href='/dashboard/profile' className='w-full'>
                      <Button variant='outline' className='w-full'>
                        Profile Settings
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
