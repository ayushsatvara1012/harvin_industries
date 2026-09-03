import type { Metadata } from "next";
import { Inter, Forum } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const forum = Forum({
  variable: "--font-forum",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Harvin Industries — Brick & Block Making Machines",
  description:
    "ISO 9001:2015 certified manufacturer of Fly Ash Brick, Concrete Brick, and Paver Block making machines in Ahmedabad. Built for performance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${forum.variable} h-full antialiased`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- icon font, not a page font; root layout is the correct place for a site-wide stylesheet link */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300..500,0..1,-25..0&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
