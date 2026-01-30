import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { CRTEffect } from "@/components/ui/CRTEffect";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KitsuneExMachina",
  description: "A retro terminal experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} crt-screen crt-flicker`}>
        <CRTEffect />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
