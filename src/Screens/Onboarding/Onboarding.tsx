import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import CustomScrollBannerWithTitle from '../../Components/CustomScrollBannerWithTitle';
import WrapperContainer from '../../Components/WrapperContainer';
import navigationsStrings from '../../constants/navigationsStrings';
import { onBoardData } from '../../extra';




const Onboarding = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  return (
    <WrapperContainer>
      <CustomScrollBannerWithTitle withText={true} data={onBoardData||[]} onPressSkip={()=>navigation.navigate(navigationsStrings.Login)}/>
    </WrapperContainer>
  );
};

export default Onboarding;
