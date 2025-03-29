"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import {GitlabIcon as GitHubLogoIcon, SettingsIcon, Loader2Icon, AlertCircleIcon} from "lucide-react";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {fetchUserRepositories, toggleRepositoryStatus} from "@/lib/github";
import {useToast} from "@/hooks/use-toast";

interface Repository {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  reviewCount: number;
  lastReview: string;
  url: string;
  private: boolean;
  stars: number;
  language: string | null;
}

export function RepositoryList() {
  const {data: session} = useSession();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {toast} = useToast();

  useEffect(() => {
    async function loadRepositories() {
      if (session?.accessToken) {
        try {
          setLoading(true);
          console.log("Loading repositories with token:", session.accessToken.substring(0, 5) + "...");

          const repos = await fetchUserRepositories(session.accessToken as string);

          // Transform the data to match our component's expected format
          // In a real app, you'd fetch the enabled status and review counts from your database
          const transformedRepos = repos.map((repo: any) => ({
            ...repo,
            enabled: Math.random() > 0.3, // Randomly set some repos as enabled for demo
            reviewCount: Math.floor(Math.random() * 50), // Random review count for demo
            lastReview: ["1h ago", "3h ago", "1d ago", "2d ago", "1w ago"][Math.floor(Math.random() * 5)] // Random last review time for demo
          }));

          setRepositories(transformedRepos);
          setError(null);
        } catch (err: any) {
          console.error("Repository list error:", err);
          setError(`Failed to load repositories: ${err.message}. Please check your GitHub token and permissions.`);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No session access token available");
        setLoading(false);
        setError("Authentication required. Please sign in with GitHub to view your repositories.");
      }
    }

    loadRepositories();
  }, [session]);

  const handleToggleStatus = async (repoId: number, enabled: boolean) => {
    try {
      if (!session?.accessToken) return;

      // Optimistically update the UI
      setRepositories(repos => repos.map(repo => (repo.id === repoId ? {...repo, enabled} : repo)));

      // Call the API to update the status
      await toggleRepositoryStatus(repoId, enabled, session.accessToken as string);

      toast({
        title: enabled ? "Repository enabled" : "Repository disabled",
        description: `GitMate ${enabled ? "will now" : "will no longer"} review pull requests for this repository.`
      });
    } catch (err: any) {
      // Revert the UI change on error
      setRepositories(repos => repos.map(repo => (repo.id === repoId ? {...repo, enabled: !enabled} : repo)));

      toast({
        title: "Failed to update repository status",
        description: `Error: ${err.message}. Please try again later.`,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connected Repositories</CardTitle>
          <CardDescription>Loading your GitHub repositories...</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center py-8'>
          <Loader2Icon className='h-8 w-8 animate-spin text-muted-foreground' />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connected Repositories</CardTitle>
          <CardDescription>There was an error loading your repositories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='rounded-md bg-destructive/10 p-4 text-destructive flex items-start gap-3'>
            <AlertCircleIcon className='h-5 w-5 mt-0.5 flex-shrink-0' />
            <div>
              <p className='font-medium mb-1'>Error</p>
              <p className='text-sm'>{error}</p>
            </div>
          </div>
          <Button className='mt-4' onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (repositories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connected Repositories</CardTitle>
          <CardDescription>No repositories found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center py-8 text-center'>
            <GitHubLogoIcon className='mb-2 h-12 w-12 text-muted-foreground' />
            <h3 className='mb-1 text-lg font-medium'>No repositories found</h3>
            <p className='mb-4 text-sm text-muted-foreground'>We couldn't find any GitHub repositories associated with your account.</p>
            <Button asChild>
              <a href='https://github.com/new' target='_blank' rel='noopener noreferrer'>
                Create a Repository
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Repositories</CardTitle>
        <CardDescription>Manage repositories where GitMate is installed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {repositories.map(repo => (
            <div key={repo.id} className='flex items-center justify-between rounded-lg border p-4'>
              <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                  <GitHubLogoIcon className='h-4 w-4' />
                  <a href={repo.url} target='_blank' rel='noopener noreferrer' className='font-medium hover:underline'>
                    {repo.name}
                  </a>
                  {repo.enabled ? (
                    <Badge variant='outline' className='bg-green-50 text-green-700 border-green-200'>
                      Active
                    </Badge>
                  ) : (
                    <Badge variant='outline' className='bg-gray-50 text-gray-700 border-gray-200'>
                      Disabled
                    </Badge>
                  )}
                  {repo.private && (
                    <Badge variant='outline' className='bg-yellow-50 text-yellow-700 border-yellow-200'>
                      Private
                    </Badge>
                  )}
                </div>
                <p className='text-sm text-muted-foreground'>{repo.description || "No description"}</p>
                <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                  <span>{repo.reviewCount} reviews</span>
                  <span>•</span>
                  <span>Last review: {repo.lastReview}</span>
                  {repo.language && (
                    <>
                      <span>•</span>
                      <span>{repo.language}</span>
                    </>
                  )}
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Switch checked={repo.enabled} onCheckedChange={checked => handleToggleStatus(repo.id, checked)} />
                <Button variant='ghost' size='icon' asChild>
                  <a href={`/dashboard/repositories/${repo.id}`}>
                    <SettingsIcon className='h-4 w-4' />
                    <span className='sr-only'>Repository settings</span>
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
