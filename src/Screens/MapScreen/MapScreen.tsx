import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getPlaceDetails, googlePlacesApi, placesGeoCoding } from '../../utils/locationApi';
import colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import GradientButton from '../../Components/GradientButton';
import { height, width } from '../../styles/responsiveSize';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { debounce } from 'lodash';
import TextContainer from '../../Components/TextContainer';
import { CustomTextInput } from '../../Components/CustomTextInput';
import { useTranslation } from 'react-i18next';
import Header from '../../Components/Header';
import WrapperContainer from '../../Components/WrapperContainer';
import fontFamily from '../../styles/fontFamily';

interface SelectFromMapProps {
  route?: {
    params?: {
      addressDone?:any,
      selectedAddress?: { latitude: number, longitude: number, address: string }
    }
  }
}

const MapScreen: React.FC<SelectFromMapProps> = ({ route }) => {
  const currentLocation = useSelector(
    (state: RootState) => state?.auth?.location,
  );
  const appData = useSelector((state: RootState) => state?.appSetting?.appData);
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [address, setAddress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [selectedLatLong, setSelectedLatLong] = useState({
    latitude: currentLocation?.latitude || 18.141600,
    longitude: currentLocation?.longitude || 178.441895,
  })
  const [region, setRegion] = useState<Region>({
    latitude: currentLocation?.latitude || -18.143370,
    longitude: currentLocation?.longitude || 178.437170,
    latitudeDelta: 0.0021,
    longitudeDelta: 0.0021,
  });
  useEffect(() => {
    if (!!route?.params?.selectedAddress?.latitude && !!route?.params?.selectedAddress?.longitude && !!route?.params?.selectedAddress?.address) {
      setRegion({
        latitude: Number(route?.params?.selectedAddress?.latitude),
        longitude: Number(route?.params?.selectedAddress?.longitude),
        latitudeDelta: 0.0021,
        longitudeDelta: 0.0021,
      });
      setSelectedLatLong({
        latitude: Number(route?.params?.selectedAddress?.latitude),
        longitude: Number(route?.params?.selectedAddress?.longitude)
      })
      setAddress(route?.params?.selectedAddress?.address);
      return
    }
    if(currentLocation?.latitud&& currentLocation?.longitude){
      return
    }
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0021,
          longitudeDelta: 0.0021,
        });
        setSelectedLatLong({
          latitude,
          longitude
        })
        fetchAddressFromCoordinates(latitude, longitude);
      },
      (error) => console.log(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }, []);
  const fetchAddressFromCoordinates = async (latitude: number, longitude: number) => {

    var res: any = await placesGeoCoding(!!latitude ? latitude : currentLocation?.lat, !!longitude ? longitude : currentLocation?.lon
    )
    if (res?.results?.length > 0) {
      setAddress(res?.results[0]?.formatted_address);
      setSelectedLatLong({
        latitude,
        longitude
      })
    }
  };
  const addressFetch = async (text: string) => {
    if (!!text) {
      var res = await googlePlacesApi(
        text,
        { latitude: currentLocation?.lat, longitude: currentLocation?.long },
        appData?.primary_countries.length > 0 ? appData?.primary_countries?.map((itm: any) => itm?.country?.iso3) : ['FJI']
      )
      if (res?.predictions?.length as any > 0) {
        setAddressSuggestions(res?.predictions as any)
        setIsSuggestionsVisible(true)
      } else {
        setAddressSuggestions([])
        setIsSuggestionsVisible(false)
      }

    } else {
      setAddressSuggestions([])
      setIsSuggestionsVisible(false)
    }
  }
  const debouncedAddress = useCallback(debounce(addressFetch, 300), []);

  const onAddressChange = (text: string) => {
    setAddress(text);
    debouncedAddress(text);
  };

  const onRegionChangeComplete = async (newRegion: Region) => {
    await fetchAddressFromCoordinates(newRegion.latitude, newRegion.longitude);
  };


  const handleDone = () => {
    route?.params?.addressDone({
      latitude: selectedLatLong.latitude,
      longitude: selectedLatLong?.longitude,
      address,
    });
    navigation.goBack()
  };

  return (
    <WrapperContainer mainStyle={{ paddingHorizontal: moderateScale(0) }}>
      <Header isLeft={true} cetnerTitle={'Select Address'} />
      <View style={styles.container}>
        <MapView
          onPress={() => Keyboard.dismiss()}
          provider={Platform.OS=='android'?  PROVIDER_GOOGLE:PROVIDER_DEFAULT}
          style={StyleSheet.absoluteFillObject}
          region={region}
          initialRegion={region}
          mapType='hybrid'
          onRegionChangeComplete={onRegionChangeComplete}
        />

        <View style={styles.searchContainer}>
          <CustomTextInput
            value={address}
            placeholder={t('ADDRESS')}
            containerStyles={{}}
            onChangeText={onAddressChange}
          />
          {isSuggestionsVisible && addressSuggestions.length > 0 && (
            <FlatList
              data={addressSuggestions}
              keyExtractor={(item) => item}
              renderItem={({ item }: any) => (
                <TouchableOpacity style={styles.addressItem} onPress={async() => {
                  let res = await getPlaceDetails(item?.place_id)
                  setSelectedLatLong({latitude:res?.result?.geometry?.location?.lat,longitude:res?.result?.geometry?.location?.lng})
                  setAddress(item?.description)
                  setAddressSuggestions([])
                  setRegion({
                    latitude:res?.result?.geometry?.location?.lat,
                    longitude:res?.result?.geometry?.location?.lng,
                    latitudeDelta: 0.0021,
                    longitudeDelta: 0.0021,
                  });
                  setIsSuggestionsVisible(false)
                }}>
                  <TextContainer text={item?.description} />
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        <View style={styles.pinContainer}>
          <Image source={imagePath.locationIcon} style={{ tintColor: colors.themeColor, height: moderateVerticalScale(25), width: moderateVerticalScale(25) }} />
        </View>

        <View style={[styles.doneButtonContainer]}>
          <Text style={styles.addressLabel}>{address}</Text>
          <GradientButton btnText="Done" onPress={handleDone} />
        </View>
      </View>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  searchContainer: {
    position: 'absolute',
    top: moderateVerticalScale(20),
    width: width - 40,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    zIndex: 1
  },
  addressItem: {
    padding: moderateScale(10),
  },
  addressText: {
    fontSize: 16,
    color: colors.black,
  },
  pinContainer: {
    position: 'absolute',
    top: height / 2 - 40,
    left: width / 2 - 10,
  },
  doneButtonContainer: {
    position: 'absolute',
    bottom: 40,
    width: width - 40,
    alignSelf: 'center',
  },
  addressLabel: {
    marginBottom: 10,
    textAlign: 'center',
    color: colors.white,
    fontSize: scale(16),
    fontFamily: fontFamily.ProximaNovaBold
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});

export default MapScreen;
