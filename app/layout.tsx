import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhruv Gupta",
  description: "Dhruv Gupta is the CEO and Co-Founder of Drumkit.",
  icons: { icon: "/media/dhruv-tie.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
