import NextAuth from "next-auth";
import type {AuthConfig} from "@auth/core";
import GithubProvider from "next-auth/providers/github";

declare module "@auth/core/types" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      githubId?: string;
      username?: string;
    };
  }
}

const config: AuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      authorization: {
        params: {
          scope: "read:user user:email repo"
        }
      }
    })
  ],
  callbacks: {
    async jwt({token, profile, account}) {
      if (profile) {
        token.githubId = profile.id;
        token.username = profile.login;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({session, token}) {
      if (session.user) {
        session.user.githubId = token.githubId as string;
        session.user.username = token.username as string;
      }
      return session;
    },
    async redirect({url, baseUrl}) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/settings`;
      }
      return url;
    }
  },
  pages: {
    signIn: "/auth/signin"
  },
  debug: process.env.NODE_ENV === "development"
};

const handler = NextAuth(config);

export {handler as GET, handler as POST};
