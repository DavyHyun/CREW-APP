import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/core'
import { getDatabase, ref, set, get, child, onValue, push } from "firebase/database";
import { useEffect } from 'react/cjs/react.development';
import { getAuth } from "firebase/auth";
import AppLoading from 'expo-app-loading';
// import { FlatList } from 'react-native-gesture-handler';
import { render } from 'react-dom';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
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
import { Touchable } from 'react-native-web';

const WaitingRoom = () => {
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
    const navigation = useNavigation();
    const route = useRoute();
    const roomID = route.params;
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);


    useEffect(() => {
        try {
            const db = getDatabase();
            const usersRef = ref(db, 'lobby/' + roomID + '/users');
            const gameStatusRef = ref(db, 'lobby/' + roomID + '/gameStatus');
            onValue(usersRef, (snapshot) => {
                const list = [];
                snapshot.forEach(player => {
                    var name = player.val().personName;
                    list.push({
                        personName: name,
                        key: player.key
                    })
                })
                setPlayers(list);
                setLoading(false);
            })
            onValue(gameStatusRef, (snapshot) =>{
                if(snapshot.val()){
                    navigateToReady();
                }
            })
        } catch (error) {
            console.log(error);
        }
    }, [])

    const startGame = () => {
        try {
            const db = getDatabase();
            set(ref(db, 'lobby/' + roomID + '/gameStatus'), true)
        } catch (error) {
            console.log(error);
        }
    }

    const navigateToReady = () => {
        navigation.navigate("MultiplayerReady", roomID);
    }



    const goBack = () => {
        navigation.goBack();
    }
    if (loading) {
        return <ActivityIndicator />
    }
    if(!fontsLoaded) {
        return <AppLoading />
    }
    return (
        <View style={styles.background}>
            <TouchableOpacity
                onPress={goBack}
                style={{ top: '5%', left: '2.5%' }}>
                <Ionicons name="md-chevron-back" size={40} color="black" />
            </TouchableOpacity>
            <View style={styles.topContainer}>
                <Text style={styles.label}>CODE #: </Text>
                <Text style={styles.roomID}>{roomID}</Text>
            </View>
            <Text style={styles.listLabel}>PLAYERS IN THE ROOM:</Text>
            <View style={styles.playerList}>
            <FlatList
                data={players}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        {item.key %2 == 0 ? <Octicons name="person" size={24} color="#FFD056" style={styles.personIcon} /> :
                            <Fontisto name="person" size={24} color="#FFC223" style={styles.personIcon}/>
                        }
                        
                        <Text style={styles.listItemText}>{item.personName}</Text>
                    </View>
                )}
            />
            <TouchableOpacity
            onPress={startGame}>
                <Text>Start</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default WaitingRoom;

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#FFD73F',
        height: '100%',
        flex: 1,
    },
    topContainer: {
        top: '15%',
        left: '5%',
        flexDirection: 'row'

    },
    label: {
        fontFamily: 'Nunito_500Medium_Italic',
        fontSize: 20
    },
    listLabel: {
        fontFamily: 'Nunito_500Medium_Italic',
        fontSize: 20,
        top: '8%',
        left: '11%',
    },
    roomID: {
        fontFamily: 'Nunito_700Bold_Italic',
        fontSize: 30,
        bottom: '2%',
        left: '10%',
    },
    playerList: {
        top: '10%',
        marginHorizontal: '10%',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(0,0,0, 0.6)',
        shadowOffset: { height: 3.5, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        height: '60%',
        // paddingLeft: '8%',
        paddingTop: '6%',
    },
    listItem: {
       marginVertical: '0.9%',
        flexDirection: 'row',
    },
    listItemText: {
        fontFamily: 'Nunito_400Regular',
        fontSize: 20,
        left: '160%'
    },
    personIcon: {
        left: '80%',
    },
})