import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammad Salman Khan | Full Stack Developer",
  description: "Full Stack Developer with 5+ years of experience specializing in Next.js, Node.js, Express, PHP, TypeScript, and high-performance database design.",
  keywords: ["Mohammad Salman Khan", "Full Stack Developer", "Next.js", "Node.js", "Express", "TypeScript", "Prisma", "Database Optimization", "Software Engineer"],
  authors: [{ name: "Mohammad Salman Khan" }],
  creator: "Mohammad Salman Khan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-[#fafafa] selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
