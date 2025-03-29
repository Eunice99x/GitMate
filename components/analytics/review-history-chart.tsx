"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Loader2Icon, AlertCircleIcon } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ReviewHistoryData {
  date: string
  count: number
}

export function ReviewHistoryChart() {
  const { data: session } = useSession()
  const [data, setData] = useState<ReviewHistoryData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReviewHistory() {
      if (!session?.accessToken) {
        setLoading(false)
        setError("Authentication required")
        return
      }

      try {
        setLoading(true)
        const response = await fetch("/api/analytics/review-history", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch review history: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        setData(result.data)
        setError(null)
      } catch (err: any) {
        console.error("Error fetching review history:", err)
        setError(`Failed to load review history: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchReviewHistory()
  }, [session])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Review History</CardTitle>
          <CardDescription>Loading review history data...</CardDescription>
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
          <CardTitle>Review History</CardTitle>
          <CardDescription>There was an error loading the review history</CardDescription>
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
          <CardTitle>Review History</CardTitle>
          <CardDescription>Track your code review activity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-muted-foreground">No review history data available yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start using GitMate to review your pull requests to see data here.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review History</CardTitle>
        <CardDescription>Track your code review activity over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                }
                minTickGap={10}
              />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} width={30} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                            <span className="font-bold text-muted-foreground">
                              {new Date(payload[0].payload.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Reviews</span>
                            <span className="font-bold">{payload[0].value}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: "var(--primary)", opacity: 0.8 },
                }}
                style={{
                  stroke: "var(--primary)",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

