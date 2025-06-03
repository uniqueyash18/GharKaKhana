/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';

import codePush from "react-native-code-push";
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import Routes from './src/navigation/Routes';
import ForegroundHandler from './src/utils/ForegroundHandler';
import { getItem } from './src/services/apiService';
import { setLocation, setUserdata } from './src/redux/reducers/auth';
import { useDispatch } from 'react-redux';
import { notificationListener, requestUserPermission } from './src/utils/notificationService';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { chekLocationPermission } from './src/utils/permisions';
import Geolocation from '@react-native-community/geolocation';
import { getLocationName } from './src/utils/locationApi';
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

function App(): React.JSX.Element {
  const dispatch = useDispatch();

 useEffect(()=>{
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE
  });
  },[])
  useEffect(() => {
    getCurrentLocation();
    requestUserPermission()
    GoogleSignin.configure();
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  const getCurrentLocation = async () => {
    const hasPermission = await chekLocationPermission();
    if (hasPermission) {
      try {
        Geolocation.getCurrentPosition(
          location => {
            getLocationName(
              location.coords.latitude,
              location?.coords?.longitude,
            ).then(res => {
              dispatch(setLocation(res));
            });
          },
          error => {
            console.error('Error getting location:', error.message);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } catch (error) {
        console.error('Error getting location:', error);
      }
    } else {
      console.log('Location permission not granted');
    }
  };
  useEffect(() => {
    (async () => {
      const userData = getItem('userData');
      if (!!userData) {
        dispatch(setUserdata(userData));
      }

      notificationListener();
    })();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ForegroundHandler />
      <FlashMessage position="top" />
      <Routes />
    </View>
  );
}
export default codePush(codePushOptions)(App);
