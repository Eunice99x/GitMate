"use client";

import {useParams, useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {fetchUserRepositories, fetchRepositoryPullRequests} from "@/lib/github";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Switch} from "@/components/ui/switch";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {GitlabIcon as GitHubLogoIcon, GitPullRequestIcon, ArrowLeftIcon, Loader2Icon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, SaveIcon, ExternalLinkIcon, RefreshCwIcon} from "lucide-react";
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
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

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

  // Function to refresh pull requests
  const handleRefreshPullRequests = async () => {
    if (!repository) return;

    try {
      setRefreshing(true);

      toast({
        title: "Refreshing pull requests",
        description: "Fetching latest pull requests from GitHub..."
      });

      // Fetch pull requests for this repository
      const prs = await fetchRepositoryPullRequests(repository.name);
      setPullRequests(prs);
      setLastUpdated(new Date());

      toast({
        title: "Pull requests refreshed",
        description: "Latest pull requests have been loaded."
      });
    } catch (error) {
      console.error("Error refreshing pull requests:", error);
      toast({
        title: "Error refreshing pull requests",
        description: "There was a problem fetching the latest pull requests. Please try again.",
        variant: "destructive"
      });
    } finally {
      setRefreshing(false);
    }
  };

  // Handle opening repository in GitHub
  const handleOpenInGitHub = () => {
    if (repository && repository.url) {
      window.open(repository.url, "_blank");
    }
  };

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

      console.log("Sending API keys:", {
        hasOpenAIKey: !!openaiKey,
        hasGoogleKey: !!googleApiKey,
        provider: settings.aiProvider
      });

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
            googleGenerativeAiApiKey: googleApiKey // Pass the Google key with the correct name
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
          <div className='flex items-center justify-between'>
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

            <Button variant='outline' onClick={handleOpenInGitHub}>
              <ExternalLinkIcon className='h-4 w-4 mr-2' />
              Open in GitHub
            </Button>
          </div>

          <div className='grid gap-6 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Repository Details</CardTitle>
                <CardDescription>{repository.description || "No description provided"}</CardDescription>
              </CardHeader>
              <CardContent className='pt-0'>
                <div className='grid gap-4 grid-cols-2'>
                  <div className='space-y-1'>
                    <span className='text-sm font-medium'>Stars</span>
                    <p className='text-lg'>{repository.stars}</p>
                  </div>
                  <div className='space-y-1'>
                    <span className='text-sm font-medium'>Language</span>
                    <p className='text-lg'>{repository.language || "Not specified"}</p>
                  </div>
                  <div className='space-y-1'>
                    <span className='text-sm font-medium'>Visibility</span>
                    <p className='text-lg'>{repository.private ? "Private" : "Public"}</p>
                  </div>
                  <div className='space-y-1'>
                    <span className='text-sm font-medium'>Pull Requests</span>
                    <p className='text-lg'>{pullRequests.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Review Settings</CardTitle>
                <CardDescription>Configure how GitMate reviews your code</CardDescription>
              </CardHeader>
              <CardContent className='pt-0 space-y-6'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='automatic-reviews' className='flex items-center gap-2'>
                      Automatic review on new PRs
                    </Label>
                    <Switch id='automatic-reviews' checked={settings.automaticReviews} onCheckedChange={checked => setSettings({...settings, automaticReviews: checked})} />
                  </div>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='command-based-reviews' className='flex items-center gap-2'>
                      Command-based reviews (/gitmate review)
                    </Label>
                    <Switch id='command-based-reviews' checked={settings.commandBasedReviews} onCheckedChange={checked => setSettings({...settings, commandBasedReviews: checked})} />
                  </div>
                </div>

                <Separator />

                <div className='space-y-3'>
                  <Label>Review Tone</Label>
                  <RadioGroup defaultValue={settings.reviewTone} value={settings.reviewTone} onValueChange={value => setSettings({...settings, reviewTone: value})}>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='Constructive Critic' id='tone-critic' />
                      <Label htmlFor='tone-critic'>Constructive Critic</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='Friendly Mentor' id='tone-mentor' />
                      <Label htmlFor='tone-mentor'>Friendly Mentor</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='Enthusiastic Coach' id='tone-coach' />
                      <Label htmlFor='tone-coach'>Enthusiastic Coach</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className='space-y-3'>
                  <Label>AI Provider</Label>
                  <RadioGroup defaultValue={settings.aiProvider} value={settings.aiProvider} onValueChange={value => setSettings({...settings, aiProvider: value as "openai" | "gemini"})}>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='openai' id='provider-openai' />
                      <Label htmlFor='provider-openai'>OpenAI</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='gemini' id='provider-gemini' />
                      <Label htmlFor='provider-gemini'>Google Gemini (Recommended)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className='ml-auto'>
                  <SaveIcon className='h-4 w-4 mr-2' />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue='pull-requests'>
            <TabsList>
              <TabsTrigger value='pull-requests'>Pull Requests</TabsTrigger>
              <TabsTrigger value='review-history'>Review History</TabsTrigger>
            </TabsList>
            <TabsContent value='pull-requests' className='mt-6'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <div>
                    <CardTitle>Pull Requests</CardTitle>
                    <CardDescription>
                      Manage and review pull requests for this repository
                      <div className='text-xs text-muted-foreground mt-1'>Last updated: {lastUpdated.toLocaleTimeString()}</div>
                    </CardDescription>
                  </div>
                  <Button variant='outline' size='sm' onClick={handleRefreshPullRequests} disabled={refreshing}>
                    {refreshing ? (
                      <>
                        <Loader2Icon className='h-4 w-4 mr-2 animate-spin' />
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <RefreshCwIcon className='h-4 w-4 mr-2' />
                        Refresh
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  {pullRequests.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-8'>
                      <GitPullRequestIcon className='h-16 w-16 text-muted-foreground mb-4' />
                      <h3 className='text-lg font-medium'>No pull requests found</h3>
                      <p className='text-muted-foreground text-center mt-2 mb-6'>There are no open pull requests for this repository. Create a pull request to get started.</p>
                      <Button variant='outline' asChild>
                        <a href={`${repository.url}/compare`} target='_blank' rel='noopener noreferrer'>
                          Create Pull Request
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <div className='space-y-4'>
                      {pullRequests.map(pr => (
                        <div key={pr.id} className='flex items-start space-x-4 rounded-lg border p-4'>
                          <div className='flex-1 space-y-2'>
                            <div className='flex items-center gap-2'>
                              {pr.state === "open" ? <GitPullRequestIcon className='h-4 w-4 text-green-500' /> : <GitPullRequestIcon className='h-4 w-4 text-purple-500' />}
                              <a href={pr.url} target='_blank' rel='noopener noreferrer' className='font-medium hover:underline'>
                                #{pr.number} {pr.title}
                              </a>
                              <Badge variant={pr.state === "open" ? "default" : "secondary"}>{pr.state}</Badge>
                            </div>
                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                              <Avatar className='h-4 w-4'>
                                <AvatarImage src={pr.author.avatarUrl} alt={pr.author.login} />
                                <AvatarFallback>{pr.author.login.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span>{pr.author.login}</span>
                              <span>•</span>
                              <span>Created: {formatDate(pr.createdAt)}</span>
                              <span>•</span>
                              <span>Last updated: {formatDate(pr.updatedAt)}</span>
                            </div>
                          </div>
                          <Button variant='outline' size='sm' onClick={() => handleManualReview(pr.number)} disabled={reviewInProgress === pr.number || pr.state !== "open"}>
                            {reviewInProgress === pr.number ? (
                              <>
                                <Loader2Icon className='mr-1 h-3 w-3 animate-spin' />
                                Reviewing...
                              </>
                            ) : pr.state !== "open" ? (
                              "Closed"
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
                  <div className='flex flex-col items-center justify-center py-8'>
                    <AlertCircleIcon className='h-16 w-16 text-muted-foreground mb-4' />
                    <h3 className='text-lg font-medium'>No review history yet</h3>
                    <p className='text-muted-foreground text-center mt-2 mb-6'>Once you've performed reviews on pull requests, they will appear here.</p>
                    <Button
                      variant='outline'
                      onClick={() => {
                        const tabElement = document.querySelector('[data-value="pull-requests"]');
                        if (tabElement instanceof HTMLElement) {
                          tabElement.click();
                        }
                      }}
                    >
                      Go to Pull Requests
                    </Button>
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
