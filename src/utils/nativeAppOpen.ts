import { Alert, Linking, Platform } from 'react-native';

// Types
type Coordinates = {
  lat: number;
  lng: number;
};
type WhatsAppParams = {
    phoneNumber: string;
    dialCode: string;
  };

// Open GPS
export const openGps = ({ lat, lng }: Coordinates): void => {
  const scheme = Platform.select({
    ios: 'maps:0,0?q=',
    android: 'geo:0,0?q=',
  });
  
  const latLng = `${lat},${lng}`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  }) || '';

  Linking.openURL(url).catch(() => {
    console.error("Could not open the GPS URL");
  });
};

// Dial a call
export const dialCall = (phoneNumber: string): void => {
  const url = Platform.OS === 'android' 
    ? `tel:${phoneNumber}` 
    : `telprompt:${phoneNumber}`;
  
  Linking.openURL(url).catch(() => {
    console.error("Could not initiate the call");
  });
};

// Open a browser
export const openBrowser = (url: string): void => {
  Linking.openURL(url).catch(() => {
    console.error("Could not load the page");
  });
};

// Open email client
export const openEmail = (email: string): void => {
  Linking.openURL(`mailto:${email}`).catch(() => {
    console.error("Could not open the email client");
  });
};

// Open app settings
export const openAppSetting = (path?: string): void => {
  const url = Platform.OS === 'ios'
    ? `App-Prefs:${path ?? ''}` 
    : `app-settings:`;

  Linking.openURL(url).catch(() => {
    console.error("Could not open the app settings");
  });
};


export const openWhatsApp = async ({ phoneNumber, dialCode }: WhatsAppParams): Promise<void> => {
    const cleanPhoneNumber = phoneNumber.replace(/\s/g, '');
    const url = `whatsapp://send?phone=${dialCode}${cleanPhoneNumber}`;
  
    try {
        await Linking.openURL(url);
        console.log("WhatsApp opened successfully.");
    } catch (error) {
      Alert.alert("","Make sure WhatsApp is installed on your device");
      console.error("Error opening WhatsApp", error);
    }
  };