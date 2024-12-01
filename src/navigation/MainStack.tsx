import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import navigationsStrings from '../constants/navigationsStrings';
import Homescreen from '../Screens/Homescreen/Homescreen';

const MainStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={navigationsStrings.Homescreen}
        component={Homescreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
