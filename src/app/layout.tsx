import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InQool | Assignment",
  description: "A simple Next.js application created as solution to interview assignment at InQool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased dark`}>
        <nav className="flex flex-1 justify-center items-center h-12 gap-x-4">
          <a className="h-fit px-3 py-1.5 border-b border-white/35 hover:border-white/70 active:border-emerald-400 active:text-emerald-400" href="/users">
            users
          </a>
          <a className="h-fit px-3 py-1.5 border-b border-white/35 hover:border-white/70 active:border-emerald-400 active:text-emerald-400" href="/animals">
            animals
          </a>
        </nav>
        <Providers>{children}</Providers>
        <footer className="row-start-3 flex flex-wrap items-center justify-center h-12">
          <p>
            Created by&nbsp;
            <a className="text-emerald-500 hover:text-emerald-400" href="https://marekus.eu">
              Marek Fodor
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
