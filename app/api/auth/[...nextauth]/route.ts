import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import {GITHUB_ID, GITHUB_SECRET} from "@/lib/env";

if (!GITHUB_ID || !GITHUB_SECRET) {
  console.error("Missing GitHub OAuth credentials. Please set GITHUB_ID and GITHUB_SECRET environment variables.");
  throw new Error("Missing GitHub OAuth credentials. Please set GITHUB_ID and GITHUB_SECRET environment variables.");
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email repo"
        }
      }
    })
  ],
  callbacks: {
    async jwt({token, account}) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        console.log("Setting access token in JWT:", account.access_token?.substring(0, 5) + "...");
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({session, token}) {
      // Send properties to the client, like an access_token from a provider
      session.accessToken = token.accessToken;
      console.log("Setting access token in session:", token.accessToken ? (token.accessToken as string).substring(0, 5) + "..." : "none");
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin"
  },
  debug: process.env.NODE_ENV === "development"
});

export {handler as GET, handler as POST};
