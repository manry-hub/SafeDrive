# 🚗 SafeDrive – DegorPrimo

## 1. Judul Proyek

**SafeDrive: Sistem Deteksi Keselamatan Pengemudi Mobil Berbasis Android**

---

## 2. Anggota Tim – DegorPrimo

- **Arya Bima Setyono** – Ketua Tim
- **Muhammad Hilman Ansory**
- **Muhammad Mikail Alfasya**
- **Mikhail Trupathy Setiawan**

---

## 3. Deskripsi Singkat Proyek

SafeDrive adalah aplikasi mobile berbasis **Android** yang berfungsi sebagai untuk membantu meningkatkan keselamatan berkendara. Aplikasi ini memanfaatkan kamera depan perangkat dan teknologi **computer vision** untuk memantau kondisi wajah pengemudi secara real-time, khususnya tingkat kewaspadaan melalui analisis mata dan keberadaan wajah.

Dengan pendekatan *real-time face landmark detection*, SafeDrive mampu memberikan peringatan dini ketika terdeteksi tanda-tanda kelelahan atau kantuk pada pengemudi. Sistem ini dirancang sebagai solusi preventif untuk mengurangi risiko kecelakaan lalu lintas yang disebabkan oleh faktor kelelahan

---

## 4. Permasalahan yang Diangkat

Kelelahan dan kantuk pengemudi merupakan salah satu penyebab utama kecelakaan lalu lintas, terutama pada perjalanan jarak jauh atau berkendara di malam hari. Banyak pengemudi tidak menyadari bahwa tingkat kewaspadaan mereka telah menurun hingga kondisi menjadi berbahaya.

Permasalahan utama yang diangkat dalam proyek ini adalah **kurangnya sistem peringatan dini yang bersifat personal dan real-time** untuk mendeteksi kondisi kantuk pengemudi. SafeDrive hadir untuk menjawab masalah tersebut dengan menyediakan sistem monitoring otomatis yang mampu memberikan notifikasi dan peringatan suara ketika kondisi berbahaya terdeteksi

---

## 5. Fitur Utama

### ✅ Deteksi Kondisi Wajah Real-Time

- Deteksi keberadaan wajah pengemudi
- Monitoring status mata (terbuka / tertutup)
- Monitoring status mulut (senyum / tidak senyum)

### ✅ Logika Deteksi Kelelahan Bertahap

SafeDrive menerapkan **logika berbasis durasi**:

| Kondisi                                           | Aksi Sistem                      |
| ------------------------------------------------- | -------------------------------- |
| Mata tertutup ≥ 2 detik                           | Peringatan awal + suara          |
| Mata tertutup ≥ 5 detik                           | Peringatan kuat + suara          |
| Wajah tidak terdeteksi / mata tertutup ≥ 30 detik | Notifikasi bahaya (tap required) |

📌 **Pengecualian penting:**  
Jika mata tertutup **dan** mulut terdeteksi senyum, sistem **tidak memicu alert**, karena dikategorikan sebagai kondisi non-kantuk.

### ✅ Audio & Notification Alert

- Peringatan suara menggunakan file audio
- Notifikasi Android dengan tingkat prioritas tinggi
- Notifikasi bahaya bersifat persistent

---

## 6. Teknologi yang Digunakan

- **React Native (CLI)** – pengembangan aplikasi mobile
- **TypeScript** – bahasa pemrograman utama
- **react-native-vision-camera** – akses kamera real-time
- **react-native-vision-camera-face-detector** – deteksi wajah dan landmark
- **ML Kit / MediaPipe Face Landmarker** – analisis landmark wajah
- **react-native-worklets-core** – optimasi frame processing
- **Android SDK & Gradle** – build & deployment
- **Node.js & npm** – manajemen dependensi

---

## 7. Arsitektur Sistem (MVP)

1. Kamera depan menangkap frame video secara real-time
2. Frame diproses menggunakan Vision Camera + Face Detector
3. Landmark wajah dianalisis (mata & mulut)
4. Logika waktu (timer-based) menentukan tingkat kewaspadaan
5. Sistem mengirim:

   - Audio alert
   - Notifikasi visual

6. UI menampilkan status pengemudi secara langsung

---

## 8. Panduan Instalasi

### Prasyarat

- Node.js (disarankan versi LTS)
- npm atau yarn
- Android Studio (Android SDK & Emulator)
- JDK 17 (sesuai rekomendasi React Native)
- Perangkat Android fisik (disarankan untuk testing kamera)

---

### Langkah Instalasi

1. Clone repository:

```bash
git clone https://github.com/username/safedrive.git
cd safedrive
```

2. Install dependensi:

```bash
npm install
```

3. Bersihkan dan siapkan build Android:

```bash
cd android
./gradlew clean
cd ..
```

---

## 9. Cara Menjalankan Aplikasi

1. Hubungkan perangkat Android atau jalankan emulator
2. Jalankan Metro bundler:

```bash
npx react-native start
```

3. Jalankan aplikasi di Android:

```bash
npx react-native run-android
```

4. Berikan izin kamera & notifikasi
5. Arahkan kamera ke wajah pengemudi
6. Sistem akan:

   - Menampilkan status wajah, mata, dan mulut
   - Memberikan peringatan suara & notifikasi saat terdeteksi kantuk

---

_Dokumen README ini dapat dikembangkan lebih lanjut sesuai kebutuhan proyek dan kompetisi/hackathon yang diikuti._
