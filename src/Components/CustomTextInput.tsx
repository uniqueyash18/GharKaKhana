import React, { FC } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import TextContainer from './TextContainer';
interface Proptypes {
  value: any;
  containerStyles?: object;
  leftImg?: any;
  rightImg?: any;
  isLeft?: boolean;
  isRight?: boolean;
  placeholder?: string;
  placeHolderColor?: string;
  textInputStyles?: object;
  keyboardType?: string;
  onChangeText?: (val: any) => void;
  rightImageStyle?: object;
  leftImageStyle?: object;
  secureTextEntry?: boolean;
  onPressRight?: () => void;
  maxLength?: number;
  editable?: boolean;
  label?: string;
  labelStyles?: object;
  maxHeight?: number;
  multiline?:boolean;
  onBlur?:(e?:any)=>void;
  mainContainerSyle?:any
}
export const CustomTextInput: FC<Proptypes> = ({
  value,
  containerStyles = {},
  leftImg,
  rightImg,
  isLeft = !!leftImg ? true : false,
  isRight = !!rightImg ? true : false,
  placeholder,
  placeHolderColor = colors.blackOpacity43,
  textInputStyles = {},
  keyboardType = 'default',
  onChangeText = () => {},
  rightImageStyle = {},
  leftImageStyle = {},
  secureTextEntry = false,
  onPressRight = () => {},
  maxLength,
  editable = true,
  label = '',
  labelStyles,
  maxHeight = moderateVerticalScale(50),
  multiline= false,
  onBlur=(e)=>{},
  mainContainerSyle={},
  ...props
}: Proptypes) => {
  return (
    <View style={mainContainerSyle}>
      {!!label && (
        <TextContainer style={{...styles.labelStyle, ...labelStyles}} text={label}/>
      )}
      <View style={{...styles.container, ...containerStyles}}>
        {!!isLeft && (
          <TouchableOpacity>
            <Image
              resizeMode='contain'
              style={{...styles.leftstyle, ...leftImageStyle} as any}
              source={leftImg}
            />
          </TouchableOpacity>
        )}
        <TextInput
          multiline={multiline}
          textAlignVertical='top'
          placeholder={placeholder}
          editable={editable}
          style={{
            ...styles.textinputStyles,
            ...textInputStyles,
            maxHeight: maxHeight,
          }}
          value={value}
          keyboardType={keyboardType as any}
          placeholderTextColor={placeHolderColor}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          onBlur={onBlur}
          {...props}
        />
        {!!isRight && (
          <TouchableOpacity onPress={onPressRight}>
            <Image
              style={{...styles.rightstyle, ...rightImageStyle} as any}
              source={rightImg}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.blackOpacity30,
    backgroundColor:colors.white,
    justifyContent: 'center',
    borderRadius: moderateScale(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
  },
  textinputStyles: {
    fontSize: scale(14),
    flex: 1,
    padding: moderateScale(12),
    color: colors.blackOpacity66,
  },
  rightstyle: {
    height:moderateScale(20),
    width:moderateVerticalScale(20)
  },
  leftstyle: {
    height:moderateScale(15),
    width:moderateVerticalScale(15)
  },
  labelStyle: {
    marginVertical: moderateVerticalScale(12),
    fontSize: scale(14),
    fontFamily: fontFamily.ProximaNovaBold,
    color:colors.black
  },
});
