import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import AccountListComp from '../../Components/AccountListComp';
import CustomToggleSwitch from '../../Components/CustomToggleSwitch';
import Header from '../../Components/Header';
import TextContainer from '../../Components/TextContainer';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import navigationsStrings from '../../constants/navigationsStrings';
import usePostData from '../../hooks/usePostData';
import { setUserdata } from '../../redux/reducers/auth';
import { RootState } from '../../redux/store';
import { setItem } from '../../services/apiService';
import { showError } from '../../utils/helperFunctions';
import { styles } from './styles';
interface Proptypes {
  data?: object;
}
const Account: FC<Proptypes> = ({ data }: Proptypes) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const userlogout = () => {
    Alert.alert('', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'destructive',
      },
      {
        text: 'Confirm',
        onPress: async () => {
          setIsLoading(false)
        },
      },
    ]);
  }
  return (
    <WrapperContainer isLoading={isLoading}>
      <Header cetnerTitle={t('MY_PROFILE')} isLeft={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
      <AccountListComp onPressItem={userlogout} centerTitle={'LOGOUT'} leftIcon={imagePath.logout} />
      </ScrollView>
    </WrapperContainer>
  );
};

export default Account;
