import type { Metadata } from "next";
import SideBar from "@/components/templates/Sidebar/index";

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
    <>
        <SideBar/>
        {children}
    </>
  );
}
