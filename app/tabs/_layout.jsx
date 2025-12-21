import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'dashboard') {
            return <AntDesign name="home" size={size} color={color} />;
          } else if (route.name === 'add-booking') {
            return <Ionicons name="add-circle-outline" size={size} color={color} />;
          } else if (route.name === 'profile') {
            return <AntDesign name="user" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#FFC107',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#151A2D', height: 90 },
        tabBarLabelStyle: { fontSize: 15, marginBottom: 5, fontWeight: 'bold' },
      })}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Home' }} />
      <Tabs.Screen name="add-booking" options={{ title: 'Add Booking' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}



