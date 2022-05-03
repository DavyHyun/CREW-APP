import { StyleSheet, Text, View, TouchableOpacity, Touchable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core';
import { getStorage, getDownloadURL, ref as sRef } from "firebase/storage";
import rData from '../../../json/thankYouGrace.json';
import AppLoading from 'expo-app-loading';
import { Svg } from 'expo';
import { getDatabase, ref, set, get, child, onValue, push } from "firebase/database";

const DisplayBuffer = () => {
    const route = useRoute();
    const roomID = route.params.roomID;
    

    return (
        <View>
            <Text>Display Buffer</Text>
        </View>
    )
}

export default DisplayBuffer;

