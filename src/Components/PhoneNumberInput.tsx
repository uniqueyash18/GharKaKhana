import React, { FC } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryPicker, { Country } from "react-native-country-picker-modal";
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
    setCountryCode:(val: any) => void;
    setCountryFlag:(val: any) => void;
    countryCode:string
    countryFlag:any,
  }
  export const PhoneNumberInput: FC<Proptypes> = ({
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
    maxLength=10,
    editable = true,
    label = '',
    labelStyles,
    maxHeight = moderateVerticalScale(50),
    multiline= false,
    setCountryCode,
    setCountryFlag,
    countryCode = "91",
    countryFlag = "IN",
    ...props
  }: Proptypes) => {
    const onSelect = (country: Country) => {
      setCountryFlag(country.cca2);
      setCountryCode(country?.callingCode[0]);
    };
    return (
      <View>
        {!!label && (
          <Text style={{...styles.labelStyle, ...labelStyles}}>{label}</Text>
        )}
        <View style={{...styles.container, ...containerStyles}}>
        {editable &&<CountryPicker
              // countryCodes={['IN']} 
              onSelect={onSelect}
              visible={false}
              countryCode={countryFlag}
              withCallingCode
            />}
            <TextContainer style={{ fontSize: scale(14) }} text={`+${countryCode}`} />
          {!!isLeft && (
            <TouchableOpacity>
              <Image
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
      padding: moderateScale(16),
      color: colors.blackOpacity66,
    },
    rightstyle: {},
    leftstyle: {},
    labelStyle: {
      marginVertical: moderateVerticalScale(12),
      fontSize: scale(14),
      fontFamily: fontFamily.ProximaNovaBold,
      color:colors.black
    },
  });
  