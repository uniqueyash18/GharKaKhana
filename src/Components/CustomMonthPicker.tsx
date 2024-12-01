import React, { useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import { height, width } from '../styles/responsiveSize';

interface MonthPickerProps {
  onMonthSelect: (item: string, month: number) => void;
  selectedMonth: string; // Bring selectedMonth from props
  months: string[]; // Bring month array from props
}

const CustomMonthPicker: React.FC<MonthPickerProps> = ({ onMonthSelect, selectedMonth, months }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleMonthSelect = (item: string, monthIndex: number) => {
    onMonthSelect(item, monthIndex);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.selectedMonthContainer} onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedMonthText}>{selectedMonth}</Text>
        <Image style={styles.downarrow} source={imagePath.downArrow} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Image source={imagePath.close} />
            </TouchableOpacity>
            <FlatList
              data={months}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={styles.monthItem} onPress={() => handleMonthSelect(item, index)}>
                  <Text style={styles.monthText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  selectedMonthContainer: {
    paddingHorizontal: moderateScale(8),
    paddingVertical:moderateScale(4),
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:colors.borderColor,
    minWidth:moderateScale(80),
    flexDirection:'row',
  },
  selectedMonthText: {
    fontSize: scale(12),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blackOpacity70,
  },
  modalContent: {
    backgroundColor: colors.whiteSmokeColor,
    borderRadius: moderateScale(8),
    width: moderateScale(width/1.5),
    maxHeight: moderateScale(height/2),
    padding: moderateScale(12),
  },
  monthItem: {
    padding: moderateScale(14),
    alignItems: 'center',
    borderBottomColor:colors.borderColor,
    borderBottomWidth:1
  },
  monthText: {
    fontSize: scale(16),
  },
  closeButton: {
    alignItems: 'flex-end',
  },
  closeButtonText: {
    fontSize: scale(18),
    color:colors.themeColor,
    margin:moderateScale(6)
  },
  downarrow:{
    marginLeft:moderateScale(12),
    tintColor:colors.black
  }
});

export default CustomMonthPicker;
