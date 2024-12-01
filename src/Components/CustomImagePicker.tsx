import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import { androidCameraPermission } from '../utils/permisions';

interface CustomImagePickerProps {
  label: string;
  value: string;
  onChange: (value: any) => void;
  subHeading?: string;
  uploadingImage?: any;
  name?: string;
  isLoader?:boolean;
  canEdit?:boolean
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = ({
  label,
  value,
  onChange,
  subHeading,
  uploadingImage,
  name,
  isLoader=true,
  canEdit=true
}) => {
  const pickImage = async () => {
    if(!canEdit){
      return
    }
    Alert.alert(
      'Select Image',
      'Choose an option to select an image',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const permission = await androidCameraPermission();
            if (!permission) {
              return;
            }
            const result = await launchCamera({
              mediaType: 'photo',
              quality: 1,
            });

            if (result.assets && result.assets.length > 0) {
              onChange(result.assets[0] as any);
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            const result = await launchImageLibrary({
              mediaType: 'photo',
              quality: 1,
            });

            if (result.assets && result.assets.length > 0) {
              onChange(result.assets[0] as any);
            }
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const removeImage = () => {
    onChange('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {!!subHeading && (
          <Text
            style={{
              ...styles.label,
              fontSize: scale(12),
              color: colors.blackOpacity40,
            }}>
            {subHeading}
          </Text>
        )}
      </View>
      {value ? (
        <View style={styles.imageContainer}>
          <Image source={{uri: value}} style={styles.image} />
          <TouchableOpacity onPress={removeImage} style={styles.removeButton}>
            <Image source={imagePath.close} style={styles.removeIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={pickImage} style={styles.addButton}>
          {uploadingImage == name && isLoader ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.emptyImageContainer}>
              <Image style={styles.addIcon} source={imagePath.circleplus} />
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: moderateVerticalScale(10),
  },
  label: {
    marginVertical: moderateVerticalScale(2),
    fontSize: scale(14),
    fontFamily: fontFamily.ProximaNovaBold,
    color: colors.black,
  },
  labelContainer: {
    marginVertical: moderateVerticalScale(12),
  },
  imageContainer: {
    position: 'relative',
    width: moderateScale(100),
    height: moderateVerticalScale(100),
    backgroundColor: colors.backgroundGrey,
    zIndex: 1,
  },
  emptyImageContainer: {
    width: moderateScale(100),
    height: moderateVerticalScale(100),
    backgroundColor: colors.backgroundGrey,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(8),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(8),
    resizeMode: 'contain',
  },
  removeButton: {
    position: 'absolute',
    top: moderateScale(5),
    right: moderateScale(5),
    backgroundColor: colors.backGroundGreyD,
    borderRadius: moderateScale(15),
    padding: moderateScale(5),
  },
  removeIcon: {
    width: moderateScale(15),
    height: moderateVerticalScale(15),
  },
  addButton: {
    width: moderateScale(100),
    height: moderateVerticalScale(100),
    backgroundColor: colors.white,
    padding: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(8),
  },
  addIcon: {
    width: moderateScale(20),
    height: moderateVerticalScale(20),
    resizeMode: 'contain',
  },
});

export default CustomImagePicker;
