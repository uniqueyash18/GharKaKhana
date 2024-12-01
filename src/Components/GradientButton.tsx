import React, { FC } from 'react';
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import TextContainer from './TextContainer';

interface GradientButtonProps  {
  containerStyle?: object;
  btnStyle?: object;
  borderRadius?: number;
  btnText: any;
  marginBottom?: number;
  textStyle?: object;
  indicator?: boolean;
  colorsArray?: string[];
  indicatorColor?: string;
  disabled?: boolean;
  textImgViewStyle?: object;
  isImgWithTxt?: boolean;
  leftImgSrc?: any;
  leftImgStyle?: object;
  onPress?:()=>void
}

const GradientButton: FC<GradientButtonProps> = ({
  containerStyle,
  btnStyle = {},
  borderRadius = 8,
  onPress,
  btnText,
  marginBottom = 0,
  textStyle = {
    color: colors.white,
    fontSize: scale(14),
    fontFamily: fontFamily.ProximaNovaMedium,
  },
  indicator = false,
  colorsArray = [colors.themeColor,colors.themeColor],
  indicatorColor = colors.white,
  disabled = !!indicator,
  textImgViewStyle = {},
  isImgWithTxt = false,
  leftImgSrc,
  leftImgStyle = {},
  ...rest
}: GradientButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      style={{
        borderWidth: 0,
        marginBottom,
        height: moderateVerticalScale(40),
        marginTop: moderateVerticalScale(32),
        ...containerStyle,
      }}
      onPress={onPress}
      {...rest} // Pass the rest of the TouchableOpacityProps
    >
      <LinearGradient
        start={{x: 0.0, y: -1.5}}
        end={{x: 1.5, y: 1.0}}
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          borderRadius,
          ...btnStyle,
        }}
        colors={colorsArray}>
        {!!indicator ? (
          <ActivityIndicator size="small" color={indicatorColor} />
        ) : (
          <View style={{...textImgViewStyle}}>
            {isImgWithTxt && (
              <Image
                source={leftImgSrc}
                style={{
                  ...leftImgStyle,
                }}
              />
            )}
            <TextContainer style={textStyle} text={btnText}/>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default React.memo(GradientButton);
