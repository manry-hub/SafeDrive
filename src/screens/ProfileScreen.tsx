import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';


const ProfileScreen = ({ navigation }: any) => {
  const { logout } = useAuth();

  const MenuItem = ({ icon, label, onPress }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Icon name={icon} size={20} color="#333" />
      <Text style={styles.menuText}>{label}</Text>
      <Icon name="chevron-forward" size={18} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <MenuItem
            icon="person-outline"
            label="Informasi pribadi"
            onPress={() => {}}
          />
          <MenuItem
            icon="lock-closed-outline"
            label="Ganti Password"
            onPress={() => {}}
          />
        </View>

        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.card}>
          <MenuItem
            icon="notifications-outline"
            label="Notification"
            onPress={() => {}}
          />
          <MenuItem
            icon="book-outline"
            label="Panduan Penggunaan"
            onPress={() => {}}
          />
          <MenuItem
            icon="information-circle-outline"
            label="Tentang Aplikasi"
            onPress={() => {}}
          />
          <MenuItem
            icon="call-outline"
            label="Kontak Darurat"
            onPress={() => {}}
          />
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Status</Text>
          <Text style={styles.statusText}>versi gratis</Text>
          <TouchableOpacity
            style={styles.upgradeButton}
            // Pastikan screen 'Premium' sudah terdaftar di MainNavigator.tsx
            onPress={() => navigation.navigate('Premium')} 
          >
            <Text style={styles.upgradeText}>Beralih ke premium</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() =>
            Alert.alert('Keluar', 'Yakin?', [
              { text: 'Ya', onPress: logout },
              { text: 'Batal' },
            ])
          }
        >
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// PERBAIKAN 3: Gunakan export default
// Supaya cocok dengan import di BottomTabNavigator.tsx
export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  scroll: { padding: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginTop: 10,
  },
  card: { backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  statusTitle: { fontWeight: 'bold', fontSize: 16, color: '#000' },
  statusText: { color: '#dc3545', fontSize: 12, marginBottom: 15 },
  upgradeButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  upgradeText: { color: '#000', fontSize: 12 },
  logoutBtn: { marginTop: 30, alignItems: 'center', marginBottom: 20 },
  logoutText: { color: 'red', fontWeight: 'bold' },
});