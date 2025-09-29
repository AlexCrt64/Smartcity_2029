import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Modal, 
  ScrollView,
  Alert,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { UrlTile, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import CrownLogo from '../assets/images/Logo_Quartier_Libre_Couronne.svg';

const { width, height } = Dimensions.get("window");

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

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  location: string;
  status: string;
  submittedBy: 'CITY' | 'CITIZEN';
  budget: number;
  voteCount: {
    up: number;
    down: number;
    total: number;
    score: number;
  };
}

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'CITY' | 'CITIZEN'>('ALL');

  const filteredProjects = projects.filter(project => {
    if (filter === 'ALL') return true;
    return project.submittedBy === filter;
  });

  useEffect(() => {
    fetchProjects();
  }, []); 
  const refreshProjects = () => {
    fetchProjects();
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.projects);
        console.log(`✅ Loaded ${data.projects.length} community projects from Bordeaux`);
      } else {
        console.error('Failed to load projects:', data.error);
        Alert.alert('Erreur', 'Impossible de charger les projets');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      Alert.alert('Erreur', 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const onMarkerPress = (project: Project) => {
    router.push(`/project/${project.id}`);
  };

  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent={true} 
      />
      <SafeAreaView style={styles.container} edges={[]}>
      {/* MAP */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 44.8378,
          longitude: -0.5792,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        showsCompass={false}
        showsScale={false}
        showsUserLocation={false}
        showsMyLocationButton={false}
        minZoomLevel={11}
        maxZoomLevel={17}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={false}
        rotateEnabled={false}
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        
        {/* Project Markers */}
        {projects.map((project) => (
          <Marker
            key={project.id}
            coordinate={{
              latitude: project.latitude,
              longitude: project.longitude,
            }}
            onPress={() => onMarkerPress(project)}
          >
            <View style={[
              styles.markerContainer,
              { backgroundColor: getStatusColor(project.status) }
            ]}>
              <Ionicons 
                name={getCategoryIcon(project.category) as any} 
                size={18} 
                color="white" 
              />
              {/* User icon for citizen-submitted projects */}
              {project.submittedBy === 'CITIZEN' && (
                <View style={styles.userIcon}>
                  <Ionicons name="person" size={12} color="white" />
                </View>
              )}
              {project.voteCount.total > 0 && (
                <View style={styles.voteCount}>
                  <Text style={styles.voteCountText}>{project.voteCount.score}</Text>
                </View>
              )}
            </View>
          </Marker>
        ))}
      </MapView>

      {/* TOP BAR */}
      <View style={styles.topBarContainer}>
        {/* Logo Layer (behind) */}
        <View style={styles.logoLayer}>
          <CrownLogo width={56} height={56} />
        </View>
        
        {/* Controls Layer (front) */}
        <View style={styles.controlsLayer}>
          <View style={styles.projectCountTop}>
            <Text style={styles.projectCountTopText}>
              {projects.length} projets
            </Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push("/profile")}
          >
            <Ionicons name="person-outline" size={28} color="blue" />
          </TouchableOpacity>
        </View>
      </View>

      {/* FLOATING ACTION BUTTON - BOÎTE À IDÉES */}
      <TouchableOpacity 
        style={styles.fabButton}
        onPress={() => router.push('/boite-a-idees')}
      >
        <Ionicons name="bulb" size={24} color="white" />
      </TouchableOpacity>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomPanel}>
        <TouchableOpacity 
          style={styles.bottomButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="list" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.bottomText}>
            Voir tous les projets ({projects.length})
          </Text>
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
            {/* Header with back button */}
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.modalBackButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="arrow-back" size={24} color="#627BFF" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Projets civiques à Bordeaux</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color="#627BFF" />
              </TouchableOpacity>
            </View>
            
            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
              <TouchableOpacity 
                style={[styles.filterButton, filter === 'ALL' && styles.filterButtonActive]}
                onPress={() => setFilter('ALL')}
              >
                <Text style={[styles.filterText, filter === 'ALL' && styles.filterTextActive]}>
                  Tous ({projects.length})
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterButton, filter === 'CITY' && styles.filterButtonActive]}
                onPress={() => setFilter('CITY')}
              >
                <Text style={[styles.filterText, filter === 'CITY' && styles.filterTextActive]}>
                  Ville ({projects.filter(p => p.submittedBy === 'CITY').length})
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterButton, filter === 'CITIZEN' && styles.filterButtonActive]}
                onPress={() => setFilter('CITIZEN')}
              >
                <Text style={[styles.filterText, filter === 'CITIZEN' && styles.filterTextActive]}>
                  Citoyens ({projects.filter(p => p.submittedBy === 'CITIZEN').length})
                </Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {filteredProjects.map((project) => (
                <TouchableOpacity 
                  key={project.id} 
                  style={styles.projectCard}
                  onPress={() => {
                    setModalVisible(false);
                    router.push(`/project/${project.id}`);
                  }}
                >
                  <View style={styles.projectHeader}>
                    <View style={[
                      styles.projectIconWrap,
                      { backgroundColor: getStatusColor(project.status) }
                    ]}>
                      <Ionicons 
                        name={getCategoryIcon(project.category) as any} 
                        size={18} 
                        color="white" 
                      />
                    </View>
                    <View style={styles.projectInfo}>
                      <Text style={styles.projectTitle}>{project.title}</Text>
                      <Text style={styles.projectLocation}>📍 {project.location}</Text>
                    </View>
                    <View style={[
                      styles.submissionBadge,
                      { backgroundColor: project.submittedBy === 'CITY' ? '#4A90E2' : '#27AE60' }
                    ]}>
                      <Text style={styles.submissionBadgeText}>
                        {project.submittedBy === 'CITY' ? 'Ville' : 'Citoyen'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.projectDescription} numberOfLines={2}>
                    {project.description}
                  </Text>
                  <View style={styles.projectFooter}>
                    <Text style={styles.projectBudget}>
                      💰 {project.budget?.toLocaleString()}€
                    </Text>
                    <View style={styles.projectVotes}>
                      <Text style={styles.voteText}>👍 {project.voteCount.up}</Text>
                      <Text style={styles.voteText}>👎 {project.voteCount.down}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },

  markerContainer: {
    backgroundColor: '#FF9800',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
    minHeight: 36,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  voteCount: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  userIcon: {
    position: "absolute",
    top: -8,
    left: -8,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  voteCountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  topBarContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: 60,
    paddingHorizontal: 20,
  },
  logoLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  controlsLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 2,
  },
  projectCountTop: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 56,
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  projectCountTopText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 14,
    color: "blue",
    textAlign: "center",
  },
  profileButton: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  iconButton: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  projectCount: {
    position: 'absolute',
    top: 100,
    left: 20,
    backgroundColor: 'rgba(98, 123, 255, 0.9)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  projectCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  fabButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  bottomPanel: {
    position: "absolute",
    bottom: 16,
    left: 20,
    right: 20,
    backgroundColor: "#627BFF",
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  bottomButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  bottomText: {
    color: "white",
    fontWeight: "700",
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    flexShrink: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    height: height * 0.85,
    backgroundColor: "#EEF1FF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalBackButton: {
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: 'Manrope_700Bold',
    color: "#0B0F2F",
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E6EAF8',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  projectIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: 'Manrope_600SemiBold',
    color: "#0B0F2F",
    marginBottom: 4,
  },
  projectLocation: {
    fontSize: 14,
    color: "#666",
  },
  projectDescription: {
    fontSize: 14,
    color: "#777",
    lineHeight: 20,
    marginBottom: 12,
    marginLeft: 44,
  },
  projectFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 44,
  },
  projectBudget: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: 'Manrope_600SemiBold',
    color: "#4CAF50",
  },
  projectVotes: {
    flexDirection: "row",
    gap: 12,
  },
  voteText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: 'Manrope_600SemiBold',
    color: "#627BFF",
  },
  projectText: {
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E6EAF8',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#627BFF',
    borderColor: '#627BFF',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Manrope_600SemiBold',
    color: '#666FAB',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  submissionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  submissionBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
    color: '#FFFFFF',
  },
});