import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const SignupScreen = ({ navigation }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validateInputs = () => {
    const { name, email, password, confirmPassword } = form;
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Name is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const registerUser = async () => {
    if (!validateInputs()) return;
    try {
      const userId = uuid.v4();
      await firestore().collection('users').doc(userId).set({ ...form, userId });
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Firestore Error:', error);
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
     <LinearGradient colors={['#FFCC70', '#C850C0']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.title}>Get Started with Source 64!</Text>
        <Text style={styles.subtitle}>Join and start chatting with your friends!</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#AAAAAA"
          value={form.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#AAAAAA"
          value={form.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#AAAAAA"
          secureTextEntry
          value={form.password}
          onChangeText={(value) => handleInputChange('password', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#AAAAAA"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
        />

        <TouchableOpacity style={styles.button} onPress={registerUser}>
         <LinearGradient colors={['#FF85B3', '#FF2A7F']} style={styles.gradient}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* <Text style={styles.socialText}>Or sign up with</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/Images/googleIcon.png')} style={styles.socialLogo} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/Images/fb.png')} style={styles.socialLogo} />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View> */}

        <Text style={styles.link} onPress={() => navigation.navigate('LoginScreen')}>
          Already have an account? <Text style={styles.linkHighlight}>Login</Text>
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
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
  link: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  linkHighlight: {
    color: '#FFC107',
    fontWeight: 'bold',
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

export default SignupScreen;
