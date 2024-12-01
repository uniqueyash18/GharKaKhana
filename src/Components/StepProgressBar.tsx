import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../styles/colors';
import TextContainer from './TextContainer';
import imagePath from '../constants/imagePath';
import fontFamily from '../styles/fontFamily';
type steps = {
    title: string,
    id: number
}
interface StepProgressBarProps {
    currentStep: steps; // Current active step (1, 2, or 3)
    onStepChange: (step: steps) => void; // Function to handle step change
    steps: steps[]
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep, onStepChange, steps }) => {
    return (
        <View style={styles.container}>
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep?.id === stepNumber;
                const isCompleted = currentStep?.id > stepNumber;
                return (
                    <>
                        <TouchableOpacity key={index} onPress={() => onStepChange(step)} style={styles.stepContainer}>
                            <TextContainer style={[styles.stepLabel, isActive ? styles.activeLabel : null] as any} text={step?.title} />
                            <View style={[styles.stepIndicator, isCompleted ? styles.completed : null, isActive ? styles.active : null]} />
                        </TouchableOpacity>
                        {index < steps.length-1 &&<Image style={{transform: [{rotate: '180deg'}],margin:'auto',tintColor:isCompleted ?colors.green:colors.black}} source={imagePath.backAngle}/>}
                    </>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: moderateVerticalScale(4),
        backgroundColor: '#f2f2f2',
    },
    stepContainer: {
        alignItems: 'center',
        flex: 1,
    },
    stepIndicator: {
        width: moderateScale(60),
        height: moderateVerticalScale(5),
        backgroundColor: '#d3d3d3',
        borderRadius: moderateScale(5),
        marginBottom: moderateVerticalScale(5),
    },
    completed: {
        backgroundColor: colors.green,
    },
    active: {
        backgroundColor: colors.themeColor,
    },
    stepLabel: {
        fontSize: scale(14),
        color: colors.black,
        textAlign: 'center',
        marginBottom: moderateVerticalScale(6),
        fontFamily:fontFamily.ProximaNovaMedium
    },
    activeLabel: {
        color: colors.themeColor,
    },
});

export default StepProgressBar;
