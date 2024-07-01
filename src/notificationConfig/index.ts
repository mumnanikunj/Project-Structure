import {Platform} from 'react-native'
import PushNotification, {Importance} from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import messaging from '@react-native-firebase/messaging'

import { debugLog, getAsyncData, showToast } from '../functions/commonFunctions'
import APICall from '../utils/api/api'
import EndPoints from '../utils/api/endpoints'
import { Colors } from '../utils/theme'
import constants from '../utils/theme/constants'

// const navigationRef
export const setupNotification = () => {
  PushNotification.createChannel(
    {
      channelId: 'Golfdaddy',
      channelName: 'Golfdaddy channel',
      channelDescription: 'A channel to categorise your notifications',
      playSound: true,
      importance: Importance.HIGH
    },
    (created: any) => {
      debugLog('Notification channel created ...', created)
    }
  )

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: async function (tokenData: any) {
      debugLog('token ==>', JSON.stringify(tokenData))

      const userData = await getAsyncData(constants.asyncStorageKeys.userData)
      if (Platform.OS === 'ios') {
        await messaging()
          .getToken()
          .then((fcmToken: any) => {
            if (fcmToken) {
              // constants.commonConstant.tokenData = {token: fcmToken, os: 'ios'}
              if (userData && userData !== null && userData !== undefined) {
                const  body = {
                  "device_token": fcmToken,
                  "device_type": Platform.OS
                }
                APICall('put', body, EndPoints.updateToken, false).then((resp: any) => {
                  if (resp.statusCode !== 200 && resp?.data?.message) {
                    showToast(resp?.data?.message)
                  }
                })
              }
            }
          })
      } else {
        const token = tokenData?.token

        if (userData && userData !== null && userData !== undefined && token) {
          
          const  body = {
            "device_token": token,
            "device_type": Platform.OS
          }
          APICall('put', body, EndPoints.updateToken, false).then((resp: any) => {
            if (resp.statusCode !== 200 && resp?.data?.message) {
              showToast(resp?.data?.message)
            }
          })
        }
      }
    },

    onNotification: function (notification: any) {
      debugLog('onNotification-=-=->', notification)
      // const currentState = navigationRef.getCurrentRoute()

      if (notification?.foreground) {
        PushNotification.localNotification({
          message: notification.message,
          title: notification.title,
          channelId: 'Golfdaddy',
          largeIcon: 'ic_launcher',
          color: Colors.green,
          priority: Importance.HIGH,
          smallIcon: "ic_launcher"
        })
        // Emitter.emit(`#${currentState?.name}`)
      }

      // navigationRef?.navigate(Screens.BookingHistory)

      if (Platform.OS === 'ios') {
        PushNotificationIOS.getApplicationIconBadgeNumber((num) => {
          // console.log('num ===> ', num)
          // get current number
          if (num >= 1) {
            PushNotificationIOS.setApplicationIconBadgeNumber(0)
          }
        })
      }
      
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData)
    },

    onAction: function (notification: any) {
      // process the action
      debugLog('onAction ', notification)
    },

    onRegistrationError: function (err: {message: any}) {
      debugLog(err.message, err)
    },
    // senderID: '491056865444',
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: true,
    requestPermissions: true
  })
}
