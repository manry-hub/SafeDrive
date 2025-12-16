// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {
//   Camera,
//   useCameraDevice,
//   useCameraPermission,
// } from 'react-native-vision-camera';

// type DriverState = 'MATA TERBUKA' | 'MATA TERTUTUP' | 'MULUT MENGUAP';

// const DriveScreen = ({ navigation }: any) => {
//   const device = useCameraDevice('front');
//   const { hasPermission } = useCameraPermission();

//   const [isRecording, setIsRecording] = useState(false);
//   const [alertPercentage, setAlertPercentage] = useState(0);
//   const [driverState, setDriverState] = useState<DriverState>('MATA TERBUKA');
//   const [recordDuration, setRecordDuration] = useState(0);

//   /** ======================
//    * DURASI KAMERA
//    * ====================== */
//   useEffect(() => {
//     let timer: any;

//     if (isRecording) {
//       timer = setInterval(() => {
//         setRecordDuration(prev => prev + 1);
//       }, 1000);
//     } else {
//       setRecordDuration(0);
//     }

//     return () => clearInterval(timer);
//   }, [isRecording]);

//   /** ======================
//    * SIMULASI STATUS DRIVER
//    * ====================== */
//   useEffect(() => {
//     let alertInterval: any;
//     let driverInterval: any;

//     if (isRecording) {
//       alertInterval = setInterval(() => {
//         setAlertPercentage(prev =>
//           Math.min(
//             100,
//             Math.max(0, prev + Math.floor(Math.random() * 21) - 10),
//           ),
//         );
//       }, 2000);

//       driverInterval = setInterval(() => {
//         const states: DriverState[] = [
//           'MATA TERBUKA',
//           'MATA TERTUTUP',
//           'MULUT MENGUAP',
//         ];
//         setDriverState(states[Math.floor(Math.random() * states.length)]);
//       }, 3000);
//     } else {
//       setAlertPercentage(0);
//       setDriverState('MATA TERBUKA');
//     }

//     return () => {
//       clearInterval(alertInterval);
//       clearInterval(driverInterval);
//     };
//   }, [isRecording]);

//   /** ======================
//    * HELPER
//    * ====================== */
//   const formatDuration = (seconds: number) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s < 10 ? '0' : ''}${s}`;
//   };

//   const getAlertColor = (percentage: number) =>
//     percentage > 70 ? '#dc3545' : percentage > 40 ? '#ffc107' : '#28a745';

//   const getAlertText = (percentage: number) =>
//     percentage > 70 ? 'DANGER' : percentage > 40 ? 'CAUTION' : 'OK';

//   const getDriverColor = (state: DriverState) => {
//     switch (state) {
//       case 'MATA TERTUTUP':
//         return '#dc3545';
//       case 'MULUT MENGUAP':
//         return '#ffc107';
//       default:
//         return 'rgba(255,255,255,0.1)';
//     }
//   };

//   if (!hasPermission || !device) {
//     return (
//       <View style={styles.loading}>
//         <Text style={{ color: '#fff' }}>Loading camera...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar hidden />

//       <Camera style={StyleSheet.absoluteFill} device={device} isActive video />

//       {/* ===== TOP SYSTEM INFO ===== */}
//       <SafeAreaView style={styles.systemInfoOverlay}>
//         <View style={styles.systemStatus}>
//           <View style={styles.statusDot} />
//           <Text style={styles.statusText}>SYSTEM ACTIVE</Text>
//         </View>
//         <Text style={styles.versionText}>v1.0.0</Text>
//       </SafeAreaView>

