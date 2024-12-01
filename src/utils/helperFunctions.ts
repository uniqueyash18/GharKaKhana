import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import dayjs from 'dayjs';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { Linking, Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { MMKV } from 'react-native-mmkv';
import { moderateVerticalScale } from 'react-native-size-matters';
import { onLogOut } from '../redux/actions/auth';
const storage = new MMKV();
export const googleLogin = async () => {
  GoogleSignin.configure();
  try {
    await GoogleSignin.signOut();
    const userInfo = await GoogleSignin.signIn();
    console.log('google login in try block',userInfo);
    return userInfo;
  } catch (error:any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('SIGN_IN_CANCELLED');
      return error;
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('IN_PROGRESS');
      return error;
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('PLAY_SERVICES_NOT_AVAILABLE');
      return error;
    } else {
      console.log(error, 'error in gmail');
      return error;
    }
  }
};

export const useChangeLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng:string) => {
    i18n.changeLanguage(lng);
  };

  return changeLanguage;
};

export const setStorage = (key: string, value: any) => {
  storage.set(key, value);
};
export const getStorage = (key: string) => {
  storage.getString(key);
};

export const showError = (message: any) => {
  console.log(message, 'THIS IS MESSAGE');
  showMessage({
    type: 'danger',
    icon: 'danger',
    floating: true,
    animated: true,
    message,
    style: {marginTop: moderateVerticalScale(16)},
  });
  // Toast.show(message);
};

export const showSuccess = (message: any) => {
  showMessage({
    type: 'success',
    icon: 'success',
    floating: true,
    animated: true,
    style: {marginTop: moderateVerticalScale(16)},
    message,
  });

  // Toast.show(message);
};
export const showInfo = (message: any) => {
  showMessage({
    type: 'info',
    icon: 'info',
    message,
  });
  // Toast.show(message);
};

export const makePhoneCall = (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phoneNumber}`;
  } else {
    phoneNumber = `telprompt:${phoneNumber}`;
  }

  Linking.openURL(phoneNumber);
};

// Function to send an email
export const sendEmail = (email: string) => {
  Linking.openURL(`mailto:${email}`);
};

// Function to send a text message
export const sendTextMessage = (phoneNumber: string) => {
  phoneNumber = `sms:${phoneNumber}`;
  Linking.openURL(phoneNumber);
};

// Function to send a WhatsApp message
export const sendWhatsAppMessage = (phoneNumber: string, message: string) => {
  const url = `https://wa.me/91${phoneNumber}?text=${message})`;
  Linking.openURL(url);
};


export function getMonthStartAndEndDates(monthIndex:number, year = dayjs().year()) {
  if (monthIndex < 0 || monthIndex > 11) {
    throw new Error("Invalid month index. It should be between 0 (January) and 11 (December).");
  }
  const startDate = dayjs(new Date(year, monthIndex)).startOf('month').format('YYYY-MM-DD');
  const endDate = dayjs(new Date(year, monthIndex)).endOf('month').format('YYYY-MM-DD');

  return { startDate, endDate };
}
export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getImageUrl(url1: string, url2: string, dimensions: string): string {
  return `${url1}${dimensions}${url2}`;
}
export const removeItemFromData = (data: any[], item: any): any[] => {
  return data.filter((currentItem) => currentItem.id !== item.id);
};
export const sessionHandler = () => {
  onLogOut()
};

export const getSlotTitle = (id: number) => {
  const days = [
    { label: 'Sunday', value: 'Sunday', id: 1 },
    { label: 'Monday', value: 'Monday', id: 2 },
    { label: 'Tuesday', value: 'Tuesday', id: 3 },
    { label: 'Wednesday', value: 'Wednesday', id: 4 },
    { label: 'Thursday', value: 'Thursday', id: 5 },
    { label: 'Friday', value: 'Friday', id: 6 },
    { label: 'Saturday', value: 'Saturday', id: 7 },
  ];
  const day = days.find(day => day.id === id);
  return day ? day as any : {};  
};

export function areLastTwoDigitsNumbers(str:string) {
  return /^\d{2}$/.test(str.slice(-2));
}
export function areLastTwoAlphabets(str:string) {
  return /^[a-zA-Z]{2}$/.test(str.slice(-2));
}