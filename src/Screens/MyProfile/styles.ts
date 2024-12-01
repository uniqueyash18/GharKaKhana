import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import fontFamily from "../../styles/fontFamily";

export const styles = StyleSheet.create({
  addressContainer: {
    borderWidth: 1,
    borderColor: colors.blackOpacity30,
    backgroundColor: colors.white,
    borderRadius: moderateScale(6),
    marginBottom: moderateVerticalScale(12),
    padding: moderateScale(12),
  },
  addressText: {
    fontFamily: fontFamily.ProximaNovaRegular,
    fontSize: scale(12),
    color: colors.blackOpacity70
  },
  labelStyle: {
    marginVertical: moderateVerticalScale(12),
    fontSize: scale(14),
    fontFamily: fontFamily.ProximaNovaBold,
    color: colors.black
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(10),
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    borderWidth: 1,
    borderColor: colors.blackOpacity30,
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
  logoView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: moderateVerticalScale(12)
  },
})