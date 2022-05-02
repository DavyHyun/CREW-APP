import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/AuthScreens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginOrSignUp from './Screens/AuthScreens/LoginOrSignUp';
import SignUp from './Screens/AuthScreens/SignUp';
import PersonalInfo from './Screens/AuthScreens/PersonalInfo'
import ResInfo from './Screens/ResInfo';
import Ready from './Screens/Quiz/Ready'
import Q1 from './Screens/Quiz/Q1'
import Q2 from './Screens/Quiz/Q2'
import Q3 from './Screens/Quiz/Q3'
import Display from './Screens/DisplayRes';
import RoomCreation from './Screens/Multiplayer/RoomCreation';
import WaitingRoom from './Screens/Multiplayer/WaitingRoom';
import MultiplayerReady from './Screens/Multiplayer/MultiplayerReady';
import MultiplayerQ1 from './Screens/Multiplayer/MultiplayerQuiz/MultiplayerQ1';
import { LogBox } from 'react-native';


const Stack = createNativeStackNavigator();

export default function App() {

  LogBox.ignoreAllLogs();
  

  const [showOnboard, setShowOnboard] = useState(true);

  const handleOnboardFinish = () => {
    setShowOnboard(false);
  };

  return (
    <> 
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}}name="Log In or Sign Up" component={LoginOrSignUp}/>
        <Stack.Screen options={{headerShown: true}} name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen options={{headerShown: false}} name="PersonalInfo" component={PersonalInfo} />
        <Stack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen options={{headerShown: false}}name="Ready" component={Ready}/>
        <Stack.Screen options={{headerShown: false}}name="Q1" component={Q1}/>
        <Stack.Screen options={{headerShown: false}}name="Q2" component={Q2}/>
        <Stack.Screen options={{headerShown: false}}name="Q3" component={Q3}/>
        <Stack.Screen options={{headerShown: false}}name="Display" component={Display}/>
        <Stack.Screen options={{headerShown: false}} name="ResInfo" component={ResInfo} />
        <Stack.Screen options={{headerShown: false}} name="RoomCreation" component={RoomCreation} />
        <Stack.Screen options={{headerShown: false}} name="WaitingRoom" component={WaitingRoom} />
        <Stack.Screen options={{headerShown: false}} name="MultiplayerReady" component={MultiplayerReady} />
        <Stack.Screen options={{headerShown: false}} name="MultiplayerQ1" component={MultiplayerQ1} />
      </Stack.Navigator>
    </NavigationContainer>
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
