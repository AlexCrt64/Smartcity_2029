import { Image, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { navigate } from "expo-router/build/global-state/routing";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigate('./welcome')}>
        <Image source={require('../assets/images/Logo_Quartier_Libre.png')} />
      </TouchableOpacity>
    </View>
  );
}
