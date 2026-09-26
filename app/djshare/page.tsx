import type { Metadata } from "next";
import { LegacyAppFrame } from "@/components/legacy-app-frame";

export const metadata: Metadata = {
  title: "DJ Share · Dhruv Gupta",
  description: "Build collaborative playlists and DJ with your friends.",
};

export default function DjSharePage() {
  return <LegacyAppFrame src="/legacy-djshare/index.html" title="DJ Share" />;
}
