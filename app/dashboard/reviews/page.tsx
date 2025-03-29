"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  GitPullRequestIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  Loader2Icon,
  ArrowLeftIcon,
} from "lucide-react"
import Link from "next/link"
import { fetchUserRepositories, fetchRepositoryPullRequests } from "@/lib/github"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Review {
  id: number
  repo: string
  repoId: number
  title: string
  prNumber: number
  author: string
  authorImage: string
  status: "approved" | "changes" | "pending"
  date: string
  comments: number
  url: string
}

export default function ReviewsPage() {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadReviews() {
      if (session?.accessToken) {
        try {
          setLoading(true)

          // First, fetch repositories
          const repos = await fetchUserRepositories(session.accessToken as string)

          // Take up to 5 repositories to fetch their PRs
          const reposToFetch = repos.slice(0, 5)

          // Fetch PRs for each repository
          const prPromises = reposToFetch.map((repo) =>
            fetchRepositoryPullRequests(repo.name, session.accessToken as string).then((prs) =>
              prs.map((pr: any) => ({ ...pr, repoName: repo.name, repoId: repo.id })),
            ),
          )

          const prsArrays = await Promise.all(prPromises)

          // Flatten and transform the PRs into reviews
          const allPrs = prsArrays.flat()

          // Transform PRs into reviews format
          const transformedReviews = allPrs.map((pr: any) => {
            // Generate random status for demo purposes
            const statuses = ["approved", "changes", "pending"] as const
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

            return {
              id: pr.id,
              repo: pr.repoName,
              repoId: pr.repoId,
              title: pr.title,
              prNumber: pr.number,
              author: pr.author.login,
              authorImage: pr.author.avatarUrl,
              status: randomStatus,
              date: formatDate(new Date(pr.updatedAt)),
              comments: Math.floor(Math.random() * 10), // Random comment count for demo
              url: pr.url,
            }
          })

          setReviews(transformedReviews)
          setError(null)
        } catch (err) {
          setError("Failed to load reviews. Please try again.")
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    }

    loadReviews()
  }, [session])

  // Helper function to format dates
  function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard">
                  <ArrowLeftIcon className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
            </div>
            <div className="flex justify-center items-center py-12">
              <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Reviews</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="changes">Changes Requested</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <ReviewsList reviews={reviews} error={error} />
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              <ReviewsList reviews={reviews.filter((review) => review.status === "pending")} error={error} />
            </TabsContent>

            <TabsContent value="approved" className="mt-6">
              <ReviewsList reviews={reviews.filter((review) => review.status === "approved")} error={error} />
            </TabsContent>

            <TabsContent value="changes" className="mt-6">
              <ReviewsList reviews={reviews.filter((review) => review.status === "changes")} error={error} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function ReviewsList({ reviews, error }: { reviews: Review[]; error: string | null }) {
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>There was an error loading your reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-destructive/10 p-4 text-destructive">{error}</div>
        </CardContent>
      </Card>
    )
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>No reviews found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <GitPullRequestIcon className="mb-2 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-1 text-lg font-medium">No reviews yet</h3>
            <p className="text-sm text-muted-foreground">
              GitMate will automatically review new pull requests in your enabled repositories.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
        <CardDescription>
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"} found
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-start space-x-4 rounded-lg border p-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.authorImage} alt={review.author} />
                <AvatarFallback>{review.author.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/repositories/${review.repoId}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {review.repo}
                  </Link>
                  <GitPullRequestIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">#{review.prNumber}</span>
                </div>
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium hover:underline"
                >
                  {review.title}
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{review.author}</span>
                  <span>•</span>
                  <span>{review.date}</span>
                  <span>•</span>
                  <span>{review.comments} comments</span>
                </div>
              </div>
              <Badge
                variant={
                  review.status === "approved" ? "default" : review.status === "changes" ? "destructive" : "outline"
                }
              >
                {review.status === "approved" && <CheckCircleIcon className="mr-1 h-3 w-3" />}
                {review.status === "changes" && <XCircleIcon className="mr-1 h-3 w-3" />}
                {review.status === "pending" && <AlertCircleIcon className="mr-1 h-3 w-3" />}
                {review.status === "approved"
                  ? "Approved"
                  : review.status === "changes"
                    ? "Changes Requested"
                    : "Pending"}
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <a href={review.url} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

