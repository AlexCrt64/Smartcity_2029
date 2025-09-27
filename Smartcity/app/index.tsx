import { Image, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import React from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => router.push('/welcome')}>
        <Image source={require('../assets/images/Logo_Quartier_Libre.png')} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
