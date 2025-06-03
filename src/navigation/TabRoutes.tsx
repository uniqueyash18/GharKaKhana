import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import navigationsStrings from '../constants/navigationsStrings';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import AccountStack from './AccountStack';
import MainStack from './MainStack';
const TabRoutes = () => {
  const Tab = createBottomTabNavigator();
  const {t} = useTranslation()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelPosition:'below-icon',
        tabBarStyle: {
          position: 'absolute',
          borderTopRightRadius: moderateScale(12),
          borderTopLeftRadius: moderateScale(12),
          backgroundColor: colors.white,
          height:Platform.OS=='ios'?moderateVerticalScale(75):moderateVerticalScale(55),
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{
              fontFamily: fontFamily.ProximaNovaMedium,
              fontSize: scale(12),
              color: focused ? colors.themeColor : colors.themeBackground,
              marginTop:moderateVerticalScale(6)
            }}>
              {t("HOME")}
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            return (
              <FastImage
                style={{ width: moderateScale(25), height: moderateVerticalScale(25) }}
                resizeMode="contain"
                tintColor={focused ? colors.themeColor : colors.themeBackground}
                source={imagePath.ic_home}
              />
            );
          },
        }}
        component={MainStack}
        name={navigationsStrings.MainStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{
              fontFamily: fontFamily.ProximaNovaMedium,
              fontSize: scale(12),
              color: focused ? colors.themeColor : colors.themeBackground,
              marginTop:moderateVerticalScale(6)
            }}>
              {t("ACCOUNT")}
            </Text>
          ),
          tabBarIcon: ({ focused }) => {
            return (
              <FastImage
                style={{ width: moderateScale(25), height: moderateVerticalScale(25) }}
                resizeMode="contain"
                tintColor={focused ? colors.themeColor : colors.themeBackground}
                source={imagePath.ic_account}
              />
            );
          },
        }}
        component={AccountStack}
        name={navigationsStrings.AccountStack}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
