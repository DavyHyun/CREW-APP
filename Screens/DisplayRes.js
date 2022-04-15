import { StyleSheet, Text, View, TouchableOpacity, Touchable } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core'
import rData from '../json/thankYouGrace.json'
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
import { async } from '@firebase/util';
import { render } from 'react-dom';


const DisplayRes = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  var restaurantList = [];
  const [restaurantOne, setRestaurantOne] = useState("");
  const [restaurantTwo, setRestaurantTwo] = useState("");
  const [restaurantThree, setRestaurantThree] = useState("");
  var displayedRestaurants = [];
  const [realDisplayedRestaurants, setRealDisplayedRestaurants] = useState([]);

  const result = route.params;
  const back = () => {
      navigation.navigate("HomeScreen")
  }


  useEffect(() => {
    if(isFocused) {
      renderScreen();
    }
  }, [isFocused]);

  const renderScreen = () => {
    for (let index = 0; index < rData.length; index++) {
      if(rData[index].SPEED === result.Q1 && rData[index].MOOD === result.Q2 && rData[index].WEATHER === result.Q3) {
        restaurantList.push(rData[index]);
      }
      
    }
    pickRestaurants();
  };



  const pickRestaurants = () => {
    displayedRestaurants = [];
    for(let index = 0; index < 3; index++) {
      var random = Math.floor(Math.random() * restaurantList.length);
      
      displayedRestaurants.push(restaurantList[random]);
      restaurantList.splice(random, 1);
    }
    setRestaurantOne(displayedRestaurants[0].RESTAURANT);
    setRestaurantTwo(displayedRestaurants[1].RESTAURANT);
    setRestaurantThree(displayedRestaurants[2].RESTAURANT);
    setRealDisplayedRestaurants(displayedRestaurants);
  };

  const navigateToRestaurant = (index) => {

    try{
      navigation.navigate("ResInfo", {
        name : realDisplayedRestaurants[index].RESTAURANT,
        fsr : realDisplayedRestaurants[index].FSR,
        address: realDisplayedRestaurants[index].ADDRESS,
        location: realDisplayedRestaurants[index].LOCATION,
        type: realDisplayedRestaurants[index].TYPE,
        price: realDisplayedRestaurants[index].PRICE,
        popular: realDisplayedRestaurants[index].POPULAR,
        recommendation: realDisplayedRestaurants[index].RECOMMENDATION,
        monday: realDisplayedRestaurants[index].M,
        tuesday: realDisplayedRestaurants[index].T,
        wednesday: realDisplayedRestaurants[index].W,
        thursday: realDisplayedRestaurants[index].TH,
        friday: realDisplayedRestaurants[index].F,
        saturday: realDisplayedRestaurants[index].S,
        sunday: realDisplayedRestaurants[index].SU,
        tea: realDisplayedRestaurants[index].TEA,

      })
      
    } catch (error) {
      console.log(error);
    }
    
  } 



  return (
    <View style={{marginTop: '10%'}}>
      <Text>DisplayRes</Text>

      <TouchableOpacity
      onPress={() => navigateToRestaurant(0)}>
        <Text>{restaurantOne}</Text>

      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => navigateToRestaurant(1)}>
         <Text>{restaurantTwo}</Text> 

      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => navigateToRestaurant(2)}>
         <Text>{restaurantThree}</Text> 

      </TouchableOpacity>

      <TouchableOpacity
        onPress= {back}
      >
        <Text>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => renderScreen()}>
        <Text>I don't like any of these</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DisplayRes

const styles = StyleSheet.create({})
