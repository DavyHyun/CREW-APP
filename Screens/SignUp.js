import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth';
import { useNavigation } from '@react-navigation/core';
import React, {useState, useEffect} from 'react'
import firebase from "firebase/compat/app";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import {auth} from '../firebase';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const database = getDatabase();

    const navigation = useNavigation();

    // useEffect(() => {
    //     auth.onAuthStateChanged(user => {
    //         if (user) {
    //           navigation.replace("Home")
    //         }
    //       })
    // }, [])

    // const handleGoogle = async () => {

    // }

    const handleSignUp = async () => {
      try {
          const user = await createUserWithEmailAndPassword(auth, email, password);
          var userId = getAuth().currentUser.uid;
          set(ref(database, 'users/' + userId + '/personalInfo'), {
            name: "placeholder"
      })
          navigation.navigate("PersonalInfo");
      } catch (error) {
          console.log(error.message);
      }
  }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
            <Text style={styles.su}>Sign Up!</Text>
                <TextInput 
                    placeholder="Email"
                    value={email}
                    onChangeText={text => {setEmail(text)}}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Password"
                    value={password}
                    onChangeText={text => {setPassword(text)}}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput 
                    placeholder="Confirm Password"
                    value={password}
                    // onChangeText={text => {setPassword(text)}}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.lineContainer}>
          <View style={{flex: 1, height: 1, backgroundColor: '#2A6F97'}} />
              <View>
                <Text style={{width: 50, textAlign: 'center'}}>Or</Text>
              </View>
           <View style={{flex: 1, height: 1, backgroundColor: '#2A6F97'}} />
          </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    // onPress={handleGoogle}
                    style={styles.buttonOther}
                >
                    <Image source={require("../assets/images/GoogleLogo.png")} style={styles.logo}/>
                    <Text style={styles.buttonText}>    Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    // onPress={handleFacebook}
                    style={styles.buttonOther}
                >
                    <Image source={require("../assets/images/FacebookLogo.webp")} style={styles.logo}/>
                    <Text style={styles.buttonText}>    Continue with Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={styles.button}
                >
                    <Text style={styles.buttonTextL}>Next</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      },
      inputContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        
        marginTop: 5,
        marginBottom: 10,
        width: '95%',
        borderStyle: 'solid',
        borderBottomColor: '#2A6F97',
        borderBottomWidth: 1,
        borderColor: 'black',
        opacity: 50
      },
      buttonContainer: {
        width: '83%',
        justifyContent: 'center',
        alignItems: 'center',
        
        // marginTop: 40,
      },
      buttonOther: {
        display: 'flex',
        width: '100%',
        padding: '4%',
        borderRadius: 40,
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: '2%',
        borderStyle: 'solid',
        borderColor: '#36649E',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // margin: 2
      },
      button: {
        width: '100%',
        padding: '5%',
        borderRadius: 40,
        alignItems: 'center',
        backgroundColor: '#36649E',
        marginBottom: '2%',
        borderStyle: 'solid',
        borderColor: '#36649E',
        borderWidth: 1,
        marginTop: '15%'
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
      },
      buttonText: {
        color: '#36649E',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonTextL: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
      },
      su: {
        marginBottom: 30,
        fontSize: 24,
        fontWeight: 'bold'
      },
      lineContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        // flex: 1,
        width: '85%',
        marginTop: '5%',
        marginBottom: '5%',
        opacity: 0.5,

      },
      logo: {
        height: 20,
        width: 20
      }
})