import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { StoreProviders } from "./Redux/provider";
import ThemeProvider from "@/components/Theme/ThemeProvider";
import { CssBaseline } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Track your daily habits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* UserProvider: Manages authentication state and user-related data throughout the application */}
        <UserProvider>
          {/* Providers: A custom provider component (likely for Redux, Context, or other global states) */}
          <StoreProviders>
            {/* ThemeProvider: MUI's theme provider to apply a consistent theme across the app */}
            <ThemeProvider>
              {/* CssBaseline: MUI component that normalizes CSS across different browsers for consistent styling */}
              <CssBaseline />
              {children}
            </ThemeProvider>
          </StoreProviders>
        </UserProvider>
      </body>
    </html>
  );
}
