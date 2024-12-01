import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import TextContainer from './TextContainer';

interface CustomToggleSwitchProps {
    isOn: boolean;
    onToggle: (isOn: boolean) => void;
    label?: string;
    activeColor?: string;
    inactiveColor?: string;
    labelStyle?: object;
    switchStyle?: object;
    canEdit?:boolean
}

const CustomToggleSwitch: React.FC<CustomToggleSwitchProps> = ({
    isOn,
    onToggle,
    label,
    activeColor = colors.green,
    inactiveColor = colors.greyA,
    labelStyle,
    switchStyle,
    canEdit=true
}) => {
    const [position] = useState(new Animated.Value(isOn ? 1 : 0));

    useEffect(() => {
        Animated.timing(position, {
            toValue: isOn ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isOn, position]);

    const toggleSwitch = () => {
        if(canEdit){
            onToggle(!isOn);
        }
    };

    const switchInterpolate = position.interpolate({
        inputRange: [0, 1],
        outputRange: [0, moderateScale(20)],
    });

    const backgroundColorInterpolate = position.interpolate({
        inputRange: [0, 1],
        outputRange: [inactiveColor, activeColor],
    });

    return (
        <View style={[styles.container, switchStyle]}>
            {label && <TextContainer text={label} style={[styles.label, labelStyle]as object} />}
            <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
                <Animated.View
                    style={[
                        styles.switchContainer,
                        { backgroundColor: backgroundColorInterpolate },
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.switchCircle,
                            { transform: [{ translateX: switchInterpolate }] },
                        ]}
                    />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    label: {
        fontSize: scale(14),
        fontFamily: fontFamily.ProximaNovaBold,
        color: colors.black,
        marginRight: moderateScale(10),
        marginBottom: moderateScale(12)
    },
    switchContainer: {
        width: moderateScale(40),
        height: moderateVerticalScale(22),
        borderRadius: moderateScale(20),
        justifyContent: 'center',
    },
    switchCircle: {
        width: moderateScale(16),
        height: moderateScale(16),
        borderRadius: moderateScale(8),
        margin:moderateScale(1),
        backgroundColor: colors.white,
    },
});

export default CustomToggleSwitch;
