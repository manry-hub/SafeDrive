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

const dummyHistory = [
  {
    id: '1',
    time: '00:15',
    route: 'curug, cimanggis, depok',
    date: '19.33 31 Nov 2025',
    dateEnd: '05.23 30 Nov 2025',
    type: 'normal',
  },
  {
    id: '2',
    time: '00:15',
    route: 'Mengantuk',
    desc: '19.33 31 Nov 2025',
    dateEnd: 'Tidak Memakai Seatbelt',
    type: 'alert',
  },
  {
    id: '3',
    time: '00:15',
    route: 'curug, cimanggis, depok',
    date: '19.33 31 Nov 2025',
    dateEnd: '05.23 30 Nov 2025',
    type: 'normal',
  },
];
type HistoryScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Riwayat'>,
  StackScreenProps<MainStackParamList>
>;
export const HistoryScreen = ({ navigation }: HistoryScreenProps) => {
  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'alert') {
      return (
        <View style={styles.alertCard}>
          <View style={styles.alertRow}>
            <Text style={styles.alertTitle}>Mengantuk</Text>
            <Text style={styles.alertTime}>19.33 31 Nov 2025</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.alertRow}>
            <Text style={styles.alertTitle}>Bahaya</Text>
            <Text style={styles.alertTime}>tapos, cawang, jakarta</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="refresh-outline" size={20} color="#000" />
          <Text style={styles.duration}>{item.time}</Text>
        </View>
        <Text style={styles.route}>{item.route}</Text>
        <View style={styles.dateRow}>
          <Text style={styles.date}>{item.date}</Text>
          <Icon
            name="arrow-forward"
            size={12}
            color="#000"
            style={{ marginHorizontal: 5 }}
          />
          <Text style={styles.date}>{item.dateEnd}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Premium')}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Riwayat Mengemudi</Text>
          <Icon name="trash-outline" size={24} color="#ff4444" />
        </View>
        <FlatList
          data={dummyHistory}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
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
