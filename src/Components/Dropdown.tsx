import React, { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import TextContainer from './TextContainer';

interface Option {
  label: string;
  value: string;
  name?:string;
  id?:number;
  title?:string
}

interface Props {
  options: Option[];
  onSelect: (value: any) => void;
  placeholder?: string;
  value: any | any[];
  title?: string;
  multiSelect?: boolean;
  dropDownStyles?:any;
  labelStyles?:any;
  canEdit?:boolean
}

const Dropdown: React.FC<Props> = ({ options, onSelect, placeholder = `Select`, value, title = "", multiSelect = false ,dropDownStyles,labelStyles,canEdit=true}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if(canEdit){
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (selectedItem: Option) => {
    if (multiSelect) {
      let newValue;
      if (Array.isArray(value) && value.some(item => item.id === selectedItem.id)) {
        newValue = value.filter(item => item.id !== selectedItem.id);
      } else {
        newValue = Array.isArray(value) ? [...value, selectedItem] : [selectedItem];
      }
      onSelect(newValue);
    } else {
      onSelect(selectedItem);
      setIsOpen(false);
    }
  };

  const isSelected = (item: Option) => {
    return multiSelect ? Array.isArray(value) && value.some(selectedItem => selectedItem.id === item.id) : value?.id === item.id;
  };

  return (
    <View style={styles.container}>
      {!!title && <TextContainer style={{...styles.title,...labelStyles}} text={title}/>}
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownToggle}>
        <TextContainer style={styles.placeholder} text={multiSelect 
            ? (Array.isArray(value) && value.length ? value.map(item => item?.label||item?.title).join(', ') : `Select ${title}`)
            : ((value?.label||value?.name||value?.title) || `Select ${title}`)}/>
        <Image style={{transform: [{ rotate: isOpen ? '180deg':'1deg' }],marginLeft:moderateScale(10)}} tintColor={colors.black} source={imagePath.downArrow}/>
      </TouchableOpacity>
      {isOpen && (
        <View style={Platform.OS=='ios'?styles.dropdownIOS: styles.dropdownAndroid}>
          <ScrollView automaticallyAdjustKeyboardInsets={true} style={{maxHeight: moderateScale(150),...dropDownStyles}} nestedScrollEnabled>
            {options.map((item: Option) => (
              <TouchableOpacity key={item?.value} onPress={() => handleSelect(item)} style={{...styles.option,backgroundColor: isSelected(item) ? colors.themeColor2 : colors.backgroundGreyC}}>
                <TextContainer style={{ color: colors.black }} text={item?.label||item?.name||item?.title as any}/>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dropdownToggle: {
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: moderateScale(5),
    minWidth: moderateScale(150),
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  placeholder: {
    fontSize: scale(14),
    fontFamily: fontFamily.ProximaNovaMedium,
    color: colors.black,
    flex:1,
  },
  dropdownIOS: {
    zIndex: 1,
    backgroundColor: colors.backgroundGreyC,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    width:'100%',
  },
  dropdownAndroid: {
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: 1,
    backgroundColor: colors.backgroundGreyC,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    width:'100%',
  },
  option: {
    padding: moderateScale(10),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: scale(14),
    fontFamily: fontFamily.ProximaNovaBold,
    color: colors.black,
    marginVertical: moderateScale(12),
  },
});

export default Dropdown;
