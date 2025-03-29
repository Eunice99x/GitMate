// Enhanced GitHub API client functions with better error handling and logging

export async function fetchUserRepositories(accessToken: string) {
  try {
    console.log("Fetching user repositories...");

    const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=100", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("GitHub API error response:", errorData);
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const repos = await response.json();
    console.log(`Fetched ${repos.length} repositories`);

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
    console.log(`Fetching pull requests for ${repoFullName}...`);

    const response = await fetch(`https://api.github.com/repos/${repoFullName}/pulls?state=all&per_page=10`, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("GitHub API error response:", errorData);
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const prs = await response.json();
    console.log(`Fetched ${prs.length} pull requests for ${repoFullName}`);

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
    console.error(`Error fetching pull requests for ${repoFullName}:`, error);
    throw error;
  }
}

// Add timeout to the GitHub API calls
export async function fetchPullRequestDiff(repoFullName: string, prNumber: number, accessToken: string) {
  try {
    console.log(`Fetching diff for ${repoFullName} PR #${prNumber}...`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(`https://api.github.com/repos/${repoFullName}/pulls/${prNumber}`, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json"
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("GitHub API error response:", errorData);
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const pr = await response.json();
    console.log(`Successfully fetched PR data for ${repoFullName} PR #${prNumber}`);

    // Fetch the actual diff content
    const diffController = new AbortController();
    const diffTimeoutId = setTimeout(() => diffController.abort(), 30000); // 30 second timeout

    console.log(`Fetching diff content from ${pr.diff_url}...`);
    const diffResponse = await fetch(pr.diff_url, {
      headers: {
        Authorization: `token ${accessToken}`
      },
      signal: diffController.signal
    });

    clearTimeout(diffTimeoutId);

    if (!diffResponse.ok) {
      throw new Error(`GitHub API error: ${diffResponse.status} ${diffResponse.statusText}`);
    }

    const diffText = await diffResponse.text();
    console.log(`Successfully fetched diff content (${diffText.length} bytes)`);

    return diffText;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("GitHub API request timed out after 30 seconds");
    }
    console.error("Error fetching pull request diff:", error);
    throw error;
  }
}

export async function postReviewComment(repoFullName: string, prNumber: number, reviewText: string, accessToken: string) {
  try {
    console.log(`Posting review comment to ${repoFullName} PR #${prNumber}...`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(`https://api.github.com/repos/${repoFullName}/issues/${prNumber}/comments`, {
      method: "POST",
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({body: reviewText}),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("GitHub API error response:", errorData);
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`Successfully posted review comment to ${repoFullName} PR #${prNumber}`);

    return result;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("GitHub API request timed out after 30 seconds");
    }
    console.error("Error posting review comment:", error);
    throw error;
  }
}

export async function toggleRepositoryStatus(repoId: number, enabled: boolean, accessToken: string) {
  // In a real implementation, this would update a database record or GitHub App installation settings
  console.log(`Toggling repository ${repoId} status to ${enabled ? "enabled" : "disabled"}`);

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
