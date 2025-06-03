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
import FastImage from 'react-native-fast-image';
interface ComponentState {
  email: string;
  passWord: any;
  hidePass: boolean;
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
  });

  const {
    email,
    passWord,
    hidePass,
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
      setItem('userData', { ...data?.data?.user, ...{ auth_token: data?.data?.token } });
      dispatch(setUserdata({ ...data?.data?.user, ...{ auth_token: data?.data?.token } }));
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
        res = validate({
          email: String(email),
          password: passWord,
        });

        if (res == true) {
          let UniqueId = await DeviceInfo.getUniqueId()
          let data = {
            email: email,
            password: passWord,
            device_type: Platform.OS,
            systemuser: UniqueId,
            device_token: !!fcm_token ? fcm_token : 'fcm not generated',
          };
          onLoginUser(data);
        } else {
          showError(res);
        }
      })
  };

  return (
    <WrapperContainer colorsArray={[colors.themeBackground, colors.themeBackground]}>
      <View style={styles.topview}>
        <FastImage resizeMode='contain' style={styles.logo} source={imagePath.logo} />
      </View>
      <ScrollView automaticallyAdjustKeyboardInsets={true} style={styles.bottomview}>
        <View style={{ ...styles.bottomview, marginTop: 0 }}>
          <TextContainer style={styles.logintxt} text={t('WELCOME_FOODIES')} />
          <TextContainer style={styles.enterRegEmail} text={t("ENTER_REGISTERED_EMAIL_PASSWORD")} />
          <View style={styles.inputarea}>
            <CustomTextInput
              isLeft={true}
              leftImg={imagePath.profileicon}
              value={email}
              placeholder={t('ENTER_REGISTERED_EMAIL')}
              onChangeText={val => {
                updateState({ email: val });
              }}
              containerStyles={{ marginBottom: moderateVerticalScale(12), marginHorizontal: moderateScale(12) }}
            />
            <CustomTextInput
              value={passWord}
              isLeft={true}
              leftImg={imagePath.lock}
              keyboardType="default"
              placeholder={t('Password')}
              onChangeText={val => {
                updateState({ passWord: val });
              }}
              containerStyles={{ marginTop: moderateVerticalScale(12), marginHorizontal: moderateScale(12) }}
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
            containerStyle={{ marginHorizontal: moderateScale(12) }}
          />
        </View>
        <View style={styles.dontHaveAcc}>
          <Text style={{ fontSize: scale(14), color: colors.whiteOpacity77 }}>
            {t('DONT_HAVE_ACCOUNT')}
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
