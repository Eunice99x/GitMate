import type React from "react";
import {SideNav} from "@/components/side-nav";
import {TopNav} from "@/components/top-nav";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex min-h-screen flex-col'>
      <TopNav />
      <div className='flex flex-1'>
        <SideNav />
        <main className='flex-1 p-6 md:p-8'>{children}</main>
      </div>
    </div>
  );
}
