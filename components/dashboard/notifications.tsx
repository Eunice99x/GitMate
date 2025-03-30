"use client";

import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {GitPullRequestIcon, CheckCircle2, AlertCircle, MessageSquare, Bell, Clock, XCircle} from "lucide-react";

interface Notification {
  id: string;
  type: "review" | "comment" | "mention" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  author?: {
    name: string;
    image: string;
  };
  pr?: {
    title: string;
    url: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "review",
    title: "New Review",
    message: "Your pull request has been reviewed",
    timestamp: "2 minutes ago",
    read: false,
    author: {
      name: "John Doe",
      image: "https://github.com/johndoe.png"
    },
    pr: {
      title: "Add new feature",
      url: "https://github.com/org/repo/pull/123"
    }
  },
  {
    id: "2",
    type: "comment",
    title: "New Comment",
    message: "Someone commented on your code",
    timestamp: "1 hour ago",
    read: true,
    author: {
      name: "Jane Smith",
      image: "https://github.com/janesmith.png"
    },
    pr: {
      title: "Fix bug in login",
      url: "https://github.com/org/repo/pull/124"
    }
  },
  {
    id: "3",
    type: "mention",
    title: "Mentioned",
    message: "You were mentioned in a review",
    timestamp: "3 hours ago",
    read: false,
    author: {
      name: "Mike Johnson",
      image: "https://github.com/mikejohnson.png"
    },
    pr: {
      title: "Update dependencies",
      url: "https://github.com/org/repo/pull/125"
    }
  },
  {
    id: "4",
    type: "system",
    title: "System Update",
    message: "GitMate has been updated to version 2.0",
    timestamp: "1 day ago",
    read: true
  }
];

export function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "review":
        return <CheckCircle2 className='h-4 w-4 text-green-500' />;
      case "comment":
        return <MessageSquare className='h-4 w-4 text-blue-500' />;
      case "mention":
        return <AlertCircle className='h-4 w-4 text-yellow-500' />;
      case "system":
        return <Bell className='h-4 w-4 text-purple-500' />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => (n.id === id ? {...n, read: true} : n)));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "all") return true;
    return n.type === activeTab;
  });

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Notifications</h2>
          <p className='text-muted-foreground'>Stay updated with your code review activities</p>
        </div>
        {unreadCount > 0 && (
          <Button variant='outline' onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='all'>All</TabsTrigger>
              <TabsTrigger value='review'>Reviews</TabsTrigger>
              <TabsTrigger value='comment'>Comments</TabsTrigger>
              <TabsTrigger value='mention'>Mentions</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <ScrollArea className='h-[600px]'>
            <div className='space-y-4'>
              {filteredNotifications.map(notification => (
                <div key={notification.id} className={`flex items-start gap-4 rounded-lg border p-4 ${!notification.read ? "bg-muted/50" : ""}`}>
                  <div className='mt-1'>
                    {notification.author ? (
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src={notification.author.image} alt={notification.author.name} />
                        <AvatarFallback>{notification.author.name[0]}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted'>{getNotificationIcon(notification.type)}</div>
                    )}
                  </div>
                  <div className='flex-1 space-y-1'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <p className='font-medium'>{notification.title}</p>
                        <p className='text-sm text-muted-foreground'>{notification.message}</p>
                      </div>
                      {!notification.read && (
                        <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => markAsRead(notification.id)}>
                          <XCircle className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                    {notification.pr && (
                      <div className='flex items-center gap-2'>
                        <GitPullRequestIcon className='h-4 w-4 text-muted-foreground' />
                        <a href={notification.pr.url} target='_blank' rel='noopener noreferrer' className='text-sm text-primary hover:underline'>
                          {notification.pr.title}
                        </a>
                      </div>
                    )}
                    <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                      <Clock className='h-3 w-3' />
                      {notification.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
