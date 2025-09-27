import { Image, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import React from "react";
import { navigate } from "expo-router/build/global-state/routing";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigate('./welcome')}>
        <Image source={require('../assets/images/Logo_Quartier_Libre.png')} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
