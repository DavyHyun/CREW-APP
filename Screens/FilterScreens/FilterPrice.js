import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core';
import rData from '../../json/thankYouGrace.json';

const FilterPrice = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const result = route.params;
    const [categoryList, setCategoryList] = useState([]);
    let categoryListArray = [];

    useEffect(() => {
        var listChecker = "";

        for (let rDataIndex = 0; rDataIndex < rData.length; rDataIndex++) {

            if(rData[rDataIndex].CATEGORY === result.category) {
                if(result.nationality && result.nationality.length) {

                    for(let nationalityIndex = 0; nationalityIndex < result.nationality.length; nationalityIndex++) {

                        if(rData[rDataIndex].NATIONALITY.includes(result.nationality[nationalityIndex])){
                            if(!listChecker.includes(rData[rDataIndex].PRICE)) {
                                listChecker += rData[rDataIndex].PRICE;
                                categoryListArray.push(rData[rDataIndex].PRICE);
                            }
                        }
                    }
                }
                if(result.dessert && result.dessert.length) {

                    for(let dessertIndex = 0; dessertIndex < result.dessert.length; dessertIndex++) {

                        if(rData[rDataIndex].DESSERT.includes(result.dessert[dessertIndex])) {
                            if(!listChecker.includes(rData[rDataIndex].PRICE)) {
                                listChecker += rData[rDataIndex].PRICE;
                                categoryListArray.push(rData[rDataIndex].PRICE);
                            }
                        }
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
    }, []);

    const optionOnClick = (name) => {
        var tempArray = categoryList;
        for(let index = 0; index < categoryList.length; index++) {
            if(categoryList[index].name === name) {
                tempArray[index].state = !tempArray[index].state;
            }
        }
        setCategoryList(tempArray);
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

        let priceArray = [];
        for(let index = 0; index < categoryList.length; index++) {
            if(categoryList[index].state) {
                priceArray.push(categoryList[index].name);
            }
        }
        if(priceArray && priceArray.length) {

        } else if(fromNext) {
            alert("Please choose your options or hit IDC!");
            return;
        }
        const endResult = {
            category: result.category,
            nationality: result.nationality,
            dessert: result.dessert,
            ambiance: [],
            dining: [],
            price: priceArray,
        }
        if(fromNext) {
            navToNextFilter(endResult);
        } else {
            showMyListOnClick(endResult)
        }
    }

    const showMyListOnClick = (endResult) => {
        navigation.navigate("FilterDisplayRes", endResult);
    }


    /// FIXXJIOFJESOIFJOIWEJ:FOESJOIFJWEOIJFOI:WEJF:OIWEJF:OIEWJF:OIWEJO:IFEWJOI
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
    // wfio;jEIOWJFIOEWJFO:IJEWO:IFJO:IEWJFO:IWEJOFi


   

    return (
        <View>
            <Text>FilterPrice</Text>
            <TouchableOpacity></TouchableOpacity>
        </View>
    )
}
export default FilterPrice;
