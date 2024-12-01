import React from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {
  width
} from '../styles/responsiveSize';

interface ScrollableTopTabProps {
  screenName: any;
  mainViewStyle?: ViewStyle;
  onSelectScreen: (value: any) => void;
  selectedScreen: any;
  borderWidth?: number;
  tabTextStyle?: TextStyle;
  itemStyle?: ViewStyle;
  scrollEnabled?: boolean;
  scrollViewStyle?: ScrollViewProps['contentContainerStyle'];
}

const ScrollableTopTab: React.FC<ScrollableTopTabProps> = ({
  screenName,
  mainViewStyle = {},
  onSelectScreen,
  selectedScreen,
  borderWidth = 1,
  tabTextStyle,
  itemStyle = {},
  scrollEnabled = true,
  scrollViewStyle = {},
}) => {
  return (
    <View style={[styles.mainView, mainViewStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        contentContainerStyle={[
          {
            width: '100%',
            justifyContent: 'space-evenly',
          },
          scrollViewStyle,
        ]}
      >
        {screenName.map((value:{title:string,id:number}, index:number) => {
          const isSelected = selectedScreen?.id == index;
          return (
            <TouchableOpacity
              style={itemStyle}
              key={index}
              onPress={() => onSelectScreen(value)}
            >
              <Text
                style={[
                  styles.tabTextStyle,
                  {
                    fontFamily: fontFamily.ProximaNovaMedium,
                    color: isSelected ? colors.themeColor : colors.black,
                    fontSize:scale(14)
                  },
                  tabTextStyle,
                ]}
              >
                {value?.title}
              </Text>
              <View
                style={{
                  marginTop: moderateVerticalScale(5),
                  borderWidth: isSelected ? borderWidth : 0,
                  borderColor: colors.themeColor2,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ScrollableTopTab;

const styles = StyleSheet.create({
  mainView: {
    width: width-24,
    height: 40,
  },
  tabTextStyle: {
    fontSize: scale(14),
    color: colors.blackOpacity43,
    fontFamily: fontFamily.bold,
    marginTop: moderateVerticalScale(20),
    marginHorizontal:moderateScale(6)
  },
});
