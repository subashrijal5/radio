import { View, FlatList, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { useColorScheme } from 'react-native';
import StationCard from '../../components/StationCard';
import Player from '../../components/Player';
import { Ionicons } from "@expo/vector-icons";

// Mock data with HLS streams that work on web
const mockStations = [
  {
    id: '1',
    name: 'Radio One',
    url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one',
    logo: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    genre: ['Pop', 'Rock'],
    country: 'United States',
    language: 'English',
  },
  {
    id: '2',
    name: 'Jazz FM',
    url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_radio_three',
    logo: 'https://images.pexels.com/photos/4090902/pexels-photo-4090902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    genre: ['Jazz', 'Blues'],
    country: 'United Kingdom',
    language: 'English',
  },
  {
    id: '3',
    name: 'Classical Radio',
    url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_radio_three',
    logo: 'https://images.pexels.com/photos/462510/pexels-photo-462510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    genre: ['Classical'],
    country: 'Germany',
    language: 'German',
  },
];

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const filteredStations = mockStations.filter((station) =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#f2f2f7' }]}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={isDark ? '#888888' : '#666666'}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: isDark ? '#1c1c1e' : '#ffffff',
              color: isDark ? '#ffffff' : '#000000',
            },
          ]}
          placeholder="Search stations..."
          placeholderTextColor={isDark ? '#888888' : '#666666'}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
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