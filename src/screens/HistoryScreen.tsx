import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import type { TabParamList } from '../navigation/BottomTabNavigator';
import type { MainStackParamList } from '../navigation/MainNavigator';
import { useFocusEffect } from '@react-navigation/native';
import { getAlertHistory } from '../services/HistoryStorage';
import { AlertHistory } from '../services/AlertHistory';

type HistoryScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Riwayat'>,
  StackScreenProps<MainStackParamList>
>;

export const HistoryScreen = ({ navigation }: HistoryScreenProps) => {
  const [history, setHistory] = React.useState<AlertHistory[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      getAlertHistory().then(setHistory);
    }, []),
  );
  const formatDate = (ts: number) => new Date(ts).toLocaleDateString('id-ID');

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const renderItem = ({ item }: { item: AlertHistory }) => (
    <View style={styles.alertCard}>
      <View style={styles.alertRow}>
        <Text style={styles.alertTitle}>{item.message}</Text>
        <Text style={styles.alertTime}>{formatTime(item.timestamp)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.alertRow}>
        <Text style={styles.alertTitle}>
          Durasi: {Math.floor(item.duration / 60)}:{item.duration % 60}
        </Text>
        <Text style={styles.alertTime}>{formatDate(item.timestamp)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Premium')}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Riwayat Mengemudi</Text>
          <Icon name="trash-outline" size={24} color="#ff4444" />
        </View>
        <FlatList
          data={history}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', marginTop: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  list: { padding: 20 },
  card: {
    backgroundColor: '#81D4FA',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  duration: { fontWeight: 'bold', marginLeft: 5, fontSize: 16, color: '#000' },
  route: { fontSize: 12, color: '#333', marginBottom: 10 },
  dateRow: { flexDirection: 'row', alignItems: 'center' },
  date: { fontSize: 10, color: '#333' },

  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  alertTitle: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  alertTime: { fontSize: 10, color: '#666' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 5 },
});
