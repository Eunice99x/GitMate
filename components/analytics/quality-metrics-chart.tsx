"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Loader2Icon, AlertCircleIcon } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface QualityMetric {
  name: string
  value: number
  category: string
}

export function QualityMetricsChart() {
  const { data: session } = useSession()
  const [data, setData] = useState<QualityMetric[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchQualityMetrics() {
      if (!session?.accessToken) {
        setLoading(false)
        setError("Authentication required")
        return
      }

      try {
        setLoading(true)
        const response = await fetch("/api/analytics/quality-metrics", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch quality metrics: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        setData(result.data)
        setError(null)
      } catch (err: any) {
        console.error("Error fetching quality metrics:", err)
        setError(`Failed to load quality metrics: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchQualityMetrics()
  }, [session])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Code Quality Metrics</CardTitle>
          <CardDescription>Loading quality metrics data...</CardDescription>
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
          <CardTitle>Code Quality Metrics</CardTitle>
          <CardDescription>There was an error loading the quality metrics</CardDescription>
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
          <CardTitle>Code Quality Metrics</CardTitle>
          <CardDescription>Track code quality improvements over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-muted-foreground">No quality metrics data available yet.</p>
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
        <CardTitle>Code Quality Metrics</CardTitle>
        <CardDescription>Track code quality improvements over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 20,
              }}
            >
              <XAxis dataKey="name" tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={60} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} width={40} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Metric</span>
                            <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Score</span>
                            <span className="font-bold">{payload[0].value}%</span>
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Category: {payload[0].payload.category}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                style={{
                  fill: "var(--primary)",
                  opacity: 0.8,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

