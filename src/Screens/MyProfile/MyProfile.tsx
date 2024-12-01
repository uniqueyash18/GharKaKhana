import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import WrapperContainer from '../../Components/WrapperContainer'
import Header from '../../Components/Header'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import useCustomQuery from '../../hooks/useCustomQuery'
import { GET_VENDOR_PROFILE, UPDATE_PROFILE } from '../../services/routes'
import usePostData from '../../hooks/usePostData'
import { showError, showSuccess } from '../../utils/helperFunctions'
import { CustomTextInput } from '../../Components/CustomTextInput'
import { PhoneNumberInput } from '../../Components/PhoneNumberInput'
import { useTranslation } from 'react-i18next'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { styles } from './styles'
import TextContainer from '../../Components/TextContainer'
import navigationsStrings from '../../constants/navigationsStrings'
import FastImage from 'react-native-fast-image'
import imagePath from '../../constants/imagePath'
import CustomToggleSwitch from '../../Components/CustomToggleSwitch'
import CustomImagePicker from '../../Components/CustomImagePicker'
import GradientButton from '../../Components/GradientButton'
import { isEmpty } from 'lodash'
import validate from '../../utils/validation'
import { setCurrVendor } from '../../redux/actions/home'
interface propsTypes {

}
const MyProfile: FC<propsTypes> = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { t } = useTranslation()
    const currentVendor = useSelector((state: RootState) => state?.home?.currentVendor);

    const [state, setState] = useState({
        isLoading: false,
        autoAccept: false,
        orderPrepareTime: 0,
        name: '',
        email: '',
        phone_number: '',
        vendorLogo: {} as any,
        vendorBanner: {} as any,
        description: '',
        shortDescription: '',
        latitude: '',
        longitude: '',
        address: '',
        countryCode: '679',
        countryFlag: 'FJ',
        minOrderAmount:''
    });

    const {
        isLoading,
        autoAccept,
        orderPrepareTime,
        name,
        email,
        phone_number,
        vendorLogo,
        vendorBanner,
        description,
        shortDescription,
        latitude,
        longitude,
        address,
        countryCode,
        countryFlag,
        minOrderAmount
    } = state;
    const updateState = (data: any) => setState(state => ({ ...state, ...data }));

    const { mutate: getOrderDetails } = usePostData(GET_VENDOR_PROFILE, {
        onSuccess: async (vendorData: any, variable) => {
            updateState({ isLoading: false })
            if (vendorData?.data?.data) {
                updateState({
                    autoAccept: vendorData?.data?.data?.auto_accept_order || '',
                    orderPrepareTime: vendorData?.data?.data?.order_pre_time || 0,
                    name: vendorData?.data?.data?.name || '',
                    email: vendorData?.data?.data?.email || '',
                    phone_number: vendorData?.data?.data?.phone_no || '',
                    vendorLogo: vendorData?.data?.data?.logo?.image_s3_url || '',
                    vendorBanner: vendorData?.data?.data?.banner?.image_s3_url || '',
                    description: vendorData?.data?.data?.desc || '',
                    shortDescription: vendorData?.data?.data?.short_desc || '',
                    address: vendorData?.data?.data?.address || '',
                    latitude: vendorData?.data?.data?.latitude || '',
                    longitude: vendorData?.data?.data?.longitude || '',
                    minOrderAmount:vendorData?.data?.data?.order_min_amount||''
                })
                setCurrVendor({
                    address: vendorData?.data?.data?.address,
                    id: vendorData?.data?.data?.id,
                    logo: vendorData?.data?.data?.logo,
                    name: vendorData?.data?.data?.name,
                    show_slot: vendorData?.data?.data?.show_slot
                })
            }
        },
        onError: async (error, variable) => {
            console.log(error, 'errorerror');
            updateState({ isLoading: false })
            showError(error);
        },
    }
    );
    const { mutate: saveVendorDeatil } = usePostData(UPDATE_PROFILE, {
        onSuccess: async (data: any, variable) => {
            if (data?.data?.data) {
                showSuccess(data?.data?.message || 'Profile Updated Successfully')
                getOrderDetails({ vendor_id: currentVendor?.id })

            }
        },
        onError: async (error, variable) => {
            console.log(error, 'errorerror');
            updateState({ isLoading: false })
            showError(error);
        },
    }
    )
    useEffect(() => {
        updateState({ isLoading: true })
        getOrderDetails({ vendor_id: currentVendor?.id })
    }, [])

    const onSaveDetails = () => {
        const validation = validate({
            email: email,
            phoneNumber: phone_number,
            vendorLogo: vendorLogo?.uri ? vendorLogo : undefined,
            vendorName: vendorBanner?.uri ? vendorBanner?.uri : undefined,
        });
        if (validation == true) {
            updateState({isLoading:true})
            var formData = new FormData();
            formData.append('vendor_id', currentVendor?.id)
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone_no', phone_number);
            formData.append('dialCode', countryCode);
            formData.append('desc', description);
            formData.append('short_desc', shortDescription);
            formData.append('order_pre_time', Number(orderPrepareTime));
            formData.append('auto_accept_order', !!autoAccept ? 1 : 0)
            formData.append('address', address);
            formData.append('countryData', countryFlag);
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);
            formData.append('order_min_amount',minOrderAmount)
            if (vendorLogo?.uri) {
                formData.append('upload_logo', {
                    uri: vendorLogo.uri,
                    name: vendorLogo.fileName,
                    filename: vendorLogo.fileName,
                    type: vendorLogo.type,
                });
            }
            if (vendorBanner?.uri) {
                formData.append('upload_banner', {
                    uri: vendorBanner.uri,
                    name: vendorBanner.fileName,
                    filename: vendorBanner.fileName,
                    type: vendorBanner.type,
                });
            }

            console.log(formData, 'formDataformData')
            saveVendorDeatil(formData);
        } else {
            showError(validation);
        }
    };
    return (
        <WrapperContainer isLoading={isLoading}>
            <Header isLeft={true} cetnerTitle={currentVendor?.name} />
            <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false} style={{ marginVertical: moderateVerticalScale(12) }}>
                <View style={styles.logoView}>
                    <CustomImagePicker
                        name={'logo'}
                        label={'Upload Logo'}
                        value={vendorLogo?.uri ? vendorLogo?.uri : String(vendorLogo)}
                        onChange={(image) => { updateState({ vendorLogo: image }) }}
                    />
                    <CustomImagePicker
                        name={'banner'}
                        label={'Upload Banner'}
                        value={vendorBanner?.uri ? vendorBanner?.uri : String(vendorBanner)}
                        onChange={(image) => { updateState({ vendorBanner: image }) }}
                    />
                </View>
                <CustomTextInput
                    value={name}
                    placeholder={t('RESTURANT_NAME')}
                    label={t('RESTURANT_NAME')}
                    containerStyles={{ marginBottom: moderateScale(8) }}
                    onChangeText={val => {
                        updateState({ name: val });
                    }}
                />
                <CustomTextInput
                    value={email}
                    keyboardType="email-address"
                    editable={false}
                    placeholder={t('EMAIL')}
                    label={t('EMAIL')}
                    containerStyles={{ marginBottom: moderateScale(8) }}
                    onChangeText={val => {
                        updateState({ email: val });
                    }}
                />
                <PhoneNumberInput
                    setCountryCode={txt => {
                        updateState({ countryCode: txt });
                    }}
                    setCountryFlag={txt => {
                        updateState({ countryFlag: txt });
                    }}
                    editable={false}
                    countryCode={countryCode}
                    countryFlag={countryFlag}
                    value={phone_number}
                    keyboardType="numeric"
                    placeholder={t('Phone_number')}
                    label={t('Phone_number')}
                    containerStyles={{ marginBottom: moderateScale(8) }}
                    onChangeText={val => {
                        updateState({ phone_number: val });
                    }}
                />
                <CustomTextInput
                    value={description}
                    label={t('DESCRIPTION')}
                    placeholder={t('DESCRIPTION')}
                    containerStyles={{ marginBottom: moderateScale(8) }}
                    onChangeText={val => {
                        updateState({ description: val });
                    }}
                />
                <CustomTextInput
                    value={shortDescription}
                    label={t('SHORT_DESCRIPTION')}
                    placeholder={t('SHORT_DESCRIPTION')}
                    containerStyles={{ marginBottom: moderateScale(8) }}
                    onChangeText={val => {
                        updateState({ shortDescription: val });
                    }}
                />
                <TextContainer style={styles.labelStyle} text={'ADDRESS'} />
                <TouchableOpacity style={styles.addressContainer} onPress={() => navigation.navigate(navigationsStrings.MapScreen, { addressDone: (item: any) => { updateState({ address: item?.address, latitude: item?.latitude, longitude: item?.longitude }) }, selectedAddress: { address, latitude, longitude } })}>
                    <TextContainer style={styles.addressText} text={!!address ? address : t('ADDRESS')} />
                </TouchableOpacity>
                <CustomTextInput
                    value={String(orderPrepareTime)}
                    label={t('ORDER_PREP_TIME')}
                    keyboardType='numeric'
                    placeholder={t('ORDER_PREP_TIME')}
                    containerStyles={{ marginBottom: moderateScale(8) }}
                    onChangeText={val => {
                        let numericValue = parseInt(val, 10);
                        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 120) {
                            updateState({ orderPrepareTime: numericValue });
                        }else if(!val){
                            updateState({ orderPrepareTime: '' });
                        }else{
                            showError("Maximum value is 120")
                        }
                    }}
                />
                <CustomTextInput
                    value={minOrderAmount}
                    label={t('MIN_ORDER_AMOUNT')}
                    keyboardType='numeric'
                    placeholder={t('MIN_ORDER_AMOUNT')}
                    containerStyles={{ marginBottom: moderateScale(8) }}
                    onChangeText={val => {updateState({minOrderAmount:val})}}
                />
                <View style={styles.container}>
                    <TextContainer style={styles.textStyle} text={'AUTO_ACCEPT_ORDER'} />
                    <CustomToggleSwitch onToggle={() => updateState({ autoAccept: !autoAccept })} isOn={autoAccept} />
                </View>
            </ScrollView>
            <GradientButton
                onPress={onSaveDetails}
                indicator={isLoading}
                btnText={t('SAVE')}
                containerStyle={{ marginBottom: moderateVerticalScale(10), marginTop: moderateVerticalScale(10) }}
            />
        </WrapperContainer>
    )
}

export default MyProfile