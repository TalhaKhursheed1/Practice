import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Notification from './src/Notification';
import NavigationService from './src/NavigationService';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
   <NavigationContainer  ref={(ref)=>NavigationService.setTopLevelNavigator(ref)}>
     <Stack.Navigator>
       <Stack.Screen options={{'headerShown': false}} name="Home" component={Home} />
       <Stack.Screen name="Notification" component={Notification} />
     </Stack.Navigator>
   </NavigationContainer>
  )
} 

export default App

const styles = StyleSheet.create({})