import React, { useEffect, useRef, useState } from 'react'
import { Alert, Image, Keyboard, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { launchImageLibrary } from 'react-native-image-picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { parsePhoneNumber } from 'libphonenumber-js'
import _ from 'lodash'

import images from '../../assets/images'
import { AppInput, AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Button from '../../components/Button'
import CommonModel from '../../components/CommonModal'
import Header from '../../components/Header'
import { GdText } from '../../components/text/gd-text'
import ScreenNavigation from '../../constants/ScreenNavigation'
import Strings from '../../constants/Strings'
import { checkInternetConnection, debugLog, getAsyncData, showAlert, showToast } from '../../functions/commonFunctions'
import en from '../../locales/en'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { Colors } from '../../utils/theme'
import { CommonStyles } from '../../utils/theme/commonStyle'
import constants from '../../utils/theme/constants'
import styles from './style'

const MyProfile = ({ navigation }: any) => {
  const [callingCode, setCallingCode] = useState<string>('1')
  const [sessionVisible, setSesion] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [phoneNoCountry, setPhoneNoCountry] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const refEmail = useRef<TextInput>()
  const reffullName = useRef<TextInput>()
  const [visible, setVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [saveVisible, setSaveVisible] = useState(false)

  const [image, setImage] = useState<{ uri: string }>({ uri: '' });
  const insets = useSafeAreaInsets()

  const userProfileApi = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      setLoading(true)
      APICall('get', undefined, EndPoints.userProfile, false).then(async (res: any) => {
        setLoading(false)
        if (res?.data) {
          if (res?.statusCode === 200) {
            setImageUrl(res?.data?.data?.profile_pic)
            setFullName(res?.data?.data?.full_name)
            setEmail(res?.data?.data?.email)
            setUserName(res?.data?.data?.username)
            setPhoneNo(res?.data?.data?.mobile_no)
          } else if (res?.statusCode === 422) {
            if (res?.data?.message) {
              showAlert(res?.data?.message)
            }
            else if (res?.data?.errors) {
              showAlert(JSON.stringify(res?.data?.errors))
            }
          }
        }
      })
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    userProfileApi()
  }, [])


  useEffect(() => {
    if (_.isEmpty(phoneNo)) return;
    try {
      const parsedPhoneNumber = parsePhoneNumber(phoneNo);
      setPhoneNoCountry(phoneNo)
      setPhoneNo(parsedPhoneNumber?.formatNational())
      setCallingCode(parsedPhoneNumber?.countryCallingCode)
    } catch (error) {
    }
  }, [phoneNo])

  const openImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      tintColor: 'red'
    });
    if (result.assets !== undefined && result.assets?.length > 0 && result.assets[0] !== undefined && result.assets[0]?.uri !== undefined) {
      setImageUrl(result.assets[0]?.uri)
      setImage(result.assets[0]);
    }
  };

  const saveProfileApi = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      setLoading(true);
      const userData = await getAsyncData(constants.asyncStorageKeys.userData);
      if (userData !== '') {
        const data = await JSON.parse(userData);
        const userId = data?.id;
        const body: any = {
          user_id: userId,
          email,
          full_name: fullName
        };
        if (image?.uri !== undefined) {
          body.profile_pic = {
            uri:
              Platform.OS === 'android'
                ? decodeURI(image?.uri)
                : decodeURI(image?.uri.replace('file://', '')),
            name: image?.fileName,
            type: image?.type
          }
        }

        // debugLog('RequestBody===>>>',JSON.stringify(body));
        setLoading(true)
        APICall('put', body, EndPoints.signUpUpdate, true).then(async (res: any) => {
          setLoading(false)
          if (res?.data) {
            if (res?.statusCode === 200) {
              if (res?.data?.message) {
                showToast(res?.data?.message)
              }
            } else if (res?.statusCode === 422) {
              if (res?.data?.message) {
                showAlert(res?.data?.message)
              }
              else if (res?.data?.errors) {
                showAlert(JSON.stringify(res?.data?.errors))
              }
            }
          }
        })
      }
    } else {
      setSaveVisible(true);
    }
  };


  const DeleteProfileApi = async () => {
    try {
      const parsedPhoneNumber = parsePhoneNumber(phoneNoCountry);
      const request = {
        callingCode: parsedPhoneNumber.countryCallingCode,
        number: parsedPhoneNumber.nationalNumber,
        countryCode: parsedPhoneNumber.country
      }
      const isConnected = await checkInternetConnection();
      if (isConnected) {
        const body = JSON.stringify({
          mobile_no: "+" + request.callingCode + request.number
        })
        setLoading(true)
        APICall('post', body, EndPoints.deleteOtp, false).then(async (res: any) => {
          debugLog(res)
          if (res?.data) {
            if (res?.statusCode === 200) {
              setLoading(false)
              navigation.navigate(ScreenNavigation.screens.DeleteAccount, { ...request })
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
    } catch (error) {
      Alert.alert("Phone Number Error\n" + phoneNoCountry)
    }
  };


  return (
    <View style={[styles.container, { paddingTop: insets.top + (insets.top > 0 ? 0 : 10) }]}>
      <AppGradient />
      <CommonModel
        isVisible={sessionVisible}
        title={'are_you_sure'}
        button={"delete_profile"}
        message={'delete_message'}
        close={() => setSesion(false)}
        onPressButton={() => {
          setSesion(false);
          DeleteProfileApi()
        }}
      />
      <Header heading={'my_profile'} isBack onClick={() => navigation.goBack()} isLogo={false} />
      <ScrollView contentContainerStyle={CommonStyles.flex}>
        <View style={styles.avatarContainer}>
          {imageUrl !== undefined ? (
            <FastImage
              style={styles.UserImage}
              source={{
                uri: imageUrl,
                priority: FastImage.priority.normal
              }}
              defaultSource={images.auth.dummy_img}
              resizeMode={FastImage.resizeMode.cover}
            ></FastImage>
          ) : (
            <Image style={styles.UserImage} source={images.auth.dummy_img} />
          )}
          <TouchableOpacity style={styles.User} onPress={() => openImagePicker()}>
            <Image source={images.tabs.ProfileEditIcon} resizeMode={"contain"} />
          </TouchableOpacity>
        </View>
        <View style={[styles.grandUserContainer, { marginTop: -10 }]}>
          <View style={styles.parentUserCredentialsContainer}>
            <View style={styles.inputFieldHeadingContainer}>              
              <GdText style={styles.inputFieldHeading} tx={"full_name"} />
            </View>
            <AppInput
              style={styles.phoneNumberInput}
              onChangeText={(text: any) => setFullName(text)}
              value={fullName}
              selectionColor={Colors.white}
              placeholder={en.T120}
              returnKeyType={"next"}
              ref={reffullName}
              onSubmitEditing={(val: any) => refEmail?.current?.focus(val)}
            />

          </View>
          <View style={styles.parentUserCredentialsContainer}>
            <View style={styles.inputFieldHeadingContainer}>              
              <GdText style={styles.inputFieldHeading} tx={"email"} />
            </View>

            <AppInput
              style={styles.phoneNumberInput}
              onChangeText={(text: any) => setEmail(text)}
              value={email}
              selectionColor={Colors.white}
              placeholder={en.T117}
              returnKeyType={"done"}
              ref={refEmail}
              onSubmitEditing={() => { Keyboard.dismiss() }}
              blurOnSubmit
            />
          </View>
          <View style={styles.parentUserCredentialsContainer}>
            <View style={styles.inputFieldHeadingContainer}>              
              <GdText style={styles.inputFieldHeading} tx={"user_name"} />
            </View>
            <AppInput
              style={[styles.phoneNumberInput, styles.ColorText]}
              onChangeText={(text: any) => setUserName(text)}
              value={userName}
              selectionColor={Colors.white}
              keyboardType={"email-address"}
              placeholder={en.T118}
              editable={false}
            />
          </View>
          <View style={styles.parentUserCredentialsContainer}>
            <View style={styles.inputFieldHeadingContainer}>
            <GdText style={styles.inputFieldHeading} tx={"phone_number"} />              
            </View>
            <View style={styles.flagContainer}>
              {/* <CountryPicker     
                theme={DARK_THEME}                         
                containerButtonStyle={styles.countryPickerContainer}
                withFilter
                withFlag
                withFlagButton={false}
                // withCallingCode
                withCallingCodeButton
                withAlphaFilter
                countryCode={onlycountryCode}
              /> */}
              <AppInput
                style={[styles.inputPhoneCountry, styles.inputPhoneCountrySecound]}
                onChangeText={(text: any) => setPhoneNo(text)}
                value={`+${callingCode} ${phoneNo}`}
                selectionColor={Colors.white}
                placeholder={en.T119}
                keyboardType={'numeric'}
                editable={false}
              />
            </View>
          </View>
        </View>
        <View>
          {/* <View style={styles.bottomProfileViewBlack}>
           
          </View> */}
        </View>
        <View style={[styles.bottomProfileView, { paddingBottom: insets.bottom }]}>
          <TouchableOpacity onPress={() => setSesion(true)}
            style={styles.deleteContainer}>
            {/* <Image source={images.auth.trash} style={styles.iconDelete} /> */}
            <GdText style={styles.trashText} tx={"delete_my_account"} />            
          </TouchableOpacity>
          <Button
            heading={'save'}            
            onPress={() => {
              saveProfileApi();
            }} exStyle={styles.BottomButton} isDisabled={false} />
        </View>
      </ScrollView>
      {loading && <AppLoader />}

      <AppNoInternetSheet visible={visible} onClick={userProfileApi} setVisible={setVisible} />
      <AppNoInternetSheet visible={saveVisible} onClick={saveProfileApi} setVisible={setSaveVisible} />
      <AppNoInternetSheet visible={deleteVisible} onClick={DeleteProfileApi} setVisible={setDeleteVisible} />
    </View>
  )
}

export default MyProfile
