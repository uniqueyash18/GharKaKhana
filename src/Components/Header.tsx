import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View
} from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import TextContainer from './TextContainer';
interface Proptypes {
  cetnerTitle?: String|undefined;
  leftIcon?: String;
  OnPressLeft?: () => void;
  isRightIcon?: Boolean;
  RightIcon?: String;
  OnPressRight?: () => void;
  isCustomLeft?: Boolean;
  isLeft?: Boolean;
  rightImgStyle?:object;
  containerStyle?:any;
  centerTxtStyle?:any;
  leftImgStyle?:any
}
const Header: FC<Proptypes> = ({
  cetnerTitle,
  leftIcon,
  OnPressLeft,
  isRightIcon,
  RightIcon,
  OnPressRight,
  isCustomLeft,
  isLeft,
  rightImgStyle,
  containerStyle,
  centerTxtStyle,
  leftImgStyle
}: Proptypes) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: moderateVerticalScale(12),
        ...containerStyle
      }}>
        <View
          style={{flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
      {!!isLeft && (
        <>
          {!!isCustomLeft ? (
            <TouchableOpacity onPress={OnPressLeft}>
              <Image style={{...leftImgStyle}} source={leftIcon as ImageSourcePropType||imagePath.backAngle} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity hitSlop={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 5,
            }} onPress={() => navigation.goBack()}>
              <Image style={{...leftImgStyle,height:moderateVerticalScale(18),width:moderateScale(18)}}  source={imagePath.backAngle} />
            </TouchableOpacity>
          )}
        </>
      )}
      </View>
      <TextContainer
        text={cetnerTitle as any}
        style={{
          flex: 1,
          textAlign: 'center',
          fontFamily: fontFamily.ProximaNovaBold,
          fontSize: scale(20),
          color:colors.black,
          ...centerTxtStyle
        }}/>
      <View  style={{flex: 0.1}} >
      {!!isRightIcon && (
        <TouchableOpacity onPress={OnPressRight}>
          <Image style={rightImgStyle} source={RightIcon as ImageSourcePropType} />
        </TouchableOpacity>
      )}
       </View>
    </View>
  );
};

export default Header;
