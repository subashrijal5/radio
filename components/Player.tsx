import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRadioStore } from "../store/radioStore";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/themeStore";
import { usePlayer } from "./player-context";
import { useAudioPlayerStatus } from "expo-audio";

export default function Player() {
  const { currentStation, volume, setVolume } = useRadioStore();
  const player = usePlayer();
    const stat = useAudioPlayerStatus(player!);
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  if (!currentStation || !player) return null;
  const handlePlayPause = async () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDark ? "#2a2a2a" : "#ffffff",
      }}
    >
      <Image source={{ uri: currentStation.logo }} style={styles.logo} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: isDark ? "#ffffff" : "#000000" }]}>
          {currentStation.name}
        </Text>
        <Text style={[styles.genre, { color: isDark ? "#888888" : "#666666" }]}>
          {currentStation.genre[0]}
        </Text>
      </View>
      <View style={styles.controls}>
        <View style={styles.volumeControl}>
          <TouchableOpacity onPress={() => setVolume(volume === 0 ? 1 : 0)}>
            {volume === 0 ? (
              <Ionicons
                name="volume-mute"
                size={20}
                color={isDark ? "#ffffff" : "#000000"}
              />
            ) : (
              <Ionicons
                name="volume-high-outline"
                size={20}
                color={isDark ? "#ffffff" : "#000000"}
              />
            )}
          </TouchableOpacity>
          <Slider
            style={styles.slider}
            value={volume}
            onValueChange={async (value) => {
              // const state = await setAudioVolume(value);
              // setVolume(state.volume);
            }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor={isDark ? "#444444" : "#dddddd"}
            thumbTintColor="#007AFF"
          />
        </View>
        <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
          {stat.playing ? (
            <Ionicons name="pause" size={24} color="#007AFF" />
          ) : (
            <Ionicons name="play" size={24} color="#007AFF" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#333333",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  genre: {
    fontSize: 14,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  volumeControl: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  slider: {
    width: 100,
    marginLeft: 8,
  },
  playButton: {
    padding: 8,
  },
});