//       {/* ===== BOTTOM CONTROLS ===== */}
//       <SafeAreaView style={styles.bottomControlsOverlay}>
//         <View style={styles.controlPanel}>
//           <TouchableOpacity
//             style={styles.controlButton}
//             onPress={() => navigation.navigate('Settings')}
//           >
//             <Icon name="settings-outline" size={28} color="#999" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.recordButton,
//               isRecording ? styles.stopButton : styles.startButton,
//             ]}
//             onPress={() => setIsRecording(!isRecording)}
//           >
//             <Icon
//               name={isRecording ? 'stop' : 'videocam'}
//               size={36}
//               color="#fff"
//             />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.controlButton}
//             onPress={() => navigation.goBack()}
//           >
//             <Icon name="exit-outline" size={28} color="#999" />
//           </TouchableOpacity>
//         </View>

//         {isRecording && (
//           <View style={styles.statsContainer}>
//             {/* DRIVER CONDITION */}
//             <View
//               style={[
//                 styles.statCard,
//                 { backgroundColor: getDriverColor(driverState) },
//               ]}
//             >
//               <Icon name="eye-outline" size={24} color="#fff" />
//               <Text style={styles.statValue}>{driverState}</Text>
//               <Text style={styles.statUnit}>KONDISI</Text>
//             </View>

//             {/* ALERT */}
//             <View
//               style={[
//                 styles.statCard,
//                 { backgroundColor: getAlertColor(alertPercentage) },
//               ]}
//             >
//               <Icon name="alert-circle-outline" size={24} color="#fff" />
//               <Text style={styles.statValue}>{alertPercentage}%</Text>
//               <Text style={styles.statUnit}>
//                 {getAlertText(alertPercentage)}
//               </Text>
//             </View>

//             {/* DURATION */}
//             <View style={styles.statCard}>
//               <Icon name="time-outline" size={24} color="#fff" />
//               <Text style={styles.statValue}>
//                 {formatDuration(recordDuration)}
//               </Text>
//               <Text style={styles.statUnit}>DURASI</Text>
//             </View>
//           </View>
//         )}
//       </SafeAreaView>
//     </View>
//   );
// };

// export default DriveScreen;

