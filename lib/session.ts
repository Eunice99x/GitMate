// lib/session.ts

export async function getGitHubToken(): Promise<string | null> {
  // This is a client-side function, so it should not be called on the server.
  if (typeof window === "undefined") {
    return null;
  }

  // Retrieve the token from localStorage.
  const token = localStorage.getItem("githubToken");
  return token;
}
