"use client";

import Link from "next/link";
import {GitPullRequestIcon} from "lucide-react";

export function Footer() {
  return (
    <footer className='border-t py-6 md:py-0'>
      <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
        <div className='flex items-center gap-2'>
          <GitPullRequestIcon className='h-5 w-5' />
          <p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>Making code reviews smarter and faster with AI.</p>
        </div>
        <div className='flex gap-4'>
          <Link href='https://github.com/Eunice99x' target='_blank' rel='noopener noreferrer' className='text-sm text-muted-foreground hover:text-foreground'>
            GitHub
          </Link>
          <Link href='https://www.linkedin.com/in/younesouterbah/' target='_blank' rel='noopener noreferrer' className='text-sm text-muted-foreground hover:text-foreground'>
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
