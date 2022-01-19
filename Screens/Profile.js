import React, { useState, useEffect } from "react";
import { Image, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { auth } from '../firebase'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'
import UploadImage from '../components/UploadImage';



const Profile = () => {
    const navigation = useNavigation();
    const database = getDatabase();
    const dbref = ref(database);
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        try {
            const db = getDatabase();
            var userId = getAuth().currentUser.uid;
            const nameRef = ref(db, 'users/' + userId + '/personalInfo');
            onValue(nameRef, (snapshot) => {
                const data = snapshot.val();
                setName(data.name)
                setMajor(data.major.item)
                setYear(data.year.item)
            });
        } catch (error) {
            console.log(error);
        }
    }, [])

    const navigateToHome = () => {
        navigation.replace("Home");
    }
    const navigateToChat = () => {
        navigation.replace("Chat");
    }


    return (
        <View style={styles.background}>
            <View style={styles.topContainer}>
                <TouchableOpacity
                    onPress={navigateToHome}
                    style={styles.homeButton}>
                    <Image
                        source={require("../assets/buttonLogos/left_arrow.png")}
                    />
                </TouchableOpacity>
                <View style={styles.profilePicContainer}>
                    <UploadImage />
                </View>
            </View>

            <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoLabel}>Name</Text>
                <View style={styles.dataContainer}>
                    <Text style={styles.userInfoData}>{name}</Text>
                </View>

            </View>

            <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoLabel}>Major</Text>
                <View style={styles.dataContainer}>
                    <Text style={styles.userInfoData}>{major}</Text>
                </View>

            </View>

            <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoLabel}>Year</Text>
                <View style={styles.dataContainer}>
                    <Text style={styles.userInfoData}>{year}</Text>
                </View>

            </View>



        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    topContainer: {
        height: 300,
    },
    homeButton: {
        top: 50,
        left: 20,
    },
    profilePicContainer: {
        top: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfoContainer: {
        flexDirection: 'row',
        marginVertical: 7,
    },
    userInfoLabel: {
        left: 25,
        fontSize: 15,
        flex: 1,
        fontWeight: 'bold',
    },
    dataContainer: {
        flex: 2.3,
        borderBottomWidth: 1,
        marginHorizontal: 25,
        right: 10,
        paddingBottom: 10,
        borderBottomColor: '#2A6F97',
    },
    userInfoData: {
        fontSize: 15,
        // borderBottomWidth: 1,
        // borderBottomColor: '#FF0000',
        // zIndex: 1
        // borderWidth: 1,
        // borderColor: '#E5E5E5',
    }

})
