import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { useNavigation } from '@react-navigation/core'
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getAuth } from "firebase/auth";
// Options data must contain 'item' & 'id' keys

const MAJORS = [
  {
    item: 'Undecided',
  },
  {
    item: 'Computer Science',
  },
  {
    item: 'Engineering',
  },
  {
    item: 'Business',
  },
  {
    item: 'Communications',
  },
  {
    item: 'Art',
  },
  {
    item: 'History',
  },
]
const YEAR = [
  {
    item: '1st Year',
  },
  {
    item: '2nd Year',
  },
  {
    item: '3rd Year',
  },
  {
    item: '4th Year',
  },
  {
    item: 'Graduate Student',
  },
]


function PersonalInfo() {
  const [major, setMajor] = useState({});
  const [year, setYear] = useState({});
  const [userName, setName] = useState("")
  const navigation = useNavigation();
  const db = getDatabase();
  
  
  const addInfo = () => {
      var userId = getAuth().currentUser.uid;
       set(ref(db, 'users/' + userId + '/personalInfo'), {
            name: userName,
            major: major,
            year: year,
      })
      navigation.navigate("InfoAdd");
  }

  return (
    
    <View style={styles.container}>
      <View style={{ height: 40 }} />
      <View style={{ marginLeft: '5%', width: '90%', alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ fontSize: 20, paddingBottom: 25, textAlign: 'center', fontWeight: 'bold' }}>Please Fill Out The Information Below.</Text>
      </View>
      <Text style={{ fontSize: 20, paddingBottom: 10, fontWeight: 'bold', textAlign: 'left',marginTop: '10%' }}>Name</Text>
      <View style={styles.nameContainer}>
          <TextInput 
            style={styles.name}
            placeholder="Enter your name"
            onChangeText={text => {setName(text)}}
            value={userName}
          />
      </View>
      {/* <View style={styles.inputContainer}> */}
      <Text style={{ fontSize: 20, paddingBottom: 10, fontWeight: 'bold', textAlign: 'left',marginTop: '10%' }}>Major</Text>
      <SelectBox
        options={MAJORS}
        value={major}
        label="Search your major"
        arrowIconColor='#36649E'
        onChange={onMChange()}
        hideInputFilter={false}
      />
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10, fontWeight: 'bold' }}>Year</Text>
      <SelectBox
        options={YEAR}
        value={year}
        label="Select your year"
        arrowIconColor='#36649E'
        searchIconColor="#36649E"
        toggleIconColor="#36649E"
        multiOptionContainerStyle={{backgroundColor: '#36649E'}}
        onChange={onYChange()}
        hideInputFilter={false}
      />
      {/* </View> */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          onPress={addInfo}
           style={styles.button}
      >
       <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      </View>
    </View>
  )


  function onMChange() {
    return (val) => setMajor(val)
  }
  function onYChange() {
    return (val) => setYear(val)
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      margin: 30,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      marginLeft: '20%'
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
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    inputContainer: {
      justifyContent: 'flex-start',
      marginTop: '15%',
      marginBottom: '6%'
    },

    nameContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    name: {
        marginRight: 15,
        paddingVertical: 10,
        // marginTop: 5,
        // marginBottom: 10,
        width: '95%',
        borderStyle: 'solid',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        borderColor: 'black',
        opacity: 100
    },

})

export default PersonalInfo
