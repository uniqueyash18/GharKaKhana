import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { t } from 'i18next';
import React, { FC, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { CustomTextInput } from '../../Components/CustomTextInput';
import GradientButton from '../../Components/GradientButton';
import { PhoneNumberInput } from '../../Components/PhoneNumberInput';
import TextContainer from '../../Components/TextContainer';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import navigationsStrings from '../../constants/navigationsStrings';
import usePostData from '../../hooks/usePostData';
import { setUserdata } from '../../redux/reducers/auth';
import { setItem } from '../../services/apiService';
import { LOGIN } from '../../services/routes';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {
  showError
} from '../../utils/helperFunctions';
import { requestUserPermission } from '../../utils/notificationService';
import validate from '../../utils/validation';
import { styles } from './styles';
interface ComponentState {
  email: string;
  passWord: any;
  hidePass: boolean;
  countryCode: string;
  countryFlag: string;
  phone_number: string;
  isPhone: boolean
}
interface PropTypes {
  data?: any;
}
interface LoginResponseData {
  data: any;
  user?: object;
  token?: any;
  message: string;
}
let langauges = [
  {
    label: 'English',
    code: 'en',
  },
  {
    label: 'Hindi',
    code: 'hi',
  },
];
interface LoginRequestData { }
type LoginScreenNavigationProp = StackNavigationProp<any>;
const Login: FC<PropTypes> = ({ data }: PropTypes) => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const [state, setState] = useState<ComponentState>({
    email: '',
    passWord: '',
    hidePass: true,
    countryCode: '679',
    countryFlag: 'FJ',
    phone_number: '',
    isPhone: false
  });

  const {
    email,
    passWord,
    hidePass,
    countryCode,
    countryFlag,
    phone_number,
    isPhone
  } = state;
  const updateState = (data: any) => setState(state => ({ ...state, ...data }));
  const onPressRight = () => [
    updateState({
      hidePass: !hidePass,
    }),
  ];
  const { mutate: onLoginUser, isPending } = usePostData<
    LoginResponseData,
    Error,
    LoginRequestData
  >(LOGIN, {
    onSuccess: async (data, variable) => {
      console.log(data, 'login res');
      if (data?.data?.data?.verify_details?.is_email_verified && data?.data?.data?.verify_details?.is_phone_verified) {
        setItem('userData', data?.data?.data);
        dispatch(
          setUserdata(data?.data?.data),
        );
      } else {
        navigation.navigate(navigationsStrings.VerifyVendorOtp, data?.data?.data)
      }
    },
    onError: async (error, variable) => {
      console.log(error, 'errorerror');
      showError(error);
    },
  });
  const onPressLogin = async () => {
    requestUserPermission()
      .then(async (fcm_token: any) => {
        let res 
        if(isPhone){
          res = validate({
            phoneNumber: String(phone_number),
            password: passWord,
          });
        }else{
          res = validate({
            email: String(email),
            password: passWord,
          });
        }
        
        if (res == true) {
          let UniqueId = await DeviceInfo.getUniqueId()
          let data = {
            email:  !!isPhone ? phone_number : email,
            password: passWord,
            device_type: Platform.OS,
            systemuser: UniqueId,
            device_token: !!fcm_token ? fcm_token : 'fcm not generated',
            dialCode: !!isPhone ? countryCode : '',
            countryData: !!isPhone ? countryFlag : '',
            type:!!isPhone ? 'phone' : 'email'
          };
          onLoginUser(data);
        } else {
          showError(res);
        }
      })
  };

  return (
    <WrapperContainer>
      <ScrollView automaticallyAdjustKeyboardInsets={true} style={styles.bottomview}>
        <View style={{ ...styles.bottomview, marginTop: 0 }}>
          <TextContainer style={styles.logintxt} text={t('Log_In')} />
          <TextContainer style={styles.enterRegEmail} text={isPhone ? t("ENTER_REGISTERED_PHONE_PASSWORD") : t('ENTER_REGISTERED_EMAIL_PASSWORD')} />
          <View style={styles.inputarea}>
          <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: moderateVerticalScale(16),
                justifyContent:'space-between'
              }}>
              <TouchableOpacity
                onPress={() => updateState({isPhone:false,phone_number:'',passWord:''})}
                style={{...styles.tabHead,backgroundColor: !isPhone ? colors?.themeColor : colors.backGroundGreyD,}}>
                <TextContainer text='EMAIL'
                  style={{
                    color: isPhone ? colors.black : colors.white,
                    fontSize: scale(14),
                    fontFamily:fontFamily.ProximaNovaMedium,
                    flex:1,
                    textAlign:'center'
                  }}/>
              </TouchableOpacity>
              <TouchableOpacity
                 onPress={() => updateState({isPhone:true,email:'',passWord:''})}
                 style={{...styles.tabHead,backgroundColor: isPhone? colors?.themeColor: colors.backGroundGreyD,borderRadius: 8,}}>

                <TextContainer text='Phone_number'
                  style={{
                    color: isPhone ? colors.white : colors.black,
                    fontSize: scale(14),
                    fontFamily:fontFamily.ProximaNovaMedium,
                    flex:1,
                    textAlign:'center'
                  }}/>
              </TouchableOpacity>
            </View>
            {!isPhone ? <CustomTextInput
              value={email}
              placeholder={t('ENTER_REGISTERED_EMAIL')}
              onChangeText={val => {
                updateState({ email: val });
              }}
              containerStyles={{ marginBottom: moderateVerticalScale(12) }}
            /> :
              <PhoneNumberInput
                setCountryCode={txt => {
                  updateState({ countryCode: txt });
                }}
                setCountryFlag={txt => {
                  updateState({ countryFlag: txt });
                }}
                maxLength={15}
                countryCode={countryCode}
                countryFlag={countryFlag}
                value={phone_number}
                keyboardType="numeric"
                placeholder={t('Phone_number')}
                containerStyles={{ marginBottom: moderateScale(8) }}
                onChangeText={val => {
                  updateState({ phone_number: val });
                }}
              />}
            <CustomTextInput
              value={passWord}
              keyboardType="default"
              placeholder={t('Password')}
              onChangeText={val => {
                updateState({ passWord: val });
              }}
              containerStyles={{ marginTop: moderateVerticalScale(12) }}
              rightImg={hidePass ? imagePath.hideEye : imagePath.seeEye}
              rightImageStyle={{ height: moderateVerticalScale(20) }}
              onPressRight={onPressRight}
              secureTextEntry={hidePass}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(navigationsStrings.OtpVerify)}>
              <TextContainer style={styles.forgot} text={"Forgot_Passsword"} />
            </TouchableOpacity>
          </View>
          <GradientButton
            onPress={onPressLogin}
            indicator={isPending}
            btnText={t('LOGIN')}
          />
        </View>
        <View style={styles.dontHaveAcc}>
          <Text style={{ fontSize: scale(14), color: colors.black }}>
            {t('WANNA_JOIN_US')}
            <Text
              onPress={() => {
                navigation.navigate(navigationsStrings.Signup as never);
              }}
              style={{ color: colors.themeColor }}>
              {' '}
              {t('SIGNUP')}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default Login;
