import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationsStrings from '../constants/navigationsStrings';
import TabRoutes from './TabRoutes';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import AuthStack from './AuthStack';
import Webview from '../Screens/WebView/Webview';
import MapScreen from '../Screens/MapScreen/MapScreen';

export default function Routes() {
  const Stack = createNativeStackNavigator();
  const userData = useSelector((state: RootState) => state?.auth?.userData);
  console.log(userData,'userDatauserData')
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userData?.auth_token ? (
          <Stack.Screen
            component={TabRoutes}
            name={navigationsStrings.TabRoutes}
          />
        ) : (
          AuthStack()
        )}
        <Stack.Screen
          component={Webview}
          name={navigationsStrings.Webview}
        />
        <Stack.Screen
          component={MapScreen}
          name={navigationsStrings.MapScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
