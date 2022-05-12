import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import LoadingAnimation from '../../components/LoadingAnimation';
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

const FilterCategory = () => {
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

    const foodOnClick = () => {
        const result = {
            category: "FOOD",
            nationality: [],
            dessert: [],
            ambiance: [],
            dining: [],
            price: [],
            resCount: 162,
        }
        navigation.navigate("FilterNationality", result);
    }

    const dessertOnClick = () => {
        const result = {
            category: "DESSERT",
            nationality: [],
            dessert: [],
            ambiance: [],
            dining: [],
            price: [],
            resCount: 57,
        }
        navigation.navigate('FilterDessert', result);
    }

    const back = () => {
        navigation.navigate('HomeScreen');
    }

    if (!fontsLoaded) {
        return <LoadingAnimation style={styles.animation}/>
      } else {
    return (
        <View style={styles.container}>

            <View style={styles.topBar}>
                <TouchableOpacity
                    onPress={back}
                >
                    <Ionicons name="md-chevron-back" size={35} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.textView}>
                <Text style={{fontSize: 19, fontFamily: 'Nunito_700Bold' }}>WHAT DO YOU WANT TO EAT?</Text>
                <Text style={{fontSize: 11, fontFamily: 'Nunito_400Regular'}}>help us narrow down what you want!</Text>
            </View>
            <View style={styles.buttonView}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() => foodOnClick()}
                        style={styles.button}
                    >
                        <Ionicons name="fast-food" size={65} color="#FFBE48" />
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Nunito_700Bold', fontSize: 17, marginTop: '8%',}}>FOOD</Text>
                </View>
                <Text style={{fontSize: 20, fontFamily:'Nunito_800ExtraBold', marginLeft: '3%', marginRight: '3%', marginBottom: '5%'}}>OR</Text>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => dessertOnClick()}
                            style={styles.button}
                        >
                            <MaterialIcons name="icecream" size={70} color="#FFBE48" />
                        </TouchableOpacity>
                        <Text style={{fontFamily:'Nunito_700Bold', fontSize: 17, marginTop: '8%',}}>DESSERT</Text>
                </View>
            </View>
        </View>
    )
      }
}
export default FilterCategory;

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFD73F',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    topBar: {
        flexDirection: 'column',
        left: '5%',
        width: '100%'
    },

    textView: {
        marginTop: '30%',
        flexDirection: 'column',
        left: '8%',
        width: '100%',
    },

    buttonView: {
        marginTop: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: '50%'
    },
    bottomButtons: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'center',
        marginTop: '50%'
    },

    button: {
        // // width: '80%',
        padding: 50,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'rgba(0,0,0, 0.6)',
        shadowOffset: { height: 3.5,  },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },

      button2: {
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
      buttonTextL: {
        color: 'white',
        fontFamily: 'Nunito_600SemiBold',
        fontWeight: '700',
        fontSize: 15,
      },

})