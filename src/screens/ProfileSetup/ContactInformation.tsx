import React, { FC, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { TextInput } from 'react-native-gesture-handler'
import Ionincs from 'react-native-vector-icons/Ionicons'
import { TFunction } from "i18next";
import _ from 'lodash'

import { AppKeyboardAvoiding, AppLoader } from '../../components'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Button from '../../components/Button'
import { GdText } from '../../components/text/gd-text'
import ScreenNavigation from '../../constants/ScreenNavigation'
import Strings from '../../constants/Strings'
import { checkInternetConnection } from '../../functions/commonFunctions'
import { checkUserName, validateEmail, validateName } from '../../functions/validate'
import { Constants } from '../../utils/constants'
import { dW } from '../../utils/dynamicHeightWidth'
import { navigate } from '../../utils/RootNavigation'
import { Colors } from '../../utils/theme'
import { CommonStyles } from '../../utils/theme/commonStyle'
import { IProfileObject } from './profile-setup.type'
import { styles } from './style'
import { translate } from '../../i18n/i18n'

interface ContactInformationProps {
  onNext: any;
}

const ContactInformation: FC<ContactInformationProps> = ({ onNext }) => {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')

  const [isSelected, setSelected] = useState(false)
  const [isAgreeSelected, setAgreeSelected] = useState(false);

  const [loading, setLoading] = useState(false)

  const [errorEmpty, setErrorEmpty] = useState(true)
  const [visible, setVisible] = useState(false)

  const firstNameInputRef = useRef<TextInput>(null);
  const ref_input_email = useRef<TextInput>(null);
  const ref_input_username = useRef<TextInput>(null);
  const { t }: { t: TFunction } = useTranslation()

  const validateField = (value: any, isValueValid: boolean) => {
    if (value === undefined || value === null || value?.length === 0) {
      setErrorEmpty(true)
      return false
    } else if (!isValueValid) {
      setErrorEmpty(false)
      return false
    } else {
      return true
    }
  }

  const checkSubmit = () => {
    if (
      validateField(userName, checkUserName(userName)) &&
      validateField(fullName, validateName(fullName)) &&
      validateField(email, validateEmail(email)) &&
      isSelected
    ) {
      return true
    } else {
      return false
    }
  };

  const signUp = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      const updateData: IProfileObject = {
        answered: true,
        stage_id: 1,
        input_fields: {
          full_name: fullName,
          email,
          username: userName,
          marketing_allowed: isAgreeSelected
        }
      }
      onNext(updateData);
    } else {
      setVisible(true)
    }
  };

  const validate = async () => {
    Keyboard.dismiss()
    if (checkSubmit()) {
      signUp();
    } else {
      const isValid_Name = validateField(userName, checkUserName(userName))
      const isValid_UserName = validateField(fullName, validateName(fullName))
      const isValid_Email = validateField(email, validateEmail(email))
      let message = ""
      if (!isValid_UserName) {
        message = isValid_UserName ? '' : errorEmpty ? t('emptyFullName') : t('validFullName')
      } else if (!isValid_Name) {
        message = isValid_Name ? '' : errorEmpty ? t('emptyUserName') : t('validUserName')
      } else if (!isValid_Email) {
        message = isValid_Email ? '' : errorEmpty ? t('emptyEmail') : t('validEmail')
      } else if (!isSelected) {
        message = t('terms_error')
      }
      showMessage({ message, type: "danger" })
    }
  };

  return (
    <View style={[styles.marg_hor, styles.safeArea]}>
      <AppKeyboardAvoiding>
        <View style={styles.textInputCon} >
          <TextInput
            ref={firstNameInputRef}
            placeholder={t('full_name')}
            style={styles.textInputStyle}
            placeholderTextColor={Colors.placeHolder}
            keyboardAppearance={Constants.keyboardAppearance}
            selectionColor={Constants.textSelectionColor}
            value={fullName}
            blurOnSubmit={false}
            onChangeText={(text) => {
              setFullName(text);
            }}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              console.log("ok")
              if (ref_input_username.current !== null) {
                ref_input_username.current.focus();
              }
            }}
            autoCapitalize={"none"}
          />
          <Text style={styles.text_required}>{'*'}</Text>
        </View>
        <Text style={styles.error}></Text>
        <View style={styles.textInputCon}  >
          <TextInput
            ref={ref_input_username}
            placeholder={t('username')}
            style={styles.textInputStyle}
            placeholderTextColor={Colors.placeHolder}
            keyboardAppearance={Constants.keyboardAppearance}
            selectionColor={Constants.textSelectionColor}
            value={userName}
            onChangeText={(text) => {
              setUserName(text);
            }}
            blurOnSubmit={false}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              if (ref_input_email.current !== null) {
                ref_input_email.current.focus();
              }
            }}
            autoCapitalize={"none"}
          />
          <Text style={styles.text_required}>{'*'}</Text>
        </View>
        <Text style={styles.error}></Text>

        <View style={styles.textInputCon}>
          <TextInput
            ref={ref_input_email}
            placeholder={t('email')}
            style={styles.textInputStyle}
            placeholderTextColor={Colors.placeHolder}
            keyboardAppearance={Constants.keyboardAppearance}
            selectionColor={Constants.textSelectionColor}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            returnKeyType={'done'}
            onSubmitEditing={() =>  Keyboard.dismiss()}
            autoCapitalize={"none"}
          />
          <Text style={styles.text_required}>{'*'}</Text>
        </View>
        <View style={styles.checkBoxArea}>
            <TouchableOpacity
              activeOpacity={Constants.bottonOpacity}
              onPress={() => {
                setSelected((prevState) => !prevState)
              }}
              style={styles.tickBox}
            >
              <Ionincs
                name={isSelected ? 'checkbox' : 'square-outline'}
                size={30}
                color={isSelected ? Colors.ligth_green : Colors.lightblack}
              />
              <Text style={styles.parentCheckBoxText}>
                <GdText style={styles.checkBoxOne} tx={'check_box_text_one'} />
                <Text style={styles.checkBoxTwo} onPress={() => {
                  navigate(ScreenNavigation.screens.Privacy);
                }}>
                  <GdText style={styles.checkBoxTwo}  >{` ${translate('check_box_text_two')} `}</GdText>
                </Text>
                <Text style={styles.checkBoxOne}>{Strings.check_box_text_three}</Text>
                <GdText style={styles.checkBoxOne} tx={'check_box_text_three'} />
              </Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.checkBoxArea, { marginTop: dW(16) }]}>
          <View style={styles.parentCheckBox}>
            <TouchableOpacity
              activeOpacity={Constants.bottonOpacity}
              onPress={() => {
                setAgreeSelected((prevState) => !prevState)
              }}
              style={styles.tickBox}>
              <Ionincs
                name={isAgreeSelected ? 'checkbox' : 'square-outline'}
                size={30}
                color={isAgreeSelected ? Colors.ligth_green : Colors.lightblack}
              />
                <GdText style={styles.checkBoxOne} tx={'check_box_text_secound'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={CommonStyles.flex} />
        <View style={{ paddingBottom: dW(10) }}>
          <Button
            exStyle={styles.button_exStyle}
            heading={'next'}
            onPress={() => {
              validate();
            }}
          // isDisabled={!isSelected}
          ></Button>
        </View>

      </AppKeyboardAvoiding>
      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={signUp} setVisible={setVisible} />
    </View>
  )
}

export default ContactInformation
