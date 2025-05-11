import { AudioPlayer, useAudioPlayer } from "expo-audio";
import React from "react";


const playerContext = React.createContext<AudioPlayer | null>(null);

export const PlayerProvider = playerContext.Provider;

export const usePlayer = () => React.useContext(playerContext);

export const PlayerContext = playerContext;

