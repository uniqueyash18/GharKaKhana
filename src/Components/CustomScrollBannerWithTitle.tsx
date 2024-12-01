import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import { height, width } from '../styles/responsiveSize';
import TextContainer from './TextContainer';

interface OnboardingProps {
  data: {
    id: number;
    heading: string;
    image: any;
    description: string;
  }[];
  onPressSkip?: () => void;
  withText: boolean;
  imgStyle?: any;
  conatinerStyle?: any;
}

const CustomScrollBannerWithTitle = ({
  data,
  onPressSkip,
  withText = true,
  imgStyle,
  conatinerStyle,
}: OnboardingProps) => {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<FlatList>(null);

  // Auto-scrolling logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const handleAutoScroll = () => {
      interval = setInterval(() => {
        const newIndex = (index + 1) % data.length;
        setIndex(newIndex);
        scrollRef.current?.scrollToIndex({index: newIndex, animated: true});
      }, 2000); 
    };

    const handleCleanup = () => clearInterval(interval);

    handleAutoScroll();

    return handleCleanup;
  }, [index, data]);


  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / (width - 20),
    );
    setIndex(newIndex);
  };
  const mainView = ({item}: any) => {
    return (
      <View
        style={{
          width: width - 24,
          paddingHorizontal: moderateScale(16),
          ...conatinerStyle,
        }}
        key={String(item.id)}>
        <Image
          source={item?.image}
          resizeMode="contain"
          style={{
            height: height / 2.1,
            width: '100%',
            ...imgStyle,
          }}
        />
        {withText && (
          <TextContainer
            isDynamicText
            text={item?.heading}
            style={{
              fontSize: scale(24),
              marginVertical: moderateVerticalScale(6),
              fontFamily:fontFamily.ProximaNovaMedium
            }}
          />
        )}
        {withText && (
          <TextContainer
            isDynamicText
            text={item?.description}
            style={{
              fontSize: scale(16),
              fontFamily: fontFamily.ProximaNovaRegular,
            }}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef as any}
        onMomentumScrollEnd={handleScroll}
        horizontal
        onScrollToIndexFailed={({
          index,
        }) => {
          scrollRef.current?.scrollToOffset({
            offset: index * 1000,
            animated: true,
          });
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            scrollRef.current?.scrollToIndex({ index, animated: true });
          });
        }}
        pagingEnabled
        data={data}
        style={{width: width - 24, marginVertical: moderateVerticalScale(12)}}
        renderItem={mainView}
        showsHorizontalScrollIndicator={false}
      />
      {withText && (
        <View style={styles.flexView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {data.map((val, i) => (
              <View
                key={String(val.id)}
                style={{
                  ...styles.dotStyle,
                  backgroundColor:
                    i === index ? colors.themeColor : colors.greyA,
                }}
              />
            ))}
          </View>
          <View>
            <TextContainer
              style={{color: colors.themeColor}}
              text="SKIP"
              onPress={onPressSkip}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default CustomScrollBannerWithTitle;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: verticalScale(16),
  },
  dotStyle: {
    height: moderateScale(6),
    width: moderateScale(6),
    borderRadius: moderateScale(4),
    marginRight: moderateScale(8),
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(16),
  },
});
