import React, { FC, ReactNode } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import TextContainer from './TextContainer';
import WrapperContainer from './WrapperContainer';
interface propTypes {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  modalStyles?:object
}
const BottomModal: FC<propTypes> = ({
  visible,
  onClose,
  children,
  title,
  modalStyles
}: propTypes) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <WrapperContainer>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:moderateScale(12)}}>
            <TextContainer style={styles.title} text={title as any}/>
            <TouchableOpacity style={styles.overlay} onPress={onClose}>
              <Image source={imagePath.close} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>{children}</View>
      </WrapperContainer>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    alignSelf: 'flex-end',
    padding:moderateScale(6)
  },
  content: {
    padding: moderateScale(12),
    flex:1,
  },
  title: {
    fontFamily: fontFamily.ProximaNovaBold,
    fontSize: scale(16),
    flex:1,
    textTransform: 'capitalize',
    color:colors.black
  },
});

export default BottomModal;
