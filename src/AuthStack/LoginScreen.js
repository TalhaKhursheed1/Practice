import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../Context/authContext';
import Loader from '../../components/Loader';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const { login } = useAuth();

  const handleLogin = async () => {
    setVisible(true);
    try {
      const res = await firestore().collection('users').where('email', '==', email).get();
      setVisible(false);
      if (!res.empty) {
        const userData = res.docs[0].data();
        if (userData.password === password) {
          goToNext(userData.name, userData.email, userData.userId);
          await login(userData);
        } else {
          Alert.alert('Error', 'Invalid password!');
        }
      } else {
        Alert.alert('Error', 'User not found!');
      }
    } catch (error) {
      setVisible(false);
      console.error('Login Error: ', error);
      Alert.alert('Login Error', error.message);
    }
  };

  const goToNext = async (name, email, userId) => {
    await AsyncStorage.setItem('Name', name);
    await AsyncStorage.setItem('Email', email);
    await AsyncStorage.setItem('UserId', userId);
    navigation.navigate('HomeScreen');
  };

  return (
    <LinearGradient colors={['#FFCC70', '#C850C0']} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/Images/back.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <Image source={require('../../assets/Images/bumbleLogo.png')} style={styles.logo} /> */}
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Log in to meet new people and make connections.</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#AAA"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#AAA"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <LinearGradient colors={['#FF85B3', '#FF2A7F']} style={styles.gradient}>
            <Text style={styles.buttonText}>Log In</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.forgotPassword}>Forgot your password?</Text>
        {/* 
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/Images/googleIcon.png')} style={styles.socialLogo} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/Images/fb.png')} style={styles.socialLogo} />
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View> */}

        <Text style={styles.signupText}>
          Don’t have an account?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('SignupScreen')}>
            Sign up
          </Text>
        </Text>
      </ScrollView>
      <Loader visible={visible} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#EEE',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  socialContainer: {
    marginTop: 30,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 25,
    marginBottom: 15,
  },
  socialLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#333',
  },
  signupText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  signupLink: {
    color: '#FFD700',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
   backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default LoginScreen;
