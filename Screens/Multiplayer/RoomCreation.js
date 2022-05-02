import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/core'
import { getDatabase, ref, set, get, child, onValue, push, firebase } from "firebase/database";
import { useEffect } from 'react/cjs/react.development';
import { getAuth } from "firebase/auth";
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light_Italic,
    Nunito_400Regular_Italic,
    Nunito_500Medium_Italic,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black_Italic,
} from '@expo-google-fonts/nunito';
import { NavigationContainer } from '@react-navigation/native';

const RoomCreation = () => {
    let [fontsLoaded] = useFonts({
        Nunito_200ExtraLight,
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_600SemiBold,
        Nunito_700Bold,
        Nunito_800ExtraBold,
        Nunito_900Black,
        Nunito_200ExtraLight_Italic,
        Nunito_300Light_Italic,
        Nunito_400Regular_Italic,
        Nunito_500Medium_Italic,
        Nunito_600SemiBold_Italic,
        Nunito_700Bold_Italic,
        Nunito_800ExtraBold_Italic,
        Nunito_900Black_Italic,
    });
    const [personName, setPersonName] = useState("");
    const [roomID, setRoomID] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        try {
            const db = getDatabase();
            var userId = getAuth().currentUser.uid;
            const nRef = ref(db, 'users/' + userId);
            onValue(nRef, (snapshot) => {
                const data = snapshot.val();
                setPersonName(data.name.split(" ")[0].toUpperCase());
            });
        } catch (error) {
            console.log(error);
        }

    }, [])

    const createRoom = (roomID) => {
        try {
            const db = getDatabase();
            set(ref(db, 'lobby/' + roomID), {
                users: {
                    player: personName
                },
                speedScore: 0,
                moodScore: 0,
                weatherScore: 0,
            })
            set(ref(db, 'lobby/' + roomID + '/users/' + personName), {
                personName
            })
            navigation.navigate("WaitingRoom", roomID);
        } catch (error) {
            console.log(error);
            alert("code is in use, try a different code");
        }
    }
    const checkRoomID = (roomID) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `lobby/${roomID}`)).then((snapshot) => {
            if (snapshot.exists()) {
                alert("Code already in use");
            } else {
                createRoom(roomID);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const joinRoom = (roomID) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `lobby/${roomID}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const db = getDatabase();
                set(ref(db, 'lobby/' + roomID + '/users/' + personName), {
                    personName
                })
                navigation.navigate("WaitingRoom", roomID);
            } else {
                alert("Code doesn't exist!");
            }
        }).catch((error) => {
            console.error(error);
        });
    }



    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <View style={styles.background}>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Insert or Create game code here"
                    placeholderTextColor={'#000000'}
                    autoCorrect={false}
                    maxLength={5}
                    textAlign="center"
                    onChangeText={text => { setRoomID(text) }}
                />

                <TouchableOpacity
                    style={styles.joinButton}
                    onPress={() => joinRoom(roomID)}
                >
                    <Text style={{ alignSelf: 'center', fontFamily: 'Nunito_400Regular', top: '15%', fontSize: '25%' }}>Join</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => checkRoomID(roomID)}
                >
                    <Text style={{ alignSelf: 'center', fontFamily: 'Nunito_400Regular', top: '15%', fontSize: '25%' }}>Create</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default RoomCreation;

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#FFD73F',
        height: '100%',
        flex: 1,
    },
    inputBox: {
        top: '33%',
        borderWidth: 1,
        marginHorizontal: '20%',
        height: '7%',
        // borderRadius: 1000,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20
    },
    joinButton: {
        top: '40%',
        borderWidth: 1,
        marginHorizontal: '30%',
        height: '5%',
        borderRadius: 1000,
        backgroundColor: '#FFFFFF',
    },
    createButton: {
        top: '41%',
        borderWidth: 1,
        marginHorizontal: '30%',
        height: '5%',
        borderRadius: 1000,
        backgroundColor: '#FFFFFF',
    },

})