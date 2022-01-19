import * as React from 'react'
import { StyleSheet, Text, View, Button, } from 'react-native'
import { NavigationContainer} from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MyFriends from './FriendsTabs/MyFriends'
import Notif from './FriendsTabs/Notif'
import Recommended from './FriendsTabs/Recommended'

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: "#2A6F97",
                labelStyle: { fontSize: 12},
                style: {backgroundColor: 'white'}
            }}
        >
            <Tab.Screen
                name="Recommended"
                component={Recommended}
                options={{ tabBarLabel: 'Recommended'}}
            />
            <Tab.Screen
                name="MyFriends"
                component={MyFriends}
                options={{ tabBarLabel: 'My Friends'}}
            />
            <Tab.Screen
                name="Notifs"
                component={Notif}
                options={{ tabBarLabel: 'Notifications'}}
            />

        </Tab.Navigator>
    )
}

export default function FriendsHome() {
    return (
        <NavigationContainer
            independent={true}
        >
            <MyTabs />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
