import { signOut } from '@firebase/auth'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import { auth } from '../../firebase'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { SimpleLineIcons } from '@expo/vector-icons';


const List = ({ route }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);



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
    try {
      const obj = route.params.score;
      console.log(obj);
      console.log("useeffect has been run");
    } catch (error) {
      console.log(error);
      console.log("useeffect has been run");
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.Top}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
        // style={styles.backButton}
        >
          <SimpleLineIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text>Your List</Text>
        <Text>{score}</Text>
      </View>
    </View>
  )
}

export default List

const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'black'
  },


  Top: {
    // height: '50%',
    width: '80%',
    marginTop: '15%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'blue',
  },

})

