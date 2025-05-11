import { useCallback } from "react";
import { Audio } from "expo-av";
import { Platform } from "react-native";

export interface AudioHookState {
  isPlaying: boolean;
  volume: number;
}

// Singleton audio instance to prevent multiple playback
let globalSoundInstance: Audio.Sound | null = null;

export const useAudio = () => {
  const initializeAudio = useCallback(async () => {
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
    });
  }, []);

  const playAudio = useCallback(
    async (url: string, volume: number): Promise<AudioHookState> => {
      try {
        if (globalSoundInstance) {
          await globalSoundInstance.unloadAsync();
          globalSoundInstance = null;
        }

        await initializeAudio();

        const { sound } = await Audio.Sound.createAsync(
          { uri: url },
          {
            shouldPlay: true,
            volume,
            progressUpdateIntervalMillis: 1000,
            positionMillis: 0,
            ...(Platform.OS === "web" ? { html5: true } : {}),
          }
        );

        globalSoundInstance = sound;
        return { isPlaying: true, volume };
      } catch (error) {
        console.error("Error playing audio:", error);
        return { isPlaying: false, volume };
      }
    },
    []
  );

  const stopAudio = useCallback(async (): Promise<AudioHookState> => {
    try {
      if (globalSoundInstance) {
        await globalSoundInstance.stopAsync();
        await globalSoundInstance.unloadAsync();
        globalSoundInstance = null;
      }
      return { isPlaying: false, volume: 0 };
    } catch (error) {
      console.error("Error stopping audio:", error);
      return { isPlaying: false, volume: 0 };
    }
  }, []);

  const setAudioVolume = useCallback(
    async (volume: number): Promise<AudioHookState> => {
      try {
        if (globalSoundInstance) {
          await globalSoundInstance.setVolumeAsync(volume);
          return { isPlaying: true, volume };
        }
        return { isPlaying: false, volume };
      } catch (error) {
        console.error("Error setting volume:", error);
        return { isPlaying: false, volume };
      }
    },
    []
  );

  return {
    playAudio,
    stopAudio,
    setAudioVolume,
  };
};
