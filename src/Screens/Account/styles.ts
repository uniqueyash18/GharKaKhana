import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import fontFamily from "../../styles/fontFamily";
import { width } from "../../styles/responsiveSize";
import colors from "../../styles/colors";

export const styles = StyleSheet.create({
    topView: {
        backgroundColor: '#24C3A323',
        padding: moderateScale(12),
        borderRadius: moderateScale(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom: moderateVerticalScale(12)
    },
    vendorLogo: {
        height: moderateVerticalScale(60),
        width: moderateVerticalScale(60),
        borderRadius: moderateScale(width / 6),
    },
    addressView: {
        marginHorizontal: moderateScale(12),
        flex:1
    },
    vendorName: {
        fontFamily: fontFamily.ProximaNovaMedium,
        fontSize: scale(20),
    },
    vendorAddress: {
        fontFamily: fontFamily.ProximaNovaRegular,
        fontSize: scale(12),
        marginTop: moderateVerticalScale(4),
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: moderateVerticalScale(10),
        backgroundColor: colors.white,
        borderRadius: moderateScale(8),
        shadowColor: colors.black,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 4,
        paddingRight: moderateScale(16),
        paddingVertical: moderateVerticalScale(14),
      },
      textStyle: {
        fontSize: scale(16),
        flex: 1,
        fontFamily: fontFamily.ProximaNovaMedium,
        color: colors.blackOpacity70,
      },
      imageStyle: {
        height: moderateVerticalScale(22),
        width: moderateScale(22),
        flex: 0.2,
      },

})