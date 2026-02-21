import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memora Flashcards",
  description: "A beautiful, fast Anki alternative for students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0c] text-neutral-50 flex h-screen overflow-hidden selection:bg-indigo-500/30`}
      >
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto relative flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
