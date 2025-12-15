import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

type DriverState = 'MATA TERBUKA' | 'MATA TERTUTUP' | 'MULUT MENGUAP';

const DriveScreen = ({ navigation }: any) => {
  const device = useCameraDevice('front');
  const { hasPermission } = useCameraPermission();

  const [isRecording, setIsRecording] = useState(false);
  const [alertPercentage, setAlertPercentage] = useState(0);
  const [driverState, setDriverState] = useState<DriverState>('MATA TERBUKA');
  const [recordDuration, setRecordDuration] = useState(0);

  /** ======================
   * DURASI KAMERA
   * ====================== */
  useEffect(() => {
    let timer: any;

    if (isRecording) {
      timer = setInterval(() => {
        setRecordDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordDuration(0);
    }

    return () => clearInterval(timer);
  }, [isRecording]);

  /** ======================
   * SIMULASI STATUS DRIVER
   * ====================== */
  useEffect(() => {
    let alertInterval: any;
    let driverInterval: any;

    if (isRecording) {
      alertInterval = setInterval(() => {
        setAlertPercentage(prev =>
          Math.min(
            100,
            Math.max(0, prev + Math.floor(Math.random() * 21) - 10),
          ),
        );
      }, 2000);

      driverInterval = setInterval(() => {
        const states: DriverState[] = [
          'MATA TERBUKA',
          'MATA TERTUTUP',
          'MULUT MENGUAP',
        ];
        setDriverState(states[Math.floor(Math.random() * states.length)]);
      }, 3000);
    } else {
      setAlertPercentage(0);
      setDriverState('MATA TERBUKA');
    }

    return () => {
      clearInterval(alertInterval);
      clearInterval(driverInterval);
    };
  }, [isRecording]);

  /** ======================
   * HELPER
   * ====================== */
  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getAlertColor = (percentage: number) =>
    percentage > 70 ? '#dc3545' : percentage > 40 ? '#ffc107' : '#28a745';

  const getAlertText = (percentage: number) =>
    percentage > 70 ? 'DANGER' : percentage > 40 ? 'CAUTION' : 'OK';

  const getDriverColor = (state: DriverState) => {
    switch (state) {
      case 'MATA TERTUTUP':
        return '#dc3545';
      case 'MULUT MENGUAP':
        return '#ffc107';
      default:
        return 'rgba(255,255,255,0.1)';
    }
  };

  if (!hasPermission || !device) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: '#fff' }}>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Camera style={StyleSheet.absoluteFill} device={device} isActive video />

      {/* ===== TOP SYSTEM INFO ===== */}
      <SafeAreaView style={styles.systemInfoOverlay}>
        <View style={styles.systemStatus}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>SYSTEM ACTIVE</Text>
        </View>
        <Text style={styles.versionText}>v1.0.0</Text>
      </SafeAreaView>

      {/* ===== BOTTOM CONTROLS ===== */}
      <SafeAreaView style={styles.bottomControlsOverlay}>
        <View style={styles.controlPanel}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Icon name="settings-outline" size={28} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.recordButton,
              isRecording ? styles.stopButton : styles.startButton,
            ]}
            onPress={() => setIsRecording(!isRecording)}
          >
            <Icon
              name={isRecording ? 'stop' : 'videocam'}
              size={36}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="exit-outline" size={28} color="#999" />
          </TouchableOpacity>
        </View>

        {isRecording && (
          <View style={styles.statsContainer}>
            {/* DRIVER CONDITION */}
            <View
              style={[
                styles.statCard,
                { backgroundColor: getDriverColor(driverState) },
              ]}
            >
              <Icon name="eye-outline" size={24} color="#fff" />
              <Text style={styles.statValue}>{driverState}</Text>
              <Text style={styles.statUnit}>KONDISI</Text>
            </View>

            {/* ALERT */}
            <View
              style={[
                styles.statCard,
                { backgroundColor: getAlertColor(alertPercentage) },
              ]}
            >
              <Icon name="alert-circle-outline" size={24} color="#fff" />
              <Text style={styles.statValue}>{alertPercentage}%</Text>
              <Text style={styles.statUnit}>
                {getAlertText(alertPercentage)}
              </Text>
            </View>

            {/* DURATION */}
            <View style={styles.statCard}>
              <Icon name="time-outline" size={24} color="#fff" />
              <Text style={styles.statValue}>
                {formatDuration(recordDuration)}
              </Text>
              <Text style={styles.statUnit}>DURASI</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default DriveScreen;

/** ======================
 * STYLES
 * ====================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loading: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  systemInfoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  systemStatus: { flexDirection: 'row', alignItems: 'center' },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#28a745',
    marginRight: 6,
  },
  statusText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  versionText: { color: '#ccc', fontSize: 14 },
  bottomControlsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 40,
  },
  controlPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: { backgroundColor: '#007AFF' },
  stopButton: { backgroundColor: '#dc3545' },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 16,
    padding: 10,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'center',
  },
  statUnit: { color: '#ccc', fontSize: 12 },
});
