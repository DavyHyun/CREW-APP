import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

const Q1 = () => {
    const [isTimerStart, setIsTimerStart] = useState(true);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(6000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    // useEffect (() => {
        
    // }, [])

    const navigateToQ2T = () => {
        const progress = {
            Q1: 'true',
            Q2: route.params.Q2,
            Q3: route.params.Q3,
        }
        setIsTimerStart(false);
        navigation.navigate("Q2", progress);
    }

    const navigateToQ2F = () => {
        const progress = {
            Q1: 'false',
            Q2: route.params.Q2,
            Q3: route.params.Q3,
        }
        setIsTimerStart(false);
        navigation.navigate("Q2", progress);
    }
  return (
    <View style={{marginTop: '20%'}}>
      <Text >Q1</Text>
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
              navigation.navigate("Q2")
            }}
            //can call a function On finish of the time
            // getTime={(time) => {
            //   console.log(time);
            // }}
          />
    <TouchableOpacity
        onPress={navigateToQ2T}
        style={styles.button}
      >
        <Text style={styles.buttonText}>yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToQ2F}
        style={styles.button}
      >
        <Text style={styles.buttonText}>no</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Q1

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