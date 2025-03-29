// Enhanced GitHub API client functions

export async function fetchUserRepositories(accessToken: string) {
  try {
    const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=100", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json"
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const repos = await response.json();
    return repos.map((repo: any) => ({
      id: repo.id,
      name: repo.full_name,
      description: repo.description || "",
      url: repo.html_url,
      private: repo.private,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updatedAt: repo.updated_at
    }));
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
}

export async function fetchRepositoryPullRequests(repoFullName: string, accessToken: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${repoFullName}/pulls?state=all&per_page=10`, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json"
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const prs = await response.json();
    return prs.map((pr: any) => ({
      id: pr.id,
      number: pr.number,
      title: pr.title,
      state: pr.state,
      createdAt: pr.created_at,
      updatedAt: pr.updated_at,
      author: {
        login: pr.user.login,
        avatarUrl: pr.user.avatar_url
      },
      url: pr.html_url
    }));
  } catch (error) {
    console.error("Error fetching pull requests:", error);
    throw error;
  }
}

export async function fetchPullRequestDiff(repoFullName: string, prNumber: number, accessToken: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${prNumber}`, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json"
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const pr = await response.json();

    // Fetch the actual diff content
    const diffResponse = await fetch(pr.diff_url, {
      headers: {
        Authorization: `token ${accessToken}`
      }
    });

    if (!diffResponse.ok) {
      throw new Error(`GitHub API error: ${diffResponse.statusText}`);
    }

    return await diffResponse.text();
  } catch (error) {
    console.error("Error fetching pull request diff:", error);
    throw error;
  }
}

export async function postReviewComment(repoFullName: string, prNumber: number, reviewText: string, accessToken: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${repoFullName}/issues/${prNumber}/comments`, {
      method: "POST",
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({body: reviewText})
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API error: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting review comment:", error);
    throw error;
  }
}

export async function toggleRepositoryStatus(repoId: number, enabled: boolean, accessToken: string) {
  // In a real implementation, this would update a database record or GitHub App installation settings
  // For now, we'll just return a mock success response
  return {success: true, repoId, enabled};
}

export async function installGitHubApp(repositoryId: number, accessToken: string) {
  // In a real implementation, this would redirect to GitHub's app installation flow
  // or make API calls to install the app on a specific repository
  console.log(`Installing GitHub app on repository ${repositoryId}`);

  // For now, we'll just return a mock success response
  return {success: true, repositoryId};
}
