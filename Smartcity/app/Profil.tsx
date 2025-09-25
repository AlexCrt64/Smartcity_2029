import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { navigate } from 'expo-router/build/global-state/routing'

const Profil = () => {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => navigate('./informations_perso.tsx')}>
            <Text>Mes informations personnelles</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('/Legal_Mention')}>
            <Text>Mentions légales</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('/General_condition')}>
            <Text>Conditions générales</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('/Privacy_Policy')}>
            <Text>Politique de confidentialité</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default Profil

const styles = StyleSheet.create({})