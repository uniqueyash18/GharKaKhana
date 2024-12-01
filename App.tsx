/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import { isEmpty } from 'lodash';
import codePush from "react-native-code-push";
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';
import NotificationModal from './src/Components/NotificationModal';
import usePostData from './src/hooks/usePostData';
import Routes from './src/navigation/Routes';
import { setLocation, setUserdata } from './src/redux/reducers/auth';
import { getItem } from './src/services/apiService';
import { INITIAL_APP_DATA } from './src/services/routes';
import ForegroundHandler from './src/utils/ForegroundHandler';
import { useChangeLanguage } from './src/utils/helperFunctions';
import { getLocationName } from './src/utils/locationApi';
import { requestUserPermission } from './src/utils/notificationService';
import { chekLocationPermission } from './src/utils/permisions';
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

function App(): React.JSX.Element {
  useEffect(() => {
    if (Platform.OS == 'android') {
      codePush.sync({
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE
      });
    }
  }, [])

  useEffect(() => {

    SplashScreen.hide()
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
