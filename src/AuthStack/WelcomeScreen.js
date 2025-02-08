import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Background Image */}
      <Image
        source={require('../assets/Images/app_logo.jpeg')} // Replace with your background image
        style={styles.backgroundImage}
      />

      {/* Content Section with Rounded Curves */}
      <View style={styles.contentContainer}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          {/* <Image
            source={require('../assets/Images/app_logo.jpeg')}
            style={styles.logo}
          /> */}
          <Text style={styles.title}>Welcome to SOURCE 64</Text>
          <Text style={styles.subtitle}>Connecting People & Building Relationships</Text>
        </View>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <LinearGradient colors={['#FF85B3', '#FF2A7F']}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.getStartedButton, styles.buttonWrapper]}
            onPress={() => navigation.navigate('SignupScreen')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#BBBBBB',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  buttonWrapper: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 15,
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#cccc',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
