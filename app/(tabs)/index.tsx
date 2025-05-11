import { View, FlatList, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { useColorScheme } from "react-native";
import StationCard from "../../components/StationCard";
import Player from "../../components/Player";
import { Ionicons } from "@expo/vector-icons";


const mockStations = [
  {
    id: "1",
    name: "Radio Nepal",
    url: "https://stream1.radionepal.gov.np/live/",
    logo: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    genre: ["News", "Culture"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "2",
    name: "Kalika FM",
    url: "http://kalika-stream.softnep.com:7740/;",
    logo: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    genre: ["News", "Culture"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "3",
    name: "Kantipur FM",
    url: "https://radio-broadcast.ekantipur.com/stream/",
    logo: "https://cdn.onlineradiobox.com/img/l/9/30009.v9.png",
    genre: ["News", "Entertainment"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "4",
    name: "Ujyalo 90 Network",
    url: "https://stream.zeno.fm/h527zwd11uquv",
    logo: "https://images.pexels.com/photos/4090902/pexels-photo-4090902.jpeg",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },

  {
    id: "5",
    name: "Hits FM",
    url: "https://usa15.fastcast4u.com/proxy/hitsfm912?mp=/1",
    logo: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg",
    genre: ["Music", "Entertainment"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "6",
    name: "Classic FM",
    url: "https://stream.hamropatro.com/8783",
    logo: "https://images.pexels.com/photos/4571219/pexels-photo-4571219.jpeg",
    genre: ["Classical", "Cultural"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "7",
    name: "Capital FM",
    url: "https://streaming.softnep.net:10982/;stream.nsv&type:mp3&volume:10",
    logo: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg",
    genre: ["Pop", "Contemporary"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "8",
    name: "Radio Annapurna Nepal",
    url: "https://shoutcast.prixa.live/annapurna",
    logo: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "9",
    name: "BFBS Gurkha Radio",
    url: "https://listen-ssvcbfbs.sharp-stream.com/ssvcbfbs3.aac",
    logo: "https://images.pexels.com/photos/4090902/pexels-photo-4090902.jpeg",
    genre: ["Community", "Culture"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "10",
    name: "Radio Tufan",
    url: "https://stream.zeno.fm/60tx8fw9dd0uv",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },

  {
    id: "11",
    name: "Radio Prakriti",
    url: "https://live.itech.host:8939/stream",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "12",
    name: "Radio Nepalbani",
    url: "https://live.itech.host:8681/stream",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "13",
    name: "Galyang FM",
    url: "https://stream.zeno.fm/60tx8fw9dd0uv",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "14",
    name: "Radio Audio",
    url: "https://stream.zeno.fm/fvrx47wpg0quv",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "15",
    name: "Synergy FM",
    url: "https://live.itech.host:3880/stream",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "16",
    name: "Krishnasar FM",
    url: "https://live.itech.host:8434/stream",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "17",
    name: "Pathibhara FM",
    url: "https://live.itech.host:8749/stream",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "18",
    name: "Times FM",
    url: "https://astream.nepalipatro.com.np:8119/index.html",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "19",
    name: "Classic FM",
    url: "https://stream.hamropatro.com/8783",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "20",
    name: "Radio Rudraksha",
    url: "https://streaming.softnep.net:10874/;stream.nsv&type:mp3",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "21",
    name: "Radio Resunga",
    url: "https://live.itech.host:3260/stream",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "22",
    name: "Good News FM",
    url: "https://live.itech.host:8167/stream?1611505122592",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "23",
    name: "Sky FM 106.6",
    url: "https://onlineradio.websoftitnepal.com/8002/stream",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "24",
    name: "Barahathawa FM 101.1Mhz",
    url: "https://stream.zeno.fm/gubb557z4k8uv",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "25",
    name: "Radio Amargadhi",
    url: "https://live.itech.host:8927/stream",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "26",
    name: "Capital FM",
    url: "https://streaming.softnep.net:10982/;stream.nsv&type:mp3&volume:10",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "27",
    name: "Radio Bhorukawa",
    url: "https://live.itech.host:8379/stream",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
  {
    id: "28",
    name: "Radio Audio",
    url: "https://stream.zeno.fm/fvrx47wpg0quv",
    logo: "https://via.placeholder.com/150x50?text=Logo",
    genre: ["News", "Information"],
    country: "Nepal",
    language: "Nepali",
  },
];

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const filteredStations = mockStations.filter((station) =>
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
        keyExtractor={(item) => item.id}
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
