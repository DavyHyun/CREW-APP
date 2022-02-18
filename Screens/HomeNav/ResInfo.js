import { signOut } from '@firebase/auth'
import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useEffect, useState, FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import { auth } from '../../firebase'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { SimpleLineIcons } from '@expo/vector-icons'; 


const ResInfo = () => {
  const navigation = useNavigation();
//   const[resname, setresName] = useState(item);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const route = useRoute();
  const resname = route.params.name;
  const fsr = route.params.fsr;
  const address = route.params.address;
  const location = route.params.location;
  const type = route.params.type;
  const typeUpper = type.toUpperCase();
  const price = route.params.price;
  const popular = route.params.popular;
  const recommendation = route.params.recommendation;
  const monday = route.params.monday;
  const tuesday = route.params.tuesday;
  const wednesday = route.params.wednesday;
  const thursday = route.params.thursday;
  const friday = route.params.friday;
  const saturday = route.params.saturday;
  const sunday = route.params.sunday;
  const tea = route.params.tea;


  useEffect(() => {
    try {
        let testvar;
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

  return (
      <View style={styles.container}>
        <View style={styles.Top}>
        <TouchableOpacity
                onPress={()=> navigation.openDrawer()}
                // style={styles.backButton}
            >
                <SimpleLineIcons name="menu" size={24} color="black" />
            </TouchableOpacity>
        </View>
        <View style={{marginTop: '10%'}}>
            <Text>Restaurant Name: {resname}</Text>
            <Text>Food Safety Rating: {fsr}</Text>
            <Text>Address: {address}</Text>
            <Text>Location: {location}</Text>
            <Text>Type: {typeUpper}</Text>
            <Text>Price Range: {price}</Text>
            <Text>Popular Food: {popular}</Text>
            <Text>Recommendation: {recommendation}</Text>
            <Text>Hours:</Text>
            <Text>Monday: {monday}</Text>
            <Text>Tuesday: {tuesday}</Text>
            <Text>Wednesday: {wednesday}</Text>
            <Text>Thursday: {thursday}</Text>
            <Text>Friday: {friday}</Text>
            <Text>Saturday: {saturday}</Text>
            <Text>Sunday: {sunday}</Text>
            <Text></Text>
            <Text>One Line Tea: {tea}</Text>
            <Image
                
                source={{uri:'https://fastly.4sqi.net/img/general/width960/1130758_PgO-wJqcbNpfptgNnnklaJ2TlwKyHom2_v5nGWVKgag.jpg'}}
            />
        </View>
      </View>
  )
}

export default ResInfo

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