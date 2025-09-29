import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  location: string;
  status: string;
  budget: number;
  votingStart?: string;
  votingEnd?: string;
  voteCount: {
    up: number;
    down: number;
    total: number;
    score: number;
  };
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'ESPACES_VERTS': return '#4CAF50';
    case 'TRANSPORT': return '#2196F3';
    case 'LOGEMENT': return '#FF9800';
    case 'EQUIPEMENTS_PUBLICS': return '#9C27B0';
    case 'AMENAGEMENT_URBAIN': return '#F44336';
    default: return '#627BFF';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'ESPACES_VERTS': return 'leaf';
    case 'TRANSPORT': return 'bicycle';
    case 'LOGEMENT': return 'home';
    case 'EQUIPEMENTS_PUBLICS': return 'library';
    case 'AMENAGEMENT_URBAIN': return 'build';
    default: return 'location';
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'ESPACES_VERTS': return 'Espaces Verts';
    case 'TRANSPORT': return 'Transport';
    case 'LOGEMENT': return 'Logement';
    case 'EQUIPEMENTS_PUBLICS': return 'Équipements Publics';
    case 'AMENAGEMENT_URBAIN': return 'Aménagement Urbain';
    default: return category;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'VOTE_EN_COURS': return 'Vote en cours';
    case 'PROPOSAL': return 'Proposition';
    case 'APPROUVE': return 'Approuvé';
    case 'EN_TRAVAUX': return 'En travaux';
    case 'TERMINE': return 'Terminé';
    default: return status;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'VOTE_EN_COURS': return '#FF9800';
    case 'PROPOSAL': return '#2196F3';
    case 'APPROUVE': return '#4CAF50';
    case 'EN_TRAVAUX': return '#FFC107';
    case 'TERMINE': return '#9E9E9E';
    default: return '#627BFF';
  }
};

