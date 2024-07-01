import React, { useEffect, useState } from 'react'
import { Alert, Platform, SafeAreaView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PushNotification, { Importance } from 'react-native-push-notification'
import { useDispatch } from 'react-redux'
import Intercom from '@intercom/intercom-react-native'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import messaging from '@react-native-firebase/messaging'
import { CommonActions } from '@react-navigation/native'
import parsePhoneNumber from 'libphonenumber-js'
import _ from 'lodash'

import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { OtpView } from '../../components/otpview/OtpView'
import ScreenNavigation from '../../constants/ScreenNavigation'
import Strings from '../../constants/Strings'
import { checkInternetConnection, debugLog, setAsyncData, showAlert } from '../../functions/commonFunctions'
import { setupNotification } from '../../notificationConfig'
import { setCurrentStep, updateOnBoardData } from '../../store/actions/SessionActions'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { Colors, Permission } from '../../utils/theme'
import constants, { commonConstant } from '../../utils/theme/constants'
import styles from './style'
import { GdText } from '../../components/text/gd-text'

const LoginSignUpCode = ({ navigation, route }: any) => {
  const [errorEmpty, setErrorEmpty] = useState(true)
  const [resendTimer, setResendTimer] = useState(60) // Initial timer value (e.g., 60 seconds)
  const [visible, setVisible] = useState(false);
  const [visibleCode, setVisibleCode] = useState(false);
  const [loading, setLoading] = useState(false)
  const [formatedPhone, setFormatedPhone] = useState<string>('')
  const [otpCode, setOtpCode] = useState<string>('')
  const dispatch = useDispatch()

  const notificationSetup = () => {
    Permission.getNotificationPermission()
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0)
    }
    setupNotification();
    messaging().onMessage(async (remoteMessage: any) => {
      debugLog('A new FCM message arrived! ' + JSON.stringify(remoteMessage));
      PushNotification.localNotification({
        message: remoteMessage?.notification?.body,
        title: remoteMessage?.notification?.title,
        largeIcon: 'ic_launcher',
        smallIcon: "ic_launcher",
        color: Colors.green,
        channelId: 'Golfdaddy',
        priority: Importance.HIGH
      });
    });
  };

  useEffect(() => {
    if (_.size(otpCode) === 4) {
      callAPIToVerifyCode()
    }
  }, [otpCode])

  useEffect(() => {
    // Set formated phone number
    const phoneNumber = parsePhoneNumber(route.params.number, route.params.countryCode)
    setFormatedPhone(phoneNumber?.formatNational()
      || ('+' + route.params.callingCode + route.params.number))

    // Create a timer to decrement the resendTimer state every second
    const interval = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer(resendTimer - 1)
      }
    }, 1000)

    // Clear the interval when the component unmounts
    return () => clearInterval(interval)
  }, [resendTimer])

  const callAPIToSendCode = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      const body = JSON.stringify({
        mobile_no: '+' + route.params.callingCode + route.params.number
      })
      setLoading(true)
      APICall('post', body, EndPoints.signUp, false).then(async (res: any) => {
        debugLog(res)
        if (res?.data) {
          if (res?.statusCode === 200) {
            setLoading(false)
          } else if (res?.statusCode === 422) {
            if (res?.data?.errors?.mobile_no !== undefined) {
              showAlert(res?.data?.errors?.mobile_no)
            } else {
              showAlert(JSON.stringify(res?.data?.errors))
            }
            setLoading(false)
          } else {
            showAlert(JSON.stringify(res?.data?.errors))
            setLoading(false)
          }
        } else {
          setLoading(false)
        }
      })
    } else {
      setVisible(true);
    }
  }

  const handleResendOTP = () => {
    setResendTimer(60) // Reset the timer to its initial value
    callAPIToSendCode()
  }

  const callAPIToVerifyCode = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      const body = JSON.stringify({
        mobile_no: '+' + route.params.callingCode + route.params.number,
        otp: otpCode
      })
      setLoading(true)
      const url = EndPoints.loginVerify
      APICall('post', body, url, false).then(async (res: any) => {
        debugLog(res)
        if (res?.data) {
          if (res?.statusCode === 200 || res?.statusCode === 201) {
            if (res?.data?.data) {
              const data = res?.data?.data
              debugLog(data)
              await setAsyncData(
                constants.asyncStorageKeys.userToken,
                JSON.stringify(res?.data.token)
              )
              await setAsyncData(constants.asyncStorageKeys.userData, JSON.stringify(data))
              commonConstant.appUser = data
              commonConstant.tokenData = res?.data.token
              commonConstant.isLogin = true
              if (data.stage_id < 16 && data.stage_id !== -1) {
                APICall('get', "", EndPoints.getOnboard, false).then(async (res: any) => {
                  if (res?.statusCode === 200) {
                    dispatch(setCurrentStep((data.stage_id > 0) ? data.stage_id - 1 : 0))
                    const responseData = res.data
                    responseData.onboarding_flow = JSON.parse(res.data.onboarding_flow)                    
                    dispatch(updateOnBoardData(responseData))
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          {
                            name: ScreenNavigation.stack.Onboarding, params: {
                              stage_id: data.stage_id,
                              from: ScreenNavigation.screens.Login
                            }
                          }
                        ]
                      })
                    )
                  } else {
                    Alert.alert(Strings.error_alert_message)
                  }
                })
              } else {
                notificationSetup();
                Intercom.loginUserWithUserAttributes({
                  userId: data.id
                });
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: ScreenNavigation.stack.HomeNavigator }]
                  })
                )
              }
            }
          } else if (res?.statusCode === 422) {
            if (res?.data?.errors) {
              if (res?.data?.errors?.otp !== undefined) {
                showAlert(res?.data?.errors?.otp)
              } else {
                showAlert(JSON.stringify(res?.data?.errors))
              }
            } else if (res?.data?.message) {
              showAlert(res?.data?.message)
            }
            setLoading(false)
          } else {
            showAlert(JSON.stringify(res?.data?.errors))
            setLoading(false)
          }
        }
      })
    } else {
      setVisibleCode(true);
    }
  };

  const verifyCode = async () => {
    if (_.size(otpCode) === 4) {
      setErrorEmpty(true)
      callAPIToVerifyCode();
    } else {
      setErrorEmpty(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient />

      <Header isLogo isBack onClick={() => navigation.goBack()} heading={''} />

      <View style={styles.contentContainer}>
        <View style={styles.parentContainer}>          
          <GdText style={styles.signinHeading} tx={"verify_mobile_number"} />
          <View style={styles.noteBox}>
          <GdText style={styles.noteText} tx={"code_sent_text"} />            
            <Text style={styles.noteText}>{formatedPhone}</Text>
          </View>
          <View style={styles.otpContainer}>
            <OtpView onOtp={setOtpCode} />
          </View>

          {!errorEmpty && <Text style={styles.error}>{errorEmpty ? null : 'Please enter valid OTP'}</Text>}

          <View style={styles.otpNote}>
            {/* Resend OTP button and timer */}
            {resendTimer === 0 ? (
              <TouchableOpacity
                onPress={handleResendOTP}
              >                
                <GdText style={styles.resendText} tx={"resend_code"} />  
              </TouchableOpacity>
            ) : (
              <View style={styles.textContainer}>
                 <GdText style={styles.resendCodeText} tx={"resend_code_in"} />                
                <View style={styles.secondsContainer}>
                  <Text style={styles.resendCodeTextSeconds}>
                    {resendTimer} <GdText tx={"seconds"} />
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.commonButton}>
        <Button
          heading={'next'}
          // navigating to homestack from authstack
          onPress={() => {
            verifyCode()
          }}
          exStyle={undefined}
          isDisabled={false}
        />
      </View>
      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={callAPIToSendCode}
        setVisible={setVisible} />
      <AppNoInternetSheet visible={visibleCode} onClick={callAPIToVerifyCode}
        setVisible={setVisibleCode} />
    </SafeAreaView>
  )
}

export default LoginSignUpCode;
