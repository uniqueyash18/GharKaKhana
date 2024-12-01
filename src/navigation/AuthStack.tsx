import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import navigationsStrings from '../constants/navigationsStrings';
import Login from '../Screens/Login/Login';
import OtpVerify from '../Screens/OtpVerification/OtpVerify';
import Signup from '../Screens/Signup/Signup';
const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      {/* <Stack.Screen component={Onboarding} name={navigationsStrings.Onboarding} /> */}
      <Stack.Screen component={Login} name={navigationsStrings.Login} />
      <Stack.Screen component={Signup} name={navigationsStrings.Signup} />
      <Stack.Screen component={OtpVerify} name={navigationsStrings.OtpVerify} />
    </>
  );
};

export default AuthStack;
