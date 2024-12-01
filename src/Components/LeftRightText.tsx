import React, { FC } from 'react';
import { Clipboard, StyleSheet, Text, View } from 'react-native';
import { moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import TextContainer from './TextContainer';
interface propTypes {
  leftText: string;
  rightText: string;
  rightStyles?: object;
  leftStyles?: object;
  isCopy?:boolean
}
const LeftRightText: FC<propTypes> = ({
  leftText,
  rightText,
  rightStyles,
  leftStyles,
  isCopy
}: propTypes) => {
  return (
    <>
    <View style={styles.box}>
      <TextContainer style={{...styles.leftText, ...leftStyles}} text={leftText}/>
      {isCopy ?
      <TextContainer onPress={()=>Clipboard.setString(rightText)} style={{...styles.rightText, ...rightStyles}} text={rightText}/>
      :
      <Text style={{...styles.rightText, ...rightStyles}}>{rightText}</Text>
      } 
    </View>
     </>
  );
};

export default LeftRightText;
const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateVerticalScale(12),
  },
  leftText: {
    fontFamily: fontFamily.ProximaNovaMedium,
    fontSize: scale(14),
    color: colors.black,
    flex:1
  },
  rightText: {
    fontFamily: fontFamily.ProximaNovaMedium,
    fontSize: scale(14),
    flex:1,
    textAlign:'right',
    color:colors.black
  },
});
