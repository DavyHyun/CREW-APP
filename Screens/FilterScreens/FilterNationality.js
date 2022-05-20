import { StyleSheet, Text, View, FlatList, TouchableOpacity, Touchable, Image, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core';
import { Card } from 'react-native-paper';
import { render } from 'react-dom';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { getStorage, getDownloadURL, ref as sRef } from "firebase/storage";
import rData from '../../json/thankYouGrace.json';
import LoadingAnimation from '../../components/LoadingAnimation';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
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
// require(`../../assets/filterIcons/${item.name}.png`)
const FilterNationality = () => {
    const navigation = useNavigation();
    const storage = getStorage();
    const route = useRoute();
    const resultt = route.params;
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
    const [imagesLoaded, setImagesLoaded] = useState();
    const [numOfImages, setNumOfImages] = useState(100);
    const functions = getFunctions();



    useEffect(() => {
        setImagesLoaded(0);
        const loadNationalities = httpsCallable(functions, 'loadNationalities');
        loadNationalities(resultt).then((result) => {
            for (let i = 0; i < result.data.length; i++) {
                categoryListArray.push(result.data[i].nationality);
            }
            console.log(categoryListArray);
            var tempArray = [];
            for (let index = 0; index < categoryListArray.length; index++) {
                var imageRef;
                if(categoryListArray[index] === " Greek/Mediterranean") {
                    imageRef = sRef(storage, 'filterIcons/Greek:Mediterranean.png');
                } else {
                    imageRef = sRef(storage, 'filterIcons/' + categoryListArray[index] + '.png');
                }
                
                getDownloadURL(imageRef).then((url) => {
                    const tempJSON = {
                        name: categoryListArray[index],
                        id: (index + 1),
                        imageURL: url,
                        state: false
                    }
                    tempArray.push(tempJSON);
                }).catch((error) => {
                    console.log(error);
                })
            }

            setNumOfImages(tempArray.length);
            setCategoryList(tempArray);
            setRenderData(categoryList);
            if (!renderData) {
                setInitialTrigger(1);
            }
            console.log("renderdata = " + renderData);
        })
    }, [initialTrigger]);

    const optionOnClick = (id, name) => {
        for (let data of renderData) {
            try {
                if (data.id == id) {
                    data.selected = (data.selected == null) ? true : !data.selected;
                }
            } catch (error) {
                console.log(error)
            }
        }
        setRenderData(renderData);
        setCounter(counter + 1);
        var tempArray = categoryList;
        for (let index = 0; index < categoryList.length; index++) {
            if (categoryList[index].name === name) {
                tempArray[index].state = !tempArray[index].state;
            }
        }
        setCategoryList(tempArray);
    }

    const idcButton = () => {
        var tempArray = categoryList;
        for (let index = 0; index < categoryList.length; index++) {
            tempArray[index].state = true;
        }
        setCategoryList[tempArray];
        onNext(true);
    }

    const onNext = (fromNext) => {

        let nationalityArray = [];
        for (let index = 0; index < categoryList.length; index++) {
            if (categoryList[index].state) {
                nationalityArray.push(categoryList[index].name);
            }
        }
        if (nationalityArray && nationalityArray.length) {

        } else if (fromNext) {
            alert("Please choose your options or hit IDC!");
            return;
        }
        let endResult = {
            category: resultt.category,
            nationality: nationalityArray,
            dessert: resultt.dessert,
            ambiance: resultt.ambiance,
            dining: resultt.dining,
            price: resultt.price,
            resCount: resultt.resCount
        }
        if (fromNext) {
            navToNextFilter(endResult, false);
        } else {
            navToNextFilter(endResult, true);

        }
    }

    const navToNextFilter = (endResult, fromShowMyList) => {
        var resCount = 0;

        const navFromNationalities = httpsCallable(functions, 'navFromNationalities');
        navFromNationalities(endResult).then((result) => {
            resCount = result;
            if (resCount !== 0) {
                endResult.resCount = resCount;
            }
            if (fromShowMyList) {
                navigation.navigate("FilterDisplayRes", endResult);
            } else if (resCount <= 3) {
                navigation.navigate("FilterDisplayRes", endResult);
            } else {
                navigation.navigate("FilterAmbiance", endResult);
            }
        })
        
    }

    if (!fontsLoaded) {
        return <AppLoading />
    }
    return (
        <View style={styles.mainCont}>
            {imagesLoaded > (numOfImages - 1) ? null :
                <View style={{ height: '100%', marginTop: '188%' }}>
                    <LoadingAnimation />
                </View>
            }

            <View style={styles.topBar}>
                <Text style={{ fontSize: 19, fontFamily: 'Nunito_700Bold' }}>WHAT CUISINE?</Text>
                <Text style={{ fontSize: 11, fontFamily: 'Nunito_400Regular' }}>help us narrow down what you want!</Text>
            </View>
            <SafeAreaView style={styles.container}>

                <FlatList
                    data={renderData}
                    keyExtractor={(item) => item.id}
                    numColumns={numCol}
                    style={{ width: '80%', height: '40%', backgroundColor: '#FFD73F' }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => optionOnClick(item.id, item.name)}
                            style={{ width: '50%' }}
                        >
                            <Card
                                style={
                                    item.selected == true
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
                                <Image style={styles.Img} source={{uri: item.imageURL}} onLoad={() => setImagesLoaded(imagesLoaded + 1)} />
                                <Text style={styles.name}>{item.name}</Text>
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
        width: '30%',
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
        backgroundColor: 'white',
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