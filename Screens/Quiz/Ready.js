import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/core'

const Ready = () => {
    const[result, setResult] = useState({
        Q1: null,
        Q2: null,
        Q3: null,
    });
    const navigation = useNavigation();
    const navigateToQ1 = () => {
        navigation.navigate("Q1", result);
    }

  return (
    <View style={{marginTop: '10%'}}>
      <Text>Ready</Text>
      <TouchableOpacity
        onPress={navigateToQ1}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Ready

const styles = StyleSheet.create({
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