import { Stack } from "expo-router";
import { useEffect } from "react";
import { Text as RNText, TextInput as RNTextInput } from "react-native";
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) return;
    const TextAny = RNText as any;
    const TextInputAny = RNTextInput as any;

    TextAny.defaultProps = TextAny.defaultProps || {};
    const prevText = TextAny.defaultProps.style;
    TextAny.defaultProps.style = [
      ...(Array.isArray(prevText) ? prevText : prevText ? [prevText] : []),
      { fontFamily: "Manrope_400Regular" },
    ];

    TextInputAny.defaultProps = TextInputAny.defaultProps || {};
    const prevInput = TextInputAny.defaultProps.style;
    TextInputAny.defaultProps.style = [
      ...(Array.isArray(prevInput) ? prevInput : prevInput ? [prevInput] : []),
      { fontFamily: "Manrope_400Regular" },
    ];
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="sign_up" />
      <Stack.Screen name="general_conditions" />
      <Stack.Screen name="legal_mentions" />
      <Stack.Screen name="privacy_policy" />
    </Stack>
  );
}
