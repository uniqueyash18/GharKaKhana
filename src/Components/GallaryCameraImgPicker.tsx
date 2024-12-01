import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';

interface Props {
  isVisible?: boolean;
  onClose?: () => void;
  onGallary?: () => void;
  onCamera?: () => void;
  onCancel?: () => void;
  isVisbleCamera?: boolean;
}

const GallaryCameraImgPicker: React.FC<Props> = ({
  isVisible = false,
  onClose = () => {},
  onGallary = () => {},
  onCamera = () => {},
  onCancel = () => {},
  isVisbleCamera = true,
}) => {
  const modalContent = () => {
    return (
      <View style={styles.mainViewStyle}>
        {isVisbleCamera && (
          <TouchableOpacity onPress={onCamera} style={styles.cameraGallaryCancelBtn}>
            <Text style={{ fontFamily: fontFamily.regular, fontSize: scale(14),color:colors.black }}>Camera</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onGallary} style={styles.cameraGallaryCancelBtn}>
          <Text style={{ fontFamily: fontFamily.regular, fontSize: scale(14),color:colors.black }}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel} style={styles.cameraGallaryCancelBtn}>
          <Text
            style={{
              fontFamily: fontFamily.regular,
              fontSize: scale(14),
              color: colors.redB,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ReactNativeModal isVisible={isVisible} onBackdropPress={onClose} style={styles.modalStyle}>
      {modalContent()}
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  cameraGallaryCancelBtn: {
    borderTopWidth: 1,
    borderTopColor: colors.grey1,
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateVerticalScale(40),
  },
  mainViewStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.white,
  },
});

export default GallaryCameraImgPicker;
