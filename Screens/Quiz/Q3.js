import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

const Q3 = () => {
    const [isTimerStart, setIsTimerStart] = useState(true);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(6000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const route = useRoute();
    const navigation = useNavigation();
    // useEffect (() => {
    //     setTimeout(() => {
    //         navigation.navigate("Q2");
    //     }, 5000) 
    // }, [])

    const navigateToDisplayT = () => {
        const progress = {
            Q1: route.params.Q1,
            Q2: route.params.Q2,
            Q3: 'true',
        }
        setIsTimerStart(false);
        navigation.navigate("Display", progress);
    }

    const navigateToDisplayF = () => {
        const progress = {
            Q1: route.params.Q1,
            Q2: route.params.Q2,
            Q3: 'false',
        }
        setIsTimerStart(false);
        navigation.navigate("Display", progress);
    }
  return (
    <View style={{marginTop: '20%'}}>
      <Text >Q3</Text>
      <Timer
            totalDuration={timerDuration}
            msecs
            //Time Duration
            start={isTimerStart}
            //To start
            reset={resetTimer}
            //To reset
            // options={options}
            //options for the styling
            handleFinish={() => {
              navigation.navigate("Display")
            }}
            //can call a function On finish of the time
            // getTime={(time) => {
            //   console.log(time);
            // }}
          />
    <TouchableOpacity
        onPress={navigateToDisplayT}
        style={styles.button}
      >
        <Text style={styles.buttonText}>yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToDisplayF}
        style={styles.button}
      >
        <Text style={styles.buttonText}>no</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Q3

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