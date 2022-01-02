import { signOut } from '@firebase/auth'
import { useNavigation } from '@react-navigation/core'
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import { getDatabase, ref, set, get, child } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const database = getDatabase();
  const dbref = ref(database);
  

  const handleSignOut = () => {
    signOut(auth).then(() => {
        navigation.replace("Login");
    })
  }


  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
