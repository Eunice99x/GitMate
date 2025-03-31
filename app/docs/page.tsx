import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Input} from "@/components/ui/input";
import {BookOpenIcon, SettingsIcon} from "lucide-react";

const categories = [
  {
    name: "Introduction",
    description: "Learn the basics of GitMate and how to get started with AI-powered code reviews.",
    icon: BookOpenIcon,
    articles: [
      {
        title: "Welcome to GitMate",
        description: "Learn about GitMate's core features and how it can help improve your code reviews.",
        href: "/docs/introduction"
      }
    ]
  },
  {
    name: "Configuration",
    description: "Configure GitMate settings and integrations for your repositories.",
    icon: SettingsIcon,
    articles: [
      {
        title: "AI Settings",
        description: "Configure the AI models and settings for GitMate.",
        href: "/docs/configuration/ai-settings"
      },
      {
        title: "GitHub Setup",
        description: "Learn how to set up GitHub integration with GitMate.",
        href: "/docs/configuration/github-setup"
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
        <div className='grid gap-6 md:grid-cols-2'>
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
