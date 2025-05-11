import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Station {
  id: number;
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
  volume: number;
  setCurrentStation: (station: Station | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  toggleFavorite: (station: Station) => void;
  addToRecentlyPlayed: (station: Station) => void;
  setVolume: (volume: number) => void;
}

export const useRadioStore = create(
  persist<RadioState>(
    (set, get) => ({
      currentStation: null,
      isPlaying: false,
      favorites: [],
      recentlyPlayed: [],
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
          const filtered = state.recentlyPlayed.filter(
            (s) => s.id !== station.id
          );
          return {
            recentlyPlayed: [station, ...filtered].slice(0, 10),
          };
        }),
      setVolume: (volume) => set({ volume }),
    }),
    {
      name: "radio",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
