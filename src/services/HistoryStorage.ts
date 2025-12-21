import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlertHistory } from '../services/AlertHistory';

const HISTORY_KEY = 'DRIVE_ALERT_HISTORY';

export const saveAlertHistory = async (data: AlertHistory) => {
  try {
    const existing = await AsyncStorage.getItem(HISTORY_KEY);
    const history: AlertHistory[] = existing ? JSON.parse(existing) : [];

    history.unshift(data); // terbaru di atas

    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (err) {
    console.log('Save history error:', err);
  }
};

export const getAlertHistory = async (): Promise<AlertHistory[]> => {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const clearAlertHistory = async () => {
  await AsyncStorage.removeItem(HISTORY_KEY);
};
