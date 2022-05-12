import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core';

const FilterCategory = () => {
    const navigation = useNavigation();

    const foodOnClick = () => {
        const result = {
            category: "FOOD",
            nationality: [],
            dessert: [],
            ambiance: [],
            dining: [],
            price: []
        }
        navigation.navigate(FilterNationality, result);
    }

    const dessertOnClick = () => {
        const result = {
            category: "DESSERT",
            nationality: [],
            dessert: [],
            ambiance: [],
            dining: [],
            price: []
        }
        navigation.navigate(FilterDessert, result);
    }

    return (
        <View>
            <Text>FilterCategory</Text>
        </View>
    )
}
export default FilterCategory;
