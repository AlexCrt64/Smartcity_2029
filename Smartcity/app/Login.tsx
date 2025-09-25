import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { navigate } from 'expo-router/build/global-state/routing'

const Login = () => {
  return (
    <View>
      <View style={styles.buttonConnect}>
        <Button onPress={() => navigate('/Home')} title="Connexion" color="#666FAB" accessibilityLabel="Bouton pour valider sa connexion" />
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    buttonConnect:{
        backgroundColor: "#36418F",
        borderRadius: 10,
        fontFamily: 'Manrope',
        marginBottom: 18,
        width: 353,
        height: 56,
        justifyContent: 'center'
    }
}
)