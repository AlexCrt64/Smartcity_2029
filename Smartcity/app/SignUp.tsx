import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { navigate } from 'expo-router/build/global-state/routing'
import { Entypo } from '@expo/vector-icons'
import BackSvg from '../assets/images/icon_back.svg'
import Logo from '../assets/images/Logo_for_login.svg'

const SignUp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headcontainer}>
        <TouchableOpacity onPress={() => navigate('/Welcome')}>
            <BackSvg width={25} height={25} marginBottom={54} />
        </TouchableOpacity>
        <View>
          <Logo width={163.5} height={51.35} marginBottom={54} />
        </View>
        <Text style={styles.title}>
            Créer un compte :
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
          <View style={styles.Input_container}>
            <Entypo name='lock' size={18} color={'#000000'} style={styles.icon} />
            <TextInput style={styles.Input_content} placeholder='Saisisser votre mot de passe' />
          </View>
        </View>
        <View>
          <Text style={styles.Input_title}>
            Confirmation du mot de passe :
          </Text>
          <View style={styles.Input_container}>
            <Entypo name='lock' size={18} color={'#000000'} style={styles.icon} />
            <TextInput style={styles.Input_content} placeholder='Confirmé la saissie de votre mot de passe' />
          </View>
        </View>
      </View>
      <View style={styles.buttonConnect}>
        <Button onPress={() => navigate('/Home')} title="Connexion" color="#F4F5FF" accessibilityLabel="Bouton pour valider sa connexion" />
      </View>
      <View style={styles.nocompteContainer}>
        <Text style={styles.NocompteText}>
            Déjà un compte ?
        </Text>
        <TouchableOpacity onPress={() => navigate('/Login')}>
            <Text style={styles.CreatecompteText}>
                Connecte toi !
            </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F5FF"
    },
    headcontainer:{
        marginLeft: 24,
        alignItems: 'flex-start',
        width: '100%'
    },
    back:{
        color: '#5982CF',
        width: 25,
        height: 25
    },
    title:{
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Manrope',
        marginBottom: 20
    },
    Input_title:{
        fontSize: 15,
        fontFamily: 'Manrope',
        fontWeight: 'semibold',
        marginBottom: 4
    },
    Input_container:{
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
    Input_container2:{
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
    icon:{
        marginLeft: 13
    },
    Input_content:{
        fontFamily: 'Manrope',
        fontSize: 12,
        fontWeight: 'medium',
        color: '#000000',
        marginLeft: 14
    },
    forgot_password:{
        fontSize: 10,
        color: '#000000',
        fontFamily: 'Manrope',
        marginBottom: 58
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
    nocompteContainer:{
        flexDirection: 'row'
    },
    NocompteText:{
        fontFamily: 'Manrope',
        fontSize: 14,
        fontWeight: 'bold'
    },
    CreatecompteText:{
        fontFamily: 'Manrope',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#5982CF',
        marginLeft: 2
    }
}
)