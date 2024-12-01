import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import { showError } from "./helperFunctions";
import { t } from "i18next";

export const chekLocationPermission = (showAlert = true) =>
  new Promise(async (resolve, reject) => {
    try {
      check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      )
        .then((result) => {
          console.log("permission result", result)
          switch (result) {
            case RESULTS.UNAVAILABLE:
              showError(t("LOCATION_UNAVAILABLE"));
              break;
            case RESULTS.DENIED:
              request(
                Platform.OS === 'ios'
                  ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                  : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              )
                .then((result) => {
                  if (result == "blocked") {
                    if (showAlert) {
                      Alert.alert('', t('LOCATION_DISABLED_MSG'), [
                        {
                          text: t("CANCEL"),
                          onPress: () => resolve('goback'),
                        },
                        {
                          text: t('CONFIRM'),
                          onPress: () => {
                            const locationPath = 'LOCATION_SERVICES';
                            if (Platform.OS == 'ios') {
                                Linking.openURL(`App-Prefs:${locationPath}`);
                              } else {
                                Linking.openSettings();
                              }
                          },
                        },
                      ]);
                    }
                  }
                  return resolve(result);
                })
                .catch((error) => {
                  return reject(error);
                });

              break;
            case RESULTS.LIMITED:
              showError(t('LOCATION_DISABLED_MSG'));
              break;
            case RESULTS.GRANTED:
              return resolve(result);
            case RESULTS.BLOCKED:
              if (showAlert) {
                Alert.alert('', t('LOCATION_DISABLED_MSG'), [
                  {
                    text: t('CANCEL'),
                    onPress: () => resolve('goback'),
                  },
                  {
                    text: t('CONFIRM'),
                    onPress: () => {
                      const locationPath = 'LOCATION_SERVICES';
                      if (Platform.OS == 'ios') {
                        Linking.openURL(`App-Prefs:${locationPath}`);
                      } else {
                        Linking.openSettings();
                      }
                    },
                  },
                ]);
              }
              return resolve(result);
          }
        })
        .catch((error) => {
          return reject(error);
        });
    } catch (error) {
      return reject(error);
    }
  });

  export const androidCameraPermission = () =>
  new Promise(async (resolve, reject) => {

    try {

      if (Platform.OS === "android" && Platform.Version > 22) {
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.requestMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          ]);
          if (
            granted["android.permission.CAMERA"] !== "granted" ||
            granted["android.permission.READ_MEDIA_IMAGES"] !== "granted"
          ) {
            Alert.alert(
              "Alert",
              "Don't have permission to open camera",
              [{ text: "Okay" }],
              { cancelable: true }
            );
            return resolve(false);
            // alert(strings.DO_NOT_HAVE_PERMISSIONS_TO_SELECT_IMAGE);
          }
        } else {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          ]);
          if (
            granted["android.permission.CAMERA"] !== "granted" ||
            granted["android.permission.WRITE_EXTERNAL_STORAGE"] !== "granted" ||
            granted["android.permission.READ_EXTERNAL_STORAGE"] !== "granted"
          ) {
            Alert.alert(
              "Alert",
              "Don't have permission to open camera",
              [{ text: "Okay" }],
              { cancelable: true }
            );
            return resolve(false);
            // alert(strings.DO_NOT_HAVE_PERMISSIONS_TO_SELECT_IMAGE);
          }
        }
        return resolve(true);
      }

      return resolve(true);
    } catch (error) {
      return resolve(false);
    }
  });