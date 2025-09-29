import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

// SVG logos
import CrownLogo from '../assets/images/Logo_Quartier_Libre_Couronne.svg';

export default function ProfileScreen() {
  // Photos de profil pré-chargées
  const profilePhotos = [
    { id: 1, component: CrownLogo, name: 'Avatar 1', type: 'svg' },
    { id: 2, source: require('../assets/images/Logo_Quartier_Libre.png'), name: 'Avatar 2', type: 'image' },
    { id: 3, source: require('../assets/images/icon.png'), name: 'Avatar 3', type: 'image' },
    { id: 4, source: require('../assets/images/react-logo.png'), name: 'Avatar 4', type: 'image' },
  ];

  const [selectedPhoto, setSelectedPhoto] = useState(profilePhotos[0]);

  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#EEF1FF" 
        translucent={false} 
      />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header with back button */}
      <View style={styles.headerRow}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#627BFF" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Informations personnelles</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container}>

        <View style={styles.headerCard}>
          <View style={styles.iconWrapper}>
            <Ionicons name="star" size={18} color="#fff" />
          </View>
          <Text style={styles.headerText}>Mes informations personnelles</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Nom</Text>
          <Text style={styles.value}>Doe</Text>

          <Text style={styles.label}>Prénom</Text>
          <Text style={styles.value}>John</Text>

          <Text style={styles.label}>Date de naissance</Text>
          <Text style={styles.value}>04/09/2000</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Adresse mail</Text>
          <Text style={styles.value}>john.doe@gmail.com</Text>

          <Text style={styles.label}>Numéro de téléphone</Text>
          <Text style={styles.value}>0683291926</Text>

          <Text style={styles.label}>Adresse</Text>
          <Text style={styles.value}>16 Rue Théodore Blanc</Text>
        </View>

        {/* Section Photo de profil */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Photo de profil</Text>

          {/* Photo actuellement sélectionnée */}
          <View style={styles.currentPhotoContainer}>
            {selectedPhoto.type === 'svg' && selectedPhoto.component ? (
              <View style={styles.svgContainer}>
                <selectedPhoto.component width={80} height={80} />
              </View>
            ) : (
              <Image source={selectedPhoto.source} style={styles.currentPhoto} />
            )}
            <Text style={styles.currentPhotoText}>Photo actuelle</Text>
          </View>

          {/* Sélection de nouvelles photos */}
          <Text style={styles.choosePhotoText}>Choisir une nouvelle photo :</Text>
          <View style={styles.photoGrid}>
            {profilePhotos.map((photo) => (
              <TouchableOpacity
                key={photo.id}
                style={[
                  styles.photoOption,
                  selectedPhoto.id === photo.id && styles.selectedPhotoOption
                ]}
                onPress={() => setSelectedPhoto(photo)}
              >
                {photo.type === 'svg' && photo.component ? (
                  <View style={styles.photoGridSvgContainer}>
                    <photo.component width={60} height={60} />
                  </View>
                ) : (
                  <Image source={photo.source} style={styles.photoOptionImage} />
                )}
                {selectedPhoto.id === photo.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark-circle" size={20} color="#4f46e5" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF1FF', // Match profile page background
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#EEF1FF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
    color: '#0B0F2F',
  },
  placeholder: {
    width: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#EEF1FF', // Match profile page background
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
    fontFamily: 'Manrope_600SemiBold',
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
    fontFamily: 'Manrope_400Regular',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Manrope_600SemiBold',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
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
  svgContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentPhotoText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    fontFamily: 'Manrope_500Medium',
  },
  choosePhotoText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Manrope_600SemiBold',
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
  photoGridSvgContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
})