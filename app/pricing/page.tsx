"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {CheckIcon, XIcon, GitPullRequestIcon, CreditCardIcon} from "lucide-react";
import Link from "next/link";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Navbar} from "@/components/navbar";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      description: "For individual developers and small projects",
      price: {
        monthly: "$0",
        yearly: "$0"
      },
      features: [
        {name: "Up to 3 repositories", included: true},
        {name: "Basic code reviews", included: true},
        {name: "GitHub integration", included: true},
        {name: "Single reviewer tone", included: true},
        {name: "Community support", included: true},
        {name: "Advanced code insights", included: false},
        {name: "Custom review rules", included: false},
        {name: "Priority support", included: false}
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      description: "For professional developers and growing teams",
      price: {
        monthly: "$12",
        yearly: "$120"
      },
      features: [
        {name: "Up to 10 repositories", included: true},
        {name: "Advanced code reviews", included: true},
        {name: "GitHub integration", included: true},
        {name: "All reviewer tones", included: true},
        {name: "Email support", included: true},
        {name: "Advanced code insights", included: true},
        {name: "Custom review rules", included: false},
        {name: "Priority support", included: false}
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Team",
      description: "For teams and organizations with multiple projects",
      price: {
        monthly: "$49",
        yearly: "$490"
      },
      features: [
        {name: "Unlimited repositories", included: true},
        {name: "Advanced code reviews", included: true},
        {name: "GitHub integration", included: true},
        {name: "All reviewer tones", included: true},
        {name: "Priority support", included: true},
        {name: "Advanced code insights", included: true},
        {name: "Custom review rules", included: true},
        {name: "Team analytics dashboard", included: true}
      ],
      cta: "Start Free Trial",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How does the free trial work?",
      answer: "Our free trial gives you full access to the Pro or Team plan for 14 days. No credit card required. At the end of the trial, you can choose to subscribe or downgrade to the Free plan."
    },
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit towards future billing cycles."
    },
    {
      question: "How does repository counting work?",
      answer: "A repository count towards your plan limit when GitMate is actively installed and configured to review code. You can add and remove repositories at any time within your plan limits."
    },
    {
      question: "Is there a plan for open source projects?",
      answer: "Yes! We offer free Team plans for qualifying open source projects. Contact our support team to apply for the open source program."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and for annual Team plans, we can also support invoicing and purchase orders."
    },
    {
      question: "How secure is GitMate?",
      answer: "GitMate uses GitHub's OAuth and doesn't store your code. We only process the diffs during review. Our service is SOC 2 compliant and we regularly undergo security audits."
    }
  ];

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>Simple, Transparent Pricing</h1>
                <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl'>Choose the plan that's right for you and your team</p>
              </div>
              <div className='w-full max-w-sm'>
                <Tabs defaultValue='monthly' className='w-full'>
                  <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='monthly'>Monthly</TabsTrigger>
                    <TabsTrigger value='yearly'>Yearly (Save 15%)</TabsTrigger>
                  </TabsList>
                  <div className='mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3'>
                    {plans.map(plan => (
                      <TabsContent key={plan.name} value='monthly' className='h-full'>
                        <Card className={`flex h-full flex-col relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                          {plan.popular && <div className='absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground'>Most Popular</div>}
                          <CardHeader className={`${plan.popular ? "pt-8" : ""}`}>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                          </CardHeader>
                          <CardContent className='flex-1 space-y-4'>
                            <div className='flex items-baseline gap-1'>
                              <span className='text-3xl font-bold'>{plan.price.monthly}</span>
                              <span className='text-muted-foreground'>/month</span>
                            </div>
                            <ul className='space-y-2 text-sm'>
                              {plan.features.map(feature => (
                                <li key={feature.name} className='flex items-center gap-2'>
                                  {feature.included ? <CheckIcon className='h-4 w-4 text-primary' /> : <XIcon className='h-4 w-4 text-muted-foreground' />}
                                  <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter>
                            <Button className={`w-full ${plan.popular ? "bg-primary" : ""}`}>{plan.cta}</Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    ))}
                    {plans.map(plan => (
                      <TabsContent key={`${plan.name}-yearly`} value='yearly' className='h-full'>
                        <Card className={`flex h-full flex-col relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                          {plan.popular && <div className='absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground'>Most Popular</div>}
                          <CardHeader className={`${plan.popular ? "pt-8" : ""}`}>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                          </CardHeader>
                          <CardContent className='flex-1 space-y-4'>
                            <div className='flex items-baseline gap-1'>
                              <span className='text-3xl font-bold'>{plan.price.yearly}</span>
                              <span className='text-muted-foreground'>/year</span>
                            </div>
                            <ul className='space-y-2 text-sm'>
                              {plan.features.map(feature => (
                                <li key={feature.name} className='flex items-center gap-2'>
                                  {feature.included ? <CheckIcon className='h-4 w-4 text-primary' /> : <XIcon className='h-4 w-4 text-muted-foreground' />}
                                  <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter>
                            <Button className={`w-full ${plan.popular ? "bg-primary" : ""}`}>{plan.cta}</Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    ))}
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='mx-auto max-w-[800px] space-y-12'>
              <div className='space-y-4 text-center'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>Compare Plans</h2>
                <p className='text-muted-foreground'>Find the plan that best fits your needs</p>
              </div>

              <div className='w-full overflow-x-auto'>
                <Table className='w-full'>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[200px]'>Features</TableHead>
                      <TableHead className='text-center w-[150px]'>Free</TableHead>
                      <TableHead className='text-center w-[150px]'>Pro</TableHead>
                      <TableHead className='text-center w-[150px]'>Team</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Repositories</TableCell>
                      <TableCell className='text-center'>Up to 3</TableCell>
                      <TableCell className='text-center'>Up to 10</TableCell>
                      <TableCell className='text-center'>Unlimited</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Review Depth</TableCell>
                      <TableCell className='text-center'>Basic</TableCell>
                      <TableCell className='text-center'>Advanced</TableCell>
                      <TableCell className='text-center'>Advanced</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Reviewer Tones</TableCell>
                      <TableCell className='text-center'>1</TableCell>
                      <TableCell className='text-center'>All</TableCell>
                      <TableCell className='text-center'>All + Custom</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Code Insights</TableCell>
                      <TableCell className='text-center'>Basic</TableCell>
                      <TableCell className='text-center'>Advanced</TableCell>
                      <TableCell className='text-center'>Advanced + Custom</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Team Analytics</TableCell>
                      <TableCell className='text-center'>
                        <XIcon className='mx-auto h-4 w-4 text-muted-foreground' />
                      </TableCell>
                      <TableCell className='text-center'>Basic</TableCell>
                      <TableCell className='text-center'>Advanced</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Support</TableCell>
                      <TableCell className='text-center'>Community</TableCell>
                      <TableCell className='text-center'>Email</TableCell>
                      <TableCell className='text-center'>Priority</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Custom Rules</TableCell>
                      <TableCell className='text-center'>
                        <XIcon className='mx-auto h-4 w-4 text-muted-foreground' />
                      </TableCell>
                      <TableCell className='text-center'>
                        <XIcon className='mx-auto h-4 w-4 text-muted-foreground' />
                      </TableCell>
                      <TableCell className='text-center'>
                        <CheckIcon className='mx-auto h-4 w-4 text-primary' />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
          <div className='container px-4 md:px-6'>
            <div className='mx-auto max-w-[800px] space-y-8'>
              <div className='space-y-4 text-center'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>Frequently Asked Questions</h2>
                <p className='text-muted-foreground'>Have questions? We've got answers.</p>
              </div>

              <Accordion type='single' collapsible className='w-full'>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className='text-left'>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className='flex flex-col items-center justify-center space-y-4 text-center'>
                <p className='text-muted-foreground'>Still have questions? We're here to help.</p>
                <Button variant='outline'>Contact Support</Button>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>Ready to improve your code quality?</h2>
                <p className='mx-auto max-w-[600px] md:text-xl'>Start your 14-day free trial today. No credit card required.</p>
              </div>
              <Button size='lg' variant='secondary' className='gap-2'>
                <CreditCardIcon className='h-5 w-5' />
                Start Free Trial
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className='border-t py-6 md:py-0'>
        <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
          <p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>© 2025 GitMate. All rights reserved.</p>
          <div className='flex gap-4'>
            <Link href='/terms' className='text-sm text-muted-foreground hover:underline'>
              Terms
            </Link>
            <Link href='/privacy' className='text-sm text-muted-foreground hover:underline'>
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
