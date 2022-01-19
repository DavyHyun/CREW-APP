import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import rData from '../json/thankYouGrace.json'
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/core'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const Favorites = () => {
    const navigation = useNavigation();
    const [fav, setFav] = useState([]);
    const isFocused = useIsFocused();

    let adding = ",";
    let favs = [];
    let found = ["placeholder"];
    // const [adding, setAdding] = useState("");

    const onScreenLoad = () => {
        try {
        const db = getDatabase();
        var userId = getAuth().currentUser.uid;
        const favRef = ref(db, 'users/' + userId + '/favorite');
        onValue(favRef, (snapshot) => {
          const data = snapshot.val();
          adding = data.favorite;
      });
        let myA = adding.split(",")
        for (let i = 1; i < myA.length; i++) {
            found = getResByCode(myA[i]);
            // console.log(found);
            found[0]["id"] = i;
            favs.push(found[0]);
        }
        setFav(favs)
    } catch (error) {
        console.log(error)
    }
    }
    
    useEffect(() => {
        if (isFocused) {
        onScreenLoad(); 
        }
    }, [isFocused])

    function getResByCode(code) {
        return rData.filter(
            function(rData) {return rData.RESTAURANT == code}
        )
    }

    const navigateToHome = () => {
        navigation.navigate("Home");
    }
    const navigateToAdd = () => {
        navigation.navigate("AddFav");

    }

    return (
        <View>
            <View style={styles.topArea}>
            <TouchableOpacity
                onPress={navigateToHome}
                style={styles.backButton}
            >
                <AntDesign name="left" size={24} color="#2A6F97" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={navigateToAdd}
                style={styles.backButton}
            >
                <AntDesign name="plus" size={24} color="#2A6F97" />
            </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>YOUR FAVORITES</Text>
                <Text style={styles.bodyText}>Add your favorite restaurants here!</Text>
            </View>
            <View style={styles.listContainer}>
            <FlatList 
                data={fav}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({item})=> (
                    <View elevation={5} style={styles.eachView}>
                        <View style={styles.star}>
                            <AntDesign name="star" size={15} color="#89C2D9" />
                        </View>
                        <View style= {styles.infoContainer}>
                        <View>
                            <Text style={styles.Ti}>{item.RESTAURANT}</Text>
                            <Text style={styles.Bo}>{item.TYPE}</Text>
                        </View>
                        <View>
                            <AntDesign name="right" size={24} color="#2A6F97" style={styles.right} />
                        </View>
                        </View>
                    </View>
                )}
            />
            </View>
        </View>
    )
}

export default Favorites

const styles = StyleSheet.create({
    topArea: {
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%'
    },
    
    listContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black',
        height: '70%',
        marginTop: '5%'
    },
    backButton: {
        padding: 20
    },
    titleText: {
        fontSize: 24,
        fontWeight: '700'
    },
    bodyText: {
        fontSize: 13
    },
    eachView: {
        marginHorizontal: 10,
        marginTop: 24,
        padding: 10,
        borderColor: 'white',
        borderRadius: 15,
        borderWidth: 2,
        fontSize: 10,
        // alignItems:'center',
        // justifyContent: 'center',
        flex: 1,
        shadowColor: 'rgba(0,0,0, 0.6)',
        shadowOffset: { height: 3.5, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor:'white',
        width: 350,

    },
    Ti: {
        fontWeight: '700',
        fontSize: 20,
        marginBottom: '2%',
        marginLeft:'15%'
    },
    Bo: {
        fontSize: 14,
        color: '#5F5D5D',
        marginLeft:'15%',
        marginBottom: '5%'

    },
    star: {
        // backgroundColor: 'black'
        marginBottom: '2%'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    right: {
        marginTop: '25%'
    }
})
