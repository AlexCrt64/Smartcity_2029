import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { navigate } from 'expo-router/build/global-state/routing'
import { Entypo } from '@expo/vector-icons'
import BackSvg from '../assets/images/icon_back.svg'
import Logo from '../assets/images/Logo_for_login.svg'

const Login = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headcontainer}>
        <TouchableOpacity onPress={() => navigate('/welcome')}>
          <BackSvg width={25} height={25} style={{ marginBottom: 54 }} />
        </TouchableOpacity>
        <View style={{ marginBottom: 54 }}>
          <Logo width={163.5} height={51.35} />
        </View>
        <Text style={styles.title}>
          Se connecter :
        </Text>
      </View>
      <View>
        <View>
          <Text style={styles.Input_title}>
            Adresse mail :
          </Text>
          <View style={styles.Input_container}>
            <Entypo name='email' size={18} color={'#000000'} style={styles.icon} />
            <TextInput style={styles.Input_content} placeholder='Entrer votre email' />
          </View>
        </View>
        <View>
          <Text style={styles.Input_title}>
            Mot de passe :
          </Text>
          <View style={styles.Input_container2}>
            <Entypo name='lock' size={18} color={'#000000'} style={styles.icon} />
            <TextInput style={styles.Input_content} placeholder='Saisisser voter mot de passe' />
          </View>
          <Text style={styles.forgot_password}>
            Mot de passe oublié ?
          </Text>
        </View>
      </View>
      <Pressable style={styles.buttonConnect} onPress={() => navigate('/home')} accessibilityLabel="Bouton pour valider sa connexion">
        <Text style={styles.buttonConnectText}>Connexion</Text>
      </Pressable>
      <View style={styles.nocompteContainer}>
        <Text style={styles.NocompteText}>
          Pas de compte ?
        </Text>
        <TouchableOpacity onPress={() => navigate('/sign_up')}>
          <Text style={styles.CreatecompteText}>
            Crée un compte !
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F5FF"
  },
  headcontainer: {
    marginLeft: 24,
    alignItems: 'flex-start',
    width: '100%'
  },
  back: {
    color: '#5982CF',
    width: 25,
    height: 25
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Manrope_700Bold',
    marginBottom: 20
  },
  Input_title: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Manrope_600SemiBold',
    marginBottom: 4
  },
  Input_container: {
    width: 347,
    maxHeight: 48,
    flex: 2,
    flexDirection: 'row',
    borderColor: '#DADFFF',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 45
  },
  Input_container2: {
    width: 347,
    maxHeight: 48,
    flex: 2,
    flexDirection: 'row',
    borderColor: '#DADFFF',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 4
  },
  icon: {
    marginLeft: 13
  },
  Input_content: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Manrope_500Medium',
    color: '#000000',
    marginLeft: 14
  },
  forgot_password: {
    fontSize: 10,
    color: '#000000',
    fontFamily: 'Manrope_400Regular',
    marginBottom: 58
  },
  buttonConnect: {
    backgroundColor: "#36418F",
    borderRadius: 10,
    marginBottom: 18,
    width: 353,
    height: 56,
    justifyContent: 'center'
  },
  buttonConnectText: {
    color: '#F4F5FF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
  },
  nocompteContainer: {
    flexDirection: 'row'
  },
  NocompteText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold'
  },
  CreatecompteText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
    color: '#5982CF',
    marginLeft: 2
  }
}
)