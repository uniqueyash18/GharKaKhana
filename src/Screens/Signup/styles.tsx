import { StyleSheet } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import { height, width } from '../../styles/responsiveSize';

export const styles = StyleSheet.create({
  topview: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3
  },
  logo:{
    height:height/5,
    width:width,
  },
  logintxt: {
    fontSize: scale(24),
    fontFamily: fontFamily.medium,
    color:colors.white,
    textAlign:'center'
  },
  inputarea: {
    marginTop: moderateVerticalScale(24),
  },
  enterRegEmail:{
    textAlign:'center',
    marginTop:moderateVerticalScale(12),
    color:colors.whiteOpacity77
  },
  forgot: {
    textAlign: 'right',
    fontSize: scale(14),
    color: colors.themeColor,
  },
  horizontalLine: {
    height: 1,
    borderWidth: 1,
    borderColor: colors.borderColor,
    flex: 1,
  },
  orLoginView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:moderateVerticalScale(32)
  },
  socialview:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  dontHaveAcc:{
    alignItems:'center',
    marginVertical:moderateVerticalScale(12)
  },
  logoView:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginVertical:moderateVerticalScale(12)
  },
  back:{
    position:'absolute',
    marginVertical:moderateScale(24),
    zIndex:9
  }
});
