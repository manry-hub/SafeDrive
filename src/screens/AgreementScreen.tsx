import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export const AgreementScreen = () => {
  const { login } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Persetujuan Layanan</Text>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.termsText}>
            Selamat datang di aplikasi kami.
            {'\n\n'}
            1. Penggunaan Kamera: Aplikasi ini akan meminta izin untuk
            menggunakan kamera depan Anda. Data video akan diproses secara
            lokal di perangkat Anda untuk mendeteksi tanda-tanda kelelahan
            atau kantuk.
            {'\n\n'}
            2. Data: Kami tidak mengirimkan data video Anda ke server kami.
            Analisis terjadi sepenuhnya di perangkat Anda. Riwayat deteksi
            (misal: waktu kejadian) dapat disimpan secara lokal.
            {'\n\n'}
            3. Keamanan: Aplikasi ini adalah alat bantu dan tidak menggantikan
            tanggung jawab pengemudi untuk tetap waspada dan beristirahat
            cukup. Jangan hanya mengandalkan aplikasi ini.
            {'\n\n'}
            Dengan menekan "Setuju", Anda mengonfirmasi bahwa Anda telah
            membaca dan memahami semua poin di atas.
          </Text>
        </ScrollView>
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={login}
        >
          <Text style={styles.buttonTextPrimary}>Setuju dan Lanjutkan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ffffff' },
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 15,
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonPrimary: { backgroundColor: '#007AFF' },
  buttonTextPrimary: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});