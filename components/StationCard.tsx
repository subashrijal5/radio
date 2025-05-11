import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRadioStore, Station } from "../store/radioStore";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/themeStore";
import { useAudioPlayerStatus } from "expo-audio";
import { usePlayer } from "./player-context";

interface StationCardProps {
  station: Station;
}

export default function StationCard({ station }: StationCardProps) {
  const {
    currentStation,
    favorites,
    toggleFavorite,
    setCurrentStation,
    addToRecentlyPlayed,
  } = useRadioStore();
  const player = usePlayer();

  const stat = useAudioPlayerStatus(player!);

  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const isFavorite = favorites.some((s) => s.id === station.id);
  const isCurrentStation = currentStation?.id === station.id;

  const handlePlayPress = async () => {
    if (player!.playing && isCurrentStation) {
      setCurrentStation(null);
      player!.pause();
    } else {
      if (isCurrentStation) {
        player!.play();
      } else {
        addToRecentlyPlayed(station);
        setCurrentStation(station);
        player!.replace(station.url);
        player!.play();
      }
    }
  };

  return (
    <View
      style={[styles.card, { backgroundColor: isDark ? "#2a2a2a" : "#ffffff" }]}
    >
      <Image source={{ uri: station.logo }} style={styles.logo} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: isDark ? "#ffffff" : "#000000" }]}>
          {station.name}
        </Text>
        <Text style={[styles.genre, { color: isDark ? "#888888" : "#666666" }]}>
          {station.genre.join(", ")}
        </Text>
        <Text
          style={[styles.details, { color: isDark ? "#888888" : "#666666" }]}
        >
          {station.country} • {station.language}
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => toggleFavorite(station)}
          style={styles.button}
        >
          <Ionicons
            name="heart"
            size={24}
            color={isFavorite ? "#ff2d55" : isDark ? "#888888" : "#666666"}
            fill={isFavorite ? "#ff2d55" : "none"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPress} style={styles.button}>
          {player!.playing && currentStation?.id === station.id ? (
            <Ionicons name="pause" size={24} color="#007AFF" />
          ) : stat.isBuffering && currentStation?.id === station.id ? (
            <ActivityIndicator
              size="small"
              color={isDark ? "#ffffff" : "#000000"}
            />
          ) : (
            <Ionicons name="play" size={24} color="#007AFF" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  genre: {
    fontSize: 14,
    marginBottom: 2,
  },
  details: {
    fontSize: 12,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 8,
  },
  spinner: {},
});
