import { View, FlatList, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import StationCard from "../../components/StationCard";
import Player from "../../components/Player";
import { Ionicons } from "@expo/vector-icons";
import { stations } from "@/services/stations";
import { useThemeStore } from "@/store/themeStore";

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#000000" : "#f2f2f7" },
      ]}
    >
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={isDark ? "#888888" : "#666666"}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
              color: isDark ? "#ffffff" : "#000000",
            },
          ]}
          placeholder="Search stations..."
          placeholderTextColor={isDark ? "#888888" : "#666666"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredStations}
        renderItem={({ item }) => <StationCard station={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <Player />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    position: "absolute",
    left: 28,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 40,
    fontSize: 16,
  },
  list: {
    paddingBottom: 100,
  },
});
