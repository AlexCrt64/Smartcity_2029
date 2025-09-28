import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Modal, 
  ScrollView 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { UrlTile } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  // Exemple de projets
  const projets = Array.from({ length: 20 }, (_, i) => `Projet ${i + 1}`);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* MAP */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 44.84,
          longitude: -0.58,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
      </MapView>

      {/* TOP BUTTONS */}
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="mail-outline" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigate("/profile")}
        >
          <Ionicons name="person-outline" size={24} color="blue" />
        </TouchableOpacity>
      </View>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomPanel}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.bottomText}>Voir Tous les projets</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tous les projets</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {projets.map((projet, index) => (
                <View key={index} style={styles.projectItem}>
                  <Text style={styles.projectText}>{projet}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },

  topButtons: {
    position: "absolute",
    top: 48,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  iconButton: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  bottomPanel: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    backgroundColor: "#627BFF",
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    color: "white",
    fontWeight: "700",
    fontFamily: "Manrope_700Bold",
    marginHorizontal: 10,
    fontSize: 16,
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    height: height * 0.6,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  projectItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  projectText: {
    fontSize: 16,
  },
});