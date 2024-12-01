import { StyleSheet } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import { width } from '../../styles/responsiveSize';

export const styles = StyleSheet.create({
    cardContainer:{
        alignItems:'center',
        borderRadius:moderateScale(8),
        padding:moderateScale(12),
        marginBottom:moderateVerticalScale(12),
        marginHorizontal:moderateScale(6),
        width:width/2-24
    },
    orderTitle:{
        fontFamily:fontFamily.ProximaNovaMedium,
        fontSize:scale(16),
        marginVertical:moderateVerticalScale(4)
    },
    orderSubTitle:{
        fontFamily:fontFamily.ProximaNovaRegular,
        fontSize:scale(12),
        color:colors.blackLight
    },
    iconImg:{
        width:moderateScale(30),
        height:moderateVerticalScale(30),
        resizeMode:'contain',
        margin:moderateScale(6)
    },
    chartHeading:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:moderateScale(12),
        marginVertical:moderateVerticalScale(18)
    },
    titleHeading:{
        fontFamily:fontFamily.ProximaNovaBold,
        fontSize:scale(16),
    },
    vendorConatiner:{
        flexDirection:'row',
        alignItems:'center',
        padding:moderateScale(8),
        borderWidth:2,
        borderRadius:moderateScale(8),
        marginBottom:moderateVerticalScale(12)
    },
    vendorImg:{
        height:moderateVerticalScale(45),
        width:moderateVerticalScale(45),
        marginRight:moderateScale(12),
        resizeMode:'contain',
        borderRadius:moderateScale(30)
    },
    vendorName:{
        fontFamily:fontFamily.ProximaNovaBold,
        fontSize:scale(18)
    }
});
