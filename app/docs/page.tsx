import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Input} from "@/components/ui/input";
import {BookOpenIcon, GitPullRequestIcon, BrainIcon, ZapIcon, MessageSquareIcon, ShieldIcon} from "lucide-react";

const categories = [
  {
    name: "Getting Started",
    description: "Learn the basics of GitMate and how to get started with AI-powered code reviews.",
    icon: BookOpenIcon,
    articles: [
      {
        title: "Introduction to GitMate",
        description: "Learn about GitMate's core features and how it can help improve your code reviews.",
        href: "/docs/getting-started/introduction"
      },
      {
        title: "Quick Start Guide",
        description: "Get up and running with GitMate in minutes.",
        href: "/docs/getting-started/quick-start"
      },
      {
        title: "GitHub Integration",
        description: "Learn how to integrate GitMate with your GitHub repositories.",
        href: "/docs/getting-started/github-integration"
      }
    ]
  },
  {
    name: "Code Reviews",
    description: "Understanding how GitMate's AI-powered code review system works.",
    icon: GitPullRequestIcon,
    articles: [
      {
        title: "How Reviews Work",
        description: "Learn about GitMate's review process and AI analysis.",
        href: "/docs/reviews/how-it-works"
      },
      {
        title: "Review Settings",
        description: "Configure how GitMate analyzes your code.",
        href: "/docs/reviews/settings"
      },
      {
        title: "Review Feedback",
        description: "Understanding the feedback and suggestions provided by GitMate.",
        href: "/docs/reviews/feedback"
      }
    ]
  },
  {
    name: "AI Features",
    description: "Explore GitMate's AI-powered features and capabilities.",
    icon: BrainIcon,
    articles: [
      {
        title: "AI Review System",
        description: "Learn how GitMate uses AI to analyze your code.",
        href: "/docs/ai/review-system"
      },
      {
        title: "Smart Comments",
        description: "Understanding GitMate's contextual code suggestions.",
        href: "/docs/ai/smart-comments"
      },
      {
        title: "Best Practices",
        description: "Learn about the coding standards and best practices GitMate enforces.",
        href: "/docs/ai/best-practices"
      }
    ]
  },
  {
    name: "Security",
    description: "Learn about GitMate's security features and data protection.",
    icon: ShieldIcon,
    articles: [
      {
        title: "Security Overview",
        description: "Understanding GitMate's security measures.",
        href: "/docs/security/overview"
      },
      {
        title: "Data Privacy",
        description: "Learn how GitMate protects your code and data.",
        href: "/docs/security/privacy"
      },
      {
        title: "Access Control",
        description: "Managing repository access and permissions.",
        href: "/docs/security/access-control"
      }
    ]
  },
  {
    name: "Performance",
    description: "Learn about GitMate's performance features and optimizations.",
    icon: ZapIcon,
    articles: [
      {
        title: "Fast Reviews",
        description: "Understanding GitMate's quick review process.",
        href: "/docs/performance/fast-reviews"
      },
      {
        title: "Optimization Tips",
        description: "Tips for getting the most out of GitMate's performance.",
        href: "/docs/performance/optimization"
      },
      {
        title: "Resource Usage",
        description: "Learn about GitMate's resource consumption and limits.",
        href: "/docs/performance/resources"
      }
    ]
  },
  {
    name: "Communication",
    description: "Learn how GitMate helps teams communicate effectively.",
    icon: MessageSquareIcon,
    articles: [
      {
        title: "Smart Comments",
        description: "Using GitMate's contextual code suggestions.",
        href: "/docs/communication/smart-comments"
      },
      {
        title: "Team Collaboration",
        description: "How GitMate facilitates team communication.",
        href: "/docs/communication/team-collaboration"
      },
      {
        title: "Feedback System",
        description: "Understanding GitMate's feedback mechanism.",
        href: "/docs/communication/feedback"
      }
    ]
  }
];

export default function DocsPage() {
  return (
    <div className='container py-6 md:py-10'>
      <div className='flex flex-col items-center justify-center space-y-4 text-center'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>Documentation</h1>
        <p className='max-w-[700px] text-muted-foreground md:text-xl'>Learn how to use GitMate effectively with our comprehensive documentation.</p>
      </div>
      <div className='mx-auto mt-8 max-w-5xl'>
        <div className='relative mb-8'>
          <Input type='search' placeholder='Search documentation...' className='h-12 w-full rounded-lg border bg-background px-4 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring' />
        </div>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {categories.map(category => (
            <Card key={category.name} className='group relative overflow-hidden transition-colors hover:bg-muted/50'>
              <CardHeader>
                <div className='flex items-center gap-2'>
                  <category.icon className='h-5 w-5 text-primary' />
                  <CardTitle className='text-xl'>{category.name}</CardTitle>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[200px] pr-4'>
                  <ul className='space-y-2'>
                    {category.articles.map(article => (
                      <li key={article.title}>
                        <a href={article.href} className='block rounded-md p-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'>
                          <div className='font-medium'>{article.title}</div>
                          <div className='text-xs'>{article.description}</div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
