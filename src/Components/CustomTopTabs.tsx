import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../styles/colors';

// Define types for the props

interface TopTabsProps {
  tabs:any;
  tabWidth?: number; // Optional prop with a default value
  onTabChange?: (index: number) => void;
}

const CustomTopTabs: React.FC<TopTabsProps> = ({ tabs, tabWidth = 100, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index: number) => {
    setSelectedTab(index);
    Animated.spring(slideAnim, {
      toValue: index * tabWidth,
      useNativeDriver: true,
    }).start();
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((item:any, index:any) => (
          <TouchableOpacity key={item.id} onPress={() => handleTabPress(index)} style={styles.tab}>
            <Text style={[styles.tabText, selectedTab === index && styles.activeTabText]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View
        style={[
          styles.slider,
          {
            width: tabWidth,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateVerticalScale(24),
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative',
  },
  tab: {
    padding: moderateScale(10),
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: scale(16),
    color: '#000',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: colors.themeColor,
  },
  slider: {
    position: 'absolute',
    bottom: 0,
    height: moderateVerticalScale(2),
    backgroundColor: colors.themeColor,
  },
});

export default CustomTopTabs;
