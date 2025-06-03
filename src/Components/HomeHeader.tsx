import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import { width } from '../styles/responsiveSize';
interface Proptypes {
  vendorName?: any;
  onPressLoc?: Function;
  onpressVendorName?:()=>void;
  vendorLogo?:string;
  isRightIcon?:boolean
}
const HomeHeader: FC<Proptypes> = ({vendorName, onPressLoc,onpressVendorName,vendorLogo,isRightIcon=true}: Proptypes) => {
  return (
    <View>
      <View style={styles.container}>
        <FastImage
          source={{uri:vendorLogo}}
          resizeMode="contain"
          style={styles.vendorLogo}
        />
         <TouchableOpacity onPress={onpressVendorName} style={styles.centerarea}>
          <Text numberOfLines={1} style={styles.location}>
           {vendorName}
          </Text>
        </TouchableOpacity>
       {isRightIcon && <TouchableOpacity onPress={onpressVendorName}  style={styles.iconStyle}>
          <FastImage
          tintColor={colors.black}
            style={styles.notibell}
            source={imagePath.ic_account}
            resizeMode="contain"
          />
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor:colors.borderColor,
    borderBottomWidth:1,
    paddingVertical:moderateVerticalScale(8)
  },
  iconStyle: {
    width:moderateScale(30),
    height:moderateVerticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode:'contain'
  },
  vendorLogo: {
    width:moderateScale(40),
    height:moderateVerticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode:'contain'
  },
  centerarea: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  location: {
    maxWidth: moderateScale(width / 1.5),
    textAlign: 'center',
    fontFamily: fontFamily.ProximaNovaBold,
    fontSize: scale(18),
    color:colors.black
  },
  notibell: {
    height: moderateVerticalScale(25),
    width: moderateScale(25),
  },
});
export default HomeHeader;
