import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Favorites from './HomeNav/Favorites'
import Reviews from './HomeNav/Reviews'
import Home from './HomeNav/NewHome'
import Search from './HomeNav/Search'
import List from './HomeNav/List'
import Game from './HomeNav/Game'
import Settings from './HomeNav/Settings'
import ResInfo from './HomeNav/ResInfo'
import { DrawerContent } from './DrawerContent';



const Drawer = createDrawerNavigator();
const HomeStackNav = () => {
  return (
      <Drawer.Navigator 
        initialRouteName="Home" 
        screenOptions={{headerShown: false, drawerStyle: {backgroundColor: '#ffbc42',
        width: 325}}}
        drawerContent={props => <DrawerContent {...props}/>}
      
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen  name="ResInfo" component={ResInfo} />
        <Drawer.Screen name="Search" component={Search} />
        <Drawer.Screen name="List" component={List} />
        <Drawer.Screen name="Game" component={Game} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Reviews" component={Reviews} />
        <Drawer.Screen name="Favorites" component={Favorites} />
      </Drawer.Navigator>
    
  )
}

export default HomeStackNav;

const styles = StyleSheet.create({})