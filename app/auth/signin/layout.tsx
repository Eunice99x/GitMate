import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Sign In - GitMate",
  description: "Sign in to your GitMate account"
};

export default function SignInLayout({children}: {children: React.ReactNode}) {
  return children;
}
