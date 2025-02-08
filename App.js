// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './src/AuthStack/Splash';
import HomeScreen from './src/HomeStack/HomeScreen';
import WelcomeScreen from './src/AuthStack/WelcomeScreen';
import LoginScreen from './src/AuthStack/LoginScreen';
import SignupScreen from './src/AuthStack/SignupScreen';
import Home2 from './TypeScript Practice/Home2';
import { AuthContextProvider, useAuth } from './Context/authContext';
import Loader from './components/Loader';
import ChatScreen from './src/ChatScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();  // Now it is safe to use useAuth here

  useEffect(() => {
    console.log('Auth status:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      {isAuthenticated === undefined ? (
        <Loader /> // Show a loader until authentication status is determined
      ) : (
        <Stack.Navigator>
          {isAuthenticated ? (
            <>
             <Stack.Screen
              options={{ headerShown: false }}
              name="HomeScreen"
              component={HomeScreen}
            />

            <Stack.Screen
            options={{ headerShown: false }}
            name="ChatScreen"
            component={ChatScreen}
          />
            </>
          ) : (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Splash"
                component={Splash}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="WelcomeScreen"
                component={WelcomeScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="LoginScreen"
                component={LoginScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="SignupScreen"
                component={SignupScreen}
              />
            </>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );

};

const App = () => (
  <AuthContextProvider>
    <AppNavigator />
  </AuthContextProvider>
);

export default App;

const styles = StyleSheet.create({});





// TYPESCRIPT
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import Home from './TypeScript Practice/Home';
// import Home2 from './TypeScript Practice/Home2';

// export type RootStackParamList= {
//   Home: undefined,
//   Home2: {
//     name:string,
//     email:string,
//   },
// }

// const Stack = createNativeStackNavigator<RootStackParamList>();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
//         <Stack.Screen name="Home2" component={Home2} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
