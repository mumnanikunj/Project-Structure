/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { createRef, useEffect, useRef, useState } from 'react'
import {
  Appearance, EmitterSubscription, Platform, StatusBar, StyleSheet
} from 'react-native'
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  acknowledgePurchaseAndroid,
  clearTransactionIOS,
  endConnection,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  initConnection,
  type ProductPurchase,
  purchaseUpdatedListener,
  type SubscriptionPurchase
} from 'react-native-iap'
import PushNotification, { Importance } from 'react-native-push-notification';
import RBSheet from 'react-native-raw-bottom-sheet';
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux';
import { PortalProvider } from '@gorhom/portal'
import Intercom from '@intercom/intercom-react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import _ from 'lodash';
import { PersistGate } from 'redux-persist/es/integration/react';
import SpInAppUpdates from 'sp-react-native-in-app-updates';

import './src/i18n/i18n'
import AppErrorSheet from './src/components/AppErrorSheet';
import AppUpdateSheet from './src/components/AppUpdateSheet';
import Strings, { languages } from './src/constants/Strings'
import { debugLog, getAsyncData, showAlert } from './src/functions/commonFunctions'
import Root from './src/navigator/root'
import { setupNotification } from './src/notificationConfig';
import { persistor, store } from './src/store/configureStore';
import APICall from './src/utils/api/api'
import EndPoints from './src/utils/api/endpoints'
import { navigationRef } from './src/utils/RootNavigation';
import { Colors, Permission } from './src/utils/theme';
import constants, { commonConstant } from './src/utils/theme/constants'

const inAppUpdates = new SpInAppUpdates(
  false // isDebug
);
export const alertRef = createRef<RBSheet>();
export const updateAlertRef = createRef<RBSheet>();

function App(): JSX.Element {
  const [isLogged, setIsLogged] = useState(false)
  const [isLoading, setLoading] = useState(true);
  const loadingRef = useRef(isLoading);

  useEffect(() => {
    loadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    Appearance.setColorScheme('light') // MANDATORY TO DISABLE OS DARK MODE
    const fetchData = async () => {
      setLoading(true);
      const tokenData = await getAsyncData(constants.asyncStorageKeys.userToken)
      const appUser = await getAsyncData(constants.asyncStorageKeys.userData)

      // const languageKey = await AsyncStorage.getItem('settings.lang') || DEFAULT_LANGUAGE;
      // languageDetectorPlugin.cacheUserLanguage(languageKey)
     

      if (tokenData !== null && tokenData !== '' && appUser !== null && appUser !== '') {
        commonConstant.appUser = JSON.parse(appUser)
        commonConstant.tokenData = JSON.parse(tokenData)
        commonConstant.isLogin = true
        setIsLogged(true)
        Permission.getNotificationPermission()
        if (Platform.OS === 'ios') {
          PushNotificationIOS.setApplicationIconBadgeNumber(0)
        }
        Intercom.loginUserWithUserAttributes({
          userId: commonConstant.appUser.id
        }).catch(e => {
          console.log("InterCom Error ", e)
        });
        setupNotification();
        messaging().onMessage(async (remoteMessage: any) => {
          debugLog('A new FCM message arrived! ' + JSON.stringify(remoteMessage));
          PushNotification.localNotification({
            message: remoteMessage?.notification?.body,
            title: remoteMessage?.notification?.title,
            largeIcon: 'ic_launcher',
            smallIcon: "ic_launcher", // (optional) default:  "ic_notification" with fallback for "ic_launcher"
            color: Colors.green,
            channelId: 'Golfdaddy',
            priority: Importance.HIGH
          });
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    }

    let purchaseUpdateSubscription: EmitterSubscription

    initConnection().then(async () => {
      // we make sure that "ghost" pending payment are removed
      // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)

      if (Platform.OS === "android") {
        await flushFailedPurchasesCachedAsPendingAndroid()
      } else {
        /**
         * WARNING This line should not be included in production code
         * This call will call finishTransaction in all pending purchases
         * on every launch, effectively consuming purchases that you might
         * not have verified the receipt or given the consumer their product
         *
         * TL;DR you will no longer receive any updates from Apple on
         * every launch for pending purchases
         */
        await clearTransactionIOS()
      }
      purchaseUpdateSubscription = purchaseUpdatedListener(
        async (purchase: SubscriptionPurchase | ProductPurchase) => {
          if (purchase?.transactionReceipt) {
            const receipt = Platform.OS === "ios" ? purchase.transactionReceipt : purchase?.purchaseToken;

            if (receipt) {
              const payload = {
                platform: Platform.OS,
                receipt_data: receipt
              }
              APICall('post', payload, EndPoints.validateReceipt)
                .then(async (resp: any) => {
                  if (resp?.status === 200) {
                    // emitter.emit('onPurchase')
                    try {
                      await finishTransaction({
                        purchase,
                        isConsumable: false
                      })
                      if (Platform.OS === "android" && purchase.purchaseToken) {
                        await acknowledgePurchaseAndroid({
                          token: purchase.purchaseToken
                        })
                      }
                    } catch (ackErr) { }
                  }
                })
                .catch((e) => {
                  showAlert(e?.data?.error || Strings.error_alert_message);
                })
            }
          }
        }
      )
    })
    fetchData();

    setTimeout(async () => {
      if (!loadingRef.current) {
        SplashScreen.hide() // hides the splash screen on app load.
        inAppUpdates.checkNeedsUpdate().then((result) => {
          debugLog('inAppUpdates >>>', result)
          if (result.shouldUpdate) {
            updateAlertRef?.current?.open();
          }
        }).catch(err => {
          debugLog(err);
        });
      }
    }, 3000)

    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription?.remove()
      }
      endConnection();
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <NavigationContainer ref={navigationRef}>
        <PortalProvider>
          <StatusBar translucent backgroundColor={'transparent'} barStyle={"light-content"} />
          <GestureHandlerRootView style={StyleSheet.absoluteFill}>
            {!isLoading && <Root isLogged={isLogged} />}
            <AppErrorSheet alertRef={alertRef} />
            <AppUpdateSheet alertRef={updateAlertRef} />
            <FlashMessage position={"top"} />
          </GestureHandlerRootView>
        </PortalProvider>
      </NavigationContainer>
    </Provider>
  )
}

export default App

