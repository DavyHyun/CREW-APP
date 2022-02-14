import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Favorites from './HomeNav/Favorites'
import Reviews from './HomeNav/Reviews'
import Home from './HomeNav/NewHome'


const Drawer = createDrawerNavigator();
const HomeStackNav = () => {
  return (
      <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Reviews" component={Reviews} />
        <Drawer.Screen name="Favorites" component={Favorites} />
      </Drawer.Navigator>
    
  )
}

export default HomeStackNav;

const styles = StyleSheet.create({})