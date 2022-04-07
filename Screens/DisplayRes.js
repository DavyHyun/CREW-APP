import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'


const DisplayRes = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const result = route.params;
  return (
    <View style={{marginTop: '10%'}}>
      <Text>DisplayRes</Text>
      <Text>{result.Q1}</Text>
      <Text>{result.Q2}</Text>
      <Text>{result.Q3}</Text>
    </View>
  )
}

export default DisplayRes

const styles = StyleSheet.create({})