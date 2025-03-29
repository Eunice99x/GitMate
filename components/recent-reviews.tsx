"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {GitPullRequestIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, Loader2Icon} from "lucide-react";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {fetchUserRepositories, fetchRepositoryPullRequests} from "@/lib/github";

interface Review {
  id: number;
  repo: string;
  title: string;
  author: string;
  authorImage: string;
  status: "approved" | "changes" | "pending";
  date: string;
  comments: number;
  url: string;
}

export function RecentReviews() {
  const {data: session} = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadReviews() {
      if (session?.accessToken) {
        try {
          setLoading(true);

          // First, fetch repositories
          const repos = await fetchUserRepositories(session.accessToken as string);

          // Take the first 3 repositories to fetch their PRs
          const reposToFetch = repos.slice(0, 3);

          // Fetch PRs for each repository
          const prPromises = reposToFetch.map(repo => fetchRepositoryPullRequests(repo.name, session.accessToken as string));

          const prsArrays = await Promise.all(prPromises);

          // Flatten and transform the PRs into reviews
          const allPrs = prsArrays.flat();

          // Transform PRs into reviews format
          const transformedReviews = allPrs.map((pr: any) => {
            // Generate random status for demo purposes
            const statuses = ["approved", "changes", "pending"] as const;
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

            return {
              id: pr.id,
              repo: pr.url.split("/").slice(3, 5).join("/"), // Extract repo name from URL
              title: pr.title,
              author: pr.author.login,
              authorImage: pr.author.avatarUrl,
              status: randomStatus,
              date: formatDate(new Date(pr.updatedAt)),
              comments: Math.floor(Math.random() * 10), // Random comment count for demo
              url: pr.url
            };
          });

          setReviews(transformedReviews.slice(0, 5)); // Take the first 5 reviews
          setError(null);
        } catch (err) {
          setError("Failed to load reviews. Please try again.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }

    loadReviews();
  }, [session]);

  // Helper function to format dates
  function formatDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return `${Math.floor(diffDays / 7)}w ago`;
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>Loading your recent code reviews...</CardDescription>
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
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>There was an error loading your reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='rounded-md bg-destructive/10 p-4 text-destructive'>{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>No reviews found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center py-8 text-center'>
            <GitPullRequestIcon className='mb-2 h-12 w-12 text-muted-foreground' />
            <h3 className='mb-1 text-lg font-medium'>No reviews yet</h3>
            <p className='text-sm text-muted-foreground'>GitMate will automatically review new pull requests in your enabled repositories.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reviews</CardTitle>
        <CardDescription>Your latest code reviews across all repositories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {reviews.map(review => (
            <div key={review.id} className='flex items-start space-x-4 rounded-lg border p-4'>
              <Avatar className='h-10 w-10'>
                <AvatarImage src={review.authorImage} alt={review.author} />
                <AvatarFallback>{review.author.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className='flex-1 space-y-1'>
                <div className='flex items-center gap-2'>
                  <a href={`https://github.com/${review.repo}`} target='_blank' rel='noopener noreferrer' className='text-sm font-medium hover:underline'>
                    {review.repo}
                  </a>
                  <GitPullRequestIcon className='h-4 w-4 text-muted-foreground' />
                </div>
                <a href={review.url} target='_blank' rel='noopener noreferrer' className='text-base font-medium hover:underline'>
                  {review.title}
                </a>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <span>{review.author}</span>
                  <span>•</span>
                  <span>{review.date}</span>
                  <span>•</span>
                  <span>{review.comments} comments</span>
                </div>
              </div>
              <Badge variant={review.status === "approved" ? "default" : review.status === "changes" ? "destructive" : "outline"}>
                {review.status === "approved" && <CheckCircleIcon className='mr-1 h-3 w-3' />}
                {review.status === "changes" && <XCircleIcon className='mr-1 h-3 w-3' />}
                {review.status === "pending" && <AlertCircleIcon className='mr-1 h-3 w-3' />}
                {review.status === "approved" ? "Approved" : review.status === "changes" ? "Changes Requested" : "Pending"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
