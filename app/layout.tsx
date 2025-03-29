import type React from "react";
import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/toaster";
import {AuthProvider} from "@/components/auth-provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "GitMate - AI-Powered Code Reviews",
  description: "Improve your code quality with AI-powered code reviews"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
