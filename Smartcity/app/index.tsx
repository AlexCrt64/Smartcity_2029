import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

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
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Pressable
        onPress={() => router.push('/account')}
        style={{ marginTop: 24, backgroundColor: '#111827', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Aller à mon compte</Text>
      </Pressable>
    </View>
  );
}
