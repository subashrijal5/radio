import { View, Text, StyleSheet, Switch, TouchableOpacity, useColorScheme } from 'react-native';
import { useRadioStore } from '../../store/radioStore';
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const { volume, setVolume } = useRadioStore();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const settingsItems = [
    {
      icon: isDark ? <Ionicons name="sunny-outline" size={24} color="#ffffff" /> : <Ionicons name="moon-outline" size={24} color="#000000" />,
      title: 'Dark Mode',
      value: isDark,
      description: 'System',
    },
    {
      icon: <Ionicons name="volume-high-outline" size={24} color={isDark ? '#ffffff' : '#000000'} />,
      title: 'Sound Quality',
      value: 'High',
      description: 'Uses more data',
    },
    {
      icon: <Ionicons name="timer-outline" size={24} color={isDark ? '#ffffff' : '#000000'} />,
      title: 'Sleep Timer',
      value: 'Off',
      description: 'Stop playback after set time',
    },
    {
      icon: <Ionicons name="share-outline" size={24} color={isDark ? '#ffffff' : '#000000'} />,
      title: 'Share App',
      description: 'Tell your friends about us',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#f2f2f7' }]}>
      <Text style={[styles.title, { color: isDark ? '#ffffff' : '#000000' }]}>
        Settings
      </Text>
      <View style={styles.settingsList}>
        {settingsItems.map((item, index) => (
          <TouchableOpacity
            key={item.title}
            style={[
              styles.settingItem,
              { backgroundColor: isDark ? '#1c1c1e' : '#ffffff' },
              index === 0 && styles.firstItem,
              index === settingsItems.length - 1 && styles.lastItem,
            ]}>
            <View style={styles.settingContent}>
              <View style={styles.settingIcon}>{item.icon}</View>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
                  {item.title}
                </Text>
                <Text style={[styles.settingDescription, { color: isDark ? '#888888' : '#666666' }]}>
                  {item.description}
                </Text>
              </View>
              {typeof item.value === 'boolean' ? (
                <Switch value={item.value} />
              ) : item.value ? (
                <Text style={[styles.settingValue, { color: isDark ? '#888888' : '#666666' }]}>
                  {item.value}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
  settingsList: {
    paddingHorizontal: 16,
  },
  settingItem: {
    borderRadius: 12,
    marginBottom: 8,
  },
  firstItem: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastItem: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 0,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  settingValue: {
    fontSize: 16,
    marginLeft: 8,
  },
});