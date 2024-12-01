import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, PanResponder, Text, View } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import { width } from '../styles/responsiveSize';

interface SlideToComplete {
    onScrollComplete: (taskStatus: number) => void;
    statusTitle?: string,
    taskStatus: number;
}

const maxSlide = width - moderateScale(128);
const SlideComp: React.FC<SlideToComplete> = ({ onScrollComplete, statusTitle, taskStatus }) => {
    useEffect(() => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
    }, [taskStatus])

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useMemo(() =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([
                null,
                { dx: pan.x }
            ]),
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.dx > maxSlide) {
                    if (onScrollComplete) {
                        onScrollComplete(taskStatus);
                    }
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false
                    }).start();
                } else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false
                    }).start();
                }
            },
        }), [pan, taskStatus]);

    const color1 = colors.green;
    const color2 = colors.white;

    const bgColor = pan.x.interpolate({
        inputRange: [0, maxSlide],
        outputRange: [color1, color2],
        extrapolate: 'clamp'
    });

    const translateX = pan.x.interpolate({
        inputRange: [0, maxSlide],
        outputRange: [0, maxSlide],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            style={{
                justifyContent: 'center',
                backgroundColor: bgColor,
                marginVertical: moderateVerticalScale(12),
                borderRadius:moderateScale(8)
            }}
        >
            <View style={{ width: 120, height: 50, margin: moderateScale(4) }}>
                <Animated.View
                    style={{
                        transform: [{ translateX }],
                        width: '100%',
                        height: '100%',
                        backgroundColor: colors.white,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    {...panResponder.panHandlers}
                >
                    <Text style={{ color: colors.black, textAlign: 'center', fontSize: scale(12), fontFamily: fontFamily.bold }}>{statusTitle}</Text>
                </Animated.View>
            </View>
        </Animated.View>
    );
};

export default SlideComp;