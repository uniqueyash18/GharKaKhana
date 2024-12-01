import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import WrapperContainer from '../../Components/WrapperContainer';
import Header from '../../Components/Header';
interface PropTypes {
  data?: any;
}
interface ComponentStates {
}

const VendorSignUp: FC<PropTypes> = ({data}: PropTypes) => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const [state, setState] = useState<ComponentStates>({

  });

  const {
  } = state;
  const updateState = (data: Partial<ComponentStates>) =>
    setState(state => ({...state, ...data}));

  return (
    <WrapperContainer isSafeArea={true}>
    <Header cetnerTitle={t('VENDOR_REGISTRATION')} isLeft={true} />

    </WrapperContainer>
  );
};

export default VendorSignUp;
