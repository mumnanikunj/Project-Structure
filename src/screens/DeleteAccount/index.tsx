import React, { useEffect, useState } from 'react'
import { Platform, SafeAreaView, Text, View } from 'react-native'
import { parsePhoneNumber } from 'libphonenumber-js'
import _ from 'lodash'

import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { OtpView } from '../../components/otpview/OtpView'
import { GdText } from '../../components/text/gd-text'
import ScreenNavigation from '../../constants/ScreenNavigation'
import Strings from '../../constants/Strings'
import { checkInternetConnection, debugLog, getAsyncData, setAsyncData, showAlert } from '../../functions/commonFunctions'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import constants from '../../utils/theme/constants'
import styles from './style'

const DeleteAccount = ({ navigation, route }: any) => {
  const [errorEmpty, setErrorEmpty] = useState(true)
  const [resendTimer, setResendTimer] = useState(60) // Initial timer value (e.g., 60 seconds)
  const [visible, setVisible] = useState(false);
  const [visibleCode, setVisibleCode] = useState(false);
  const [formatedPhone, setFormatedPhone] = useState<string>('')
  const [otpCode, setOTPCode] = useState<string>('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const phoneNumber = parsePhoneNumber(route.params.number, route.params.countryCode)
    setFormatedPhone(phoneNumber?.formatNational()
      || ('+' + route.params.callingCode + route.params.number))
  }, [])

  useEffect(() => {
    _.size(otpCode) === 4 && verifyCode()
  }, [otpCode])

  useEffect(() => {
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
    console.log("Call send..")
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      const body = JSON.stringify({
        mobile_no: '+' + route.params.callingCode + route.params.number
      })
      setLoading(true)
      APICall('post', body, EndPoints.deleteOtp, false).then(async (res: any) => {
        debugLog(res)
        if (res?.data) {
          if (res?.statusCode === 200) {
            setLoading(false)
          } else if (res?.statusCode === 422) {
            if (res?.data?.errors?.hasOwnProperty('mobile_no')) {
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

  const verifyCode = async () => {
    const isConnected = await checkInternetConnection();
    const deviceToken = await getAsyncData(constants.asyncStorageKeys.deviceToken);

    if (isConnected) {
      if (_.size(otpCode) === 4) {
        setErrorEmpty(true)
        const body = JSON.stringify({
          mobile_no: '+' + route.params.callingCode + route.params.number,
          otp: otpCode,
          device_type: Platform.OS,
          stage_id: 1,
          device_token: deviceToken
        })
        setLoading(true)
        const url = EndPoints.deleteOtpVerify
        APICall('post', body, url, false).then(async (res: any) => {
          setLoading(false)
          debugLog(res)
          if (res?.data) {
            if (res?.statusCode === 200 || res?.statusCode === 201) {
              navigation.navigate(ScreenNavigation.screens.ConfirmDelete)
            } else if (res?.statusCode === 422) {
              if (res?.data?.errors) {
                if (res?.data?.errors?.hasOwnProperty('otp')) {
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
          } else {
            setLoading(false)
          }
        })
      } else {
        setErrorEmpty(false)
      }
    } else {
      setVisibleCode(true);
    }
    setLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient />

      <Header isLogo={false}
        heading={'delete_my_account'}
        isBack onClick={() => navigation.goBack()} />

      <View style={styles.contentContainer}>
        <View style={styles.parentContainer}>          
          <GdText style={styles.signinHeading} tx={"confirm_mobile_number"} />
          <View style={styles.noteBox}>            
            <GdText style={styles.noteText} tx={"code_sent_text"} />
            <Text style={styles.noteText}>{formatedPhone}</Text>
          </View>
          <View style={styles.otpContainer}>
            <OtpView onOtp={setOTPCode} />
          </View>

          <Text style={styles.error}>{errorEmpty ? null : 'Please enter valid OTP'}</Text>

          <View style={styles.otpNote}>
            {/* Resend OTP button and timer */}
            {resendTimer === 0 ? (
              <Button
                heading={'Resend OTP'}
                onPress={handleResendOTP}
                // navigating to homestack from authstack
                exStyle={undefined}
                isDisabled={false}
              />
            ) : (
              <View style={styles.textContainer}>                              
                <GdText style={styles.resendCodeText} tx={"resend_code_in"} />
                <View style={styles.secondsContainer}>
                  <Text style={styles.resendCodeTextSeconds}>                  
                    {resendTimer} <GdText  tx={"seconds"} />
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
          isDisabled={!(_.size(otpCode) === 4)}
        />
      </View>
      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={async () => {
        await callAPIToSendCode()
      }}
        setVisible={setVisible} />
      <AppNoInternetSheet visible={visibleCode} onClick={async () => {
        await verifyCode()
      }}
        setVisible={setVisibleCode} />
    </SafeAreaView>
  )
}

export default DeleteAccount
