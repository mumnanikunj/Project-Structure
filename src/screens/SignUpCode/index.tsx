import React, {useEffect, useState} from 'react'
import {Alert, Platform, SafeAreaView, Text, View} from 'react-native'
import { useDispatch } from 'react-redux'
import {CommonActions} from '@react-navigation/native'
import { parsePhoneNumber } from 'libphonenumber-js'
import _ from 'lodash'

import {AppLoader} from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { OtpView } from '../../components/otpview/OtpView'
import ScreenNavigation from '../../constants/ScreenNavigation'
import Strings from '../../constants/Strings'
import {checkInternetConnection, debugLog, getAsyncData, setAsyncData, showAlert} from '../../functions/commonFunctions'
import { updateOnBoardData } from '../../store/actions/SessionActions'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import constants, { commonConstant } from '../../utils/theme/constants'
import styles from './style'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { GdText } from '../../components/text/gd-text'

const SignUpCode = ({navigation, route}: any) => {
  const [errorEmpty, setErrorEmpty] = useState(true)
  const [resendTimer, setResendTimer] = useState(60) // Initial timer value (e.g., 60 seconds)
  const [visible, setVisible] = useState(false);
  const [visibleCode, setVisibleCode] = useState(false);
  const [formatedPhone, setFormatedPhone] = useState<string>('')
  const [otpCode, setOTPCode] = useState<string>('')

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const phoneNumber = parsePhoneNumber(route?.params?.number, route?.params?.countryCode)
    setFormatedPhone(phoneNumber?.formatNational()
      || ('+' + route?.params?.callingCode + route?.params?.number))
  },[])

  useEffect(() => {
    _.size(otpCode) === 4 && verifyCode()
  },[otpCode])
  
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
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      const body = JSON.stringify({
        mobile_no: '+' + route?.params?.callingCode + route?.params?.number
      })
      setLoading(true)
      APICall('post', body, EndPoints.signUp, false).then(async (res: any) => {
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
          mobile_no: '+' + route?.params?.callingCode + route?.params?.number,
          otp: otpCode,
          device_type: Platform.OS,
          stage_id: 1,
          device_token: deviceToken
        })
        setLoading(true)
        const url = EndPoints.signUpVerify
        APICall('post', body, url, false).then(async (res: any) => {
          debugLog('signUpVerifyResponse',res)
          if (res?.data) {
            if (res?.statusCode === 200 || res?.statusCode === 201) {
                const id = res?.data?.data[0].user_id
                const data = JSON.stringify({
                  id
                })
                commonConstant.tokenData = res?.data.token
                await setAsyncData(constants.asyncStorageKeys.userData, data)
                APICall('get', "", EndPoints.getOnboard, false).then(async (res: any) => {
                  if(res?.statusCode === 200) {
                    const responseData = res.data
                    console.log('REssponceData==>>',res)                    
                    responseData.onboarding_flow = JSON.parse(res.data.onboarding_flow)                    
                    console.log('data.onboarding_flow',responseData)
                    dispatch(updateOnBoardData(res.data))
                    navigation.dispatch(
                      CommonActions.reset({ 
                        index: 0,
                        routes: [
                          {
                            name: ScreenNavigation.stack.Onboarding, params: {
                              stage_id: 1,
                              from: ScreenNavigation.screens.SignUp
                            }
                          }
                        ]
                      })
                    )
                  } else{
                    Alert.alert(Strings.error_alert_message)
                  }
              })
                // navigation.dispatch(
                //   CommonActions.reset({
                //     index: 0,
                //     routes: [
                //       {
                //         name: ScreenNavigation.stack.SignupStack,
                //         params: {
                //           stageId: res?.data?.data[0].stage_id,
                //           from: ScreenNavigation.screens.SignUp
                //         }
                //       }
                //     ]
                //   })
                // )
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
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient />

      <Header  isBack onClick={() => navigation.goBack()} heading={'sign_up'} />

      <View style={styles.contentContainer}>
        <View style={styles.parentContainer}>          
          <GdText style={styles.signinHeading} tx={"verify_mobile_number"} />
          <View style={styles.noteBox}>            
            <GdText style={styles.noteText} tx={"code_sent_text"} />
            <Text style={styles.noteText}>{formatedPhone}</Text>
          </View>
          <View style={styles.otpContainer}>
             <OtpView onOtp={setOTPCode}/>
          </View>

          <Text style={styles.error}>{errorEmpty ? null : 'Please enter valid OTP'}</Text>

          <View style={styles.otpNote}>
            {/* Resend OTP button and timer */}
            {resendTimer === 0 ? (
              <TouchableOpacity
              onPress={handleResendOTP}
              >                
                <GdText style={styles.resendText} tx={'resend_code'}/>
              </TouchableOpacity>
            ) : (
              <View style={styles.textContainer}>
                <GdText style={styles.resendCodeText} tx={"resend_code_in"} />                
                <View style={styles.secondsContainer}>
                  <Text style={styles.resendCodeTextSeconds}>
                    {resendTimer} <GdText tx={'seconds'}/>
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
      setVisible={setVisible}/>
      <AppNoInternetSheet visible={visibleCode} onClick={async () => {
        await verifyCode()
      }} 
      setVisible={setVisibleCode}/>  
    </SafeAreaView>
  )
}

export default SignUpCode;

