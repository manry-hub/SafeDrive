import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }: any) => {
  const { register } = useAuth();

  // STATE FORM
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'driver' | 'company'>('driver');

  // Driver
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('');

  // Company
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');

  // Emergency contacts
  const [emergencyContacts, setEmergencyContacts] = useState<
    { name: string; phone: string; relationship: string }[]
  >([]);

  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !phone) {
      Alert.alert('Error', 'Semua field wajib diisi');
      return;
    }

    try {
      setLoading(true);
      await register({
        name,
        email,
        password,
        password_confirmation: password,
        role,
        phone,
        license_number: role === 'driver' ? licenseNumber : undefined,
        license_expiry: role === 'driver' ? licenseExpiry : undefined,
        company_name: role === 'company' ? companyName : undefined,
        company_email: role === 'company' ? companyEmail : undefined,
        emergency_contacts: emergencyContacts,
      });
      Alert.alert('Sukses', 'Registrasi berhasil!');
      navigation.navigate('Login');
    } catch (err: any) {
      Alert.alert('Gagal', err.message || 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.header, { width: width * 1.2 }]}>
          <Icon name="car-sport" size={80} color="#fff" />
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>Buat akun</Text>

          {/* Nama */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <View
              style={[
                styles.inputBox,
                activeInput === 'name' && styles.inputActive,
              ]}
            >
              <TextInput
                value={name}
                onChangeText={setName}
                onFocus={() => setActiveInput('name')}
                onBlur={() => setActiveInput(null)}
                placeholder="John Doe"
                placeholderTextColor="#999"
                style={styles.input}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View
              style={[
                styles.inputBox,
                activeInput === 'email' && styles.inputActive,
              ]}
            >
              <TextInput
                value={email}
                onChangeText={setEmail}
                onFocus={() => setActiveInput('email')}
                onBlur={() => setActiveInput(null)}
                placeholder="email@mail.com"
                placeholderTextColor="#999"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kata sandi</Text>
            <View
              style={[
                styles.inputBoxRow,
                activeInput === 'password' && styles.inputActive,
              ]}
            >
              <TextInput
                value={password}
                onChangeText={setPassword}
                onFocus={() => setActiveInput('password')}
                onBlur={() => setActiveInput(null)}
                placeholder="********"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nomor Telepon</Text>
            <View
              style={[
                styles.inputBox,
                activeInput === 'phone' && styles.inputActive,
              ]}
            >
              <TextInput
                value={phone}
                onChangeText={setPhone}
                onFocus={() => setActiveInput('phone')}
                onBlur={() => setActiveInput(null)}
                placeholder="081234567890"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>
          </View>

          {/* Role Selector */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Daftar sebagai</Text>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <TouchableOpacity
                onPress={() => setRole('driver')}
                style={{ marginRight: 20 }}
              >
                <Text style={{ color: role === 'driver' ? 'blue' : '#555' }}>
                  Driver
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRole('company')}>
                <Text style={{ color: role === 'company' ? 'blue' : '#555' }}>
                  Company
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Conditional Driver Fields */}
          {role === 'driver' && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nomor SIM</Text>
                <View
                  style={[
                    styles.inputBox,
                    activeInput === 'licenseNumber' && styles.inputActive,
                  ]}
                >
                  <TextInput
                    value={licenseNumber}
                    onChangeText={setLicenseNumber}
                    onFocus={() => setActiveInput('licenseNumber')}
                    onBlur={() => setActiveInput(null)}
                    placeholder="SIM12345678"
                    placeholderTextColor="#999"
                    style={styles.input}
                  />
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Masa Berlaku SIM</Text>
                <View
                  style={[
                    styles.inputBox,
                    activeInput === 'licenseExpiry' && styles.inputActive,
                  ]}
                >
                  <TextInput
                    value={licenseExpiry}
                    onChangeText={setLicenseExpiry}
                    onFocus={() => setActiveInput('licenseExpiry')}
                    onBlur={() => setActiveInput(null)}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#999"
                    style={styles.input}
                  />
                </View>
              </View>
            </>
          )}

          {/* Conditional Company Fields */}
          {role === 'company' && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nama Perusahaan</Text>
                <View
                  style={[
                    styles.inputBox,
                    activeInput === 'companyName' && styles.inputActive,
                  ]}
                >
                  <TextInput
                    value={companyName}
                    onChangeText={setCompanyName}
                    onFocus={() => setActiveInput('companyName')}
                    onBlur={() => setActiveInput(null)}
                    placeholder="PT Contoh"
                    placeholderTextColor="#999"
                    style={styles.input}
                  />
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Perusahaan</Text>
                <View
                  style={[
                    styles.inputBox,
                    activeInput === 'companyEmail' && styles.inputActive,
                  ]}
                >
                  <TextInput
                    value={companyEmail}
                    onChangeText={setCompanyEmail}
                    onFocus={() => setActiveInput('companyEmail')}
                    onBlur={() => setActiveInput(null)}
                    placeholder="company@mail.com"
                    placeholderTextColor="#999"
                    style={styles.input}
                  />
                </View>
              </View>
            </>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Mendaftarkan...' : 'Daftar Akun'}
            </Text>
            <Icon name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text>Sudah punya akun? </Text>
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.footerLink}
            >
              Masuk
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

// Styles tetap sama seperti sebelumnya

/* styles sama seperti milikmu */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flexGrow: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  eyes: {
    paddingRight: 20,
  },

  // HEADER
  header: {
    backgroundColor: '#40BFFF',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    alignSelf: 'center',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },
  headerIcon: {
    marginBottom: 10,
  },

  // FORM
  form: {
    marginTop: 40,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 25,
  },

  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
    marginBottom: 6,
  },

  // INPUT BOX NORMAL
  inputBox: {
    backgroundColor: '#fff',
    height: 52,
    borderRadius: 26,
    borderWidth: 1.2,
    borderColor: '#EDEDED',
    paddingHorizontal: 20,
    justifyContent: 'center',
    // Shadow Halus
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  // INPUT BOX ROW (Untuk Password)
  inputBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 52,
    borderRadius: 26,
    borderWidth: 1.2,
    borderColor: '#EDEDED',
    paddingLeft: 20,
    // Shadow Halus
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  // STYLE SAAT AKTIF / DIKLIK (Fokus)
  inputActive: {
    borderColor: '#1f9bfa55', // WARNA ORANYE (Sesuai nuansa Figma)
    // Atau gunakan '#40BFFF' jika ingin warna Biru
    backgroundColor: '#FFF',
    elevation: 5, // Shadow lebih menonjol saat aktif
    shadowOpacity: 0.1,
  },

  eyeToggle: {
    padding: 10,
    marginRight: 5,
  },

  // BUTTON
  button: {
    flexDirection: 'row',
    backgroundColor: '#000',
    height: 55,
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 25,
    // Shadow
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },

  buttonIcon: {
    marginLeft: 10,
  },

  // FOOTER
  footer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  footerText: {
    color: '#A2A2A2',
    fontSize: 13,
  },
  footerLink: {
    fontSize: 13,
    color: '#000',
    fontWeight: '700',
  },
});
