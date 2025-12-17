import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const beep = new Sound('beeps_mid_pitch.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('Sound load error', error);
  }
});

export const playBeep = () => {
  beep.stop(() => {
    beep.play();
  });
};
