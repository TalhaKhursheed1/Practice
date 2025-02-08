// import React, { useEffect } from 'react';
// import { StyleSheet, Text, View, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';

// const Splash = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace('HomeScreen');
//     }, 2000); // 3 seconds
//     return () => clearTimeout(timer); // Cleanup the timer
//   }, [navigation]);

//   return (
//     <LinearGradient
//       colors={['#ff7e5f', '#feb47b']} // Gradient colors
//       style={styles.splashContainer}
//     >
//       <View style={styles.content}>
//         <View style={styles.logoContainer}>
//           <Image 
//             source={require('./assets/Images/WhatsAppImage4.jpeg')} 
//             style={styles.logo} 
//             resizeMode="cover" 
//           />
//         </View>
//         <Text style={styles.splashText}>National Museum {"\n"} Pambansang Museo!</Text>
//       </View>
//     </LinearGradient>
//   );
// };

// export default Splash;

// const styles = StyleSheet.create({
//   splashContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   content: {
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   logoContainer: {
//     width: 120,
//     height: 100,
//     borderRadius: 30,
//     // overflow: 'hidden', // Ensures the image is clipped to a circle
//     marginBottom: 20,
//   },
//   logo: {
//     width: '106%',
//     height: '90%',
//   },
//   splashText: {
//     textAlign: 'center',
//     fontSize: 24,
//     color: 'white',
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.3)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 5,
//   },
// });
// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('WelcomeScreen');
    }, 2000); // 3-second delay
    return () => clearTimeout(timer);
  }, [navigation]);


  // const checkLogin = async () => {
  //   const id = await AsyncStorage.getItem('USERID');
  //   if(id!== null){
  //     navigation.navigate('HomeScreen');
  //   }else{
  //     navigation.navigate('WelcomeScreen');
  //   }
  // }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Images/app_logo.jpeg')}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.appName}>SOURCE 64 💖</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B4B4B',
  },
  logoContainer: {
    width: 170,  // Increased size for better visibility
    height: 120,
    borderRadius: 60,  // Makes the container a circle
    overflow: 'hidden',  // Ensures the image stays within the circular container
    backgroundColor: '#fff',  // Optional: adds a white background
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 60,  // Matches the container's shape for a clean look
    shadowOffset: { width: 2, height: 1 },
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowRadius: 5,
  },
  appName: {
    textAlign: 'center',
    fontSize: 24,
    color: '#D81B60',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});


export default Splash;
