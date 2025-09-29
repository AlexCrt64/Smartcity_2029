import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function ProfileScreen() {
  const profilePhotos = [
    { id: 1, source: require('../assets/images/Crown_Logo.png'), name: 'Avatar 1' },
    { id: 2, source: require('../assets/images/Logo_Quartier_Libre.png'), name: 'Avatar 2' },
    { id: 3, source: require('../assets/images/icon.png'), name: 'Avatar 3' },
    { id: 4, source: require('../assets/images/react-logo.png'), name: 'Avatar 4' },
  ];

  const [selectedPhoto, setSelectedPhoto] = useState(profilePhotos[0]);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  return (
    <ScrollView style={styles.container}>

      <View style={styles.headerCard}>
        <View style={styles.iconWrapper}>
          <Ionicons name="star" size={18} color="#fff" />
        </View>
        <Text style={styles.headerText}>Mes informations personnelles</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nom</Text>
        <Text style={styles.value}>Test</Text>

        <Text style={styles.label}>Prénom</Text>
        <Text style={styles.value}>Test</Text>

        <Text style={styles.label}>Date de naissance</Text>
        <Text style={styles.value}>Test</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Adresse mail</Text>
        <Text style={styles.value}>Test</Text>

        <Text style={styles.label}>Numéro de téléphone</Text>
        <Text style={styles.value}>Test</Text>

        <Text style={styles.label}>Adresse</Text>
        <Text style={styles.value}>Test</Text>
      </View>

      {/* Section Photo de profil */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Photo de profil</Text>
        
        {/* Photo actuellement sélectionnée */}
        <TouchableOpacity 
          style={styles.currentPhotoContainer}
          onPress={() => setShowPhotoOptions(!showPhotoOptions)}
        >
          <Image source={selectedPhoto.source} style={styles.currentPhoto} />
          <Text style={styles.currentPhotoText}>Photo actuelle</Text>
          <Text style={styles.tapToChangeText}>Appuyer pour changer</Text>
          <Ionicons 
            name={showPhotoOptions ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#6b7280" 
            style={styles.chevronIcon}
          />
        </TouchableOpacity>

        {/* Sélection de nouvelles photos - Affiché seulement si showPhotoOptions est true */}
        {showPhotoOptions && (
          <>
            <Text style={styles.choosePhotoText}>Choisir une nouvelle photo :</Text>
            <View style={styles.photoGrid}>
              {profilePhotos.map((photo) => (
                <TouchableOpacity
                  key={photo.id}
                  style={[
                    styles.photoOption,
                    selectedPhoto.id === photo.id && styles.selectedPhotoOption
                  ]}
                  onPress={() => {
                    setSelectedPhoto(photo);
                    setShowPhotoOptions(false); // Fermer la grille après sélection
                  }}
                >
                  <Image source={photo.source} style={styles.photoOptionImage} />
                  {selectedPhoto.id === photo.id && (
                    <View style={styles.selectedIndicator}>
                      <Ionicons name="checkmark-circle" size={20} color="#4f46e5" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9ff',
    padding: 16,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 35,
    elevation: 2,
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  iconWrapper: {
    backgroundColor: '#4f46e5',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerText: {
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 12,
    color: '#6b7280', 
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1f2937',
  },
  currentPhotoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  currentPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  currentPhotoText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  tapToChangeText: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: 4,
  },
  chevronIcon: {
    marginTop: 8,
  },
  choosePhotoText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#374151',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoOption: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
  },
  selectedPhotoOption: {
    borderColor: '#4f46e5',
  },
  photoOptionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
})

