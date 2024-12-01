/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { AppRegistry, LogBox, Platform } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import i18next from './src/constants/lang/index';
import store from './src/redux/store';
const queryClient = new QueryClient();
LogBox.ignoreAllLogs();
if (__DEV__) {
  require("./ReactotronConfig");
}
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  const { data, notification } = remoteMessage;
  console.log("received in background messages", remoteMessage)

});

const RootComponent = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
    <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </I18nextProvider>
  </Provider>
);
AppRegistry.registerComponent(appName, () =>
  gestureHandlerRootHOC(RootComponent),
);
