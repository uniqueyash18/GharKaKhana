import React, {FC, ReactNode, useRef} from 'react';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import {moderateScale} from 'react-native-size-matters';
import colors from '../styles/colors';
interface Proptypes {
  children: ReactNode;
  isLoading?: boolean;
  bgColor?: string;
  statusBarColor?: string;
  barStyle?: string;
  withModal?: boolean;
  isSafeArea?: boolean;
  colorsArray?: any;
  mainStyle?:any
}

const WrapperContainer: FC<Proptypes> = ({
  colorsArray = [colors.white, colors.white],
  children,
  isLoading = false,
  bgColor = colors.white,
  statusBarColor = colors.white,
  barStyle = 'dark-content',
  withModal = false,
  isSafeArea = true,
  mainStyle
}: Proptypes) => {
  const keyboardDismiss = useRef(null);
  if (isSafeArea) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: statusBarColor,
        }}>
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle={barStyle as any}
        />
        <LinearGradient
          colors={colorsArray}
          style={{
            flex: 1,
            paddingHorizontal: moderateScale(12),
            ...mainStyle
          }}>
          <View ref={keyboardDismiss} style={{flex: 1}}>
            {children}
          </View>
          <Modal transparent visible={isLoading}>
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.whiteOpacity5,
              }}>
              <ActivityIndicator size={40} color={colors.themeColor} />
            </View>
          </Modal>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: statusBarColor,
        paddingHorizontal: moderateScale(12),
      }}>
      <StatusBar backgroundColor={statusBarColor} barStyle={barStyle as any} />
      <LinearGradient
        colors={colorsArray} // Example gradient colors
        style={{
          flex: 1,
        }}>
        <View style={{backgroundColor: 'transparent', flex: 1}}>
          {children}
        </View>
        <Modal transparent visible={isLoading}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.whiteOpacity5,
            }}>
            <ActivityIndicator size={25} color={colors.themeColor} />
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
};

export default React.memo(WrapperContainer);
