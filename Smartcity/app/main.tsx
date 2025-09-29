import { StyleSheet, Text, View, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { navigate } from 'expo-router/build/global-state/routing'

// SVG logo
import CrownLogo from '../assets/images/Logo_Quartier_Libre_Couronne.svg';

export default function Main() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CrownLogo width={120} height={120} style={styles.logo} />
      <Text style={styles.title}>
        Explorez votre quartier
      </Text>
      <Text style={styles.content}>
        Et bien plus encore.. Votre aide a son importance, les choses peuvent changer.
      </Text>
      <Pressable style={styles.buttonConnect} onPress={() => navigate('/login')} accessibilityLabel="Se connecter à son compte">
        <Text style={styles.buttonConnectText}>Se connecter</Text>
      </Pressable>
      <Pressable style={styles.buttonSignUp} onPress={() => navigate('/sign_up')} accessibilityLabel="Bouton pour créer un compte">
        <Text style={styles.buttonSignUpText}>Créer un compte</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F5FF"
  },
  logo: {
    marginTop: 8,
    marginBottom: 32
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Manrope_700Bold',
    marginBottom: 11
  },
  content: {
    fontSize: 17,
    fontFamily: 'Manrope_400Regular',
    marginBottom: 55,
    width: 319,
    textAlign: 'center'
  },
  buttonConnect: {
    backgroundColor: "#36418F",
    borderRadius: 10,
    marginBottom: 18,
    width: 353,
    height: 56,
    justifyContent: 'center'
  },
  buttonConnectText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
  },
  buttonSignUp: {
    backgroundColor: "#F4F5FF",
    borderColor: "#DADFFF",
    borderWidth: 1,
    borderRadius: 10,
    width: 353,
    height: 56,
    justifyContent: 'center'
  },
  buttonSignUpText: {
    color: '#666FAB',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
  }
})