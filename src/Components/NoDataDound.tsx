import { t } from 'i18next';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateVerticalScale, scale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import { height, width } from '../styles/responsiveSize';
interface props {
  route?: {
    params?: {
      title: string;
    };
  };
}
const NoDataDound: FC<props> = ({route}: props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateVerticalScale(height / 8),
      }}>
      <FastImage
        resizeMode="contain"
        style={{height: height / 7, width: width / 3}}
        tintColor={colors.blackOpacity10}
        source={imagePath.empty}
      />
      <Text
        style={{
          textAlign: 'center',
          marginTop: moderateVerticalScale(24),
          fontFamily: fontFamily.ProximaNovaMedium,
          fontSize: scale(18),
          color:colors.black
        }}>
        {t('NO_DATA_FOUND')}
      </Text>
    </View>
  );
};

export default NoDataDound;
