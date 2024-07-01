import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native'
import CountryPicker, { CallingCode, CountryCode, CountryModalProvider, DARK_THEME } from 'react-native-country-picker-modal'
import { TextInput } from 'react-native-gesture-handler'
import Video from 'react-native-video';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TFunction } from 'i18next';
import _ from 'lodash'

import images from '../../assets/images';
import { SvgImage } from '../../assets/svg/SvgPath';
import { AppInput, AppLoader } from '../../components'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Button from '../../components/Button'
import { GdText } from '../../components/text/gd-text';
import ScreenNavigation from '../../constants/ScreenNavigation'
import { checkInternetConnection, debugLog, showAlert } from '../../functions/commonFunctions'
import { getNumberFromString, validateMobile } from '../../functions/validate'
import { DEFAULT_LANGUAGE } from '../../i18n/i18n';
import { setCurrentStep } from '../../store/actions/SessionActions';
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { dW } from '../../utils/dynamicHeightWidth';
import { Colors } from '../../utils/theme'
import { CommonStyles } from '../../utils/theme/commonStyle';
import { formatPhoneNumber } from '../../utils/utils'
import LanguageSheet from './LanguageSheet';
import styles from './style'

const Login = ({ navigation }: any) => {
  const [countryCode, setCountryCode] = useState<CountryCode>('US')
  const [callingCode, setCallingCode] = useState<CallingCode>('1')
  const [phone, setPhone] = useState('')
  const [validPhone, setValidPhone] = useState(true)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [language, setLanguage] = useState<string>(DEFAULT_LANGUAGE);
  const reflocalization = useRef()

  const textInputRef = useRef<TextInput>(null);
  const videoPlayerRef = useRef();
  const dispatch = useDispatch()
  const { t }: {t: TFunction} = useTranslation()

  useEffect(() => {
    dispatch(setCurrentStep(0))    
    LanguageSetup()    
  }, [])


  const LanguageSetup = async() =>{
    const languageKey = await AsyncStorage.getItem('settings.lang') || DEFAULT_LANGUAGE ; 
    setLanguage(languageKey)
  } 
  // useEffect(() => {
  //   const isValid = isValidNumber(`${getNumberFromString(phone)}`, countryCode)
  // }, [phone])

  const callAPIToSendCodeSignup = async () => {
    // navigate('Onboarding')
    // return
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      const body = JSON.stringify({
        mobile_no: '+' + callingCode + getNumberFromString(phone)
      })
      setLoading(true)
      APICall('post', body, EndPoints.signUp, false).then(async (res: any) => {
        debugLog(res)
        if (res?.data) {
          if (res?.statusCode === 200) {
            setLoading(false)
            navigation.navigate(ScreenNavigation.screens.SignUpCode, {
              from: ScreenNavigation.screens.SignUp,
              number: getNumberFromString(phone),
              callingCode,
              countryCode
            })
          } else if (res?.statusCode === 422) {
            if (res?.data?.errors?.hasOwnProperty('mobile_no')) {
              showAlert(res?.data?.errors?.mobile_no)
            } else if (res?.data?.message) {
              showAlert(res?.data?.message)
            } else if (res?.data?.errors) {
              showAlert(JSON.stringify(res?.data?.errors))
            }
            setLoading(false)
          } else if (res?.data?.message) {
            showAlert(res?.data?.message)
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
      setVisible(true)
    }
  };
  const callAPIToSendCode = async () => {
    // navigate('Onboarding')
    // return
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      const body = JSON.stringify({
        mobile_no: '+' + callingCode + getNumberFromString(phone)
      })
      setLoading(true)

      APICall('post', body, EndPoints.login, false).then(async (res: any) => {
        debugLog(res)
        if (res?.data) {
          if (res?.statusCode === 200) {
            setLoading(false)
            navigation.navigate(ScreenNavigation.screens.LoginSignUpCode, {
              number: getNumberFromString(phone),
              callingCode,
              countryCode
            })
          } else if (res?.statusCode === 422) {
            if (res?.data?.errors?.mobile_no !== undefined) {
              showAlert(res?.data?.errors?.mobile_no)
            } else {
              if (res?.data?.errors?.message !== undefined) {
                showAlert(res?.data?.errors?.message)
              } else if (res?.data?.message) {
                if (res.data.message === "User does not exist") {
                  // navigation.navigate(ScreenNavigation.screens.SignUp, {
                  //   number: getNumberFromString(phone),
                  //   callingCode,
                  //   countryCode
                  // })
                  callAPIToSendCodeSignup()
                } else {
                  showAlert(res?.data?.message)
                }
              } else {
                showAlert(JSON.stringify(res?.data?.error))
              }
            }
            setLoading(false)
          } else {
            if (res?.data?.errors?.message !== undefined) {
              showAlert(res?.data?.errors?.message)
            } else if (res?.data?.message) {
              showAlert(res?.data?.message)
            } else {
              showAlert(JSON.stringify(res?.data?.errors))
            }
            setLoading(false)
          }
        } else {
          setLoading(false)
        }
      }).catch(err => {
        debugLog('err', err);

      })
    } else {
      setVisible(true);
    }
  };

  const checkValidation = async () => {
    callAPIToSendCode();
  }
  const countryList = () => {
    setModalVisible(true);
  }

  const changeLanguage = () => {
    reflocalization?.current?.open()
  }

  return (

    <View style={styles.container}>
      {/* <AppGradient /> */}
      <View style={styles.videoContainer}>
        <Video
          style={styles.video}
          resizeMode={'cover'}
          source={require('../../assets/video/Promo.mp4')}
          muted
          repeat
          paused={false}
        />
        <TouchableOpacity style={styles.localization_View} 
          onPress={() => changeLanguage()}
        >
          <SvgImage.globe_light width={dW(24)} height={dW(24)}/>
          <Text style={styles.localization_Text}>{language.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        contentContainerStyle={CommonStyles.flex}
        behavior={'padding'}
        style={[CommonStyles.flex2, { backgroundColor: Colors.black }]}
      >
        <View style={styles.parentContainer}>
          <View>
            {/* <Text style={styles.signInHeadingText}>{Strings.start_simulating}</Text> */}
            <GdText style={styles.signInHeadingText} tx={'start_simulating'}/>
            <View style={styles.textInputArea} >
              <View style={styles.flag}>
                <TouchableOpacity style={styles.countrySelect}
                  onPress={() => countryList()} >
                  <Text style={styles.countryCodeText}>{countryCode}</Text>
                  <Text style={styles.callingCodeText}>{'  +'}{callingCode}</Text>
                  <Image
                    resizeMode={'contain'}
                    source={images.down_vector}
                    style={styles.downArrow}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.virticalLine} />
              {/* </View> */}
              <View style={[styles.flag, styles.flex1]}>
                <AppInput
                  ref={textInputRef}
                  style={styles.phoneNumberInput}
                  placeholder={'phone_number'}
                  keyboardType={'number-pad'}
                  maxLength={14}
                  selectionColor={Colors.white}
                  keyboardAppearance={"dark"}
                  placeholderTextColor={Colors.placeHolder}
                  value={phone}
                  onChangeText={(text: string) => {
                    if (countryCode === "US") {
                      setPhone(formatPhoneNumber(text, phone))
                    } else {
                      setPhone(text)
                    }
                    setValidPhone(validateMobile(text))
                  }}
                  onSubmitEditing={checkValidation}
                  returnKeyType={'done'}
                />
              </View>
            </View>
          </View>
          <Button
            exStyle={styles.buttonSign}
            heading={'next'}
            index={0}
            onPress={() => {
              checkValidation()
            }}
            isDisabled={!phone || !validPhone}
          />
        </View>
        <LanguageSheet
          bottomSheetRef={reflocalization}
          setLanguage={setLanguage}
          selectedLanguage={language}
        />
      </KeyboardAvoidingView>
      {loading && <AppLoader />}
      <CountryModalProvider>
        <CountryPicker
          // containerButtonStyle={styles.countryPickerRoot}
          theme={DARK_THEME}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onOpen={countryList}
          filterProps={{
            placeholder: t('select_country')
         }}
          withFilter
          withFlag
          withAlphaFilter
          withFlagButton={false}
          countryCode={countryCode}
          onSelect={(country) => {
            setCountryCode(country.cca2)
            setCallingCode(country.callingCode[0])
          }}
        />
      </CountryModalProvider>
      <AppNoInternetSheet visible={visible} onClick={callAPIToSendCode} setVisible={setVisible} />
    </View>

  )
}

export default Login
