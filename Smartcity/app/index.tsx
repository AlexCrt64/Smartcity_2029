<<<<<<< HEAD
import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
=======
import { Image, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { navigate } from "expo-router/build/global-state/routing";
>>>>>>> origin/main

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
<<<<<<< HEAD
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Pressable
        onPress={() => router.push('/account')}
        style={{ marginTop: 24, backgroundColor: '#111827', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Aller à mon compte</Text>
      </Pressable>
      {/* Bouton temporaire vers /Profil (alias de la page compte) */}
      <Pressable
        onPress={() => router.push('/Profil')}
        style={{ marginTop: 12, backgroundColor: '#2563EB', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Aller à mon profil (/Profil)</Text>
      </Pressable>
=======
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
>>>>>>> origin/main
    </View>
  );
}
