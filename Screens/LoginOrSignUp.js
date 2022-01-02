import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'


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
        <TouchableOpacity
        onPress={navigateToLogin}
      >
        <Text >Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToSignUp}
      >
        <Text >Sign Up</Text>
      </TouchableOpacity>
        </View>
    )
}

export default LoginOrSignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})
