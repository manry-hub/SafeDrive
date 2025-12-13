import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';

// Definisikan tipe untuk setiap tab
export type TabParamList = {
  Beranda: undefined;
  Riwayat: undefined;
  Profil: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Pindahkan logika ikon ke komponen terpisah agar tidak didefinisikan saat render
const TabBarIcon: React.FC<{ routeName: keyof TabParamList; focused: boolean; color: string; size: number }> = ({
  routeName,
  focused,
  color,
  size,
}) => {
  let iconName: string = 'circle';

  if (routeName === 'Beranda') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (routeName === 'Riwayat') {
    iconName = focused ? 'time' : 'time-outline';
  } else if (routeName === 'Profil') {
    iconName = focused ? 'person' : 'person-outline';
  }

  // Kembalikan komponen Icon dari Ionicons
  return <Icon name={iconName} size={size} color={color} />;
};

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Sembunyikan header di setiap tab
        tabBarIcon: ({ focused, color, size }) => {
          return <TabBarIcon routeName={route.name as keyof TabParamList} focused={focused} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#40BFFF', // Warna Biru Cerah (Sesuai Figma) saat aktif
        tabBarInactiveTintColor: 'gray', // Warna abu-abu saat tidak aktif
        tabBarStyle: { 
          backgroundColor: '#fff', // Latar belakang putih bersih
          borderTopWidth: 1,      // Garis tipis di atas tab bar
          borderTopColor: '#f0f0f0',
          height: 60,             // Tinggi tab bar sedikit lebih besar agar nyaman
          paddingBottom: 10,      // Jarak padding bawah
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,           // Ukuran font label
          fontWeight: '500',
        }
      })}
    >
      {/* Urutan Tab: Beranda (Kiri), Riwayat (Tengah), Profil (Kanan) */}
      {/* Anda bisa mengubah urutan ini sesuai keinginan */}
      <Tab.Screen name="Beranda" component={HomeScreen} />
      <Tab.Screen name="Riwayat" component={HistoryScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};