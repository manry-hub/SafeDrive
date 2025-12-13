import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DriveScreen from '../screens/DriveScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { PremiumScreen } from '../screens/PremiumScreen'; // Pastikan PremiumScreen ada
import { BottomTabNavigator } from './BottomTabNavigator';

// Definisikan tipe parameter untuk setiap layar di stack utama
export type MainStackParamList = {
  MainTabs: undefined; // Ini adalah layar yang berisi seluruh BottomTabNavigator
  Drive: undefined;    // Layar DriveScreen (FullScreen)
  Settings: undefined; // Layar SettingsScreen
  Premium: undefined;  // Layar PremiumScreen (jika ada)
};

const Stack = createStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false, // Sembunyikan header default Stack Navigator
      }}
      
    >
      {/* Stack Screen Pertama: BottomTabNavigator.
        Ini akan memuat seluruh struktur tab (Beranda, Riwayat, Profil) sebagai satu layar.
      */}
      <Stack.Screen 
        name="MainTabs" 
        component={BottomTabNavigator} 
      />
      
      {/* Layar-layar di bawah ini berada DI LUAR Tab Navigator.
        Artinya, ketika layar ini dibuka, Tab Bar di bawah akan tertutup/hilang.
        Ini ideal untuk layar "Full Screen" seperti mode berkendara.
      */}
      
      <Stack.Screen 
        name="Drive" 
        component={DriveScreen} 
        options={{ 
          presentation: 'modal', // Efek muncul dari bawah (seperti modal)
          gestureEnabled: false, // Mencegah swipe untuk menutup (agar user tidak sengaja keluar)
        }} 
      />

      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          presentation: 'card', // Efek transisi standar (geser dari kanan)
        }}
      />

      <Stack.Screen 
        name="Premium" 
        component={PremiumScreen} 
        options={{ 
          presentation: 'modal', // Efek muncul dari bawah untuk promosi
        }} 
      />

    </Stack.Navigator>
  );
};