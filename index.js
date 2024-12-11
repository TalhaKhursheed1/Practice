import {AppRegistry, AppState} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import NavigationService from './src/NavigationService';

let notificationDispalyed = true;

const displayNotification = async (title, body) => {
  try {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      vibration: true,
      sound: 'default',
      importance: AndroidImportance.HIGH,
      vibrationPattern: [300, 500],
    });

    if (AppState.currentState !== 'active' && !notificationDispalyed) {
      await notifee.displayNotification({
        title: title,
        body: body,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
        },
      });
      notificationDispalyed = true;
    }
  } catch (error) {
    console.log('Errror Getting Notifications', error);
  }
};
const backgroundMessageHandler = async remoteMessage => {
  if (remoteMessage) {
    const {title, body} = await remoteMessage.notification;
    await displayNotification(title, body);
    NavigationService.navigate('Notification');
  }
};

messaging().setBackgroundMessageHandler(backgroundMessageHandler);
messaging()
  .getInitialNotification()
  .then(async remoteMessage => {
    if (remoteMessage) {
      const {title, body} = await remoteMessage.notification;
      await displayNotification(title, body);
      NavigationService.navigate('Notification');
    }
  });
AppRegistry.registerComponent(appName, () => App);

notifee.onForegroundEvent(async ({type, detail}) => {
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      // notificationDispalyed = false;
      break;
    case EventType.PRESS:
      setTimeout(() => {
        NavigationService.navigate('Notification');
      }, 1000);
      console.log('User pressed notification', detail.notification);
      // notificationDispalyed = true;
      break;
  }
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      // notificationDispalyed = false;
      break;
    case EventType.PRESS:
      setTimeout(() => {
        NavigationService.navigate('Notification');
      }, 1000);
      console.log('User pressed notification', detail.notification);
      // notificationDispalyed = true;
      break;
  }
});
