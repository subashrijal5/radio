"use client";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PlayerProvider } from "@/components/player-context";
import { useAudioPlayer } from "expo-audio";

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  useEffect(() => {
    window.frameworkReady?.();
  }, []);
  const player = useAudioPlayer("https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3");

  return (
    <>
    <PlayerProvider value={player}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ presentation: "modal" }} />
      </Stack>
      <StatusBar style="auto" />
    </PlayerProvider>
    </>
  );
}
