import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/MainNavigator';

type Props = StackScreenProps<MainStackParamList, 'Premium'>;

export const PremiumScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Icon name="megaphone-outline" size={80} color="#40BFFF" style={{ marginBottom: 20 }} />
      <Text style={styles.logo}>SafeDrive Premium</Text>
      
      <Text style={styles.title}>Berkendara menjadi lebih aman dengan beralih ke premium</Text>
      
      <View style={styles.features}>
        <Text style={styles.featureItem}>• Live share location real time</Text>
        <Text style={styles.featureItem}>• Riwayat mengemudi</Text>
        <Text style={styles.featureItem}>• Emergency call</Text>
      </View>

      <View style={styles.pricingRow}>
        <View style={styles.priceCard}>
          <Text style={styles.planName}>Free</Text>
          <Text style={styles.priceText}>Rp 0 / bln</Text>
        </View>
        <View style={[styles.priceCard, styles.activeCard]}>
          <View style={styles.badge}><Text style={styles.badgeText}>68% OFF</Text></View>
          <Text style={styles.planName}>Premium</Text>
          <Text style={[styles.priceText, styles.activeText]}>Rp 50.000 / bln</Text>
        </View>
      </View>

      <Text style={styles.note}>✔ Bisa batalkan kapan saja</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Lanjutkan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 30, alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 24, fontWeight: 'bold', color: '#40BFFF', marginBottom: 20 },
  title: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#333' },
  features: { alignSelf: 'flex-start', marginBottom: 40 },
  featureItem: { fontSize: 14, color: '#555', marginBottom: 8 },
  pricingRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  priceCard: { width: '48%', borderWidth: 1, borderColor: '#eee', borderRadius: 10, padding: 15, backgroundColor: '#f9f9f9' },
  activeCard: { borderColor: '#40BFFF', backgroundColor: '#eaf6ff' },
  planName: { fontWeight: 'bold', fontSize: 14, marginBottom: 5, color: '#333' },
  priceText: { fontSize: 12, color: '#666' },
  activeText: { color: '#000' },
  badge: { position: 'absolute', top: -10, right: 10, backgroundColor: '#0F1E45', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  note: { fontSize: 12, color: '#333', marginBottom: 20 },
  button: { backgroundColor: '#0F1E45', width: '100%', padding: 15, borderRadius: 25, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});