import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { inter, roboto } from "@/fonts/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased flex ml-20`}//${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <SideBar/> */}
        {/* <main className="min-h-screen bg-white flex flex-col p-14 flex-1"> */}
          {children}
          <Toaster />
        {/* </main> */}
      </body>
    </html>
  );
}
