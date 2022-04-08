import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'


const DisplayRes = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const result = route.params;
  const back = () => {
      navigation.navigate("HomeScreen")
  }
  return (
    <View style={{marginTop: '10%'}}>
      <Text>DisplayRes</Text>
      <Text>{result.Q1}</Text>
      <Text>{result.Q2}</Text>
      <Text>{result.Q3}</Text>
      <TouchableOpacity
        onPress= {back}
      >
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DisplayRes

const styles = StyleSheet.create({})