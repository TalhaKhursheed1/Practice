import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
// import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee,{AndroidImportance ,EventType} from '@notifee/react-native'
const Home = () => {

useEffect(()=>{
  getFcmToken()
},[]);

// Function to get FCM token 
  const getFcmToken=async()=>{
    const token = await messaging().getToken()
    console.log('TOKEN', token);
    
  }
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const{title, body} = remoteMessage.notification;
      Alert.alert('Message Recived', title);
      
      displayNotification(title, body)
    });
    return unsubscribe;
  }, []);

  const displayNotification= async(title,body)=>{
    await notifee.requestPermission();

    const channelId=await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      vibration:true,
      importance: AndroidImportance.HIGH,
      vibrate: [0, 250, 250, 250],
      vibrationPattern:[300,500]
    })

    await notifee.displayNotification({
      title:title,
      body: body,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction:{
          id: 'default', 
        }
      }
    });
  }

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})