import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { CustomTextInput } from '../../Components/CustomTextInput';
import GradientButton from '../../Components/GradientButton';
import Header from '../../Components/Header';
import { PhoneNumberInput } from '../../Components/PhoneNumberInput';
import TextContainer from '../../Components/TextContainer';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import navigationsStrings from '../../constants/navigationsStrings';
import usePostData from '../../hooks/usePostData';
import { SIGNUP } from '../../services/routes';
import colors from '../../styles/colors';
import { showError, showSuccess } from '../../utils/helperFunctions';
import validate from '../../utils/validation';
import { styles } from './styles';
interface PropTypes {
  data?: any;
}
interface ComponentStates {
  phoneNumber: string;
  email: string;
  name: string;
  password: any;
  confirmPassword: any;
  hidePass: boolean | undefined;
  hideConfirmPass: boolean | undefined;
  countryCode: string;
  countryFlag: string;
  address: string,
  latitude:string;
  longitude:string;
  isLoading:boolean;
  istnc:boolean
}
interface SignUpResponseData {
  data: any;
  user?: object;
  token?: any;
  message: string;
}

interface SignUpRequestData { }
const Signup: FC<PropTypes> = ({ data }: PropTypes) => {

  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [state, setState] = useState<ComponentStates>({
    phoneNumber: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    hidePass: true,
    hideConfirmPass: true,
    countryCode: '679',
    countryFlag: 'FJ',
    address: '',
    istnc: false,
    latitude:'',
    longitude:'',
    isLoading:false
  });
  const onPressRightConfirmPass = () => {
    updateState({
      hideConfirmPass: !hideConfirmPass,
    });
  };
  const onPressRightPass = () => {
    updateState({
      hidePass: !hidePass,
    });
  };

  const {
    phoneNumber,
    email,
    password,
    confirmPassword,
    hidePass,
    hideConfirmPass,
    countryCode,
    countryFlag,
    name,
    address,
    istnc,
    latitude,
    longitude,
    isLoading
  } = state;
  const updateState = (data: Partial<ComponentStates>) =>
    setState(state => ({ ...state, ...data }));

  const { mutate: onSignUpUser, isPending } = usePostData<
    SignUpResponseData,
    Error,
    SignUpRequestData
  >(SIGNUP, {
    onSuccess: async (data, variable) => {
      updateState({isLoading:false})
      showSuccess(data?.data.message);
      navigation.goBack();
    },
    onError: async (error, variable) => {
      updateState({isLoading:false})
      showError(error);
    },
  });

  const onSignUp = async () => {
    const validation = validate({
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      confirmPassword: confirmPassword,
    });
    if (validation == true) {
      if(!istnc){
        showError("The term and condition must be accepted.")
        return
      }
      var formData = new FormData();
      formData.append('full_name', name);
      formData.append('email', email);
      formData.append('phone_number', phoneNumber);
      formData.append('dialCode', countryCode);
      formData.append('password', password);
      formData.append('confirm_password', confirmPassword);
      formData.append('address', address);
      formData.append('countryData', countryFlag);
      formData.append('check_conditions', istnc ? 1 : 0);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      console.log(formData,'formDataformData')
      updateState({isLoading:true})
      onSignUpUser(formData);
    } else {
      showError(validation);
    }
  };

  return (
    <WrapperContainer isLoading={isLoading} isSafeArea={true}>
      <ScrollView
      automaticallyAdjustKeyboardInsets={true}
        style={styles.bottomview}
        showsVerticalScrollIndicator={false}>
        <Header cetnerTitle={t('VENDOR_REGISTRATION')} isLeft={true} />
        <View>
          <View style={styles.inputarea}>
          <CustomTextInput
              value={name}
              keyboardType="default"
              placeholder={t('NAME')}
              containerStyles={{ marginBottom: moderateScale(18) }}
              onChangeText={val => {
                updateState({ name: val });
              }}
            />
            <CustomTextInput
              value={email}
              keyboardType="email-address"
              placeholder={t('EMAIL')}
              containerStyles={{ marginBottom: moderateScale(18) }}
              onChangeText={val => {
                updateState({ email: val });
              }}
            />
            <PhoneNumberInput
              setCountryCode={txt => {
                updateState({ countryCode: txt });
              }}
              setCountryFlag={txt => {
                updateState({ countryFlag: txt });
              }}
              countryCode={countryCode}
              countryFlag={countryFlag}
              maxLength={15}
              value={phoneNumber}
              keyboardType="numeric"
              placeholder={t('Phone_number')}
              containerStyles={{ marginBottom: moderateScale(18) }}
              onChangeText={val => {
                updateState({ phoneNumber: val });
              }}
            />
            <CustomTextInput
              value={password}
              placeholder={t('PASSWORD')}
              containerStyles={{ marginBottom: moderateScale(18) }}
              onChangeText={val => {
                updateState({ password: val });
              }}
              rightImg={hidePass ? imagePath.hideEye : imagePath.seeEye}
              rightImageStyle={{ height: moderateVerticalScale(20) }}
              onPressRight={onPressRightPass}
              secureTextEntry={hidePass as undefined}
            />
            <CustomTextInput
              value={confirmPassword}
              placeholder={t('CONFIRM_PASSWORD')}
              containerStyles={{ marginBottom: moderateScale(18) }}
              onChangeText={val => {
                updateState({ confirmPassword: val });
              }}
              rightImg={hideConfirmPass ? imagePath.hideEye : imagePath.seeEye}
              rightImageStyle={{ height: moderateVerticalScale(20) }}
              onPressRight={onPressRightConfirmPass}
              secureTextEntry={hideConfirmPass as undefined}
            />
            <TouchableOpacity style={styles.addressContainer} onPress={()=>navigation.navigate(navigationsStrings.MapScreen,{addressDone:(item:any)=>{updateState({address:item?.address,latitude:item?.latitude,longitude:item?.longitude})},selectedAddress:{address,latitude,longitude}})}>
            <TextContainer style={styles.addressText} text={!!address?address:t('ADDRESS')}/>
            </TouchableOpacity>

          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: moderateVerticalScale(12) }}>
        <TouchableOpacity onPress={() => updateState({ istnc: !istnc })} >
          <Image style={{height:moderateVerticalScale(22),width:moderateScale(22),resizeMode:'contain',tintColor:istnc?colors.themeColor:colors.blackOpacity86}} source={istnc ? imagePath.ic_checked : imagePath.ic_unchecked} />
        </TouchableOpacity>
        <TextContainer onPress={()=>navigation.navigate(navigationsStrings.Webview,{url:'https://fijieats.com/page/terms-and-conditions',heading:t('TERMS_AND_CONDITION')})} style={{ marginLeft: moderateScale(12),color:colors.blue }} text='I accept the terms and condition' />
        </View>
      </ScrollView>
      <GradientButton
        onPress={onSignUp}
        indicator={isPending||isLoading}
        btnText={t('SIGNUP')}
        containerStyle={{ marginBottom: moderateVerticalScale(10), marginTop: moderateVerticalScale(10) }}
      />
    </WrapperContainer>
  );
};

export default Signup;
