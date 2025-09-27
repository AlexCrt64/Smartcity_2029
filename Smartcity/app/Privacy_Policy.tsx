import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

import BackSvg from '../assets/images/icon_back.svg'
import PaperclipIcon from '../assets/images/trombone account.svg'

const PrivacyPolicy = () => {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable style={styles.backPill} onPress={() => router.back()} android_ripple={{ color: '#E7ECFF' }}>
            <BackSvg width={16} height={16} />
          </Pressable>
        </View>

        <View style={styles.card}>
          <View style={styles.cardLeftIcon}>
            <PaperclipIcon width={18} height={18} />
          </View>
          <Text style={styles.cardText}>Politique de confidentialité</Text>
        </View>

        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sapien a porttitor luctus, felis
          sapien vehicula nisl, nec viverra urna sem sit amet nulla. Integer egestas justo vel erat consequat, ut
          feugiat erat posuere.
        </Text>
        <Text style={styles.paragraph}>
          Aegean pretium felis at mi tempor, eget pulvinar purus posuere. Sed viverra magna ac ligula ullamcorper,
          nec imperdiet eros varius. Nam tincidunt nisi id dui hendrerit, nec fermentum nibh dictum. Cras dapibus massa
          nec purus consequat, vitae sollicitudin nisl porta. Sed eu risus porttitor, pulvinar mi sit amet, vestibulum lectus.
          Suspendisse potenti.
        </Text>
        <Text style={styles.paragraph}>
          Curabitur sodales diam nec velit interdum, in tincidunt justo aliquam. Fusce fringilla, mauris eget lacinia
          dapibus, libero ligula sagittis nisl, ac dignissim eros purus ac mi. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Pellentesque sed neque sed nulla imperdiet ultrices. Aliquam erat
          volutpat. Duis venenatis neque ac ipsum facilisis, sed luctus enim congue. Donec tristique, odio sed rhoncus
          convallis, magna quam rhoncus ipsum.
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF1FF',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    padding: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backPill: {
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
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
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#0B0F2F',
    marginBottom: 14,
  },
})