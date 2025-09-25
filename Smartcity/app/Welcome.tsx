import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'
import { navigate } from 'expo-router/build/global-state/routing'

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Crown_Logo.png')} />
      <Text style={styles.title}>
        Explorez votre quartier 
      </Text>
      <Text style={styles.content}>
        Et bien plus encore.. Votre aide a son importance, les choses peuvent changer. 
      </Text>
      <View style={styles.buttonConnect}>
        <Button onPress={() => navigate('/Login')} title="Se connecter" color="#FFFFFF" accessibilityLabel="Se connecter à son compte" />
      </View>
      <View style={styles.buttonSignUp}>
        <Button onPress={() => navigate('/SignUp')} title="Créer un compte" color="#666FAB" accessibilityLabel="Bouton pour créer un compte" />
      </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title:{
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Manrope'
    },
    content:{
        fontSize: 17,
        fontWeight: 'regular',
        fontFamily: 'Manrope'
    },
    buttonConnect:{
        backgroundColor: "#36418F",
        borderRadius: 10,
        fontFamily: 'Manrope'
    },
    buttonSignUp:{
        backgroundColor: "#F4F5FF",
        borderColor: "#DADFFF",
        borderWidth: 1,
        borderRadius: 10,
        fontFamily: 'Manrope'
    }
}
)