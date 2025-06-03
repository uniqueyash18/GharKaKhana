import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import dayjs from 'dayjs'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import CustomScrollBanner from '../../Components/CustomScrollBanner'
import GradientButton from '../../Components/GradientButton'
import TextContainer from '../../Components/TextContainer'
import WrapperContainer from '../../Components/WrapperContainer'
import { homeBanners } from '../../extra'
import colors from '../../styles/colors'
import { styles } from './styles'
interface propTypes {
  route?: {
    params: {

    }
  }
}
interface BarData {
  value: number;
  label: string;
  frontColor?: string;
}

const Homescreen: FC<propTypes> = ({ route }: propTypes) => {
  const { t } = useTranslation()
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [state, setState] = useState({
    isLoading: false,
  });

  const {
    isLoading,
  } = state;
  const updateState = (data: any) => setState(state => ({ ...state, ...data }));
  const maincourse = [
    { id: '1', name: 'Dal Makhni', quantity: '1 serve' },
    { id: '2', name: 'Mix Veg', quantity: '1 serve' },
    { id: '3', name: 'Rice', quantity: '1 serve' },
    { id: '4', name: 'Chapatti', quantity: '4 piece' },
  ];

  const appetizers = [
    { id: '1', name: 'Salad', quantity: '' },
    { id: '2', name: 'Raita', quantity: '1 serve' }
  ];

  const desserts = [
    { id: '1', name: 'Gulab Jamun', quantity: '1 piece' },
    { id: '2', name: 'Brownie', quantity: '1 piece' },
  ];
  const getMenuText = (): string => {
    const currentHour = dayjs().hour(); // This gets the current hour in 24-hour format
    console.log(currentHour, 'currentHour');

    if (currentHour >= 6 && currentHour < 12) {
      return "BREAKFAST FOOD MENU";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "LUNCH FOOD MENU";
    } else if (currentHour >= 17 && currentHour < 22) {
      return "DINNER FOOD MENU";
    } else {
      return "IT'S OVER NOW";
    }
  };

  return (
    <WrapperContainer colorsArray={[colors.themeBackground, colors.themeBackground]} isLoading={isLoading}>
      <ScrollView>
        <CustomScrollBanner
          onpressBanner={() => { }}
          data={homeBanners || []}
        />
        <View style={{ marginTop: moderateVerticalScale(6) }}>
          <TextContainer style={styles.tadayMenu} text={getMenuText()} />
          <TextContainer style={styles.menuTime} text={dayjs(new Date()).format('DD MMMM YYYY')} />
          <View style={styles.container}>
            <View style={{ flex: 0.9 }}>
              <View style={styles.headerContainer}>
                <TextContainer text='MAIN COURSE' style={styles.headerText} />
              </View>
              <FlatList
                data={maincourse}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.menuItem}>
                    <TextContainer text={item.name} style={styles.itemName} />
                    <TextContainer text={item.quantity} style={styles.itemquantity} />
                  </View>
                )}
              />
            </View>
            <FastImage style={styles.circularImage} resizeMode='stretch' source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/046/496/668/small/a-plate-with-various-types-of-food-on-it-png.png' }} />
          </View>
          <View style={styles.container}>
            <FastImage style={styles.circularImage} resizeMode='stretch' source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSpfa99QKpSRXAcUq58rUURWGq3ikIDTtS9iST9ZZB9jL1HvmJWZ7fK-uzUGQFnurrWg&usqp=CAU' }} />
            <View style={{ flex: 0.9 }}>
              <View style={styles.headerContainer}>
                <TextContainer text='APPETIZIRES' style={styles.headerText} />
              </View>
              <FlatList
                data={appetizers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.menuItem}>
                    <TextContainer text={item.name} style={styles.itemName} />
                    <TextContainer text={item.quantity} style={styles.itemquantity} />
                  </View>
                )}
              />
            </View>
          </View>
          <View style={styles.container}>
            <View style={{ flex: 0.9 }}>
              <View style={styles.headerContainer}>
                <TextContainer text='DESERTS' style={styles.headerText} />
              </View>
              <FlatList
                data={desserts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.menuItem}>
                    <TextContainer text={item.name} style={styles.itemName} />
                    <TextContainer text={item.quantity} style={styles.itemquantity} />
                  </View>
                )}
              />
            </View>
            <FastImage style={styles.circularImage} resizeMode='stretch' source={{ uri: 'https://png.pngtree.com/png-vector/20240407/ourmid/pngtree-gold-plate-with-assorted-desserts-elegant-dessert-platter-sweet-treats-on-png-image_12266440.png' }} />
          </View>
        </View>
        <GradientButton
          onPress={() => { }}
          btnText={t('BOOK_NOW')}
          colorsArray={[colors.themeColor, colors.themeColor]}
          containerStyle={{ marginHorizontal: moderateScale(12), marginTop: moderateVerticalScale(12), }}
        />
        <View style={{ height: moderateVerticalScale(80) }} />
      </ScrollView>
    </WrapperContainer>
  )
}

export default Homescreen