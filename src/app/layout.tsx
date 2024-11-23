import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { inter } from "@/fonts/fonts";

export const metadata: Metadata = {
  title: "MQ-AR",
  description: "Gerenciamento de sensores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${inter.className} antialiased flex ml-20 max-md:ml-0 mt-10`}//${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {children}
          <Toaster />
      </body>
    </html>
  );
}
