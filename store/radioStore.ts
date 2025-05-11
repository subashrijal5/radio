import { create } from 'zustand';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

export interface Station {
  id: string;
  name: string;
  url: string;
  logo: string;
  genre: string[];
  country: string;
  language: string;
}

interface RadioState {
  currentStation: Station | null;
  isPlaying: boolean;
  favorites: Station[];
  recentlyPlayed: Station[];
  sound: Audio.Sound | null;
  volume: number;
  setCurrentStation: (station: Station | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  toggleFavorite: (station: Station) => void;
  addToRecentlyPlayed: (station: Station) => void;
  playStation: (station: Station) => Promise<void>;
  stopPlayback: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
}

export const useRadioStore = create<RadioState>((set, get) => ({
  currentStation: null,
  isPlaying: false,
  favorites: [],
  recentlyPlayed: [],
  sound: null,
  volume: 1,
  setCurrentStation: (station) => set({ currentStation: station }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  toggleFavorite: (station) =>
    set((state) => {
      const isFavorite = state.favorites.some((s) => s.id === station.id);
      return {
        favorites: isFavorite
          ? state.favorites.filter((s) => s.id !== station.id)
          : [...state.favorites, station],
      };
    }),
  addToRecentlyPlayed: (station) =>
    set((state) => {
      const filtered = state.recentlyPlayed.filter((s) => s.id !== station.id);
      return {
        recentlyPlayed: [station, ...filtered].slice(0, 20),
      };
    }),
  playStation: async (station) => {
    const state = get();
    try {
      if (state.sound) {
        await state.sound.unloadAsync();
      }

      // Configure audio mode before creating the sound object
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        // Ensure web compatibility
        ...(Platform.OS === 'web' ? {
          interruptionModeWeb: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        } : {}),
      });

      // Create and load the audio
      const { sound } = await Audio.Sound.createAsync(
        { uri: station.url },
        { 
          shouldPlay: true,
          volume: state.volume,
          // Additional options for better web compatibility
          progressUpdateIntervalMillis: 1000,
          positionMillis: 0,
          ...(Platform.OS === 'web' ? {
            html5: true,
          } : {}),
        },
        (status) => {
          // Handle playback status updates
          if (status.isLoaded) {
            set({ isPlaying: status.isPlaying });
          } else if (status.error) {
            console.error('Error during playback:', status.error);
          }
        }
      );

      set({ sound, currentStation: station, isPlaying: true });
      get().addToRecentlyPlayed(station);
    } catch (error) {
      console.error('Error playing station:', error);
      // Reset state on error
      set({ sound: null, isPlaying: false });
      throw error;
    }
  },
  stopPlayback: async () => {
    const state = get();
    try {
      if (state.sound) {
        await state.sound.stopAsync();
        await state.sound.unloadAsync();
        set({ sound: null, isPlaying: false });
      }
    } catch (error) {
      console.error('Error stopping playback:', error);
      // Reset state on error
      set({ sound: null, isPlaying: false });
    }
  },
  setVolume: async (volume) => {
    const state = get();
    try {
      if (state.sound) {
        await state.sound.setVolumeAsync(volume);
      }
      set({ volume });
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  },
}));