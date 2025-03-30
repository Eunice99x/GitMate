"use client";

import {Navbar} from "@/components/navbar";
import {Footer} from "@/components/footer";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {GitPullRequestIcon, Brain, Shield, Zap, MessageSquare, GitBranch, Settings} from "lucide-react";

const features = [
  {
    name: "AI-Powered Reviews",
    description: "Get instant, intelligent feedback on your code changes with our advanced AI system.",
    icon: Brain,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    name: "Lightning Fast",
    description: "Reviews are completed in seconds, not hours. Keep your development cycle moving quickly.",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    name: "Security First",
    description: "Automatically detect security vulnerabilities and suggest secure coding practices.",
    icon: Shield,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    name: "Code Quality",
    description: "Maintain high code quality with automated checks for best practices and patterns.",
    icon: GitPullRequestIcon,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    name: "Smart Comments",
    description: "Get contextual suggestions and explanations for code improvements.",
    icon: MessageSquare,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"
  },
  {
    name: "Branch Management",
    description: "Easily manage and review changes across multiple branches and repositories.",
    icon: GitBranch,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    name: "Customizable",
    description: "Configure review settings and rules to match your team's needs.",
    icon: Settings,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10"
  }
];

export default function FeaturesPage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-1'>
        <div className='container px-4 sm:px-6 lg:px-8 py-24 sm:py-32'>
          <div className='mx-auto max-w-2xl text-center'>
            <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>Everything you need for better code reviews</h1>
            <p className='mt-6 text-lg leading-8 text-muted-foreground'>GitMate provides a comprehensive suite of tools to streamline your code review process and improve code quality across your team.</p>
          </div>

          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
              {features.map(feature => (
                <div key={feature.name}>
                  <Card className='h-full hover:shadow-lg transition-shadow duration-200'>
                    <CardHeader>
                      <div className={`inline-flex items-center justify-center rounded-lg p-2 ${feature.bgColor}`}>
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <CardTitle className='mt-4 text-center'>{feature.name}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
