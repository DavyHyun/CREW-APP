import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";
export default function LoadingAnimation() {
    const height = Dimensions.get('window').height / 2;
  return (
    <View>
      <LottieView
        source={require("../json/103992-alleypin-crm-loading-animation.json")}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: '150%',
    marginTop: '50%',
    marginHorizontal: '70%',
    
  },
});