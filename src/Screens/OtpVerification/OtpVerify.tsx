import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { CustomTextInput } from '../../Components/CustomTextInput';
import GradientButton from '../../Components/GradientButton';
import Header from '../../Components/Header';
import TextContainer from '../../Components/TextContainer';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import { forgotPassword } from '../../redux/actions/auth';
import { showError, showSuccess } from '../../utils/helperFunctions';
import validate from '../../utils/validation';
import { styles } from './styles';
interface RouteParams {
  params: {
    phonenumber: Number;
    email: String;
    name: String;
    password: String;
    isAdmin: Boolean;
    _id: any;
  };
}
interface PropTypes {
  route?: RouteParams;
}
interface ConponentState {
  email: string;
  isLoading: boolean;
}
const OtpVerify: FC<PropTypes> = ({ route }: PropTypes) => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any>>();
  let otpInputRef = useRef(null);

  const [state, setState] = useState<ConponentState>({
    email: '',
    isLoading: false,
  });
  const {
    email,
    isLoading,
  } = state;

  const updateState = (data: Partial<ConponentState>) =>
    setState(state => ({ ...state, ...data }));

  const sendmyOtp = async () => {
    if (!email) {
      showError('Please enter a valid Email');
      return;
    }
    updateState({ isLoading: true });
    await forgotPassword({ email }).then((res) => {
      showSuccess(res?.success);
      updateState({ isLoading: false });
      navigation.goBack()

    }).catch((err) => {
      updateState({ isLoading: false });
    })

  };
  return (
    <WrapperContainer>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <Header
          leftIcon={imagePath.backAngle}
          isCustomLeft={true}
          OnPressLeft={() => navigation.goBack()}
          isLeft={true}
          cetnerTitle={t('EMAIL')}
        />
        <View>
          <TextContainer
            style={styles.enterRegEmail}
            text="ENTER_REGISTERED_EMAIL"
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
        </View>
      </ScrollView>
      <GradientButton
        indicator={!!isLoading}
        containerStyle={{ marginBottom: moderateVerticalScale(32) }}
        onPress={() => {
          const isValidated = validate({ email })
          if (isValidated==true) {
            sendmyOtp();
          } else {
            showError('Please enter a valid Email');
            return;
          }
        }
        }
        btnText={t('VERIFY')}
      />
    </WrapperContainer>
  );
};

export default OtpVerify;
