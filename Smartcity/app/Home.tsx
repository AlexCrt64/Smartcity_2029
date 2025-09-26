import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { navigate } from 'expo-router/build/global-state/routing'

const Home = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigate('/Profil')}>
        <Text>compte</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})