import type {Metadata} from "next";
import {StatsCards} from "@/components/dashboard/stats-cards";
import {RepositoryList} from "@/components/repository-list";

export const metadata: Metadata = {
  title: "Dashboard | GitMate",
  description: "Monitor your repositories and code review activity"
};

export default function DashboardPage() {
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground'>Monitor your repositories and code review activity</p>
      </div>

      <StatsCards />

      <RepositoryList />
    </div>
  );
}
