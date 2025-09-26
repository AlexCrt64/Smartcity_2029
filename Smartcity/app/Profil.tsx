import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'

// SVG icons (handled by react-native-svg-transformer)
import MailIcon from '../assets/images/mail icon.svg'
import AccountIcon from '../assets/images/account icon.svg'
import InfoPersoIcon from '../assets/images/infos personnelles icon.svg'
import PaperclipIcon from '../assets/images/trombone account.svg'
import LogoutIcon from '../assets/images/deconnexion icon.svg'
import DeleteIcon from '../assets/images/delete account icon.svg'

const Profil = () => {
  const router = useRouter()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header icons */}
      <View style={styles.headerRow}>
        <View style={styles.headerIconWrap}>
          <MailIcon width={20} height={20} />
        </View>
        <Image
          source={require('../assets/images/Crown_Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerIconWrap}>
          <AccountIcon width={20} height={20} />
        </View>
      </View>

      {/* Mon compte */}
      <Text style={styles.sectionTitle}>Mon compte</Text>
      <Pressable
        onPress={() => router.push('/informations_perso')}
        style={styles.card}
        android_ripple={{ color: '#E7ECFF' }}
      >
        <View style={styles.cardLeftIcon}>
          <InfoPersoIcon width={18} height={18} />
        </View>
        <Text style={styles.cardText}>Mes informations personnelles</Text>
      </Pressable>

      {/* Informations légales */}
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Informations légales</Text>
      <Pressable
        onPress={() => router.push('/General_condition')}
        style={styles.card}
        android_ripple={{ color: '#E7ECFF' }}
      >
        <View style={styles.cardLeftIcon}>
          <PaperclipIcon width={18} height={18} />
        </View>
        <Text style={styles.cardText}>Conditions générales</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push('/Legal_Mention')}
        style={styles.card}
        android_ripple={{ color: '#E7ECFF' }}
      >
        <View style={styles.cardLeftIcon}>
          <PaperclipIcon width={18} height={18} />
        </View>
        <Text style={styles.cardText}>Mentions légales</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push('/Privacy_Policy')}
        style={styles.card}
        android_ripple={{ color: '#E7ECFF' }}
      >
        <View style={styles.cardLeftIcon}>
          <PaperclipIcon width={18} height={18} />
        </View>
        <Text style={styles.cardText}>Politique de confidentialité</Text>
      </Pressable>

      {/* Bottom actions */}
      <View style={styles.bottomBlock}>
        <Pressable
          onPress={() => router.push('/Login')}
          style={styles.inlineAction}
          android_ripple={{ color: '#E7ECFF' }}
        >
          <LogoutIcon width={20} height={20} />
          <Text style={styles.inlineActionText}>Me déconnecter</Text>
        </Pressable>
        <Pressable
          onPress={() => {/* TODO: Confirm and handle account deletion */ }}
          style={[styles.inlineAction, { marginTop: 12 }]}
          android_ripple={{ color: '#E7ECFF' }}
        >
          <DeleteIcon width={20} height={20} />
          <Text style={styles.inlineActionText}>Supprimer mon compte</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default Profil

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1FF',
  },
  content: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIconWrap: {
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
  logo: {
    width: 40,
    height: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0B0F2F',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E6EAF8',
  },
  cardLeftIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#0B0F2F',
    fontWeight: '600',
  },
  bottomBlock: {
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E6EAF8',
  },
  inlineAction: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  inlineActionText: {
    fontSize: 16,
    color: '#0B0F2F',
    fontWeight: '600',
    marginLeft: 10,
  },
})