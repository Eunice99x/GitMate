"use client";

import {useParams, useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {fetchUserRepositories, fetchRepositoryPullRequests} from "@/lib/github";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Switch} from "@/components/ui/switch";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {GitlabIcon as GitHubLogoIcon, GitPullRequestIcon, ArrowLeftIcon, Loader2Icon, CheckCircleIcon, XCircleIcon, AlertCircleIcon} from "lucide-react";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useToast} from "@/hooks/use-toast";
import {getRepoSettings, saveRepoSettings, type RepoSettings} from "@/lib/storage-service";
import {getGitHubToken} from "@/lib/storage-service";
import {getOpenAIKey, getGoogleKey} from "@/lib/storage-service";

interface Repository {
  id: number;
  name: string;
  description: string;
  url: string;
  private: boolean;
  stars: number;
  language: string | null;
}

interface PullRequest {
  id: number;
  number: number;
  title: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  author: {
    login: string;
    avatarUrl: string;
  };
  url: string;
}

export default function RepositoryPage() {
  const params = useParams();
  const router = useRouter();
  const {data: session} = useSession();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<RepoSettings>({
    enabled: true,
    reviewTone: "Constructive Critic",
    aiProvider: "gemini",
    automaticReviews: true,
    commandBasedReviews: true
  });
  const [reviewInProgress, setReviewInProgress] = useState<number | null>(null);
  const {toast} = useToast();

  const repoId = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";

  useEffect(() => {
    async function loadRepositoryData() {
      try {
        setLoading(true);

        // Fetch all repositories to find the one with matching ID
        const repos = await fetchUserRepositories();
        const repo = repos.find((r: any) => r.id.toString() === repoId);

        if (!repo) {
          toast({
            title: "Repository not found",
            description: "The repository you're looking for doesn't exist or you don't have access to it.",
            variant: "destructive"
          });
          router.push("/dashboard");
          return;
        }

        setRepository(repo);

        // Fetch pull requests for this repository
        const prs = await fetchRepositoryPullRequests(repo.name);
        setPullRequests(prs);

        // Load repository settings from localStorage
        const repoSettings = getRepoSettings(repoId);
        setSettings(repoSettings);
      } catch (error) {
        console.error("Error loading repository data:", error);
        toast({
          title: "Error loading repository data",
          description: "There was a problem loading the repository data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    loadRepositoryData();
  }, [session, repoId, router, toast]);

  // Update the handleManualReview function to include the API keys
  const handleManualReview = async (prNumber: number) => {
    if (!repository) return;

    try {
      setReviewInProgress(prNumber);

      toast({
        title: "Generating review",
        description: `GitMate is analyzing the pull request using ${settings.aiProvider === "gemini" ? "Google Gemini" : "OpenAI"}...`
      });

      // Get the GitHub token
      const githubToken = getGitHubToken();
      if (!githubToken) {
        throw new Error("GitHub token not found. Please add your token in Profile Settings.");
      }

      // Get the API keys
      const openaiKey = getOpenAIKey();
      const googleApiKey = getGoogleKey();

      // Set a client-side timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 second timeout

      try {
        // Call the API to trigger a manual review
        const response = await fetch("/api/reviews/manual", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            repositoryName: repository.name,
            pullRequestNumber: prNumber,
            tone: settings.reviewTone,
            provider: settings.aiProvider,
            githubToken: githubToken, // Pass the token to the API
            openaiKey: openaiKey, // Pass the OpenAI key
            googleApiKey: googleApiKey // Pass the Google key
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId); // Clear the timeout if the request completes

        // Check if the response is OK before trying to parse JSON
        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Server error: ${response.status}`);
          } else {
            // Handle non-JSON error responses
            const errorText = await response.text();
            console.error("Non-JSON error response:", errorText);
            throw new Error(`Server error: ${response.status}`);
          }
        }

        const data = await response.json();

        toast({
          title: "Review completed",
          description: "GitMate has analyzed the pull request and posted a review comment."
        });

        // Open the PR in a new tab
        const pr = pullRequests.find(pr => pr.number === prNumber);
        if (pr) {
          window.open(pr.url, "_blank");
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          throw new Error("Review request timed out after 90 seconds. The server might still be processing your review.");
        }
        throw error;
      }
    } catch (error: any) {
      console.error("Error triggering manual review:", error);
      toast({
        title: "Review failed",
        description: `There was a problem generating the review: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setReviewInProgress(null);
    }
  };

  const handleSaveSettings = () => {
    try {
      // Save settings to localStorage
      saveRepoSettings(repoId, settings);

      toast({
        title: "Settings saved",
        description: "Your repository settings have been updated successfully."
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  if (loading) {
    return (
      <div className='flex min-h-screen flex-col'>
        <main className='flex-1 py-6 px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-center items-center h-full'>
            <Loader2Icon className='h-8 w-8 animate-spin text-muted-foreground' />
          </div>
        </main>
      </div>
    );
  }

  if (!repository) {
    return (
      <div className='flex min-h-screen flex-col'>
        <main className='flex-1 py-6 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='text-2xl font-bold mb-4'>Repository not found</h1>
            <p className='text-muted-foreground mb-6'>The repository you're looking for doesn't exist or you don't have access to it.</p>
            <Button asChild>
              <Link href='/dashboard'>
                <ArrowLeftIcon className='mr-2 h-4 w-4' />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
            <div className='flex items-center gap-2'>
              <GitHubLogoIcon className='h-5 w-5' />
              <h1 className='text-2xl font-bold tracking-tight'>{repository.name}</h1>
              {repository.private && (
                <Badge variant='outline' className='bg-yellow-50 text-yellow-700 border-yellow-200'>
                  Private
                </Badge>
              )}
            </div>
          </div>

          <div className='grid gap-6 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Repository Details</CardTitle>
                <CardDescription>{repository.description || "No description provided"}</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>Repository URL</span>
                  <a href={repository.url} target='_blank' rel='noopener noreferrer' className='text-primary hover:underline'>
                    View on GitHub
                  </a>
                </div>
                {repository.language && (
                  <div className='flex items-center justify-between'>
                    <span className='font-medium'>Primary Language</span>
                    <span>{repository.language}</span>
                  </div>
                )}
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>Stars</span>
                  <span>{repository.stars}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>GitMate Status</span>
                  <Switch checked={settings.enabled} onCheckedChange={checked => setSettings({...settings, enabled: checked})} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Review Settings</CardTitle>
                <CardDescription>Configure how GitMate reviews this repository</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-3'>
                  <Label>Review Tone</Label>
                  <RadioGroup value={settings.reviewTone} onValueChange={value => setSettings({...settings, reviewTone: value})} className='flex flex-col space-y-1'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='Constructive Critic' id='constructive' />
                      <Label htmlFor='constructive'>Constructive Critic</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='Friendly Mentor' id='friendly' />
                      <Label htmlFor='friendly'>Friendly Mentor</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='Enthusiastic Coach' id='enthusiastic' />
                      <Label htmlFor='enthusiastic'>Enthusiastic Coach</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className='space-y-3'>
                  <Label>AI Provider</Label>
                  <Select value={settings.aiProvider} onValueChange={value => setSettings({...settings, aiProvider: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select AI provider' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='gemini'>Google Gemini (Recommended)</SelectItem>
                      <SelectItem value='openai'>OpenAI</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className='text-xs text-muted-foreground'>{settings.aiProvider === "gemini" ? "Gemini offers a generous free tier and excellent code review capabilities." : "OpenAI may require a paid subscription for regular usage."}</p>
                </div>

                <Separator />

                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='auto-review'>Automatic PR reviews</Label>
                    <Switch id='auto-review' checked={settings.automaticReviews} onCheckedChange={checked => setSettings({...settings, automaticReviews: checked})} />
                  </div>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='command-enabled'>Command-based reviews</Label>
                    <Switch id='command-enabled' checked={settings.commandBasedReviews} onCheckedChange={checked => setSettings({...settings, commandBasedReviews: checked})} />
                  </div>
                </div>

                <Button className='w-full' onClick={handleSaveSettings}>
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue='pull-requests'>
            <TabsList>
              <TabsTrigger value='pull-requests'>Pull Requests</TabsTrigger>
              <TabsTrigger value='review-history'>Review History</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value='pull-requests' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Pull Requests</CardTitle>
                  <CardDescription>{pullRequests.length > 0 ? `${pullRequests.length} pull requests found in this repository` : "No pull requests found in this repository"}</CardDescription>
                </CardHeader>
                <CardContent>
                  {pullRequests.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-8 text-center'>
                      <GitPullRequestIcon className='mb-2 h-12 w-12 text-muted-foreground' />
                      <h3 className='mb-1 text-lg font-medium'>No pull requests</h3>
                      <p className='text-sm text-muted-foreground'>There are no pull requests in this repository yet.</p>
                    </div>
                  ) : (
                    <div className='space-y-4'>
                      {pullRequests.map(pr => (
                        <div key={pr.id} className='flex items-start space-x-4 rounded-lg border p-4'>
                          <Avatar className='h-10 w-10'>
                            <AvatarImage src={pr.author.avatarUrl} alt={pr.author.login} />
                            <AvatarFallback>{pr.author.login.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className='flex-1 space-y-1'>
                            <a href={pr.url} target='_blank' rel='noopener noreferrer' className='text-base font-medium hover:underline'>
                              {pr.title}
                            </a>
                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                              <span>#{pr.number}</span>
                              <span>•</span>
                              <span>{pr.author.login}</span>
                              <span>•</span>
                              <span>Created: {formatDate(pr.createdAt)}</span>
                            </div>
                          </div>
                          <Badge variant={pr.state === "open" ? "outline" : pr.state === "closed" ? "secondary" : "default"}>
                            {pr.state === "open" && <AlertCircleIcon className='mr-1 h-3 w-3' />}
                            {pr.state === "closed" && <XCircleIcon className='mr-1 h-3 w-3' />}
                            {pr.state === "merged" && <CheckCircleIcon className='mr-1 h-3 w-3' />}
                            {pr.state.charAt(0).toUpperCase() + pr.state.slice(1)}
                          </Badge>
                          <Button variant='outline' size='sm' onClick={() => handleManualReview(pr.number)} disabled={reviewInProgress === pr.number}>
                            {reviewInProgress === pr.number ? (
                              <>
                                <Loader2Icon className='mr-1 h-3 w-3 animate-spin' />
                                Reviewing...
                              </>
                            ) : (
                              "Review"
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='review-history' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Review History</CardTitle>
                  <CardDescription>Past reviews performed by GitMate on this repository</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col items-center justify-center py-8 text-center'>
                    <GitPullRequestIcon className='mb-2 h-12 w-12 text-muted-foreground' />
                    <h3 className='mb-1 text-lg font-medium'>No review history</h3>
                    <p className='text-sm text-muted-foreground'>GitMate hasn't reviewed any pull requests in this repository yet.</p>
                    <Button
                      className='mt-4'
                      onClick={() => {
                        if (pullRequests.length > 0) {
                          handleManualReview(pullRequests[0].number);
                        } else {
                          toast({
                            title: "No pull requests",
                            description: "There are no pull requests to review in this repository.",
                            variant: "destructive"
                          });
                        }
                      }}
                    >
                      Review a Pull Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='analytics' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Repository Analytics</CardTitle>
                  <CardDescription>Code quality metrics and review statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                    <div className='rounded-lg border p-4'>
                      <div className='text-sm font-medium text-muted-foreground mb-2'>Total Reviews</div>
                      <div className='text-2xl font-bold'>0</div>
                    </div>
                    <div className='rounded-lg border p-4'>
                      <div className='text-sm font-medium text-muted-foreground mb-2'>Avg. Quality Score</div>
                      <div className='text-2xl font-bold'>N/A</div>
                    </div>
                    <div className='rounded-lg border p-4'>
                      <div className='text-sm font-medium text-muted-foreground mb-2'>Issues Found</div>
                      <div className='text-2xl font-bold'>0</div>
                    </div>
                    <div className='rounded-lg border p-4'>
                      <div className='text-sm font-medium text-muted-foreground mb-2'>Improvements Made</div>
                      <div className='text-2xl font-bold'>0</div>
                    </div>
                  </div>
                  <div className='mt-6 flex justify-center'>
                    <div className='text-center'>
                      <p className='text-muted-foreground mb-4'>Analytics will be available after GitMate has reviewed some pull requests.</p>
                      <Button
                        className='mt-2'
                        onClick={() => {
                          if (pullRequests.length > 0) {
                            handleManualReview(pullRequests[0].number);
                          } else {
                            toast({
                              title: "No pull requests",
                              description: "There are no pull requests to review in this repository.",
                              variant: "destructive"
                            });
                          }
                        }}
                      >
                        Generate First Review
                      </Button>
                    </div>
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
