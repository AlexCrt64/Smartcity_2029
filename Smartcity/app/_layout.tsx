import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
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
