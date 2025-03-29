"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GitPullRequestIcon, CheckCircleIcon, AlertTriangleIcon, TrendingUpIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

interface DashboardStats {
  totalReviews: number
  approvedPRs: number
  issuesIdentified: number
  qualityImprovement: number
}

export function StatsCards() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats>({
    totalReviews: 0,
    approvedPRs: 0,
    issuesIdentified: 0,
    qualityImprovement: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardStats() {
      if (!session?.accessToken) {
        setLoading(false)
        return
      }

      try {
        // In a real implementation, this would fetch data from an API
        // For now, we'll use mock data
        setLoading(true)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setStats({
          totalReviews: 248,
          approvedPRs: 187,
          issuesIdentified: 423,
          qualityImprovement: 27,
        })
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
  }, [session])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          <GitPullRequestIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? <div className="h-8 w-16 animate-pulse rounded bg-muted"></div> : stats.totalReviews}
          </div>
          <p className="text-xs text-muted-foreground">Pull requests reviewed by GitMate</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approved PRs</CardTitle>
          <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? <div className="h-8 w-16 animate-pulse rounded bg-muted"></div> : stats.approvedPRs}
          </div>
          <p className="text-xs text-muted-foreground">Pull requests approved after review</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Issues Identified</CardTitle>
          <AlertTriangleIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? <div className="h-8 w-16 animate-pulse rounded bg-muted"></div> : stats.issuesIdentified}
          </div>
          <p className="text-xs text-muted-foreground">Potential issues found in code</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quality Improvement</CardTitle>
          <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? (
              <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
            ) : (
              `+${stats.qualityImprovement}%`
            )}
          </div>
          <p className="text-xs text-muted-foreground">Increase in code quality score</p>
        </CardContent>
      </Card>
    </div>
  )
}

