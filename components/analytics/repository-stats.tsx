"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Loader2Icon, AlertCircleIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface RepositoryStats {
  id: number
  name: string
  totalPRs: number
  approvedPRs: number
  rejectedPRs: number
  pendingPRs: number
  averageReviewTime: number // in minutes
  qualityScore: number
}

export function RepositoryStats({ repositoryId }: { repositoryId?: number }) {
  const { data: session } = useSession()
  const [stats, setStats] = useState<RepositoryStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepositoryStats() {
      if (!session?.accessToken) {
        setLoading(false)
        setError("Authentication required")
        return
      }

      try {
        setLoading(true)
        const url = repositoryId ? `/api/analytics/repository-stats/${repositoryId}` : `/api/analytics/repository-stats`

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch repository stats: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        setStats(result.data)
        setError(null)
      } catch (err: any) {
        console.error("Error fetching repository stats:", err)
        setError(`Failed to load repository stats: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchRepositoryStats()
  }, [session, repositoryId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Repository Statistics</CardTitle>
          <CardDescription>Loading repository statistics...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-10">
          <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Repository Statistics</CardTitle>
          <CardDescription>There was an error loading the repository statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-destructive/10 p-4 text-destructive flex items-start gap-3">
            <AlertCircleIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium mb-1">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // If no data is available yet, show a placeholder message
  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Repository Statistics</CardTitle>
          <CardDescription>Track pull request activity and code quality</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-muted-foreground">No repository statistics available yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start using GitMate to review your pull requests to see statistics here.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Repository Statistics</CardTitle>
        <CardDescription>
          {repositoryId ? `Statistics for ${stats.name}` : "Overall repository statistics"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Pull Requests</div>
              <div className="text-sm text-muted-foreground">{stats.totalPRs} total</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center rounded-md border p-2">
                <div className="flex items-center gap-1">
                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  <span className="text-lg font-bold">{stats.approvedPRs}</span>
                </div>
                <span className="text-xs text-muted-foreground">Approved</span>
              </div>
              <div className="flex flex-col items-center rounded-md border p-2">
                <div className="flex items-center gap-1">
                  <XCircleIcon className="h-4 w-4 text-red-500" />
                  <span className="text-lg font-bold">{stats.rejectedPRs}</span>
                </div>
                <span className="text-xs text-muted-foreground">Rejected</span>
              </div>
              <div className="flex flex-col items-center rounded-md border p-2">
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4 text-yellow-500" />
                  <span className="text-lg font-bold">{stats.pendingPRs}</span>
                </div>
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Code Quality Score</div>
              <div className="text-sm text-muted-foreground">{stats.qualityScore}%</div>
            </div>
            <Progress value={stats.qualityScore} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Poor</span>
              <span>Average</span>
              <span>Excellent</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Average Review Time</div>
                  <div className="text-xs text-muted-foreground">Time from PR creation to first review</div>
                </div>
                <div className="text-2xl font-bold">
                  {stats.averageReviewTime < 60
                    ? `${stats.averageReviewTime}m`
                    : `${Math.floor(stats.averageReviewTime / 60)}h ${stats.averageReviewTime % 60}m`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

