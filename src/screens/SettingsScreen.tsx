import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/MainNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = StackScreenProps<MainStackParamList, 'Settings'>;

export const SettingsScreen = ({ navigation }: Props) => {
  const [soundAlert, setSoundAlert] = useState(true);
  const [vibration, setVibration] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={30} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pengaturan</Text>
        <View style={{ width: 30 }} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.settingItem}>
            <Text style={styles.itemText}>Peringatan Suara</Text>
            <Switch
              value={soundAlert}
              onValueChange={setSoundAlert}
              trackColor={{ false: '#767577', true: '#007AFF' }}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.itemText}>Peringatan Getar</Text>
            <Switch
              value={vibration}
              onValueChange={setVibration}
              trackColor={{ false: '#767577', true: '#007AFF' }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f7f8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#333' },
  container: { flex: 1, padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 15, marginBottom: 15 },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemText: { fontSize: 16, color: '#333' },
});
