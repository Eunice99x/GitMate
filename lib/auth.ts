// import type {NextAuthOptions} from "next-auth";
// import GithubProvider from "next-auth/providers/github";

// // For development, use a default key. In production, this should be set by the user.
// const DEFAULT_ENCRYPTION_KEY = "development-key-32-chars-long!!";

// interface Token {
//   accessToken?: string;
//   userId?: string;
//   name?: string;
//   email?: string;
//   image?: string;
// }

// interface Session {
//   user: {
//     id?: string;
//     name?: string;
//     email?: string;
//     image?: string;
//     accessToken?: string;
//   };
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GithubProvider({
//       clientId: "your-github-client-id", // Replace with your GitHub OAuth app credentials
//       clientSecret: "your-github-client-secret",
//       authorization: {
//         params: {
//           scope: "read:user user:email repo"
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({token, account, user}: {token: Token; account: any; user: any}) {
//       if (account && user) {
//         return {
//           ...token,
//           accessToken: account.access_token,
//           userId: user.id,
//           name: user.name,
//           email: user.email,
//           image: user.image
//         };
//       }
//       return token;
//     },
//     async session({session, token}: {session: Session; token: Token}) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.userId,
//           accessToken: token.accessToken
//         }
//       };
//     }
//   },
//   pages: {
//     signIn: "/auth/signin",
//     error: "/auth/error"
//   },
//   debug: process.env.NODE_ENV === "development"
// };
