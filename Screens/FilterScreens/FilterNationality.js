import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core';
import rData from '../../json/thankYouGrace.json';

const FilterNationality = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const result = route.params;
    const [categoryList, setCategoryList] = useState([]);
    let categoryListArray = [];

    
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
        navToNextFilter(endResult);
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
        if(resCount <= 3) {
            navigation.navigate("FilterDisplayRes", endResult);
        } else {
            navigation.navigate("FilterPrice", endResult);
        }
    }

    return (
        <View>
            <Text>FilterNationality</Text>
            <TouchableOpacity
            onPress={() => optionOnClick("Korean")}
            style={{top:500}}>
                <Text>korea</Text>


            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => optionOnClick("Other")}
            style={{top:500}}>
                <Text>Other</Text>


            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => onNext()}
            style={{top:500}}>
                <Text>next</Text>
            </TouchableOpacity>
        </View>
    )
}
export default FilterNationality;

