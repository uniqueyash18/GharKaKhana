import React, { FC } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import imagePath from '../constants/imagePath'
import colors from '../styles/colors'
import fontFamily from '../styles/fontFamily'
interface Proptypes {
  title: String,
  isChecked: Boolean,
  oncheck: () => void
}
const CheckBoxWIthTitle: FC<Proptypes> = ({ title, isChecked, oncheck }: Proptypes) => {
  return (
    <TouchableOpacity onPress={oncheck} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: moderateScale(6), justifyContent: 'space-between' }}>
      <Text style={{ fontSize: scale(14), fontFamily: fontFamily.ProximaNovaRegular, color: colors.black }}>{title}</Text>
      <TouchableOpacity onPress={oncheck}>
        <Image style={{height:moderateVerticalScale(20),width:moderateScale(20),resizeMode:'contain',tintColor:isChecked?colors.themeColor:colors.blackOpacity86}} source={isChecked ? imagePath.ic_checked : imagePath.ic_unchecked} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default CheckBoxWIthTitle