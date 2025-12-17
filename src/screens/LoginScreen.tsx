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
import { useAuth } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginIcon from '../assets/icons/moni_login_icon.svg';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password wajib diisi');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (err: any) {
      Alert.alert('Login gagal', 'Email atau password salah', err);
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

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <LoginIcon width={120} height={120} fill="#fff" />
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>Masuk ke SafeDrive</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Alamat email</Text>
            <View
              style={[
                styles.inputBoxRow,
                activeInput === 'email' && styles.inputActive,
              ]}
            >
              <TextInput
                value={email}
                onChangeText={setEmail}
                onFocus={() => setActiveInput('email')}
                onBlur={() => setActiveInput(null)}
                placeholder="JohnDoe@contoh.com"
                placeholderTextColor="#C6C6C6"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
          </View>

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
                placeholderTextColor="#C6C6C6"
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Memproses...' : 'Masuk'}
            </Text>
            <Icon
              name="arrow-forward"
              size={18}
              color="#fff"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Belum punya akun? </Text>
            <Text
              onPress={() => navigation.navigate('Register')}
              style={styles.footerLink}
            >
              Daftar
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

/* styles tetap sama seperti milikmu */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flexGrow: 1,
  },

  // HEADER
  header: {
    backgroundColor: '#40BFFF',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    alignSelf: 'center',
    width: '120%',
    borderBottomLeftRadius: '100%',
    borderBottomRightRadius: '100%',
  },
  wave: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: width,
  },
  headerIcon: {
    marginBottom: 25,
  },

  // FORM
  form: {
    marginTop: 55,
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

  // INPUT STYLE FIGMA
  inputBox: {
    backgroundColor: '#fff',
    height: 52,
    borderRadius: 26,
    borderWidth: 1.2,
    borderColor: '#EDEDED',
    paddingHorizontal: 20,
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  inputBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 52,
    borderRadius: 26,
    borderWidth: 1.2,
    borderColor: '#EDEDED',
    paddingLeft: 20,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  inputActive: {
    borderColor: '#1f9bfa55',
    backgroundColor: '#FFF',
    elevation: 5, // Shadow lebih menonjol saat aktif
    shadowOpacity: 0.1,
  },

  eyeToggle: {
    padding: 10,
  },

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

  footer: {
    flexDirection: 'row',
    marginBottom: 10,
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
  forgot: {
    marginTop: 10,
    color: '#333',
    fontWeight: '600',
    fontSize: 13,
  },
});
