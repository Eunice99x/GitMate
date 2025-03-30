import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import {NextRequest} from "next/server";

interface Repository {
  githubId: string;
  enabled: boolean;
  name: string;
  fullName: string;
  description: string;
  private: boolean;
}

// In-memory storage for repository data
const repositoryData = new Map<string, Repository>();

export async function POST(request: NextRequest, {params}: {params: {id: string}}) {
  try {
    // Verify authentication
    const token = await getToken({req: request});
    if (!token) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    // Get repository ID
    const repoId = params.id;
    if (!repoId) {
      return NextResponse.json({error: "Repository ID is required"}, {status: 400});
    }

    // Parse request body
    const body = await request.json();
    const {enabled} = body;

    if (typeof enabled !== "boolean") {
      return NextResponse.json({error: "Enabled status must be a boolean"}, {status: 400});
    }

    // Find repository in memory storage
    let repository = repositoryData.get(repoId);

    // If repository doesn't exist in storage yet, create it
    if (!repository) {
      // Fetch repository details from GitHub
      const response = await fetch(`https://api.github.com/repositories/${repoId}`, {
        headers: {
          Authorization: `token ${token.accessToken}`,
          Accept: "application/vnd.github.v3+json"
        }
      });

      if (!response.ok) {
        return NextResponse.json({error: `Failed to fetch repository details: ${response.status} ${response.statusText}`}, {status: 500});
      }

      const repoDetails = await response.json();

      // Create repository in memory storage
      repository = {
        githubId: repoId,
        name: repoDetails.name,
        fullName: repoDetails.full_name,
        description: repoDetails.description,
        private: repoDetails.private,
        enabled: enabled
      };
      repositoryData.set(repoId, repository);
    } else {
      // Update repository enabled status
      repository = {
        ...repository,
        enabled
      };
      repositoryData.set(repoId, repository);
    }

    return NextResponse.json({success: true, repository});
  } catch (error: any) {
    console.error(`Error toggling repository ${params.id}:`, error);
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
