import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  user: any;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  role?: 'driver' | 'company' | 'family' | 'admin';
  phone?: string;
  license_number?: string;
  license_expiry?: string;
  company_name?: string;
  company_email?: string;
  emergency_contacts?: Array<{
    name: string;
    phone: string;
    relationship: string;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Auto login saat app dibuka
  useEffect(() => {
    const bootstrap = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/me');
          setUser(res.data.user);
          setIsLoggedIn(true);
        } catch {
          await AsyncStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    bootstrap();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post('/login', { email, password });
      const token = res.data.access_token;
      await AsyncStorage.setItem('token', token);
      const userRes = await api.get('/me');
      setUser(userRes.data.user);
      setIsLoggedIn(true);
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      throw new Error(err.response?.data?.message || 'Login gagal');
    }
  };

  const register = async (data: RegisterPayload) => {
    try {
      // Kirim register
      await api.post('/register', {
        ...data,
        password_confirmation: data.password,
      });

      // Auto login
      await login(data.email, data.password);
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      throw new Error(err.response?.data?.message || 'Registrasi gagal');
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch {}
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loading, login, register, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
