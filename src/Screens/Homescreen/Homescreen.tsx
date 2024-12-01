import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import WrapperContainer from '../../Components/WrapperContainer'
interface propTypes {
  route?: {
    params: {

    }
  }
}
interface BarData {
  value: number;
  label: string;
  frontColor?: string;
}

const Homescreen: FC<propTypes> = ({ route }: propTypes) => {
  const { t } = useTranslation()
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [state, setState] = useState({
    isLoading: false,
  });

  const {
    isLoading,
  } = state;
  const updateState = (data: any) => setState(state => ({ ...state, ...data }));


  return (
    <WrapperContainer isLoading={isLoading}>
      <></>
    </WrapperContainer>
  )
}

export default Homescreen