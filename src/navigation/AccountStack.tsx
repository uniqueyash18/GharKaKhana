import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import navigationsStrings from '../constants/navigationsStrings';
import Account from '../Screens/Account/Account';

const AccountStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={navigationsStrings.MyAccount}
        component={Account}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
