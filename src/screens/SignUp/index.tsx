import React, { useRef, useState } from 'react'
import { Image, Keyboard, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import CountryPicker, { CallingCode, CountryCode, CountryModalProvider } from 'react-native-country-picker-modal'
import { TextInput } from 'react-native-gesture-handler'
import _ from 'lodash'

import images from '../../assets/images'
import { AppInput, AppKeyboardAvoiding, AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Button from '../../components/Button'
import Header from '../../components/Header'
import ScreenNavigation from '../../constants/ScreenNavigation'
import Strings from '../../constants/Strings'
import { checkInternetConnection, debugLog, showAlert } from '../../functions/commonFunctions'
import { getNumberFromString, validateMobile } from '../../functions/validate'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { Colors } from '../../utils/theme'
import { formatPhoneNumber } from '../../utils/utils'
import styles from './style'

const SignUp = ({ navigation, route }: any) => {
  const [countryCode, setCountryCode] = useState<CountryCode>(_.get(route.params, "countryCode", 'US'))
  const [callingCode, setCallingCode] = useState<CallingCode>(_.get(route.params, "callingCode", '1'))
  const [phone, setPhone] = useState(_.get(route.params, "countryCode", 'US') === "US" ?
    formatPhoneNumber(_.get(route.params, "number", ''), "") :
    _.get(route.params, "number", ''))
  const [validPhone, setValidPhone] = useState(true)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  const textInputRef = useRef<TextInput>(null);

  const checkSubmit = () => {
    return validateMobile(phone)
  }

  const countryList = () => {
    setModalVisible(true);
  }

  const callAPIToSendCode = async () => {
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

  const validate = async () => {
    if (checkSubmit()) {
      callAPIToSendCode();
    }
  }

  return (
    <AppKeyboardAvoiding>
      <SafeAreaView style={styles.container}>
        <AppGradient />
        <Header isLogo heading={''} isBack={false} onClick={() => { }}></Header>
        <View style={styles.parentContainer}>
          <View>
            <Text style={styles.signinHeading}>{Strings.sign_up}</Text>
            <View style={styles.noteBox}>
              <Text style={styles.noteText}>{Strings.note_first}</Text>
            </View>
            <View style={styles.textInputArea}>
            <View style={styles.flag}>
                <TouchableOpacity style={styles.countrySelect}
                  onPress={() => countryList()} >
                  <Text style={styles.countryCodeText}>{countryCode}</Text>
                  <Text style={styles.callingCodeText}>{' +'}{callingCode}</Text>
                  <Image
                    resizeMode={'contain'}
                    source={images.down_vector}
                    style={styles.downArrow}
                  />
                </TouchableOpacity>
              </View>
            
              <View style={styles.virticalLine} />
              <View style={[styles.flag, styles.flex1]}>
                <AppInput
                  ref={textInputRef}
                  style={styles.phoneNumberInput}
                  placeholder={'Phone Number'}
                  placeholderTextColor={Colors.white}
                  keyboardType={'number-pad'}
                  keyboardAppearance={"dark"} 
                  selectionColor={Colors.white}    
                  maxLength={14}
                  value={phone}
                  onChangeText={(text: string) => {
                    if (countryCode === "US") {
                      setPhone(formatPhoneNumber(text, phone))
                    } else {
                      setPhone(text)
                    }
                    setValidPhone(validateMobile(text))
                  }}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  returnKeyType={'done'}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.flex1} />
        <Button
          isDisabled={!phone || !validPhone}
          heading={Strings.next}
          exStyle={styles.btnSignUpNext}
          onPress={() => {
            validate()
          }}
        />
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>{Strings.confirm_account}</Text>
          <TouchableOpacity hitSlop={10} onPress={() => navigation.goBack()}>
            <Text style={styles.signInText}>{Strings.sign_in}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading && <AppLoader />}
      <CountryModalProvider>
        <CountryPicker
          // containerButtonStyle={styles.countryPickerRoot}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onOpen={countryList}
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
    </AppKeyboardAvoiding>
  )
}

export default SignUp
