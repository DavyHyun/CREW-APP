import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core';

const FilterAmbiance = () => {
    const navigation = useNavigation();
    const route = useRoute();
    console.log(route.params);
    
    const goHome = () => {
        navigation.navigate("HomeScreen");
    }
   

    return (
        <View>
            <Text>FilterAmbiance</Text>
            <TouchableOpacity
            onPress={goHome}
            style={{top:500}}>
                <Text>BACK</Text>
            </TouchableOpacity>
        </View>
    )
}
export default FilterAmbiance;
