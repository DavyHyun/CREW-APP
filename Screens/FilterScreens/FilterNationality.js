import { StyleSheet, Text, View, FlatList, TouchableOpacity, Touchable, Image, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core';
import { Card } from 'react-native-paper';
import { render } from 'react-dom';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import rData from '../../json/thankYouGrace.json';
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

const FilterNationality = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const result = route.params;
    const [categoryList, setCategoryList] = useState([]);
    let categoryListArray = [];
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
    const [renderData, setRenderData] = useState();
    const [selectItem, setSelectItem] = useState(null);
    const [numCol, setNumCol] = useState(2);
    const [counter, setCounter] = useState(0);
    const [initialTrigger, setInitialTrigger] = useState(0);

    
    useEffect(() => {
            var listChecker = "";
            for (let index = 0; index < rData.length; index++) {
                if(rData[index].CATEGORY === result.category) {
                    const strings = rData[index].NATIONALITY.split(",");
                    for(let i = 0; i < strings.length; i++) {
                        if(!listChecker.includes(strings[i])){
                            listChecker += strings[i];
                            categoryListArray.push(strings[i]);
                        }
                    }
                }
            }
            var tempArray = [];
            for(let index = 0; index < categoryListArray.length; index++) {
                const tempJSON = {
                    name: categoryListArray[index],
                    id: (index + 1) + '',
                    state: false
                }
                tempArray.push(tempJSON);
            }
        
        
        setCategoryList(tempArray);
        setRenderData(categoryList);
        if(!renderData) {
            setInitialTrigger(1);
        }
        console.log(renderData);
    }, [initialTrigger]);

    const optionOnClick = (id, name) => {
        for (let data of renderData) {
            try{
            if (data.id==id) {
                data.selected=(data.selected==null)?true:!data.selected;
            }
            console.log("render");
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        }
        setRenderData(renderData);
        setCounter(counter + 1);
        var tempArray = categoryList;
        for(let index = 0; index < categoryList.length; index++) {
            if(categoryList[index].name === name) {
                tempArray[index].state = !tempArray[index].state;
            }
        }
        setCategoryList(tempArray);
        console.log("category");
        console.log(categoryList);
    }

    const idcButton = () => {
        var tempArray = categoryList;
        for(let index = 0; index < categoryList.length; index++) {
            tempArray[index].state = true;
        }
        setCategoryList[tempArray];
        onNext();
    }

    const onNext = (fromNext) => {

        let nationalityArray = [];
        for(let index = 0; index < categoryList.length; index++) {
            if(categoryList[index].state) {
                nationalityArray.push(categoryList[index].name);
            }
        }
        if(nationalityArray && nationalityArray.length) {

        } else if(fromNext) {
            alert("Please choose your options or hit IDC!");
            return;
        }
        const endResult = {
            category: result.category,
            nationality: nationalityArray,
            dessert: [],
            ambiance: [],
            dining: [],
            price: []
        }
        if(fromNext) {
            navToNextFilter(endResult);
        } else {
            showMyListOnClick(endResult)
        }
    }

    const navToNextFilter = (endResult) => {
        var resCount = 0;
        for(let rDataIndex = 0; rDataIndex < rData.length; rDataIndex++) {
            if(endResult.category === rData[rDataIndex].CATEGORY) {
                for(let nationalityArrayIndex = 0; nationalityArrayIndex < endResult.nationality.length; nationalityArrayIndex++) {
                    if(rData[rDataIndex].NATIONALITY.includes(endResult.nationality[nationalityArrayIndex])) {
                        resCount++;
                        break;
                    }
                }
            }
        }
        console.log(resCount);
        if(resCount <= 3) {
            navigation.navigate("FilterDisplayRes", endResult);
        } else {
            navigation.navigate("FilterPrice", endResult);
        }
    }

    const showMyListOnClick = (endResult) => {
        navigation.navigate("FilterDisplayRes", endResult);
    }

    if(!fontsLoaded) {
        return <AppLoading />
    }
    return (
        <View style={styles.mainCont}>
        <View style={styles.topBar}>
            <Text style={{fontSize: 19, fontFamily: 'Nunito_700Bold' }}>WHAT DO YOU WANT TO EAT?</Text>
            <Text style={{fontSize: 11, fontFamily: 'Nunito_400Regular'}}>help us narrow down what you want!</Text>
        </View>
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={renderData}
                keyExtractor={(item) => item.id}
                numColumns ={numCol}
                style={{width:'80%', height: '40%', backgroundColor: '#FFD73F'}}
                showsVerticalScrollIndicator ={false}
                renderItem={({item})=> (
                    <TouchableOpacity
                        onPress={() => optionOnClick(item.id, item.name)}
                        style={{width:'50%'}}
                    >
                        <Card
                            style={
                                item.selected==true
                                  ? {
                                    marginHorizontal: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    padding: 10,
                                    // borderColor: '#C4C4C4',
                                    borderRadius: 10,
                                    // borderWidth: 2,
                                    fontSize: 10,
                                    // alignItems:'center',
                                    // justifyContent: 'center',
                                    flex: 1,
                                    shadowColor: 'rgba(0,0,0, 0.6)',
                                    shadowOffset: { height: 3.5, },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                
                                      backgroundColor: '#FF730A',
                                    }
                                  : {
                                    marginHorizontal: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    padding: 10,
                                    // borderColor: '#C4C4C4',
                                    borderRadius: 10,
                                    // borderWidth: 2,
                                    fontSize: 10,
                                    // alignItems:'center',
                                    // justifyContent: 'center',
                                    flex: 1,
                                    shadowColor: 'rgba(0,0,0, 0.6)',
                                    shadowOffset: { height: 3.5, },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    
                                      backgroundColor: 'white',
                                    }
                            }
                        >
                            <Image style={styles.Img} source={require("../../assets/koreaFlag.png")}/>
                            <Text style = {styles.name}>{item.name}</Text> 
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
        <View style={styles.buttonView1}>
        <TouchableOpacity
                    onPress={() => onNext(true)}
                    style={styles.button2}
                >
                    <Text style={styles.buttonTextL}>NEXT</Text>
                </TouchableOpacity>
        </View>

        <View style={styles.buttonView2}>
                
                <TouchableOpacity
                    onPress={() => idcButton()}
                    style={styles.button3}
                >
                    <Text style={styles.buttonTextL}>I DON'T CARE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onNext(false)}
                    style={styles.button3}
                >
                    <Text style={styles.buttonTextL}>SHOW MY LIST</Text>
                </TouchableOpacity>
            
        </View>
        </View>
    )
}
export default FilterNationality;






const styles = StyleSheet.create({

    mainCont: {
        backgroundColor: '#FFD73F',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    topBar: {
        flexDirection: 'column',
        left: '12%',
        width: '100%',
        marginBottom: '5%'
    },

    buttonView1: {
        justifyContent: 'center',
        width:'30%',
        marginTop: '10%'

    },
    buttonTextL: {
        color: 'white',
        fontFamily: 'Nunito_600SemiBold',
        fontWeight: '700',
        fontSize: 15,
      },
    button2: {
        width: '100%',
        padding: '3%',
        borderRadius: 30,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#FF730A',
        marginBottom: '2%',
        borderStyle: 'solid',
        borderColor: '#FF730A',
        borderWidth: 1,
        shadowColor: 'rgba(0,0,0, 0.6)',
        shadowOffset: { height: 3.5, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },

    buttonView2: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
        marginTop: '7%'
    },

    button3: {
        width: '45%',
        padding: '3%',
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#FD9343',
        marginBottom: '2%',
        borderStyle: 'solid',
        borderColor: '#FFBE48',
        borderWidth: 1,
        shadowColor: 'rgba(0,0,0, 0.6)',
        shadowOffset: { height: 3.5, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },

    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '60%'
    },
    eachView: {
        marginHorizontal: 10,
        marginTop: 10,
        padding: 10,
        borderColor: '#C4C4C4',
        borderRadius: 10,
        borderWidth: 2,
        fontSize: 10,
        // alignItems:'center',
        // justifyContent: 'center',
        flex: 1,
        // shadowColor: 'rgba(0,0,0, 0.6)',
        // shadowOffset: { height: 3.5, },
        // shadowOpacity: 0.5,
        // shadowRadius: 2,
        backgroundColor:'white',
    },
    friendsIntro: {
        marginTop: 10,
        padding: 5,
    },
    friendsText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    profileImg: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    Img: {
    
    width: 100,
    height: 100,
    resizeMode: 'contain',
    },
    name: {
        marginTop: 15,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 7,
        textAlign: 'center',
        fontFamily: 'Nunito_600SemiBold'
    }

})