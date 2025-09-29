import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { router } from 'expo-router';

// SVG logo
import CrownLogo from '../assets/images/Logo_Quartier_Libre.svg';

const Welcome = () => {
  useEffect(() => {
    // Auto-navigate after 500ms
    const timer = setTimeout(() => {
      router.replace('/main');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CrownLogo width={240} height={240} style={styles.logo} />
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F5FF"
  },
  logo: {
    marginTop: 8,
  }
});