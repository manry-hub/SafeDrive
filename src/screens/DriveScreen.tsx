// berhasil

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/MainNavigator';

import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import notifee from '@notifee/react-native';

import {
  Camera,
  runAsync,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';

import {
  Face,
  FrameFaceDetectionOptions,
  useFaceDetector,
} from 'react-native-vision-camera-face-detector';

import { Worklets } from 'react-native-worklets-core';

import { playBeep } from '../services/alertSound';
import { showAlertNotification } from '../services/alertNotification';

type Props = NativeStackScreenProps<MainStackParamList, 'Drive'>;

/* =====================
 * THRESHOLD
 * ===================== */
const EYE_CLOSED_THRESHOLD = 0.25;
const SMILE_THRESHOLD = 0.6;

/* =====================
 * ALERT LEVEL
 * ===================== */
type AlertLevel = 'NONE' | 'WARNING_1' | 'WARNING_2' | 'DANGER';

const DriveScreen = ({ navigation }: Props) => {
  const device = useCameraDevice('front');

  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [eyeStatus, setEyeStatus] = useState<
    'Terbuka' | 'Tertutup' | 'Tidak Terdeteksi'
  >('Tidak Terdeteksi');

  const [mouthStatus, setMouthStatus] = useState<
    'Senyum' | 'Tidak Senyum' | 'Tidak Terdeteksi'
  >('Tidak Terdeteksi');

  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [duration, setDuration] = useState(0);

  /* =====================
   * REFS (ANTI RERENDER)
   * ===================== */
  const eyeClosedStartRef = useRef<number | null>(null);
  const faceLostStartRef = useRef<number | null>(null);
  const smileStartRef = useRef<number | null>(null);
  const alertLevelRef = useRef<AlertLevel>('NONE');
  const timerRef = useRef<number | null>(null);

  /* =====================
   * FACE DETECTOR OPTIONS
   * ===================== */
  const faceDetectionOptions = useRef<FrameFaceDetectionOptions>({
    performanceMode: 'fast',
    landmarkMode: 'all',
    classificationMode: 'all',
    contourMode: 'none',
    trackingEnabled: false,
  }).current;

  const { detectFaces, stopListeners } = useFaceDetector(faceDetectionOptions);

  /* =====================
   * CLEANUP
   * ===================== */
  useEffect(() => {
    return () => stopListeners();
  }, [stopListeners]);

  /* =====================
   * CAMERA PERMISSION
   * ===================== */
  useEffect(() => {
    (async () => {
      const status = await Camera.getCameraPermissionStatus();
      if (status !== 'granted') {
        const req = await Camera.requestCameraPermission();
        setHasPermission(req === 'granted');
      } else {
        setHasPermission(true);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await notifee.requestPermission();
    })();
  }, []);

  /* =====================
   * TIMER DURASI
   * ===================== */
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  /* =====================
   * RUN ON JS HANDLER
   * ===================== */
  const handleFaceResult = Worklets.createRunOnJS((faces: Face[]) => {
    const now = Date.now();

    /* =====================
     * WAJAH
     * ===================== */
    if (faces.length === 0) {
      setIsFaceDetected(false);
      setEyeStatus('Tidak Terdeteksi');
      setMouthStatus('Tidak Terdeteksi');

      if (!faceLostStartRef.current) {
        faceLostStartRef.current = now;
      }

      if (
        now - faceLostStartRef.current >= 30000 &&
        alertLevelRef.current !== 'DANGER'
      ) {
        showAlertNotification(
          'Bahaya!',
          'Tekan notifikasi ini untuk memastikan anda baik baik saja',
          true,
        );
        alertLevelRef.current = 'DANGER';
      }

      return;
    }

    setIsFaceDetected(true);
    faceLostStartRef.current = null;

    const face = faces[0];

    /* =====================
     * MATA
     * ===================== */
    const leftEye = face.leftEyeOpenProbability ?? 1;
    const rightEye = face.rightEyeOpenProbability ?? 1;

    const eyesClosed =
      leftEye < EYE_CLOSED_THRESHOLD && rightEye < EYE_CLOSED_THRESHOLD;

    if (eyesClosed) {
      if (!eyeClosedStartRef.current) {
        eyeClosedStartRef.current = now;
      }

      if (now - eyeClosedStartRef.current > 700) {
        setEyeStatus('Tertutup');
      }
    } else {
      eyeClosedStartRef.current = null;
      setEyeStatus('Terbuka');
      alertLevelRef.current = 'NONE';
    }

    /* =====================
     * MULUT
     * ===================== */
    const smileProb = face.smilingProbability;

    if (smileProb == null) {
      setMouthStatus('Tidak Terdeteksi');
      smileStartRef.current = null;
    } else if (smileProb > SMILE_THRESHOLD) {
      if (!smileStartRef.current) smileStartRef.current = now;
      if (now - smileStartRef.current > 400) {
        setMouthStatus('Senyum');
      }
    } else {
      smileStartRef.current = null;
      setMouthStatus('Tidak Senyum');
    }

    /* =====================
     * ALERT LOGIC
     * ===================== */
    if (eyesClosed && mouthStatus !== 'Senyum') {
      const closedDuration = now - (eyeClosedStartRef.current || now);

      // ⚠️ 2 DETIK
      if (closedDuration >= 2000 && alertLevelRef.current === 'NONE') {
        playBeep();
        showAlertNotification(
          'Perhatian',
          'Anda mulai mengantuk. Perhatikan jalan!',
        );
        alertLevelRef.current = 'WARNING_1';
      }

      // 🚨 5 DETIK
      if (closedDuration >= 5000 && alertLevelRef.current === 'WARNING_1') {
        playBeep();
        showAlertNotification(
          'Peringatan',
          'Anda Mengantuk, Silahkan Istirahat terlebih dahulu',
        );
        alertLevelRef.current = 'WARNING_2';
      }
    }
  });

  /* =====================
   * FRAME PROCESSOR
   * ===================== */
  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      runAsync(frame, () => {
        'worklet';
        const faces = detectFaces(frame);
        handleFaceResult(faces);
      });
    },
    [handleFaceResult],
  );

  /* =====================
   * UI HELPER
   * ===================== */
  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getEyeColor = () =>
    eyeStatus === 'Tertutup'
      ? '#ff5252'
      : eyeStatus === 'Terbuka'
      ? '#4caf50'
      : '#9e9e9e';

  const getMouthColor = () =>
    mouthStatus === 'Senyum'
      ? '#ffc107'
      : mouthStatus === 'Tidak Senyum'
      ? '#4caf50'
      : '#9e9e9e';

  /* =====================
   * UI
   * ===================== */
  if (!device || !hasPermission) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: '#fff' }}>
          Kamera belum Diizinkan. izinkan terlebih dahulu
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        frameProcessor={frameProcessor}
        // frameProcessorFps={5}
      />

      {/* STATUS PANEL */}
      <View style={styles.statusPanel}>
        <Text style={styles.panelTitle}>SAFE DRIVE</Text>

        <View style={styles.statusRow}>
          <Icon name="person-outline" size={18} color="#fff" />
          <Text style={styles.label}>Wajah</Text>
          <Text
            style={[
              styles.value,
              { color: isFaceDetected ? '#4caf50' : '#ff5252' },
            ]}
          >
            {isFaceDetected ? 'Terdeteksi' : 'Tidak Terdeteksi'}
          </Text>
        </View>

        <View style={styles.statusRow}>
          <Icon name="eye-outline" size={18} color={getEyeColor()} />
          <Text style={styles.label}>Mata</Text>
          <Text style={[styles.value, { color: getEyeColor() }]}>
            {eyeStatus}
          </Text>
        </View>

        <View style={styles.statusRow}>
          <Icon name="happy-outline" size={18} color={getMouthColor()} />
          <Text style={styles.label}>Mulut</Text>
          <Text style={[styles.value, { color: getMouthColor() }]}>
            {mouthStatus}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statusRow}>
          <Icon name="time-outline" size={18} color="#90caf9" />
          <Text style={styles.label}>Durasi</Text>
          <Text style={styles.value}>{formatDuration(duration)}</Text>
        </View>
      </View>

      {/* CONTROL */}
      <View style={styles.overlay}>
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => setIsActive(!isActive)}
          >
            <Icon
              name={isActive ? 'stop-circle' : 'play-circle'}
              size={64}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => {
              setIsActive(false);
              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'MainTabs' }],
                });
              }, 100);
            }}
          >
            <Icon name="exit-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DriveScreen;
/* =====================
 * STYLES
 * ===================== */
const styles = StyleSheet.create({
  statusPanel: {
    position: 'absolute',
    top: 40,
    left: 16,
    width: 220,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  panelTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 1,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  label: {
    flex: 1,
    color: '#ccc',
    fontSize: 13,
    marginLeft: 8,
  },

  value: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginVertical: 8,
  },

  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#1e88e5',
    borderRadius: 60,
    padding: 14,
  },
  statusBox: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 12,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  smallButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 60,
    padding: 14,
    elevation: 6,
  },
});
