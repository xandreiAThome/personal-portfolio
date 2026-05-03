import type React from "react";
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const _firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Cosmic Portfolio | Ellexandrei Esponilla",
  description:
    "Explore my projects and journey through the cosmos of web development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${_inter.variable} ${_firaCode.variable} font-sans antialiased overflow-x-hidden w-full`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
