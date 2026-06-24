import { Tabs } from 'expo-router';
import { Platform, Text } from 'react-native';

function TabIcon({ emoji, size }: { emoji: string; size: number }) {
  return <Text style={{ fontSize: size - 4 }}>{emoji}</Text>;
}

const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 85 : 65;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E8813A',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0E6D8',
          height: TAB_BAR_HEIGHT,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#FFF5EB',
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '700',
          color: '#3D2B1F',
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Home',
          tabBarIcon: ({ size }) => <TabIcon emoji="🏠" size={size} />,
        }}
      />
      <Tabs.Screen
        name="family-album"
        options={{
          title: 'Family Album',
          tabBarLabel: 'Album',
          tabBarIcon: ({ size }) => <TabIcon emoji="📷" size={size} />,
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          title: 'Games',
          tabBarLabel: 'Games',
          tabBarIcon: ({ size }) => <TabIcon emoji="🎮" size={size} />,
        }}
      />
      <Tabs.Screen
        name="today-status"
        options={{
          title: "Today's Status",
          tabBarLabel: 'My Health',
          tabBarIcon: ({ size }) => <TabIcon emoji="❤️" size={size} />,
        }}
      />
    </Tabs>
  );
}
