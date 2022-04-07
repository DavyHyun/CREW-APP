import { signOut } from '@firebase/auth'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import { auth } from '../firebase'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";


const HomeScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      const db = getDatabase();
      var userId = getAuth().currentUser.uid;
      const nameRef = ref(db, 'users/' + userId + '/personalInfo');
      onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        setName(data.name)
    });
  } catch (error) {
    console.log(error);
  }
}, [])


  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.navigate("Log In or Sign Up");
      console.log('success');
    })
  }

  const navigateToQUIZ = () => {
    navigation.navigate("Ready")
  }



  return (

    <View style={styles.view}>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToQUIZ}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Single Player</Text>
      </TouchableOpacity>
      <TouchableOpacity

        style={styles.button}
      >
        <Text style={styles.buttonText}>Multi Player</Text>
      </TouchableOpacity>
    </View>




  )
}

export default HomeScreen

const styles = StyleSheet.create({
  view: {
    marginTop: '10%',
  },
  button: {
    width: '80%',
    padding: 16,
    borderRadius: 40,
    alignItems: 'center',
    backgroundColor: '#36649E',
    marginBottom: 15
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    // fontFamily: OpenSans_SemiBold,
  },

})


