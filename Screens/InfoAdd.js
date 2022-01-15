import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { useNavigation } from '@react-navigation/core'
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getAuth } from "firebase/auth";
// Options data must contain 'item' & 'id' keys

const LOCATIONS = [
  {
    item: 'North',
  },
  {
    item: 'West',
  },
  {
    item: 'Apartment',
  },
  {
    item: 'Commute',
  },
  {
    item: 'Other',
  },
]
const PREF = [
  {
    item: 'Asian',
    id: 'ASI',
  },
  {
    item: 'Vegetarian',
    id: 'VEG',
  },
  {
    item: 'American',
    id: 'AME',
  },
  {
    item: 'Fast Food',
    id: 'FAST',
  },
  {
    item: 'Mediterranean',
    id: 'MED',
  },
]
const PRICE = [
  {
    item: '$',
  },
  {
    item: '$$',
  },
  {
    item: '$$$',
  },
]

function InfoAdd() {
  const [location, setLocation] = useState({})
  const [price, setPrice] = useState({})
  const [pref, setPref] = useState([])
  const navigation = useNavigation();
  const db = getDatabase();
  
  
  const addInfo = () => {
      var userId = getAuth().currentUser.uid;
       set(ref(db, 'users/' + userId + '/foodInfo'), {
            location: location,
            preference: pref,
            priceRange: price,
      })
      navigation.navigate("Home");
  }

  return (
    
    <View style={styles.container}>
      <View style={{ height: 40 }} />
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, paddingBottom: 25, textAlign: 'center', fontWeight: 'bold' }}>Help Us Get To Know You Better!</Text>
      </View>
      {/* <View style={styles.inputContainer}> */}
      <Text style={{ fontSize: 20, paddingBottom: 10, fontWeight: 'bold', textAlign: 'left',marginTop: '10%' }}>Location</Text>
      <SelectBox
        label="Select one"
        options={LOCATIONS}
        value={location}
        arrowIconColor='#36649E'
        onChange={onLChange()}
        hideInputFilter={false}
      />
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10, fontWeight: 'bold' }}>Food Preferences</Text>
      <SelectBox
        label="Choose all that apply"
        options={PREF}
        selectedValues={pref}
        arrowIconColor='#36649E'
        searchIconColor="#36649E"
        toggleIconColor="#36649E"
        multiOptionContainerStyle={{backgroundColor: '#36649E'}}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10, fontWeight: 'bold' }}>Price Range</Text>
      <SelectBox
        label="Select one"
        options={PRICE}
        value={price}
        arrowIconColor='#36649E'
        searchIconColor="#36649E"
        toggleIconColor="#36649E"
        multiOptionContainerStyle={{backgroundColor: '#36649E'}}
        onChange={onPChange()}
        hideInputFilter={false}
      />
      {/* </View> */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          onPress={addInfo}
           style={styles.button}
      >
       <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
      </View>
    </View>
  )

  function onMultiChange() {
    return (item) => setPref(xorBy(pref, [item], 'id'))
  }

  function onLChange() {
    return (val) => setLocation(val)
  }
  function onPChange() {
    return (val) => setPrice(val)
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
    }
})

export default InfoAdd
