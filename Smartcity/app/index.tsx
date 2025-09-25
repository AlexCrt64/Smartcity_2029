import { Image, TouchableOpacity, View, } from "react-native";
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
    <TouchableOpacity onPress={() => navigate('./Welcome')}>
      <Image source={require('../assets/images/Logo_Quartier_Libre.png')} />
    </TouchableOpacity>
    </View>
  );
}
