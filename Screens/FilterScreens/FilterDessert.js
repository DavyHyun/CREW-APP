import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core';
import rData from '../../json/thankYouGrace.json';

const FilterDessert = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const result = route.params;
    const [categoryList, setCategoryList] = useState([]);
    let categoryListArray = [];

    useEffect(() => {
        var listChecker = "";
        for(let rDataIndex = 0; rDataIndex < rData.length; rDataIndex++) {
            if(rData[rDataIndex].CATEGORY === result.CATEGORY) {
                const strings = rData[rDataIndex].DESSERT.split(",");
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
                id: (index + 1),
                state: false
            }
            tempArray.push(tempJSON);
        }
        setCategoryList(tempArray);
    }, []);

    const optionClick = (name) => {
        var tempArray = categoryList;
        for(let index = 0; index < categoryList.length; index++) {
            if(categoryList[index].name === name) {
                tempArray[index].state = !tempArray[index]/state;
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
        onNext(true);
    }

    const onNext = (fromNext) => {
        let dessertArray = [];
        for(let index = 0; index < categoryList.length; index++) {
            if(categoryList[index].state) {
                dessertArray.push(categoryList[index].name);
            }
        }
        if(dessertArray && dessertArray.length) {

        } else if(fromNext) {
            alert("Please choose your options or hit IDC!");
            return;
        }
    

    const endResult = {
        category: result.category,
        navigation: result.nationality,
        dessert: dessertArray,
        ambiance: result.ambiance,
        dining: result.dining,
        price: result.price
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
            for(let dessertArrayIndex = 0; dessertArrayIndex < endResult.nationality.length; dessertArrayIndex++) {
                if(rData[rDataIndex].DESSERT.includes(endResult.dessert[nationalityArrayIndex])) {
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

const showMyListOnClick = (endResult) => {
    navigation.navigate("FilterDisplayRes", endResult);
}


   

    return (
        <View>
            <Text>FilterDessert</Text>
        </View>
    )
}
export default FilterDessert;




// useEffect(() => {
//     var listChecker = "";
//     for(let rDataIndex = 0; rDataIndex < rData.length; rDataIndex++) {
//         if(rData[rDataIndex].CATEGORY === result.CATEGORY) {
//             for(let nationalityArrayIndex = 0; nationalityArrayIndex < result.nationality.length; nationalityArrayIndex++) {
//                 if(rData[rDataIndex].NATIONALITY.includes(result.nationality[nationalityArrayIndex])){
                    
//                 }
//             }
//         }
//     }
// })