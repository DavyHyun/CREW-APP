import { signOut } from '@firebase/auth'
import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useEffect, useState, FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, TextInput } from 'react-native'
import { auth } from '../../firebase'
import { getDatabase, ref, set, get, child, onValue, push } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { SimpleLineIcons } from '@expo/vector-icons'; 


const ResInfo = () => {


  const navigation = useNavigation();

//   const[resname, setresName] = useState(item);
  const [visible, setVisible] = useState(false);
  const [review, setReview] = useState("");
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
  const [personName, setPersonName] = useState("");

  const db = getDatabase();
  const restReviewRef = ref(db, 'restaurants/' + resname);
  useEffect(() => {
    try {
      var userId = getAuth().currentUser.uid;
      const nameRef = ref(db, 'users/' + userId + '/personalInfo');
      onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        setPersonName(data.name);
    });

  } catch (error) {
    console.log(error);
  }
}, [])
  
  

  const addInfo= () => {
    const newPostRef = push(restReviewRef);
    set(newPostRef, {
      Review: review,
      Name: personName,
    })
  }

  const displayReviews = () => {
    const resRef = ref(db, 'restaurants/' + resname);
    onValue(resRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(childKey)
        console.log(childData.Review)
        console.log(childData.Name)
      });
    }, {
      onlyOnce: true
    });
  }

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
        </View>
        <View style={{marginTop: '10%'}}>
        <TextInput
            placeholder="Add review"
            style={styles.input}
            fontSize= {15}
            value={review}
            onChangeText={text => {setReview(text)}}
         />
        </View>
        <TouchableOpacity
                    onPress={addInfo}
                    style={styles.button}
                >
                    <Text style={styles.buttonTextL}>add review</Text>
         </TouchableOpacity>
         <TouchableOpacity
                    onPress={displayReviews}
                    style={styles.button}
                >
                    <Text style={styles.buttonTextL}>display review</Text>
         </TouchableOpacity>
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
input: {
  // marginHorizontal: 10,
  marginLeft: '3%',
  padding: 5,
  borderColor: 'white',
  borderRadius: 5,
  borderWidth: 2,
  width: '80%'
  // alignItems:'center',
  // justifyContent: 'center',
  // flex: 1,fgfg
},
button: {
  width: '100%',
  padding: '2%',
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

})