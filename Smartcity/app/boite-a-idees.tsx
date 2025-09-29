import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function BoiteAIdees() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('ESPACES_VERTS');
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { value: 'ESPACES_VERTS', label: '🌿 Espaces Verts' },
    { value: 'TRANSPORT', label: '🚲 Transport' },
    { value: 'LOGEMENT', label: '🏠 Logement' },
    { value: 'EQUIPEMENTS_PUBLICS', label: '🏛️ Équipements Publics' },
    { value: 'AMENAGEMENT_URBAIN', label: '🏗️ Aménagement Urbain' },
  ];

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !location.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs requis.');
      return;
    }

    setSubmitting(true);
    
    try {
      // For now, we'll create it directly as a citizen-submitted project
      // In the future, this could go to IdeaSubmission table first for approval
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          category,
          location,
          // Default Bordeaux coordinates - in real app, user would pick on map
          latitude: 44.8378 + (Math.random() - 0.5) * 0.01, // Slight variation around Bordeaux
          longitude: -0.5792 + (Math.random() - 0.5) * 0.01,
          submittedBy: 'CITIZEN',
          status: 'VOTE_EN_COURS', // Projects go straight to voting
        }),
      });

      if (response.ok) {
        Alert.alert(
          'Merci !',
          'Votre idée a été publiée avec succès ! Elle est maintenant visible sur la carte et les citoyens peuvent commencer à voter.',
          [
            {
              text: 'Voir sur la carte',
              onPress: () => router.back(),
            },
          ]
        );
        
        // Reset form
        setTitle('');
        setDescription('');
        setLocation('');
        setCategory('ESPACES_VERTS');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting idea:', error);
      Alert.alert('Erreur', 'Impossible de soumettre votre idée. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF1FF" translucent={false} />
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#627BFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Boîte à Idées</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.introSection}>
            <Text style={styles.introTitle}>💡 Partagez votre idée civique</Text>
            <Text style={styles.introText}>
              Proposez un projet qui améliorerait votre quartier ou votre ville. 
              Votre idée sera soumise à la communauté pour qu'elle puisse voter.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Titre du projet *</Text>
              <TextInput
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Ex: Nouveau parc urbain..."
                maxLength={100}
              />
            </View>

            {/* Category */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Catégorie *</Text>
              <View style={styles.categoryContainer}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.value}
                    style={[
                      styles.categoryButton,
                      category === cat.value && styles.categoryButtonActive
                    ]}
                    onPress={() => setCategory(cat.value)}
                  >
                    <Text style={[
                      styles.categoryButtonText,
                      category === cat.value && styles.categoryButtonTextActive
                    ]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Location */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Localisation *</Text>
              <TextInput
                style={styles.textInput}
                value={location}
                onChangeText={setLocation}
                placeholder="Ex: Place Gambetta, Bordeaux"
                maxLength={150}
              />
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description détaillée *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Décrivez votre projet en détail : objectifs, bénéfices pour la communauté, mise en œuvre..."
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                maxLength={500}
              />
              <Text style={styles.charCount}>{description.length}/500</Text>
            </View>

            {/* Info box */}
            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={20} color="#4A90E2" />
              <Text style={styles.infoText}>
                Votre projet sera examiné puis publié pour vote citoyen. 
                Les projets les plus populaires seront prioritaires.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Submit button */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.submitButton, (!title || !description || !location || submitting) && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!title || !description || !location || submitting}
          >
            <Text style={styles.submitButtonText}>
              {submitting ? 'Envoi en cours...' : 'Soumettre mon idée'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
    color: '#0B0F2F',
  },
  content: {
    flex: 1,
  },
  introSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 14,
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
    color: '#0B0F2F',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    fontFamily: 'Manrope_400Regular',
    color: '#666',
    lineHeight: 20,
  },
  form: {
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Manrope_600SemiBold',
    color: '#0B0F2F',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6EAF8',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: 'Manrope_400Regular',
    color: '#0B0F2F',
  },
  textArea: {
    height: 120,
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E6EAF8',
    backgroundColor: '#FFFFFF',
  },
  categoryButtonActive: {
    backgroundColor: '#627BFF',
    borderColor: '#627BFF',
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Manrope_600SemiBold',
    color: '#666FAB',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F0F7FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Manrope_400Regular',
    color: '#4A90E2',
    marginLeft: 12,
    lineHeight: 18,
  },
  bottomSection: {
    padding: 20,
    backgroundColor: '#EEF1FF',
  },
  submitButton: {
    backgroundColor: '#627BFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#C5C5C5',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
    color: '#FFFFFF',
  },
});