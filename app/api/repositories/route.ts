import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import {fetchUserRepositories} from "@/lib/github";
import {NextRequest} from "next/server";

// In-memory storage for repository data
const repositoryData = new Map<string, {enabled: boolean; reviews: {createdAt: Date}[]}>();

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = await getToken({req: request});
    if (!token) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    // Fetch repositories from GitHub
    const githubRepos = await fetchUserRepositories(token.accessToken as string);

    // Map GitHub repos to include database info
    const repositories = githubRepos.map((repo: any) => {
      const dbRepo = repositoryData.get(repo.id.toString());

      // Count reviews for this repository
      const reviewCount = dbRepo ? dbRepo.reviews.length : 0;

      // Get last review date if available
      let lastReview = "Never";
      if (dbRepo && dbRepo.reviews.length > 0) {
        const lastReviewDate = new Date(dbRepo.reviews[0].createdAt);
        const now = new Date();
        const diffMs = now.getTime() - lastReviewDate.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 60) {
          lastReview = `${diffMins}m ago`;
        } else if (diffHours < 24) {
          lastReview = `${diffHours}h ago`;
        } else if (diffDays < 7) {
          lastReview = `${diffDays}d ago`;
        } else {
          lastReview = lastReviewDate.toLocaleDateString();
        }
      }

      return {
        ...repo,
        enabled: dbRepo ? dbRepo.enabled : false,
        reviewCount,
        lastReview
      };
    });

    return NextResponse.json({repositories});
  } catch (error: any) {
    console.error("Error fetching repositories:", error);
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
