"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import {GitlabIcon as GitHubLogoIcon, SettingsIcon, Loader2Icon, AlertCircleIcon} from "lucide-react";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {fetchUserRepositories} from "@/lib/github";
import {getGitHubToken} from "@/lib/storage-service";
import Link from "next/link";

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
      try {
        setLoading(true);

        // Get GitHub token from localStorage
        const token = getGitHubToken();
        if (!token) {
          setError("GitHub token not found. Please add your token in Profile Settings.");
          setLoading(false);
          return;
        }

        console.log("Loading repositories with token:", token.substring(0, 5) + "...");

        // Fetch repositories directly using our GitHub client
        const repos = await fetchUserRepositories();

        // Get enabled status from localStorage
        const repoStatuses = JSON.parse(localStorage.getItem("repoStatuses") || "{}");

        // Get review counts from localStorage
        const reviewsData = JSON.parse(localStorage.getItem("reviews") || "[]");

        // Transform the repositories
        const transformedRepos = repos.map((repo: any) => {
          const repoId = repo.id.toString();
          const repoReviews = reviewsData.filter((r: any) => r.repoId === repoId);
          const reviewCount = repoReviews.length;

          // Get last review date if available
          let lastReview = "Never";
          if (reviewCount > 0) {
            const sortedReviews = repoReviews.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            const lastReviewDate = new Date(sortedReviews[0].createdAt);
            const now = new Date();
            const diffMs = now.getTime() - lastReviewDate.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMins / 60);
            const diffDays = Math.floor(diffHours / 24);

            if (diffMins < 60) {
              lastReview = `${diffMins}m ago`;
            } else if (diffHours < 24) {
              lastReview = `${diffHours}h ago`;
            } else if (diffDays < 7) {
              lastReview = `${diffDays}d ago`;
            } else {
              lastReview = lastReviewDate.toLocaleDateString();
            }
          }

          return {
            ...repo,
            enabled: repoStatuses[repoId] !== false, // Default to enabled if not set
            reviewCount,
            lastReview
          };
        });

        setRepositories(transformedRepos);
        setError(null);
      } catch (err: any) {
        console.error("Repository list error:", err);
        setError(`Failed to load repositories: ${err.message}. Please check your GitHub token and permissions.`);
      } finally {
        setLoading(false);
      }
    }

    loadRepositories();
  }, []);

  const handleToggleStatus = async (repoId: number, enabled: boolean) => {
    try {
      // Optimistically update the UI
      setRepositories(repos => repos.map(repo => (repo.id === repoId ? {...repo, enabled} : repo)));

      // Update localStorage
      const repoStatuses = JSON.parse(localStorage.getItem("repoStatuses") || "{}");
      repoStatuses[repoId] = enabled;
      localStorage.setItem("repoStatuses", JSON.stringify(repoStatuses));

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
                  <Link href={`/dashboard/repositories/${repo.id}`}>
                    <SettingsIcon className='h-4 w-4' />
                    <span className='sr-only'>Repository settings</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
