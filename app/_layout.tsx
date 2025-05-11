"use client";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator, Platform } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { initializeTrackPlayer } from '@/services/trackPlayerService'; // Import the service

// Prevent auto-hiding the splash screen
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore error */
});

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  useEffect(() => {
    if (window.frameworkReady) {
      window.frameworkReady();
    }
  }, []);

  // // Handle UI rendering without waiting for TrackPlayer
  useEffect(() => {
    const prepareUI = async () => {
      try {
        // Small delay to ensure the UI manager is ready
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mark UI as ready and hide splash screen
        setAppIsReady(true);
        await SplashScreen.hideAsync();
        
        // Start TrackPlayer initialization in background WITHOUT awaiting it
        // This will happen independently from UI rendering
        initializeTrackPlayer();
        
      } catch (e) {
        console.warn("Error in UI preparation:", e);
        setAppIsReady(true);
        SplashScreen.hideAsync().catch(() => {/* ignore */});
      }
    };

    prepareUI();
  }, []);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ presentation: "modal" }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}