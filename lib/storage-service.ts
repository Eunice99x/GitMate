// Simple storage service using localStorage

// GitHub token
export function getGitHubToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("githubToken");
}

export function setGitHubToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("githubToken", token);
}

// AI Provider keys
export function getOpenAIKey(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("openaiKey");
}

export function setOpenAIKey(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("openaiKey", key);
}

export function getGoogleKey(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("googleApiKey");
}

export function setGoogleKey(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("googleApiKey", key);
}

// AI Provider preference
export function getPreferredAIProvider(): "openai" | "gemini" {
  if (typeof window === "undefined") return "gemini";

  const openaiKey = getOpenAIKey();
  const googleKey = getGoogleKey();

  // If only one key is available, use that provider
  if (openaiKey && !googleKey) return "openai";
  if (!openaiKey && googleKey) return "gemini";

  // If both are available, check user preference
  const preference = localStorage.getItem("preferredAIProvider");
  return preference === "openai" ? "openai" : "gemini";
}

export function setPreferredAIProvider(provider: "openai" | "gemini"): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("preferredAIProvider", provider);
}

// Repository settings
export interface RepoSettings {
  enabled: boolean;
  reviewTone: string;
  aiProvider: string;
  automaticReviews: boolean;
  commandBasedReviews: boolean;
}

export function getRepoSettings(repoId: string): RepoSettings {
  if (typeof window === "undefined") {
    return {
      enabled: true,
      reviewTone: "Constructive Critic",
      aiProvider: "gemini",
      automaticReviews: true,
      commandBasedReviews: true
    };
  }

  const settingsStr = localStorage.getItem(`repo-settings-${repoId}`);
  if (!settingsStr) {
    return {
      enabled: true,
      reviewTone: "Constructive Critic",
      aiProvider: "gemini",
      automaticReviews: true,
      commandBasedReviews: true
    };
  }

  return JSON.parse(settingsStr);
}

export function saveRepoSettings(repoId: string, settings: RepoSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`repo-settings-${repoId}`, JSON.stringify(settings));
}

// Custom review rules
export interface ReviewRule {
  id: string;
  name: string;
  description: string | null;
  ruleType: string;
  pattern: string;
  severity: string;
  enabled: boolean;
}

export function getReviewRules(repoId: string): ReviewRule[] {
  if (typeof window === "undefined") return [];

  const rulesStr = localStorage.getItem(`repo-rules-${repoId}`);
  return rulesStr ? JSON.parse(rulesStr) : [];
}

export function saveReviewRules(repoId: string, rules: ReviewRule[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`repo-rules-${repoId}`, JSON.stringify(rules));
}

// Review history
export interface Review {
  id: string;
  repoId: string;
  repoName: string;
  prNumber: number;
  prTitle: string;
  authorName: string;
  reviewContent: string;
  aiProvider: string;
  reviewTone: string;
  createdAt: string;
}

export function saveReview(review: Review): void {
  if (typeof window === "undefined") return;

  const reviews = getReviews();
  reviews.push(review);
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

export function getReviews(): Review[] {
  if (typeof window === "undefined") return [];

  const reviewsStr = localStorage.getItem("reviews");
  return reviewsStr ? JSON.parse(reviewsStr) : [];
}

export function getReviewsByRepo(repoId: string): Review[] {
  const reviews = getReviews();
  return reviews.filter(review => review.repoId === repoId);
}

// User roles
export type UserRole = "ADMIN" | "USER";
export type TeamRole = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

export interface TeamMember {
  userId: string;
  userName: string;
  userEmail?: string;
  userImage?: string;
  role: TeamRole;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
  repositories: string[]; // Array of repo IDs
}

export function getTeams(): Team[] {
  if (typeof window === "undefined") return [];

  const teamsStr = localStorage.getItem("teams");
  return teamsStr ? JSON.parse(teamsStr) : [];
}

export function saveTeams(teams: Team[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("teams", JSON.stringify(teams));
}

export function getTeamById(teamId: string): Team | null {
  const teams = getTeams();
  return teams.find(team => team.id === teamId) || null;
}

export function createTeam(name: string, description: string | undefined, creator: TeamMember): Team {
  const teams = getTeams();

  const newTeam: Team = {
    id: `team-${Date.now()}`,
    name,
    description,
    members: [
      {
        ...creator,
        role: "OWNER"
      }
    ],
    repositories: []
  };

  teams.push(newTeam);
  saveTeams(teams);

  return newTeam;
}

export function getUserTeams(userId: string): Team[] {
  const teams = getTeams();
  return teams.filter(team => team.members.some(member => member.userId === userId));
}

export function hasTeamPermission(userId: string, teamId: string, action: "view" | "edit" | "manage" | "delete"): boolean {
  const team = getTeamById(teamId);
  if (!team) return false;

  const member = team.members.find(m => m.userId === userId);
  if (!member) return false;

  switch (action) {
    case "view":
      // All members can view
      return true;
    case "edit":
      // MEMBER and above can edit
      return ["OWNER", "ADMIN", "MEMBER"].includes(member.role);
    case "manage":
      // ADMIN and OWNER can manage
      return ["OWNER", "ADMIN"].includes(member.role);
    case "delete":
      // Only OWNER can delete
      return member.role === "OWNER";
    default:
      return false;
  }
}
