"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Loader2Icon, AlertCircleIcon, TrophyIcon, GitPullRequestIcon, CheckCircleIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface TeamMember {
  id: string
  name: string
  username: string
  avatarUrl: string
  reviewCount: number
  approvalRate: number
  qualityScore: number
  rank: number
}

export function TeamLeaderboard() {
  const { data: session } = useSession()
  const [data, setData] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeamLeaderboard() {
      if (!session?.accessToken) {
        setLoading(false)
        setError("Authentication required")
        return
      }

      try {
        setLoading(true)
        const response = await fetch("/api/analytics/team-leaderboard", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch team leaderboard: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        setData(result.data)
        setError(null)
      } catch (err: any) {
        console.error("Error fetching team leaderboard:", err)
        setError(`Failed to load team leaderboard: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamLeaderboard()
  }, [session])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Leaderboard</CardTitle>
          <CardDescription>Loading team performance data...</CardDescription>
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
          <CardTitle>Team Leaderboard</CardTitle>
          <CardDescription>There was an error loading the team leaderboard</CardDescription>
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
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Leaderboard</CardTitle>
          <CardDescription>See who's leading in code quality and reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-muted-foreground">No team leaderboard data available yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start using GitMate with your team to see performance metrics here.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Leaderboard</CardTitle>
        <CardDescription>See who's leading in code quality and reviews</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((member) => (
            <div key={member.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {member.rank <= 3 && (
                    <div className="absolute -top-1 -right-1 rounded-full bg-yellow-400 p-0.5">
                      <TrophyIcon className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">@{member.username}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-sm">
                    <GitPullRequestIcon className="h-3.5 w-3.5" />
                    <span>{member.reviewCount}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Reviews</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-sm">
                    <CheckCircleIcon className="h-3.5 w-3.5" />
                    <span>{member.approvalRate}%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Approval</div>
                </div>
                <div className="w-16">
                  <Badge
                    variant="outline"
                    className={`w-full justify-center ${
                      member.qualityScore >= 90
                        ? "bg-green-50 text-green-700 border-green-200"
                        : member.qualityScore >= 70
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {member.qualityScore}%
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

