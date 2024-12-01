import notifee from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import { changeNotificationStatus, updateNotificationStatusNew } from '../redux/actions/home';
import { getItem, setItem } from '../services/apiService';
export async function requestUserPermission(callback: (error: boolean) => void = () => {}): Promise<void> {
    try {
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }
      if (Platform.Version >= "33") {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message: 'Allow this app to post notifications?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
  
        if (permission !== null && permission === PermissionsAndroid.RESULTS.GRANTED) {
          return await getFcmToken();

        }
      } else {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
        if (enabled) {
          return await getFcmToken();
        }
      }
    } catch (error) {
      console.error(error);
      callback(true);
    }
  }

const getFcmToken = async () => {
  const fcm_token = await getItem('fcm_token')
  if(!!fcm_token){
    console.log(fcm_token,'old fcm_token')
    return fcm_token
  }else{
    const newFcmToken = await messaging().getToken();
     setItem('fcm_token',newFcmToken)
     await notifee.requestPermission();
        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
          id: 'sound-channel-id',
          name: 'Custom Channel',
          sound: 'notification',
          vibration: true,
          vibrationPattern: [300, 500],
        });
        const channelId2 = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          sound: 'default',
          vibration: true,
          vibrationPattern: [300, 500],
        }); 
     console.log(newFcmToken,'new fcm_token')
    return fcm_token
  }
};

export const notificationListener = async (): Promise<void> => {
    // Background
    messaging().onNotificationOpenedApp((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    });
  
    // Kill or inactive
    const initialNotification:any = await messaging().getInitialNotification();
    if (((Platform.OS == 'ios' && initialNotification?.notification.sound == 'notification.wav') || (Platform.OS == 'android' && initialNotification?.notification.android.sound == 'notification')) && initialNotification?.data.type != 'reached_location') {
      changeNotificationStatus(true)
      updateNotificationStatusNew(initialNotification?.data)
    }
  
  };
  