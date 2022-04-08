import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/core'
import { getDatabase, ref, set, get, child, onValue, push } from "firebase/database";
import { useEffect } from 'react/cjs/react.development';
import { getAuth } from "firebase/auth";


const Ready = () => {

  let today = new Date();
  let dayOf = today.getDay();
  var weekday=new Array(7);
  weekday[1]="monday";
  weekday[2]="tuesday";
  weekday[3]="wednesday";
  weekday[4]="thursday";
  weekday[5]="friday";
  weekday[6]="saturday";
  weekday[7]="sunday";
  
  const isFocused = useIsFocused();
  const [questions, setQuestions] = useState("");
  const [day, setDay] = useState(weekday[dayOf]);
  const [questionSet, setQuestionSet] = useState();
  const[result, setResult] = useState({});

  useEffect(() => {
    if (isFocused) {
    try {
      const db = getDatabase();
      const nameRef = ref(db, 'quiz/' + day);
      onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        setQuestionSet(data);
    });
  } catch (error) {
    console.log(error);
  }
  setResult({
    Q1: null,
    Q2: null,
    Q3: null,
    QSet: questionSet,
  })
  }

  console.log(questionSet);
  console.log(result);
  }, [questionSet], [result])

    const navigation = useNavigation();
    const navigateToQ1 = () => {
      navigation.navigate("Q1", result);
    }
    const callBack = () => {
      console.log('hi')
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