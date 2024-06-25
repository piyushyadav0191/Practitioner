import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Practitioner",
  description: "Practitioner is a platform for giving live Interviews using AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
        <Toaster />
          {children}</body>
      </html>
    </ClerkProvider>
  );
}
