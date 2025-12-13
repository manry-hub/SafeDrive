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
import { useAuth } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginIcon from "../assets/icons/moni_login_icon.svg";


const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

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
        {/* HEADER BLUE + WAVE */}
        <View style={styles.header}>
          {/* <View style={styles.wave} /> */}
          {/* <Icon
            name="car-sport"
            size={65}
            color="#fff"
            style={styles.headerIcon}
          /> */}
          <LoginIcon width={120} height={120} fill={'#ffffff'} />
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <Text style={styles.title}>Sign In To SafeDrive</Text>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>

            <View style={styles.inputBox}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="princessangelya@gmail.com"
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

            <View style={styles.inputBoxRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password..."
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

          {/* Sign In Button */}
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Sign In</Text>
            <Icon
              name="arrow-forward"
              size={18}
              color="#fff"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          {/* Google */}
          <TouchableOpacity style={styles.googleBtn}>
            <Icon name="logo-google" size={25} color="#333" />
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Text
              onPress={() => navigation.navigate('Register')}
              style={styles.footerLink}
            >
              Sign Up
            </Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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

  googleBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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
