"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {ArrowLeftIcon, SearchIcon, HelpCircleIcon, BookIcon, MessageSquareIcon} from "lucide-react";
import Link from "next/link";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";

export default function HelpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {toast} = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon."
      });

      // Clear the form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1 py-6 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-8'>
          <div className='flex items-center gap-4'>
            <Button variant='outline' size='icon' asChild>
              <Link href='/dashboard'>
                <ArrowLeftIcon className='h-4 w-4' />
              </Link>
            </Button>
            <h1 className='text-2xl font-bold tracking-tight'>Help & Support</h1>
          </div>

          <div className='relative'>
            <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
            <Input className='pl-10 max-w-xl' placeholder='Search for help articles, FAQs, and more...' />
          </div>

          <Tabs defaultValue='faq'>
            <TabsList>
              <TabsTrigger value='faq'>FAQs</TabsTrigger>
              <TabsTrigger value='guides'>Guides</TabsTrigger>
              <TabsTrigger value='contact'>Contact Support</TabsTrigger>
            </TabsList>

            <TabsContent value='faq' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions about GitMate</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type='single' collapsible className='w-full'>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger>How does GitMate review my code?</AccordionTrigger>
                      <AccordionContent>
                        GitMate uses advanced AI models to analyze your code changes and provide detailed, helpful feedback. When a pull request is created or updated, GitMate examines the diff to identify potential issues, suggest improvements, and
                        provide an overall code quality score. The review is posted as a comment on the pull request.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2'>
                      <AccordionTrigger>What permissions does GitMate need?</AccordionTrigger>
                      <AccordionContent>
                        GitMate requires read access to your repositories to fetch code changes, and write access to post review comments. It only accesses the code that's part of pull requests, and never stores your code permanently. All processing
                        is done securely and temporarily.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-3'>
                      <AccordionTrigger>How do I customize the review tone?</AccordionTrigger>
                      <AccordionContent>
                        You can customize the review tone in your repository settings. GitMate offers three tones: Constructive Critic (detailed, direct feedback), Friendly Mentor (supportive, educational feedback), and Enthusiastic Coach (positive,
                        motivational feedback). Choose the tone that best fits your team's style.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-4'>
                      <AccordionTrigger>Can I manually trigger a review?</AccordionTrigger>
                      <AccordionContent>
                        Yes! There are two ways to manually trigger a review:
                        <ol className='list-decimal pl-5 mt-2 space-y-1'>
                          <li>Go to the repository page in GitMate, find the pull request, and click the "Review" button.</li>
                          <li>Comment "/gitmate review" on any pull request in GitHub to trigger a review.</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-5'>
                      <AccordionTrigger>Is GitMate free to use?</AccordionTrigger>
                      <AccordionContent>
                        GitMate offers a free tier for individual developers and small projects, with limited features. For more advanced features and higher usage limits, we offer Pro and Team plans. Check out our
                        <Link href='/pricing' className='text-primary hover:underline'>
                          {" "}
                          pricing page
                        </Link>{" "}
                        for more details.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='guides' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Guides & Tutorials</CardTitle>
                  <CardDescription>Learn how to use GitMate effectively</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='rounded-lg border p-4'>
                      <div className='flex items-start gap-3'>
                        <BookIcon className='h-5 w-5 text-primary mt-0.5' />
                        <div>
                          <h3 className='font-medium mb-1'>Getting Started with GitMate</h3>
                          <p className='text-sm text-muted-foreground mb-3'>Learn how to set up GitMate and start reviewing your first pull request.</p>
                          <Link href='/docs/getting-started/introduction'>
                            <Button variant='outline' size='sm'>
                              Read Guide
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='rounded-lg border p-4'>
                      <div className='flex items-start gap-3'>
                        <BookIcon className='h-5 w-5 text-primary mt-0.5' />
                        <div>
                          <h3 className='font-medium mb-1'>Customizing Review Settings</h3>
                          <p className='text-sm text-muted-foreground mb-3'>Learn how to configure GitMate to match your team's workflow and preferences.</p>
                          <Link href='/docs/getting-started/configuration'>
                            <Button variant='outline' size='sm'>
                              Read Guide
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='rounded-lg border p-4'>
                      <div className='flex items-start gap-3'>
                        <BookIcon className='h-5 w-5 text-primary mt-0.5' />
                        <div>
                          <h3 className='font-medium mb-1'>Understanding AI Code Reviews</h3>
                          <p className='text-sm text-muted-foreground mb-3'>Learn how to interpret and get the most out of GitMate's AI-powered code reviews.</p>
                          <Link href='/docs/features/code-reviews'>
                            <Button variant='outline' size='sm'>
                              Read Guide
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='rounded-lg border p-4'>
                      <div className='flex items-start gap-3'>
                        <BookIcon className='h-5 w-5 text-primary mt-0.5' />
                        <div>
                          <h3 className='font-medium mb-1'>Using Analytics</h3>
                          <p className='text-sm text-muted-foreground mb-3'>Learn how to use GitMate's analytics to track code quality and team performance.</p>
                          <Link href='/docs/features/analytics'>
                            <Button variant='outline' size='sm'>
                              Read Guide
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-6 text-center'>
                    <Link href='/docs'>
                      <Button>View All Documentation</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='contact' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get help from our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-6 md:grid-cols-2'>
                    <div className='rounded-lg border p-6'>
                      <div className='flex flex-col items-center text-center'>
                        <MessageSquareIcon className='h-10 w-10 text-primary mb-4' />
                        <h3 className='text-lg font-medium mb-2'>Email Support</h3>
                        <p className='text-sm text-muted-foreground mb-4'>Send us an email and we'll get back to you within 24 hours.</p>
                        <a href='mailto:younesouterbah1@gmail.com' className='text-primary hover:underline'>
                          younesouterbah1@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className='rounded-lg border p-6'>
                      <div className='flex flex-col items-center text-center'>
                        <HelpCircleIcon className='h-10 w-10 text-primary mb-4' />
                        <h3 className='text-lg font-medium mb-2'>Community Forum</h3>
                        <p className='text-sm text-muted-foreground mb-4'>Join our community forum to get help from other users and our team.</p>
                        <a href='https://github.com/younes-nb/gitmate/discussions' target='_blank' rel='noopener noreferrer'>
                          <Button variant='outline'>Visit Forum</Button>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='mt-8'>
                    <h3 className='text-lg font-medium mb-4'>Send us a message</h3>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                      <div className='grid gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                          <label htmlFor='name' className='text-sm font-medium'>
                            Name
                          </label>
                          <Input id='name' value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className='space-y-2'>
                          <label htmlFor='email' className='text-sm font-medium'>
                            Email
                          </label>
                          <Input id='email' type='email' value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <label htmlFor='subject' className='text-sm font-medium'>
                          Subject
                        </label>
                        <Input id='subject' value={subject} onChange={e => setSubject(e.target.value)} required />
                      </div>
                      <div className='space-y-2'>
                        <label htmlFor='message' className='text-sm font-medium'>
                          Message
                        </label>
                        <textarea
                          id='message'
                          className='flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          required
                        />
                      </div>
                      <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
