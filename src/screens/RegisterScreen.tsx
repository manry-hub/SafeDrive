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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  // STATE PENTING: Untuk melacak input mana yang sedang diklik (Fokus)
  const [activeInput, setActiveInput] = useState<string | null>(null);

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
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER BLUE + WAVE */}
        <View style={[styles.header, { width: width * 1.2 }]}>
          <Icon
            name="car-sport"
            size={80}
            color="#fff"
            style={styles.headerIcon}
          />
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <Text style={styles.title}>Create Account</Text>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            {/* LOGIKA STYLE: Jika aktif, pakai style tambahan 'inputActive' */}
            <View
              style={[
                styles.inputBox,
                activeInput === 'name' && styles.inputActive,
              ]}
            >
              <TextInput
                value={name}
                onChangeText={setName}
                // Event saat diklik (Fokus)
                onFocus={() => setActiveInput('name')}
                // Event saat selesai/keluar (Blur)
                onBlur={() => setActiveInput(null)}
                placeholder="Enter your name..."
                placeholderTextColor="#C6C6C6"
                autoCapitalize="words"
                style={styles.input}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
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
                placeholder="email@example.com"
                placeholderTextColor="#C6C6C6"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
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
                placeholder="Create a password..."
                placeholderTextColor="#C6C6C6"
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeToggle}
              >
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7} // Efek tombol ditekan (transparan)
          >
            <Text style={styles.buttonText}>Sign Up</Text>
            <Icon
              name="arrow-forward"
              size={18}
              color="#fff"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
    borderColor: '#FF9F43', // WARNA ORANYE (Sesuai nuansa Figma)
    // Atau gunakan '#40BFFF' jika ingin warna Biru
    backgroundColor: '#FFF',
    elevation: 5, // Shadow lebih menonjol saat aktif
    shadowOpacity: 0.1,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
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
