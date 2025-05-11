// trackPlayerService.ts
import { Platform } from 'react-native';

// Singleton service for TrackPlayer initialization
class TrackPlayerService {
  private isInitialized = false;
  private isInitializing = false;
  private initPromise: Promise<void> | null = null;

  // Method to initialize TrackPlayer safely
  initialize(): Promise<void> {
    // If already initialized, return resolved promise
    if (this.isInitialized) {
      return Promise.resolve();
    }

    // If initialization is in progress, return the existing promise
    if (this.isInitializing && this.initPromise) {
      return this.initPromise;
    }

    // Start initialization
    this.isInitializing = true;
    
    this.initPromise = new Promise<void>((resolve) => {
      // Use setTimeout to defer initialization
      setTimeout(async () => {
        try {
          console.log("TrackPlayerService: Starting delayed initialization...");
          
          // Dynamically import TrackPlayer
          const { default: TrackPlayer } = await import('react-native-track-player');
          const { PlaybackService } = await import('@/services/trackplayer');
          const { getTracks } = await import('@/services/stations');
          
          console.log("TrackPlayerService: Registering playback service...");
          TrackPlayer.registerPlaybackService(() => PlaybackService);
          
          console.log("TrackPlayerService: Setting up player...");
          await TrackPlayer.setupPlayer({
            waitForBuffer: true,
            // Add any other options needed for your app
          });
          
          // Add another delay before adding tracks on Android
          if (Platform.OS === "android") {
            await new Promise(r => setTimeout(r, 1000));
          }
          
          console.log("TrackPlayerService: Adding tracks...");
          if(Platform.OS === 'ios') {
            await TrackPlayer.add(getTracks());
          }
          
          this.isInitialized = true;
          this.isInitializing = false;
          console.log("TrackPlayerService: Initialization complete!");
          resolve();
        } catch (error) {
          console.error("TrackPlayerService: Initialization failed:", error);
          this.isInitializing = false;
          this.initPromise = null;
          // We still resolve the promise so the app doesn't hang
          resolve();
        }
      }, Platform.OS === "android" ? 2000 : 1000); // Very conservative delay
    });
    
    return this.initPromise;
  }
  
  // You can add more methods here for controlling playback
}

// Export a singleton instance
export const trackPlayerService = new TrackPlayerService();

// Export a function to initialize TrackPlayer outside of React lifecycle
export function initializeTrackPlayer(): Promise<void> {
  return trackPlayerService.initialize();
}