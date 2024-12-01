import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import colors from '../styles/colors';
import { height, width } from '../styles/responsiveSize';

interface OnboardingProps {
  data: {
    id: number;
    image: any;
  }[];
  onpressBanner:(item:any)=>void
}

const CustomScrollBanner = ({ data,onpressBanner }: OnboardingProps) => {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<FlatList>(null);

  // Auto-scrolling logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const handleAutoScroll = () => {
      interval = setInterval(() => {
        const newIndex = (index + 1) % data.length;
        setIndex(newIndex);
        scrollRef.current?.scrollToIndex({ index: newIndex, animated: true });
      }, 5000); // Change 5000 to adjust auto-scrolling speed
    };

    handleAutoScroll();

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [index, data]);

  // Function to handle scroll event
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const newIndex = Math.floor(contentOffset / viewSize);
    setIndex(newIndex);
  };

  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === index ? colors.themeColor : colors.white },
            ]}
          />
        ))}
      </View>
    );
  };

  const mainView = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={()=>onpressBanner(item)}>
      <Image
        source={{uri:item?.image}}
        resizeMode="stretch"
        style={{
          height: height / 5,
          width: width - 28,
          borderRadius: moderateScale(12),
          marginHorizontal: moderateScale(2),
        }}
      />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        onMomentumScrollEnd={handleScroll}
        horizontal
        pagingEnabled
        data={data}
        style={{ width: width - 24, marginVertical: moderateVerticalScale(12) }}
        renderItem={mainView}
        showsHorizontalScrollIndicator={false}
      />
      {renderDots()}
    </View>
  );
};

export default CustomScrollBanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: moderateScale(width - 24),
  },
  dotContainer: {
    position: 'absolute',
    bottom: moderateVerticalScale(18),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(width - 48),
  },
  dot: {
    width: moderateScale(8),
    height: moderateVerticalScale(8),
    borderRadius: 6,
    marginHorizontal: 4,
  },
});
