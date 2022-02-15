import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch
  } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../firebase'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { signOut } from '@firebase/auth'

export function DrawerContent(props) {
    const [name, setName] = useState("");

  useEffect(() => {
    try {
      const db = getDatabase();
      var userId = getAuth().currentUser.uid;
      const nameRef = ref(db, 'users/' + userId + '/personalInfo');
      onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        let tname = data.name.split(" ");
        let firstName = tname[0];
        setName(firstName);
    });
  } catch (error) {
    console.log(error);
  }
}, [])
const handleSignOut = () => {
    signOut(auth).then(() => {
      props.navigation.navigate("Log In or Sign Up");
      console.log('success');
    })
  }
  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
              <View style={styles.userHello}>
                  <View style={{marginBottom: '10%'}}>
                  <TouchableOpacity
                    onPress={()=> props.navigation.closeDrawer()}
                  >
                    <Feather name="x" size={25} color="black" />
                 </TouchableOpacity>
                  </View>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View>
                        <FontAwesome name="user-circle-o" size={45} color="white" />
                    </View>
                    <View style={{flexDirection:'column', marginLeft: '5%', }}>
                        <Text style={styles.caption}>Hello,</Text>
                        <Text style={styles.title}>{
                            name
                        }</Text>
                    </View>
                  </View>
              </View>
              <Drawer.Section style={styles.drawerSection}>
                  <DrawerItem
                    style={{marginLeft:'6.7%'}}
                    icon = { () => <AntDesign name="home" size={24} color='black' />}
                    label={ () => ( <Text style={{color: 'black', fontSize: 15}}>Home</Text>) }
                    onPress={() => {props.navigation.navigate('Home')}}
                  />
                  <DrawerItem
                    style={{marginLeft:'6.7%'}}
                    icon = { () => <FontAwesome name="star-o" size={24} color="black" />}
                    label={ () => ( <Text style={{color: 'black', fontSize: 15}}>Favorites</Text>) }
                    onPress={() => {props.navigation.navigate('Favorites')}}
                  />
                  <DrawerItem
                    style={{marginLeft:'6.7%'}}
                    icon = { () => <AntDesign name="search1" size={24} color="black" />}
                    label={ () => ( <Text style={{color: 'black', fontSize: 15}}>Search Restaurants</Text>) }
                    onPress={() => {props.navigation.navigate('Search')}}
                  />
                  <DrawerItem
                    style={{marginLeft:'7%'}}
                    icon = { () => <MaterialIcons name="playlist-add-check" size={24} color="black" />}
                    label={ () => ( <Text style={{color: 'black', fontSize: 15}}>Your List</Text>) }
                    onPress={() => {props.navigation.navigate('List')}}
                  />
                  <DrawerItem
                    style={{marginLeft:'7%'}}
                    icon = { () => <Ionicons name="game-controller-outline" size={24} color="black" />}
                    label={ () => ( <Text style={{color: 'black', fontSize: 15}}>Today's Game</Text>) }
                    onPress={() => {props.navigation.navigate('Game')}}
                  />
                  <DrawerItem
                    style={{marginLeft:'7%'}}
                    icon = { () => <AntDesign name="setting" size={24} color="black" />}
                    label={ () => ( <Text style={{color: 'black', fontSize: 15}}>Settings</Text>) }
                    onPress={() => {props.navigation.navigate('Settings')}}
                  />
              </Drawer.Section>
          </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
      <DrawerItem
            style={{marginLeft:'7%'}}
            icon = { () => <MaterialCommunityIcons name="logout-variant" size={24} color="black" />}
            label={ () => ( <Text style={{color: 'black', fontSize: 15}}>Sign Out</Text>) }    
            onPress={handleSignOut}
        />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userHello: {
        paddingLeft: 20,
    },
    helloTop: {

    },
    drawerSection: {
        marginTop: '9%',
    },
    bottomDrawerSection: {
        marginBottom: '10%',
        // borderTopColor: '#f4f4f4',
        // borderTopWidth: 1
    },
    title: {
        fontSize: 22,
        marginTop: 3,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 13,
        marginTop: 2,
        lineHeight: 14,
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },

})