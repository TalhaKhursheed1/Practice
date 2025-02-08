/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';

interface HomeScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
}
const Home = ({navigation}: HomeScreenProps) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          // flex: 1,
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: 'powderblue',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
          justifyContent: 'center',
        }}
        onPress={()=>{
          navigation.navigate('Home2',{
            name: 'Home2',
            email:'home@gmail.com',
          });
        }}
        >
        <Text>Go to Home 2</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
