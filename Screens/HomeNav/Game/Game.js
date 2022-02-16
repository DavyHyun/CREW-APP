import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { SimpleLineIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { GameEngine } from 'react-native-game-engine';
import entities from '../../../entities';
import Physics from './physics';


const Game = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)

  useEffect(() => {
    try {
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
    setRunning(false)
  }, [])

  return (
    <View style={{flex: 1}}>
      <View style={styles.Top}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
        >
          <SimpleLineIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text>{currentPoints}</Text>
      </View>

      <GameEngine
        ref={(ref) => { setGameEngine(ref) }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false)
              gameEngine.stop()
              navigation.navigate("List", {
                score: currentPoints
              })
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1)
              break;
          }
        }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}
      >
        <StatusBar style="auto" hidden={true} />

      </GameEngine>

              

      {!running ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 0 }}>
          <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10, zIndex: 0 }}
            onPress={() => {
              setCurrentPoints(0)
              setRunning(true)
              gameEngine.swap(entities())
            }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              START GAME
            </Text>
          </TouchableOpacity>

        </View> : null}
      </View>
  )
}

export default Game

const styles = StyleSheet.create({

  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor:'black'
  },


  Top: {
    // height: '50%',
    width: '100%',
    paddingHorizontal: '5%',
    marginTop: '15%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'blue',
    zIndex: 10,
  },

  

})

