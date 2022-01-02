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
import Onboard from './components/Onboard'

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
        <Stack.Screen name="Log In or Sign Up" component={LoginOrSignUp}/>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen options={{headerShown: false}} name="InfoAdd" component={InfoAdd} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
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
