"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ArrowLeftIcon, SearchIcon, PlusIcon} from "lucide-react";
import Link from "next/link";
import {RepositoryList} from "@/components/repository-list";
import {useToast} from "@/hooks/use-toast";

export default function RepositoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
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
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1 py-6 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-8'>
          <div className='flex items-center gap-4'>
            <Button variant='outline' size='icon' asChild>
              <Link href='/dashboard'>
                <ArrowLeftIcon className='h-4 w-4' />
              </Link>
            </Button>
            <h1 className='text-2xl font-bold tracking-tight'>Repositories</h1>
          </div>

          <div className='flex items-center justify-between'>
            <div className='relative w-full max-w-sm'>
              <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input type='search' placeholder='Search repositories...' className='w-full pl-8' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Button className='gap-2' onClick={handleAddRepository}>
              <PlusIcon className='h-4 w-4' />
              Add Repository
            </Button>
          </div>

          <RepositoryList />
        </div>
      </main>
    </div>
  );
}
