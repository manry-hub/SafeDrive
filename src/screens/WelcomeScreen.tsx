import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = StackScreenProps<AuthStackParamList, 'Welcome'>;

export const WelcomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.content}>
        <Icon
          name="megaphone-outline"
          size={50}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.title}>
          Menurut data Kepolisian, rata-rata 3 orang meninggal setiap jam akibat
          kecelakaan.
        </Text>
        <Text style={styles.author}>— KAPOLRI</Text>
      </View>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Icon name="arrow-forward" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40BFFF',
    padding: 30,
    justifyContent: 'space-between',
  },
  content: { marginTop: 80 },
  icon: { marginBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', lineHeight: 34 },
  author: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 30,
    textTransform: 'uppercase',
  },
  arrowButton: { alignSelf: 'flex-end', marginBottom: 40 },
});
