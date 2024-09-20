"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useFlowStore } from "@/lib/store";
import FlowDashboard from "@/app/apps/flow/components/flow-dashboard";

export default function FlowPage() {
  const { setCurrentProfile, setStreams } = useFlowStore();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch current profile
        const profileResponse = await fetch("/api/profiles");
        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile");
        }
        const profile = await profileResponse.json();
        setCurrentProfile(profile);

        // Fetch streams
        const streamsResponse = await fetch("/api/streams");
        if (!streamsResponse.ok) {
          throw new Error("Failed to fetch streams");
        }
        const streams = await streamsResponse.json();
        setStreams(streams);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchInitialData();
  }, [setCurrentProfile, setStreams]);

  return <FlowDashboard />;
}
