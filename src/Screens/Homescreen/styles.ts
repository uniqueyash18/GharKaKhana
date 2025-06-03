import { StyleSheet } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import { height, width } from '../../styles/responsiveSize';

export const styles = StyleSheet.create({
   homeHappiness: {
      textAlign: 'center',
      fontFamily: fontFamily.ProximaNovaMedium,
      color: colors.blackOpacity70,
      fontSize: scale(16),
   },
   tadayMenu:{
      textAlign: 'center',
      fontFamily: fontFamily.ProximaNovaBold,
      color: colors.white,
      fontSize: scale(24),
   },
   menuTime:{
      textAlign: 'center',
      fontFamily: fontFamily.ProximaNovaBold,
      color: colors.whiteOpacity77,
      fontSize: scale(14),
   },
   profile: {
      height: moderateVerticalScale(25),
      width: moderateScale(25),
    },
    myProfile:{
      margin:moderateScale(12),
      backgroundColor:colors.white,
      padding:moderateScale(6),
      borderRadius:moderateScale(18),
      alignSelf:'flex-end'
    },
    container: {
      flex: 1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginHorizontal:moderateScale(12),
      marginTop:moderateVerticalScale(24)
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: moderateVerticalScale(12),
    },
    headerText: {
      backgroundColor: colors.yellowB,
      fontSize: scale(14),
      fontFamily:fontFamily.ProximaNovaBold,
      padding:moderateScale(4)
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: moderateVerticalScale(6),
    },
    itemName: {
      fontSize: scale(12),
      color: colors.white,
      marginRight:moderateScale(6)
    },
    itemquantity: {
      fontSize: scale(12),
      color: colors.white,
    },
    imageContainer: {
      alignSelf: 'flex-end',
      marginTop: 16,
    },
    circularImage: {
      width: width/3.5,
      height: width/3.5,
      borderRadius: width/3.5/2, // Makes the image circular
      borderWidth: 2,
      borderColor: colors.white,
    },
});
