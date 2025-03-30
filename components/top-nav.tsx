"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {GitPullRequestIcon, MenuIcon, UserIcon, LogOutIcon, SettingsIcon} from "lucide-react";
import {useSession, signOut} from "next-auth/react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ThemeToggle} from "@/components/theme-toggle";

export function TopNav() {
  const {data: session} = useSession();

  return (
    <header className='sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6'>
      <div className='md:hidden'>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <MenuIcon className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </div>

      <div className='flex items-center gap-2 md:hidden'>
        <GitPullRequestIcon className='h-6 w-6' />
        <span className='font-semibold'>GitMate</span>
      </div>

      <div className='ml-auto flex items-center gap-2'>
        <ThemeToggle />

        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='rounded-full'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                  <AvatarFallback>
                    {session.user?.name
                      ? session.user.name
                          .split(" ")
                          .map(n => n[0])
                          .join("")
                          .toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>
                {session.user?.name || "User"}
                <p className='text-xs font-normal text-muted-foreground'>{session.user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href='/dashboard/profile' className='flex items-center gap-2 cursor-pointer'>
                  <UserIcon className='h-4 w-4' />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/dashboard/settings' className='flex items-center gap-2 cursor-pointer'>
                  <SettingsIcon className='h-4 w-4' />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='flex items-center gap-2 cursor-pointer' onClick={() => signOut({callbackUrl: "/"})}>
                <LogOutIcon className='h-4 w-4' />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild size='sm'>
            <Link href='/auth/signin'>Sign in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
