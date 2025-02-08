/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RootStackParamList } from '../App';
import { NavigationProp } from '@react-navigation/native';


interface HomeScreen2Props {
  navigation : NavigationProp<RootStackParamList, 'Home'>
}

const Home2 = ({navigation}: HomeScreen2Props) => {
  return (
    <View>
      <Text>Home2</Text>
    </View>
  );
};

export default Home2;

const styles = StyleSheet.create({});