// /** ======================
//  * STYLES
//  * ====================== */
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   loading: {
//     flex: 1,
//     backgroundColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   systemInfoOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     padding: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   systemStatus: { flexDirection: 'row', alignItems: 'center' },
//   statusDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#28a745',
//     marginRight: 6,
//   },
//   statusText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
//   versionText: { color: '#ccc', fontSize: 14 },
//   bottomControlsOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     paddingBottom: 40,
//   },
//   controlPanel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     width: '80%',
//     marginBottom: 20,
//   },
//   controlButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   recordButton: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   startButton: { backgroundColor: '#007AFF' },
//   stopButton: { backgroundColor: '#dc3545' },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '92%',
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     borderRadius: 16,
//     padding: 10,
//   },
//   statCard: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 12,
//     marginHorizontal: 5,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//   },
//   statValue: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 6,
//     textAlign: 'center',
//   },
//   statUnit: { color: '#ccc', fontSize: 12 },
// // });
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {
//   Camera,
//   useCameraDevice,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import { scheduleOnRN } from 'react-native-worklets';
// import {
//   Face,
//   useFaceDetector,
// } from 'react-native-vision-camera-face-detector';

// type DriverState =
//   | 'MATA TERBUKA'
//   | 'MATA TERTUTUP'
//   | 'MULUT MENGUAP'
//   | 'WAJAH TIDAK TERDETEKSI';

// const DriveScreen = () => {
//   const [driverState, setDriverState] = useState<DriverState>('MATA TERBUKA');
//   const [alertPercentage, setAlertPercentage] = useState(0);
//   const [isRecording, setIsRecording] = useState(false);

//   // Camera device
//   const devices = useCameraDevice('front');
//   const device = devices;

//   // ------------------------
//   // Timer refs (CORE LOGIC)
//   // ------------------------
//   const eyeClosedStart = useRef<number | null>(null);
//   const mouthOpenStart = useRef<number | null>(null);
//   const faceLostStart = useRef<number | null>(null);

//   // ------------------------
//   // Face Analysis Function
//   // ------------------------
//   const analyzeFace = useCallback((face: Face | null) => {
//     const now = Date.now();

//     if (!face) {
//       if (!faceLostStart.current) faceLostStart.current = now;

//       if (now - (faceLostStart.current || 0) > 30000) {
//         setDriverState('WAJAH TIDAK TERDETEKSI');
//         setAlertPercentage(100);
//       }
//       return;
//     }

//     faceLostStart.current = null;

//     const leftEye = face.leftEyeOpenProbability ?? 1;
//     const rightEye = face.rightEyeOpenProbability ?? 1;
//     const mouthOpen = face.smilingProbability ?? 0;

//     const eyesClosed = leftEye < 0.3 && rightEye < 0.3;

//     // =======================
//     // MATA TERTUTUP
//     // =======================
//     if (eyesClosed) {
//       if (!eyeClosedStart.current) eyeClosedStart.current = now;

//       const duration = now - eyeClosedStart.current;
//       setDriverState('MATA TERTUTUP');

//       if (duration > 30000) setAlertPercentage(100);
//       else if (duration > 5000) setAlertPercentage(80);
//       else if (duration > 2000) setAlertPercentage(60);

//       return;
//     }
//     eyeClosedStart.current = null;

//     // =======================
//     // MULUT MENGUAP
//     // =======================
//     if (mouthOpen > 0.6) {
//       if (!mouthOpenStart.current) mouthOpenStart.current = now;

//       if (now - mouthOpenStart.current > 3000) {
//         setDriverState('MULUT MENGUAP');
//         setAlertPercentage(50);
//       }
//       return;
//     }
//     mouthOpenStart.current = null;

//     // =======================
//     // NORMAL
//     // =======================
//     setDriverState('MATA TERBUKA');
//     setAlertPercentage(10);
//   }, []);

//   // ------------------------
//   // Frame Processor
//   // ------------------------
//   const faceDetector = useFaceDetector({
//     performanceMode: 'fast',
//     landmarkMode: 'all',
//     contourMode: 'all',
//     classificationMode: 'all',
//   });

//   const frameProcessor = useFrameProcessor(
//     frame => {
//       'worklet';
//       const faces = faceDetector.detectFaces(frame);

//       if (faces.length > 0) {
//         scheduleOnRN(analyzeFace, faces[0]);
//       } else {
//         scheduleOnRN(analyzeFace, null);
//       }
//     },
//     [faceDetector],
//   );

//   // ------------------------
//   // Camera permission
//   // ------------------------

//   const [cameraPermission, setCameraPermission] = useState<
//     'granted' | 'not-determined' | 'denied' | 'restricted'
//   >('not-determined');

//   useEffect(() => {
//     async function getPermission() {
//       const status = await Camera.getCameraPermissionStatus();
//       setCameraPermission(status);

//       if (status !== 'granted') {
//         const newStatus = await Camera.requestCameraPermission();
//         setCameraPermission(newStatus);
//       }
//     }

//     getPermission();
//   }, []);
//   return (
//     <SafeAreaView style={styles.container}>
//       {device && cameraPermission === 'granted' ? (
//         <Camera
//           style={StyleSheet.absoluteFill}
//           device={device}
//           isActive={isRecording}
//           frameProcessor={frameProcessor}
//         />
//       ) : (
//         <Text>Camera tidak tersedia / belum diizinkan</Text>
//       )}

//       <View style={styles.statusContainer}>
//         <Text style={styles.statusText}>Driver State: {driverState}</Text>
//         <Text style={styles.statusText}>Alert: {alertPercentage}%</Text>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => setIsRecording(!isRecording)}
//         >
//           <Icon
//             name={isRecording ? 'stop-circle' : 'play-circle'}
//             size={48}
//             color="#fff"
//           />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default DriveScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   statusContainer: {
//     position: 'absolute',
//     bottom: 50,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   statusText: {
//     color: '#fff',
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#1e88e5',
//     borderRadius: 50,
//     padding: 10,
//   },
// // });
// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Vibration,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// import {
//   Camera,
//   useCameraDevice,
//   useFrameProcessor,
// } from 'react-native-vision-camera';

// import { runOnJS } from 'react-native-reanimated';
// import { useFaceDetector } from 'react-native-vision-camera-face-detector';

// const DriveScreen = () => {
//   const device = useCameraDevice('front');

//   // 🔥 FORCE ACTIVE (JANGAN PAKAI BUTTON DULU)
//   const [isActive, setIsActive] = useState(true);
//   const [hasPermission, setHasPermission] = useState(false);

//   /* =====================
//    * FACE DETECTOR
//    * ===================== */
//   const faceDetector = useFaceDetector({
//     performanceMode: 'fast',
//     classificationMode: 'all',
//   });

//   /* =====================
//    * FRAME PROCESSOR — DEBUG
//    * ===================== */
//   const frameProcessor = useFrameProcessor(
//     frame => {
//       'worklet';

//       // 🔴 DEBUG 1 — FRAME PROCESSOR JALAN
//       runOnJS(Vibration.vibrate)(30);

//       const faces = faceDetector.detectFaces(frame);

//       // 🔴 DEBUG 2 — WAJAH TERDETEKSI
//       if (faces.length > 0) {
//         runOnJS(Vibration.vibrate)(300);
//       }
//     },
//     [faceDetector],
//   );

//   /* =====================
//    * CAMERA PERMISSION
//    * ===================== */
//   useEffect(() => {
//     (async () => {
//       const status = await Camera.getCameraPermissionStatus();
//       if (status !== 'granted') {
//         const req = await Camera.requestCameraPermission();
//         setHasPermission(req === 'granted');
//       } else {
//         setHasPermission(true);
//       }
//     })();
//   }, []);

//   /* =====================
//    * UI (MINIMAL)
//    * ===================== */
//   return (
//     <SafeAreaView style={styles.container}>
//       {device && hasPermission && (
//         <Camera
//           style={StyleSheet.absoluteFill}
//           device={device}
//           isActive={isActive}
//           frameProcessor={frameProcessor}
//           frameProcessorFps={5} // ⬅️ WAJIB
//         />
//       )}

//       <View style={styles.overlay}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => setIsActive(!isActive)}
//         >
//           <Icon
//             name={isActive ? 'stop-circle' : 'play-circle'}
//             size={64}
//             color="#fff"
//           />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default DriveScreen;

// /* =====================
//  * STYLES
//  * ===================== */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   overlay: {
//     position: 'absolute',
//     bottom: 40,
//     alignSelf: 'center',
//   },
//   button: {
//     backgroundColor: '#1e88e5',
//     borderRadius: 60,
//     padding: 14,
//   },
// });
// berhasil

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';

import { useFaceDetector } from 'react-native-vision-camera-face-detector';

const DriveScreen = () => {
  const device = useCameraDevice('front');

  const [isActive, setIsActive] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  /* =====================
   * FACE DETECTOR
   * ===================== */
  const faceDetector = useFaceDetector({
    performanceMode: 'fast',
    classificationMode: 'all',
  });

  /* =====================
   * FRAME PROCESSOR
   * ===================== */
  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';

      const faces = faceDetector.detectFaces(frame);

      // ✅ DEBUG WORKLET (AMAN)
      if (faces.length > 0) {
        console.log('[FRAME]', 'FACE DETECTED:', faces.length);
      } else {
        console.log('[FRAME]', 'NO FACE');
      }
    },
    [faceDetector],
  );

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

  /* =====================
   * UI
   * ===================== */
  return (
    <SafeAreaView style={styles.container}>
      {device && hasPermission && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          frameProcessor={frameProcessor}
          // frameProcessorFps={5}
        />
      )}

      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsActive(!isActive)}
        >
          <Icon
            name={isActive ? 'stop-circle' : 'play-circle'}
            size={64}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DriveScreen;

/* =====================
 * STYLES
 * ===================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
});
