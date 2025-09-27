import React, { useEffect } from 'react'
import { Stack } from "expo-router";
import { Text as RNText, TextInput as RNTextInput } from 'react-native'
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  })

  useEffect(() => {
    if (!fontsLoaded) return
    // Apply Manrope as the default font for Text and TextInput
    const TextAny = RNText as any
    const TextInputAny = RNTextInput as any

    TextAny.defaultProps = TextAny.defaultProps || {}
    const prevText = TextAny.defaultProps.style
    TextAny.defaultProps.style = [
      ...(Array.isArray(prevText) ? prevText : prevText ? [prevText] : []),
      { fontFamily: 'Manrope_400Regular' },
    ]

    TextInputAny.defaultProps = TextInputAny.defaultProps || {}
    const prevInput = TextInputAny.defaultProps.style
    TextInputAny.defaultProps.style = [
      ...(Array.isArray(prevInput) ? prevInput : prevInput ? [prevInput] : []),
      { fontFamily: 'Manrope_400Regular' },
    ]
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="sign_up" options={{ headerShown: false }} />
      {/* Legal / policy pages without Expo header */}
      <Stack.Screen name="general_conditions" options={{ headerShown: false }} />
      <Stack.Screen name="legal_mentions" options={{ headerShown: false }} />
      <Stack.Screen name="privacy_policy" options={{ headerShown: false }} />
    </Stack>
  );
}
