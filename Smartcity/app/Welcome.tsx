import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'
import { navigate } from 'expo-router/build/global-state/routing'

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Crown_Logo.png')} style={styles.logo}/>
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
        backgroundColor: "#F4F5FF"
    },
    logo:{
        marginBottom: 100
    },
    title:{
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Manrope',
        marginBottom: 11
    },
    content:{
        fontSize: 17,
        fontWeight: 'regular',
        fontFamily: 'Manrope',
        marginBottom: 55,
        width: 319,
        textAlign: 'center'
    },
    buttonConnect:{
        backgroundColor: "#36418F",
        borderRadius: 10,
        fontFamily: 'Manrope',
        marginBottom: 18,
        width: 353,
        height: 56,
        justifyContent: 'center'
    },
    buttonSignUp:{
        backgroundColor: "#F4F5FF",
        borderColor: "#DADFFF",
        borderWidth: 1,
        borderRadius: 10,
        fontFamily: 'Manrope',
        width: 353,
        height: 56,
        justifyContent: 'center'
    }
}
)