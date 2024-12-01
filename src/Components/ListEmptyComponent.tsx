import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import { width } from '../styles/responsiveSize';

interface ListEmptyComponentProps {
  text?: string;  
  imageSource?: ImageSourcePropType; 
}

const ListEmptyComponent: React.FC<ListEmptyComponentProps> = ({ text = 'No items available', imageSource }) => {
  return (
    <View style={styles.container}>
      {imageSource && (
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      )}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(100), 
    height: moderateScale(100),
    tintColor:colors.blackOpacity40,
    margin:moderateScale(30)
  },
  text: {
    fontSize: moderateScale(18),
    color: colors.blackOpacity70, 
    fontFamily: fontFamily.ProximaNovaMedium,
  },
});

export default ListEmptyComponent;
