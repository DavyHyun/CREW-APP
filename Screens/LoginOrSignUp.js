import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import {useFonts} from "expo-font"
import {AppLoading} from "expo"

const LoginOrSignUp = () => {

    let navigation = useNavigation();


    const navigateToLogin = () => {
        navigation.navigate("Login"); 
      }

    const navigateToSignUp =() => {
        navigation.navigate("SignUp")
    }
    return (
        <View style ={styles.container}>
        <Image source={require('../assets/images/frosty_!!_❄️.png')} style={styles.image}/>
        <Text style={styles.title}>FROSTY</Text>
        <View style={styles.loginContainer}>
        <Text style={styles.subText}>
          By clicking Log In or Sign Up, you agree to our Terms. Learn how we process your data in our Privacy Policy and Cookies Policy
        </Text>
        <TouchableOpacity
        onPress={navigateToLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToSignUp}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.fp}>Forgot Password?</Text>
      </View>
        </View>
    )
}

export default LoginOrSignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      },
      image: {
        width: 300,
        height: 370,
        
      },
      loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
        width: '100%',
      },
      title: {
        fontSize: 30,
        // color: colors.black,
        textAlign: 'center',
        // fontFamily: 'OpenSans-Bold',
        marginHorizontal: 60,
        // fontFamily: 'OpenSans_SemiBold',
        marginTop: 20,
      },
      subText: {
        textAlign: 'center',
        fontSize: 10,
        width: '80%',
        marginBottom: 30,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        // fontFamily: OpenSans_SemiBold,
      },
      fp: {
        fontSize: 16,
        color: "#AAAAAA"
      },
      button: {
        width: '80%',
        padding: 16,
        borderRadius: 40,
        alignItems: 'center',
        backgroundColor: '#36649E',
        marginBottom: 15
      }

})
