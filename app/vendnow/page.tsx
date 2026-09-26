import type { Metadata } from "next";
import { LegacyAppFrame } from "@/components/legacy-app-frame";

export const metadata: Metadata = {
  title: "VendNow · Dhruv Gupta",
};

export default function VendNowPage() {
  return <LegacyAppFrame src="/legacy-vendnow/index.html" title="VendNow" />;
}
