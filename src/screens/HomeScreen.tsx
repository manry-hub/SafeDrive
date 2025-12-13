import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import type { TabParamList } from '../navigation/BottomTabNavigator';
import type { MainStackParamList } from '../navigation/MainNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Beranda'>,
  StackScreenProps<MainStackParamList>
>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {' '}
      <StatusBar barStyle="light-content" backgroundColor="#0F1E45" />
      <View style={styles.topSection}>
        <Text style={styles.brand}>Smart Drive. Safe Life.</Text>
        <Text style={styles.title}>Mulai Mengemudi</Text>
        <Text style={styles.subtitle}>Pastikan kamu memakai seatbelt ya..</Text>
      </View>
      <View style={styles.centerSection}>
        <View style={styles.circleOuter}>
          <View style={styles.circleMiddle}>
            <TouchableOpacity
              style={styles.playButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Drive')}
            >
              <Icon
                name="play"
                size={60}
                color="#40BFFF"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.premiumText}>Akun anda harus premium</Text>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Real time monitoring</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Premium')}>
            <Icon name="toggle" size={40} color="#ccc" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1E45', padding: 20 },
  topSection: { marginTop: 40, alignItems: 'center' },
  brand: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },

  centerSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  circleOuter: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(64, 191, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleMiddle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(64, 191, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },

  bottomSection: { marginBottom: 20, alignItems: 'center' },
  premiumText: { color: '#dc3545', fontSize: 12, marginBottom: 5 },
  toggleRow: { alignItems: 'center' },
  toggleLabel: { color: '#fff', fontSize: 16, marginBottom: 5 },
});
