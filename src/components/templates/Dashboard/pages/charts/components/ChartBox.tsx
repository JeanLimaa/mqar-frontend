"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface ChartBoxProps{
    children: React.ReactNode;
    title: string;
    description: string;
    footerText: string;
}
  
export function ChartBox({ children, title, description, footerText }: ChartBoxProps) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            {footerText} <TrendingUp className="h-4 w-4" />
          </div>
{/*           <div className="leading-none text-muted-foreground">
            {footerSubText}
          </div> */}
        </CardFooter>
      </Card>
    );
  }