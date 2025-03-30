"use client";

import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Search, BookOpen, MessageSquare, GitPullRequestIcon, Settings, Code2, Shield, Brain} from "lucide-react";

const categories = [
  {
    name: "Getting Started",
    description: "Learn the basics of GitMate",
    icon: BookOpen,
    articles: [
      {title: "Introduction to GitMate", href: "/docs/introduction"},
      {title: "Quick Start Guide", href: "/docs/quick-start"},
      {title: "Connecting Your Repository", href: "/docs/connect-repo"}
    ]
  },
  {
    name: "Code Reviews",
    description: "Understanding the review process",
    icon: GitPullRequestIcon,
    articles: [
      {title: "How Reviews Work", href: "/docs/review-process"},
      {title: "Review Settings", href: "/docs/review-settings"},
      {title: "Customizing Reviews", href: "/docs/customize-reviews"}
    ]
  },
  {
    name: "AI Features",
    description: "Using AI-powered features",
    icon: Brain,
    articles: [
      {title: "AI Review System", href: "/docs/ai-reviews"},
      {title: "Code Suggestions", href: "/docs/code-suggestions"},
      {title: "Best Practices", href: "/docs/ai-best-practices"}
    ]
  },
  {
    name: "Security",
    description: "Security and privacy features",
    icon: Shield,
    articles: [
      {title: "Security Overview", href: "/docs/security"},
      {title: "Data Privacy", href: "/docs/privacy"},
      {title: "Access Control", href: "/docs/access-control"}
    ]
  },
  {
    name: "Integration",
    description: "Integrating with other tools",
    icon: Code2,
    articles: [
      {title: "GitHub Integration", href: "/docs/github-integration"},
      {title: "CI/CD Integration", href: "/docs/cicd-integration"},
      {title: "API Reference", href: "/docs/api"}
    ]
  },
  {
    name: "Settings",
    description: "Configuring GitMate",
    icon: Settings,
    articles: [
      {title: "Account Settings", href: "/docs/account-settings"},
      {title: "Repository Settings", href: "/docs/repo-settings"},
      {title: "Team Settings", href: "/docs/team-settings"}
    ]
  }
];

const faqs = [
  {
    question: "How does GitMate's AI review system work?",
    answer:
      "GitMate uses advanced AI models to analyze your code changes, providing instant feedback on code quality, potential issues, and suggestions for improvements. The system learns from your codebase and team's preferences to deliver personalized reviews."
  },
  {
    question: "Can I customize the review settings?",
    answer: "Yes, you can customize various aspects of the review process, including the review tone, focus areas, and specific rules to follow. These settings can be configured at both the repository and team level."
  },
  {
    question: "How secure is my code with GitMate?",
    answer: "GitMate takes security seriously. We use industry-standard encryption, never store your code, and only access what's necessary for the review process. All data is processed securely and in compliance with privacy regulations."
  },
  {
    question: "Can I integrate GitMate with my CI/CD pipeline?",
    answer: "Yes, GitMate can be integrated with popular CI/CD platforms. This allows you to automate the review process and ensure code quality checks are part of your development workflow."
  }
];

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Help Center</h2>
        <p className='text-muted-foreground'>Find answers to your questions and learn how to use GitMate effectively</p>
      </div>

      <div className='relative'>
        <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input placeholder='Search for help...' className='pl-8' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Browse our comprehensive guides</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className='h-[400px]'>
              <div className='space-y-6'>
                {categories.map(category => (
                  <div key={category.name} className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <category.icon className='h-5 w-5 text-primary' />
                      <h3 className='font-semibold'>{category.name}</h3>
                    </div>
                    <p className='text-sm text-muted-foreground'>{category.description}</p>
                    <ul className='space-y-1'>
                      {category.articles.map(article => (
                        <li key={article.title}>
                          <Button variant='link' className='h-auto p-0 text-sm' asChild>
                            <a href={article.href}>{article.title}</a>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className='h-[400px]'>
              <div className='space-y-6'>
                {faqs.map((faq, index) => (
                  <div key={index} className='space-y-2'>
                    <h3 className='font-semibold'>{faq.question}</h3>
                    <p className='text-sm text-muted-foreground'>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
          <CardDescription>Can't find what you're looking for? Our support team is here to help</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4'>
            <MessageSquare className='h-5 w-5 text-primary' />
            <div>
              <p className='font-medium'>Contact Support</p>
              <p className='text-sm text-muted-foreground'>Get help from our support team</p>
            </div>
            <Button className='ml-auto'>Contact Us</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