export default function ProjectDetails() {
  const { id } = useLocalSearchParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      
      if (data.success) {
        const foundProject = data.projects.find((p: Project) => p.id === id);
        if (foundProject) {
          setProject(foundProject);
        } else {
          Alert.alert('Erreur', 'Projet non trouvé');
          router.back();
        }
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      Alert.alert('Erreur', 'Impossible de charger le projet');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (voteType: 'UPVOTE' | 'DOWNVOTE') => {
    if (!project || voting) return;

    // Check if voting is allowed
    if (project.status !== 'VOTE_EN_COURS') {
      Alert.alert(
        'Vote non disponible',
        'Le vote n\'est pas ouvert pour ce projet actuellement.'
      );
      return;
    }

    setVoting(true);

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: project.id,
          voteType: voteType,
          sessionId: `demo_${Date.now()}_${Math.random()}`, // Demo session ID
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update project vote count
        setProject({
          ...project,
          voteCount: data.voteCount
        });

        // Show success feedback
        Alert.alert(
          'Vote enregistré !',
          `Votre ${voteType === 'UPVOTE' ? 'vote positif' : 'vote négatif'} a été pris en compte.`,
          [{ text: 'Parfait !', style: 'default' }]
        );
      } else {
        Alert.alert('Erreur', data.error || 'Impossible d\'enregistrer le vote');
      }
    } catch (error) {
      console.error('Error voting:', error);
      Alert.alert('Erreur', 'Erreur de connexion lors du vote');
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#627BFF" />
          <Text style={styles.loadingText}>Chargement du projet...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!project) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#FF4444" />
          <Text style={styles.errorText}>Projet non trouvé</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const canVote = project.status === 'VOTE_EN_COURS';

  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#EEF1FF" 
        translucent={false} 
      />
      <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#627BFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails du projet</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Project Header */}
        <View style={styles.projectHeaderContainer}>
          <View style={styles.categoryBadge}>
            <View style={[
              styles.categoryIcon,
              { backgroundColor: getCategoryColor(project.category) }
            ]}>
              <Ionicons 
                name={getCategoryIcon(project.category) as any} 
                size={20} 
                color="white" 
              />
            </View>
            <Text style={styles.categoryText}>
              {getCategoryLabel(project.category)}
            </Text>
          </View>

          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(project.status) }
          ]}>
            <Text style={styles.statusText}>
              {getStatusLabel(project.status)}
            </Text>
          </View>
        </View>

        {/* Project Title */}
        <Text style={styles.projectTitle}>{project.title}</Text>

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={styles.locationText}>{project.location}</Text>
        </View>

        {/* Description Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Description</Text>
          <Text style={styles.description}>{project.description}</Text>
        </View>

        {/* Budget Card */}
        {project.budget && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Budget</Text>
            <View style={styles.budgetRow}>
              <Ionicons name="cash" size={20} color="#4CAF50" />
              <Text style={styles.budgetText}>
                {project.budget.toLocaleString()} €
              </Text>
            </View>
          </View>
        )}

        {/* Voting Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Votes des citoyens</Text>
          
          <View style={styles.voteStats}>
            <View style={styles.voteStatItem}>
              <Ionicons name="thumbs-up" size={24} color="#4CAF50" />
              <Text style={styles.voteStatNumber}>{project.voteCount.up}</Text>
              <Text style={styles.voteStatLabel}>Pour</Text>
            </View>
            
            <View style={styles.voteStatItem}>
              <Ionicons name="thumbs-down" size={24} color="#F44336" />
              <Text style={styles.voteStatNumber}>{project.voteCount.down}</Text>
              <Text style={styles.voteStatLabel}>Contre</Text>
            </View>
            
            <View style={styles.voteStatItem}>
              <Ionicons name="people" size={24} color="#627BFF" />
              <Text style={styles.voteStatNumber}>{project.voteCount.total}</Text>
              <Text style={styles.voteStatLabel}>Participants</Text>
            </View>
          </View>

          {/* Voting Buttons */}
          {canVote ? (
            <View style={styles.votingButtons}>
              <TouchableOpacity
                style={[styles.voteButton, styles.upvoteButton]}
                onPress={() => handleVote('UPVOTE')}
                disabled={voting}
              >
                {voting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Ionicons name="thumbs-up" size={20} color="white" />
                    <Text style={styles.voteButtonText}>Je soutiens</Text>
                  </>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.voteButton, styles.downvoteButton]}
                onPress={() => handleVote('DOWNVOTE')}
                disabled={voting}
              >
                {voting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Ionicons name="thumbs-down" size={20} color="white" />
                    <Text style={styles.voteButtonText}>Je m'oppose</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.votingDisabled}>
              <Ionicons name="lock-closed" size={20} color="#999" />
              <Text style={styles.votingDisabledText}>
                Le vote n'est pas ouvert pour ce projet
              </Text>
            </View>
          )}
        </View>

        {/* Voting Period Card */}
        {(project.votingStart || project.votingEnd) && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Période de vote</Text>
            {project.votingStart && (
              <Text style={styles.dateText}>
                Début: {new Date(project.votingStart).toLocaleDateString('fr-FR')}
              </Text>
            )}
            {project.votingEnd && (
              <Text style={styles.dateText}>
                Fin: {new Date(project.votingEnd).toLocaleDateString('fr-FR')}
              </Text>
            )}
          </View>
        )}
      </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1FF', // Profile page background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#0B0F2F',
    marginTop: 16,
    marginBottom: 24,
    fontFamily: 'Manrope_600SemiBold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
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
  backButtonText: {
    fontSize: 16,
    color: '#627BFF',
    fontWeight: '600',
    fontFamily: 'Manrope_600SemiBold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
    color: '#0B0F2F',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  projectHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    borderRadius: 20,
    padding: 8,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    fontFamily: 'Manrope_500Medium',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Manrope_600SemiBold',
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
    color: '#0B0F2F',
    marginBottom: 12,
    lineHeight: 32,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
    fontFamily: 'Manrope_400Regular',
  },
  // Profile page inspired cards
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6EAF8',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Manrope_600SemiBold',
    color: '#0B0F2F',
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    fontFamily: 'Manrope_400Regular',
  },
  budgetRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Manrope_600SemiBold',
    color: '#4CAF50',
    marginLeft: 8,
  },
  voteStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#EEF1FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  voteStatItem: {
    alignItems: 'center',
  },
  voteStatNumber: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
    color: '#0B0F2F',
    marginTop: 4,
  },
  voteStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    fontFamily: 'Manrope_400Regular',
  },
  votingButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  voteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  upvoteButton: {
    backgroundColor: '#4CAF50',
  },
  downvoteButton: {
    backgroundColor: '#F44336',
  },
  voteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Manrope_600SemiBold',
  },
  votingDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    gap: 8,
  },
  votingDisabledText: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Manrope_400Regular',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Manrope_400Regular',
  },
});