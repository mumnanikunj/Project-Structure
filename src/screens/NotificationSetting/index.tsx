import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Switch, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { openSettings } from 'react-native-permissions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import _ from 'lodash'

import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import CommonModel from '../../components/CommonModal'
import Header from '../../components/Header'
import { GdText } from '../../components/text/gd-text'
import Strings, { languages, UNIT_MOCK_DATA } from '../../constants/Strings'
import { checkInternetConnection, showAlert, showToast } from '../../functions/commonFunctions'
import useAppState from '../../hooks/useAppState'
import { DEFAULT_LANGUAGE } from '../../i18n/i18n'
import { languageDetectorPlugin } from '../../i18n/languageDetectorPlugin'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { Colors, Permission } from '../../utils/theme'
import CommonPreferences from './CommonPreferences'
import styles from './style'

const NotificationSetting = ({ navigation }: any) => {
  const [pushNotification, setPushNotification] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [languageMockData, setLanguageMockData] = useState(languages)
  const [unitMockData, setUnitMockData] = useState(UNIT_MOCK_DATA)
  const [getVisible, setGetVisible] = useState(false)
  const [isOpenSetting, setOpenSetting] = useState<boolean>(false);
  const isFocused = useIsFocused()
  const { isInBackground } = useAppState();

  useEffect(() => {
    setDefaultLanguage()
    Permission.getPushPermission()
      .then((value: boolean) => setPushNotification(value))
      .catch(e => { })
  }, [isFocused, isInBackground])

  const setDefaultLanguage = async () => {
    const languageKey = await AsyncStorage.getItem('settings.lang') || DEFAULT_LANGUAGE;
    const langaugeId = _.findIndex(languages, (item) => item.languagecode === languageKey) +1
    const tempUnity = languageMockData.map(item => {
      return { ...item, is_Selected: item.id === langaugeId }
    })
    setLanguageMockData(tempUnity)
    languageDetectorPlugin.cacheUserLanguage(tempUnity[id - 1].languagecode)
  }
  const askNotificationPermission = async (): Promise<void> => {
    const result = await Permission.requestPushPermission().catch(e => { })
    result === 'blocked' && setOpenSetting(true)
  }

  const openSetting = () => openSettings().catch(() => { });

  const NotificationApi = async (value: any) => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      const body = JSON.stringify({
        is_notifiable: value
      })
      setLoading(true)
      APICall('put', body, EndPoints.notify, false).then(async (res: any) => {
        setLoading(false)
        if (res?.data) {
          if (res?.statusCode === 200) {
            setPushNotification(value);
            showToast(res?.data?.message)
            value === true && askNotificationPermission()
          }
          else if (res?.statusCode === 422) {
            if (res?.data?.message) {
              showAlert(res?.data?.message)
            }
            else {
              showAlert(JSON.stringify(res?.data?.errors))
            }
          }
        }
      })
    } else {
      setVisible(true);
    }
  };

  const GetNotificationApi = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      setLoading(true)
      APICall('get', undefined, EndPoints.pushNotificationSetting, false).then(async (res: any) => {
        setLoading(false)
        if (res?.data) {
          if (res?.statusCode === 200) {
            setPushNotification(res?.data?.data?.is_notifiable);
          }
          else if (res?.statusCode === 422) {
            if (res?.data?.message) {
              showAlert(res?.data?.message)
            }
            else {
              showAlert(JSON.stringify(res?.data?.errors))
            }
          }
        }
      })
    } else {
      setGetVisible(true);
    }
  };

  useEffect(() => { GetNotificationApi(); }, []);

  const onSelectUnit = (id: number) => {
    const tempUnity = unitMockData.map(item => {
      return { ...item, is_Selected: item.id === id }
    })
    setUnitMockData(tempUnity)
  }

  const onSelectLanguage = (id: number) => {
    const tempUnity = languageMockData.map(item => {
      return { ...item, is_Selected: item.id === id }
    })
    console.log('tempUnity',tempUnity)
    setLanguageMockData(tempUnity)
    languageDetectorPlugin.cacheUserLanguage(tempUnity[id - 1].languagecode)
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient />
      <ScrollView>
        <Header heading={'preferences'} isBack onClick={() => navigation.goBack()} isLogo={false} />
        <View style={styles.cardBGColumnView}>
          <View style={[styles.cardBGView, styles.cardSecoundBGView]}>
            {/* <Text style={styles.lightText}>{Strings.generalNotification}</Text> */}
            <GdText style={styles.lightText} tx={"generalNotification"} />
          </View>
          <View style={styles.cardBGView}>
            <View style={styles.PushNotificationView}>
              <GdText style={styles.titleText} tx={"pushNotification"} />
            </View>
            <Switch
              onValueChange={(value: any) => { NotificationApi(value) }}
              value={pushNotification}
              thumbColor={pushNotification ? Colors.white : Colors.gray}
              trackColor={{ true: Colors.green, false: Colors.darkGreen }} />
          </View>
        </View>

        {/* <View style={styles.cardBGColumnView}>
          <View style={styles.cardBGView}>
            <GdText style={styles.lightText} tx={"unit_of_measurement"} />
          </View>

          <CommonPreferences
            mockData={unitMockData}
            onSelectItem={onSelectUnit}
          />

        </View> */}
        <View style={styles.cardBGColumnView}>
          <View style={styles.cardBGView}>
            <GdText style={styles.lightText} tx={"Language"} />
          </View>
          <CommonPreferences
            mockData={languageMockData}
            onSelectItem={onSelectLanguage}
          />

        </View>
        {/* <View style={styles.cardBGColumnView}> */}
        {/* <View style={styles.cardBGView}>
            <Text style={styles.lightText}>{Strings.messageNotification}</Text>
          </View> */}
        {/* 
          <View style={styles.cardBGView}>
            <View style={styles.emptySpaceView}>
              <Text style={styles.titleText}>{Strings.messageText}</Text>
              <Switch
                style={[Platform.OS === 'ios' ? { transform: [{ scaleX: .8 }, { scaleY: .8 }] } : null]}
                onValueChange={(value: any) => setMessages(value)}
                value={messages ? true : false}
                thumbColor={messages ? Colors.white : Colors.gray}
                trackColor={{ false: Colors.darkGreen, true: Colors.green }}
                ios_backgroundColor={Colors.lightblack}
              />
            </View>
          </View> */}

        {/* <View style={styles.cardBGView}>
            <View style={styles.emptySpaceView}>
              <Text style={styles.titleText}>{Strings.reminderText}</Text>
              <Switch
                style={[Platform.OS === 'ios' ? { transform: [{ scaleX: .8 }, { scaleY: .8 }] } : null]}
                onValueChange={(value: any) => setReminders(value)}
                value={reminders ? true : false}
                thumbColor={reminders ? Colors.white : Colors.gray}
                trackColor={{ false: Colors.darkGreen, true: Colors.green }}
                ios_backgroundColor={Colors.lightblack}
              />
            </View>
          </View> */}
        {/* </View> */}
      </ScrollView>
      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={NotificationApi} setVisible={setVisible} />
      <AppNoInternetSheet visible={getVisible} onClick={GetNotificationApi} setVisible={setGetVisible} />
      <CommonModel
        title={Strings.warning}
        isVisible={isOpenSetting}
        button={Strings.openSetting}
        message={Strings.notiPermissionMessage}
        close={() => setOpenSetting(false)}
        onPressButton={openSetting}
      />
    </SafeAreaView>
  )
}

export default NotificationSetting
