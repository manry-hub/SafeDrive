import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// PERBAIKAN 1: Gunakan 'any' pada props agar tidak error merah TypeScript
const { width } = Dimensions.get('window');

const DriveScreen = ({ navigation }: any) => {
  const [isRecording, setIsRecording] = useState(false);
  const [alertPercentage, setAlertPercentage] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let alertInterval: any;
    let speedInterval: any;
    if (isRecording) {
      alertInterval = setInterval(() => {
        setAlertPercentage(prev =>
          Math.min(
            100,
            Math.max(0, prev + Math.floor(Math.random() * 21) - 10),
          ),
        );
      }, 2000);
      speedInterval = setInterval(() => {
        setSpeed(Math.floor(Math.random() * 121));
      }, 3000);
    } else {
      setAlertPercentage(0);
      setSpeed(0);
    }
    return () => {
      clearInterval(alertInterval);
      clearInterval(speedInterval);
    };
  }, [isRecording]);

  const getAlertColor = (percentage: number) =>
    percentage > 70 ? '#dc3545' : percentage > 40 ? '#ffc107' : '#28a745';
  const getAlertText = (percentage: number) =>
    percentage > 70 ? 'DANGER!' : percentage > 40 ? 'CAUTION!' : 'OK';

  return (
    <View style={styles.container}>
      {/* PERBAIKAN 2: Menghapus semua { ' ' } yang menyebabkan error */}
      <StatusBar hidden />
      
      <View style={styles.cameraPlaceholder}>
        <Text style={styles.placeholderText}>LIVE CAMERA FEED</Text>
        {isRecording && (
          <View style={styles.faceBoundingBox}>
            <Text style={styles.faceBoxLabel}>DETECTING...</Text>
          </View>
        )}
      </View>

      <SafeAreaView style={styles.systemInfoOverlay}>
        <View style={styles.systemStatus}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>SYSTEM ACTIVE</Text>
        </View>
        <Text style={styles.versionText}>v1.0.0</Text>
      </SafeAreaView>

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
            <View style={styles.statCard}>
              <Icon name="speedometer-outline" size={24} color="#fff" />
              <Text style={styles.statValue}>{speed}</Text>
              <Text style={styles.statUnit}>km/h</Text>
            </View>
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
            <View style={styles.statCard}>
              <Icon name="time-outline" size={24} color="#fff" />
              <Text style={styles.statValue}>{currentTime}</Text>
              <Text style={styles.statUnit}>TIME</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

// PERBAIKAN 3: Ubah ke export default
export default DriveScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cameraPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: { color: '#555', fontSize: 18, fontWeight: 'bold' },
  faceBoundingBox: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderWidth: 3,
    borderColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,
  },
  faceBoxLabel: { color: '#007AFF', fontSize: 12, fontWeight: 'bold' },
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
    marginRight: 5,
  },
  statusText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  versionText: { color: '#ccc', fontSize: 14 },
  bottomControlsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    width: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    padding: 10,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  statValue: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 5 },
  statUnit: { color: '#ccc', fontSize: 12 },
});