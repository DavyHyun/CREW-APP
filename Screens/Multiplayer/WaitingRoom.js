import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, SectionList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/core'
import { getDatabase, ref, set, get, child, onValue, push } from "firebase/database";
import { useEffect } from 'react/cjs/react.development';
import { getAuth } from "firebase/auth";
import AppLoading from 'expo-app-loading';
// import { FlatList } from 'react-native-gesture-handler';
import { render } from 'react-dom';

const Item = ({ personName }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{personName}</Text>
    </View>
  );

const WaitingRoom = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const roomID = route.params;
    const playerList = [];
    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );
    let players;

    useEffect(() => {
        try {
            const db = getDatabase();
            const usersRef = ref(db, 'lobby/' + roomID + '/users');
            onValue(usersRef, (snapshot) => {
                players = snapshot.toJSON();
                const length = Object.keys(players).length;
                console.log(players);
                console.log("break");
                for (let index = 0; index < length; index++) {
                    console.log(players[index].personName);
                    playerList.push(players[index].personName);             
                }
                
            })
            
        } catch (error) {
            console.log(error);
        }
    })
    

    const goBack = () => {
        navigation.goBack();
    }
    return (
        <View>
            <Text>WaitingRoom</Text>
            <TouchableOpacity
            onPress={goBack}
            style={{top: 500}}>
                <Text>BACK</Text>
            </TouchableOpacity>
            <Text style={{top: 500}}>{roomID}</Text>
        </View>
    )
}

export default WaitingRoom;