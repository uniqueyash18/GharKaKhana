import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale, moderateVerticalScale,scale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import TextContainer from './TextContainer';

interface Proptypes {
  leftIcon: string;
  centerTitle: string;
  onPressItem: () => void;
  containerStyles?: object;
  title?: string;
  isImgUrl?: boolean;
}

const AccountListComp: FC<Proptypes> = ({
  leftIcon,
  centerTitle,
  onPressItem,
  containerStyles,
  title,
  isImgUrl = false,
}) => {
  return (
    <>
      {title && (
        <View style={styles.title}>
          <TextContainer style={styles.titletext} text={title} />
        </View>
      )}
      <TouchableOpacity
        onPress={onPressItem}
        style={[styles.container, containerStyles]}>
        <View style={styles.card}>
          <FastImage
            resizeMode={'contain'}
            source={isImgUrl ? {uri: leftIcon} : (leftIcon as any)}
            style={styles.imageStyle}
          />
          <TextContainer style={styles.textStyle} text={centerTitle} />
          <FastImage
            source={imagePath.backAngle}
            resizeMode="contain"
            style={styles.rightImageStyle}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default AccountListComp;

const styles = StyleSheet.create({
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
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: moderateScale(16),
    paddingVertical: moderateVerticalScale(14),
  },
  imageStyle: {
    height: moderateVerticalScale(22),
    width: moderateScale(22),
    flex: 0.2,
  },
  textStyle: {
    fontSize: scale(16),
    flex: 1,
    fontFamily: fontFamily.ProximaNovaMedium,
    color: colors.blackOpacity70,
  },
  rightImageStyle: {
    height: moderateVerticalScale(16),
    width: moderateScale(16),
    transform: [{rotate: '180deg'}],
  },
  title: {
    marginTop: moderateScale(12),
  },
  titletext: {
    fontFamily: fontFamily.ProximaNovaMedium,
    fontSize: scale(16),
    color: colors.blackOpacity86,
  },
});
