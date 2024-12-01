import { StyleSheet } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';

export const styles = StyleSheet.create({
  header: {
    marginTop: moderateVerticalScale(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifycode: {
    fontSize: scale(24),
    flex: 1,
    fontWeight: '600',
    color: colors.black,
    fontFamily:fontFamily.ProximaNovaBold
  },
  topview:{
    flex:0.5
  },
  codesendto:{
    marginTop:moderateVerticalScale(30),
    textAlign:'center',
    fontSize:scale(14),
    fontFamily:fontFamily.ProximaNovaRegular,
    color:colors.black,
  },
  usernumber:{
 fontFamily:fontFamily.ProximaNovaBold,
 color:colors.black,
  },
  boxInput:{
    borderWidth:1,
    borderBottomWidth:1,
    borderRadius:moderateScale(6)
  },
  inputContainer:{
    marginVertical:moderateVerticalScale(14),
    alignItems:'center'
  },
  didNtRecieve:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    fontFamily:fontFamily.ProximaNovaRegular,
    marginTop:moderateScale(12)
  },
  resend:{
    color:colors.themeColor,
    fontFamily:fontFamily.ProximaNovaMedium,
    fontSize:scale(14)
  },
  enterNew:{
    fontFamily:fontFamily.ProximaNovaBold,
    marginVertical:moderateVerticalScale(12),
    fontSize:moderateVerticalScale(18)
  },
  enterRegEmail:{
    fontFamily:fontFamily.ProximaNovaBold,
    marginVertical:moderateVerticalScale(12),
    fontSize:moderateVerticalScale(18)
  }
});
