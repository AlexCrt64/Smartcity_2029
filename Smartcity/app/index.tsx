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
    <TouchableOpacity onPress={() => navigate('./Welcome')}>
      <Image source={require('../assets/images/Logo_Quartier_Libre.png')} />
    </TouchableOpacity>
    {/* TODO: Bouton temporaire pour accéder à la page Profil (à supprimer après vos modifs) */}
    <TouchableOpacity
      onPress={() => navigate('/Profil')}
      style={{ marginTop: 24, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#4A90E2', borderRadius: 8 }}
    >
      <Text style={{ color: 'white', fontWeight: '600' }}>Aller au Profil</Text>
    </TouchableOpacity>
    </View>
  );
}
