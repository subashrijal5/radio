import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRadioStore } from '../../store/radioStore';
import StationCard from '../../components/StationCard';
import { useColorScheme } from 'react-native';

export default function HistoryScreen() {
  const { recentlyPlayed } = useRadioStore();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#f2f2f7' }]}>
      <Text style={[styles.title, { color: isDark ? '#ffffff' : '#000000' }]}>
        Recently Played
      </Text>
      {recentlyPlayed.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: isDark ? '#888888' : '#666666' }]}>
            No recently played stations.{'\n'}Start listening from the Browse tab!
          </Text>
        </View>
      ) : (
        <FlatList
          data={recentlyPlayed}
          renderItem={({ item }) => <StationCard station={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  list: {
    paddingBottom: 100,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});