import { StyleSheet } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';

export const styles = StyleSheet.create({
  topview: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateVerticalScale(30),
  },
  logintxt: {
    fontSize: scale(18),
    fontFamily: fontFamily.ProximaNovaBold,
    color:colors.black,
    marginVertical:moderateVerticalScale(12)
  },
  bottomview: {
  },
  inputarea: {
    marginTop: moderateVerticalScale(24),
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
  addressItem:{
    borderBottomWidth:1,
    borderBlockColor:colors.borderColor,
    padding:moderateScale(6)
  },
  addressContainer:{
    borderWidth: 1,
    borderColor: colors.blackOpacity30,
    backgroundColor:colors.white,
    borderRadius: moderateScale(6),
    marginBottom:moderateVerticalScale(12),
    padding: moderateScale(12),
  },
  addressText:{
    fontFamily:fontFamily.ProximaNovaRegular,
    fontSize:scale(12),
    color:colors.blackOpacity70
  }
});
