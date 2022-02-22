import React, { useState, useEffect } from "react";
import { Image, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Dimensions } from "react-native";
import { auth } from '../../firebase'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'
import UploadImage from '../../components/UploadImage';
import { LineChart } from 'react-native-chart-kit';



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
        navigation.navigate("Home");
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
                        source={require("../../assets/buttonLogos/left_arrow.png")}
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
                <Text style={styles.userInfoLabel}>Username</Text>
                <View style={styles.dataContainer}>
                    <Text style={styles.userInfoData}>{major}</Text>
                </View>

            </View>

            <View style={styles.userInfoContainer}>
                <Image 
                    source={require("../../assets/buttonLogos/crescent.png")} 
                    style={styles.crescentLabel}
                />
                <View style={styles.crescentContainer}>
                    <Text style={styles.userInfoData}>{year}</Text>
                </View>

            </View>
            
            <View style={styles.chart}>
            
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width + 100} // from react-native
                    height={220}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#FFBE48",
                        backgroundGradientFrom: "#FFBE48",
                        backgroundGradientTo: "#FFBE48",
                        fillShadowGradientFrom: '#FFBE48',
                        fillShadowGradientTo: '#FFBE48',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 0
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "1",
                            stroke: "#FFFFFF"
                        }
                    }}
                    hideLegend={true}
                    withInnerLines={false}
                    withOuterLines={false}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 1,
                        borderTopWidth: 100,
                        borderTopColor: '#FFBE48',
                        borderBottomWidth: 100,
                        borderBottomColor: '#FFBE48',
                        marginTop: 70,
                        paddingRight: -20
                        
                    }}
                    
                />
                <View style={styles.oval}>
                    <Text style={styles.chartLabel}>  {name} Stats </Text>
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
        zIndex: 100,
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
        zIndex: 100,
    },
    crescentContainer: {
        flex: 2.3,
        borderBottomWidth: 1,
        marginHorizontal: 25,
        right: 10,
        
        paddingBottom: 10,
        borderBottomColor: '#000000',
    },
    userInfoLabel: {
        left: 25,
        fontSize: 15,
        flex: 1,
        // fontWeight: 'bold',
    },
    crescentLabel: {
        right: '60%',
        
        flex: 1,
        resizeMode: 'contain'
    },
    dataContainer: {
        flex: 2.3,
        borderBottomWidth: 1,
        marginHorizontal: 25,
        right: 10,
        paddingBottom: 10,
        borderBottomColor: '#000000',
    },
    userInfoData: {
        fontSize: 15,
        // borderBottomWidth: 1,
        // borderBottomColor: '#FF0000',
        // zIndex: 1
        // borderWidth: 1,
        // borderColor: '#E5E5E5',
    },
    chart: {
      
    },
    oval: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").width,
        borderRadius: Dimensions.get("window").width / 2,
        backgroundColor: "#E5E5E5",
        position: 'absolute',
        bottom: 380,
        zIndex: 1,
        transform: [{ scaleX: 1.5 }],
    },
    chartLabel: {
        color: '#FFFFFF ',
        marginBottom: 0,
        left: 100,
        top: 400,
        fontSize: 15,
        transform: [{scaleX: 0.75}]

    },


})




