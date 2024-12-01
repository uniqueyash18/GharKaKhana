import notifee, {
  AndroidColor,
  AndroidImportance,
  AndroidStyle,
  EventType
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { changeNotificationStatus, updateNotificationStatusNew } from '../redux/actions/home';


const ForegroundHandler = (props: any) => {
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail);
          let clickActionUrl = detail?.notification?.data?.click_action || null;
          break;
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {

      const { data, messageId, notification }: any = remoteMessage;
      console.log('remote message foreground', remoteMessage);

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        vibration: true,
        lightColor: AndroidColor.YELLOW,
        sound: notification?.android?.sound || 'default',
        importance: AndroidImportance.HIGH,

      });

      const customNotification = await notifee.createChannel({
        id: notification?.android?.channelId || 'custom',
        name: 'Custom Channel',
        vibration: true,
        lightColor: AndroidColor.YELLOW,
        sound: notification?.android?.sound || "notification",
        importance: AndroidImportance.HIGH,

      });

      let displayNotificationData = {};

      if (!!data?.fcm_options?.image || !!notification?.android?.imageUrl) {
        if (Platform.OS == 'ios') {

          displayNotificationData = {
            title: data?.title || notification?.title || '',
            body: data?.body || notification?.body || '',
            ios: {
              attachments: [
                {
                  // Remote image
                  url: data?.fcm_options?.image,
                },
              ],
              sound: (notification?.sound == 'notification.wav' || notification?.sound == 'notification')
                ? 'notification.wav'
                : 'default',
            },
            data: { ...data },
          };
        } else {
          displayNotificationData = {
            title: data?.title || notification?.title || '',
            body: data?.body || notification?.body || '',
            android: {
              sound: !!notification?.android?.sound ? notification?.android?.sound : 'default',
              channelId: (notification?.android?.sound == "notification" || notification?.android?.sound == "notification.mp3") ? customNotification : channelId,
              pressAction: {
                id: 'default',
              },
              importance: AndroidImportance.HIGH,
              style: {
                type: AndroidStyle.BIGPICTURE,
                picture: notification?.android?.imageUrl,
              },
            },

            data: { ...data },
          };
        }
      } else {

        displayNotificationData = {
          title: data?.title || notification?.title || '',
          body: data?.body || notification?.body || '',
          android: {
            sound: (!!notification?.android?.sound || !!notification?.sound) ? notification?.android?.sound || notification.sound : 'notification',
            channelId: (notification?.android?.sound == "notification" || notification?.android?.sound == "notification.mp3") ? customNotification : channelId,
            pressAction: {
              id: 'default',
            },
            importance: AndroidImportance.HIGH
          },
          ios: {
            sound: notification?.sound || 'notification.wav',
          },
          data: { ...data },
        };
      }
      console.log(displayNotificationData, 'displayNotificationData', customNotification)

      await notifee.displayNotification(displayNotificationData);
      if (((Platform.OS == 'ios' && notification.sound == 'notification.wav') || (Platform.OS == 'android' && notification.android.sound == 'notification')) && data.type != 'reached_location') {
        changeNotificationStatus(true)
        updateNotificationStatusNew(data)
      }
    });
    return unsubscribe;
  }, []);

  return null;
};

export default ForegroundHandler;
