import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import MapView, { UrlTile } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";

const { width, height } = Dimensions.get("window");

export default function Home() {
  return (
    <View style={styles.container}>
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
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="mail-outline" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigate("/Profil")}
        >
          <Ionicons name="person-outline" size={24} color="blue" />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomPanel}>
        <Ionicons name="arrow-up-outline" size={20} color="white" />
        <Text style={styles.bottomText}>SWIPE UP</Text>
        <Ionicons name="arrow-up-outline" size={20} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },

  topButtons: {
    position: "absolute",
    top: 50,
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
    bottom: 0,
    width: "100%",
    backgroundColor: "#627BFF",
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 10,
    fontSize: 16,
  },
});