import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'
import rData from '../json/thankYouGrace.json'
import { auth } from '../firebase'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";


const AddFav = () => {
    
    const [filterData, setFilterData] = useState(rData);
    const [masterData, setMasterData] = useState(rData);
    const db = getDatabase();
    const navigation = useNavigation();
    const [input, setInput] = useState("");
    const [adding, setAdding] = useState("");
    const [currData, setData] = useState([]);
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        try {
            var userId = getAuth().currentUser.uid;
            const favRef = ref(db, 'users/' + userId + '/favorite');
            onValue(favRef, (snapshot) => {
              const data = snapshot.val();       
              setAdding(data.favorite);
          });
      } catch (error) {
        console.log(error);
      }
    }, [])

    function getResByCode(code) {
        return rData.filter(
            function(rData) {return rData.RESTAURANT == code}
        )
    }
    const navigateToFav = () => {
        navigation.navigate("Favorites");
    //     var userId = getAuth().currentUser.uid;
    //     const favRef = ref(db, 'users/' + userId + '/favorite');
    //     onValue(favRef, (snapshot) => {
    //       const data = snapshot.val();
    //       setAdding(data.favorite);
    //   });
    //     let myA = adding.split(",")
    //     for (let i = 1; i < myA.length; i++) {
    //         var found = getResByCode(myA[i]);
    //         favs.push(found);
    //     }
    //     console.log(favs);
    }
    function getCurr() {
        var userId = getAuth().currentUser.uid;
        const favRef = ref(db, 'users/' + userId + '/favorite');
        onValue(favRef, (snapshot) => {
          const data = snapshot.val();
          setAdding(data.favorite);
      });
    }
    const addInfo = () => {
      getCurr();
      var userId = getAuth().currentUser.uid;
      set(ref(db, 'users/' + userId + '/favorite'), {
            favorite: adding + ',' + input
      })
      alert("added!")
    }
    

    const searchFilter =(text)=> {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.RESTAURANT
                const textData = text;
                return itemData.indexOf(textData) > -1;
            })
            setFilterData(newData);
            setInput(text);
        } else {
            setFilterData(masterData);
            setInput(text);
        }
    }

    const onItemClick = (item) => {
        setInput(item.RESTAURANT)
    }

    const ItemView = ({item}) => {
        return (
            <TouchableOpacity
            onPress={() => onItemClick(item)}
            >
            <Text style = {styles.itemStyle}>
                {item.RESTAURANT}
            </Text>
            </TouchableOpacity>
        )
    }
    const ItemSeperatorView =()=> {
        return (
        <View
            style={{height: 0.5, width:'100%', backgroundColor: '#c8c8c8'}}
        />
        )
    }

    return (
        <KeyboardAvoidingView>
            <View style={styles.topArea}>
            <TouchableOpacity
                onPress={navigateToFav}
                style={styles.backButton}
            >
                <AntDesign name="left" size={24} color="#2A6F97" />
            </TouchableOpacity>
            </View>
            <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>ADD A RESTAURANT</Text>
                <Text style={styles.bodyText}>Search and save more of your favorite restaurants!</Text>
            </View>
            </View>
            <View style={styles.inputContainer}> 
                <TextInput
                     placeholder="Search..."
                     style={styles.input}
                     fontSize= {20}
                     value={input}
                     onChangeText={text => searchFilter(text)}
                />
                
            </View>
            <View style={styles.listContainer}>
                {input != '' ?
                <FlatList
                    data={filterData}
                    
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeperatorView}
                    renderItem={ItemView}
                    showsVerticalScrollIndicator={false}
                    style={styles.flatlist}
                />: null
            }
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={addInfo}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddFav

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    topArea: {
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backButton: {
        padding: 20
    },
    titleText: {
        fontSize: 24,
        fontWeight: '700'
    },
    bodyText: {
        fontSize: 13,
        textAlign: 'center',
        marginTop: '2%'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40%',
        width: '70%'
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },
    input: {
        // marginHorizontal: 10,
        marginTop: '10%',
        padding: 15,
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        
        // alignItems:'center',
        // justifyContent: 'center',
        // flex: 1,
        shadowColor: 'rgba(0,0,0, 0.6)',
        shadowOffset: { height: 3.5, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor:'white',
        width: 275,
    },
    button: {
        width: '30%',
        padding: 16,
        borderRadius: 40,
        alignItems: 'center',
        backgroundColor: '#36649E',
        marginBottom: 15
      },
    buttonText: {
        color: 'white',
        // fontWeight: '700',
        fontSize: 18,
        // fontFamily: OpenSans_SemiBold,
    },
    buttonContainer: {
        marginTop: '17%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemStyle: {
        padding: 10,
    },
    listContainer: {
        marginTop: '2.5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatlist: {
        width: 200,
        height: 100,
        padding: 10,
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        
        // alignItems:'center',
        // justifyContent: 'center',
        // flex: 1,
        shadowColor: 'rgba(0,0,0, 0.6)',
        shadowOffset: { height: 3.5, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor:'white',
        width: 275,
        backgroundColor: 'white'

    }

})
