import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginOrSignUp from './Screens/LoginOrSignUp';
import SignUp from './Screens/SignUp';
import InfoAdd from './Screens/InfoAdd'
import PersonalInfo from './Screens/PersonalInfo'
import Onboard from './components/Onboard'
import Chat from './Screens/Chat';
import FriendsHome from './Screens/FriendsHome';
import Favorites from './Screens/Favorites';
import Reviews from './Screens/Reviews';
import Profile from './Screens/Profile';
import Help from './Screens/Help';
import AddFav from './Screens/AddFav'

const Stack = createNativeStackNavigator();

export default function App() {

  const [showOnboard, setShowOnboard] = useState(true);

  const handleOnboardFinish = () => {
    setShowOnboard(false);
  };

  return (
    <> 
    {showOnboard && <Onboard handleDone={handleOnboardFinish} />}
    {!showOnboard && 
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}}name="Log In or Sign Up" component={LoginOrSignUp}/>
        <Stack.Screen options={{headerShown: true}} name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen options={{headerShown: false}} name="InfoAdd" component={InfoAdd} />
        <Stack.Screen options={{headerShown: false}} name="PersonalInfo" component={PersonalInfo} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="FriendsHome" component={FriendsHome} />
        <Stack.Screen options={{headerShown: false}} name="Favorites" component={Favorites} />
        <Stack.Screen options={{headerShown: false}} name="Reviews" component={Reviews} />
        <Stack.Screen options={{headerShown: false}} name="Profile" component={Profile} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen options={{headerShown: false}} name="AddFav" component={AddFav} />
      </Stack.Navigator>
    </NavigationContainer>}
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
