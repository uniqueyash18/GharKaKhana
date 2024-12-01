import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import TextContainer from './TextContainer';

type CustomDatePickerProps = {
    initialDate?: Date;
    onDateChange: (date: Date) => void;
    mode?: 'date' | 'time' | 'datetime';
    minimumDate?: Date;
    maximumDate?: Date;
    label?: string;
    selectedDate: string;
    labelStyle?:any
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    initialDate = new Date(),
    onDateChange,
    mode = 'datetime',
    minimumDate,
    maximumDate,
    label = 'Select Date',
    labelStyle = {},
    selectedDate
}) => {
    const [date, setDate] = useState<Date>(initialDate);
    const [open, setOpen] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <TextContainer style={{...styles.labelText,...labelStyle}} text={label} />
            <TouchableOpacity style={styles.touchView} onPress={() => setOpen(true)}>
                <TextContainer text={selectedDate ? selectedDate : label as any} />
                <Image style={{ tintColor: colors.black }} source={imagePath.downArrow} />
            </TouchableOpacity>
            <DatePicker
                modal
                open={open}
                mode={mode}
                date={date}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                onConfirm={(date) => {
                    onDateChange(date);
                    setOpen(false);
                }}
                onCancel={() => {
                    setOpen(false);
                    setDate(initialDate)
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: moderateScale(12),
    },
    touchView: {
        borderColor: colors.borderColor,
        borderWidth: 1,
        padding: moderateScale(12),
        borderRadius: moderateScale(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    labelText: {
        fontFamily: fontFamily.ProximaNovaMedium,
        fontSize: scale(14),
        marginBottom: moderateVerticalScale(12)
    }
});

export default CustomDatePicker;
