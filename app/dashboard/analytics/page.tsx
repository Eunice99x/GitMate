import type {Metadata} from "next";
import {ReviewHistoryChart} from "@/components/analytics/review-history-chart";
import {QualityMetricsChart} from "@/components/analytics/quality-metrics-chart";
import {TeamLeaderboard} from "@/components/analytics/team-leaderboard";
import {RepositoryStats} from "@/components/analytics/repository-stats";

export const metadata: Metadata = {
  title: "Analytics | GitMate",
  description: "Track code review metrics and team performance"
};

export default function AnalyticsPage() {
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Analytics Dashboard</h1>
        <p className='text-muted-foreground'>Track code review metrics, quality trends, and team performance</p>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <ReviewHistoryChart />
        <QualityMetricsChart />
      </div>

      <RepositoryStats />

      <TeamLeaderboard />
    </div>
  );
}
