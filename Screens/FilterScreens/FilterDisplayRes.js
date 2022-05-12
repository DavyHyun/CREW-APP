import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core';

const FilterDisplayRes = () => {
    const navigation = useNavigation();
    const route = useRoute();
    console.log(route.params);

    return (
        <View>
            <Text>FilterDisplayRes</Text>
        </View>
    )
}
export default FilterDisplayRes;
