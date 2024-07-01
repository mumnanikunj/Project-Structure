import React, { FC, useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import moment from 'moment'

import images from '../../assets/images'
import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import HeaderSettings from '../../components/HeaderSettings'
import { GdText } from '../../components/text/gd-text'
import Strings from '../../constants/Strings'
import { checkInternetConnection, debugLog, showAlert } from '../../functions/commonFunctions'
import en from '../../locales/en'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { Colors } from '../../utils/theme'
import { styles } from './styles'

interface HeaderProps {
  navigation: any
}

const Notifications: FC<HeaderProps> = ({ navigation }: HeaderProps) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([] || null);
  const [visible, setVisible] = useState(false)
 
  useEffect(() => {
    const unsubscribe = 
      () => navigation.addListener('focus', () => {
        pushNotificationApi()
      })
    return unsubscribe()
  }, [navigation])

  const pushNotificationApi = async () => {
    const isConnected = await checkInternetConnection();
    if(isConnected) {
      setLoading(true)
      APICall('get', undefined, EndPoints.notificationList, false).then(async (res: any) => {
        setLoading(false)
        if (res?.data) {
          if (res?.statusCode === 200) {
            debugLog('response >>>', res)
            setData(res?.data);
          } else if (res?.statusCode === 422) {
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

  const renderItems = (items: any) => {
    return (
      <>
        <TouchableOpacity style={styles.RenderItemMain}>
          <View style={styles.notificationCon}>
            <Image source={images.tabs.notification} tintColor={Colors.green} />
          </View>
          <Text style={styles.itemsText}>{items?.item?.message}</Text>
          <Text style={styles.itemsTextTime}>{moment(items?.item?.created_at).format('MMMM DD YYYY')}</Text>
        </TouchableOpacity>
        <View style={styles.bottomLine} />
      </>
    )
  }
  return (
    <SafeAreaView style={styles.SafeArea}>
      <AppGradient />
      <HeaderSettings title={"notifications"} signout={false} onClick={undefined} onEndSession={undefined} />
      {/* <GdText style={styles.PlayNowText} tx={"play_now"} /> */}
      <FlatList 
      contentContainerStyle={styles.list}
      style={styles.list}
      data={data} 
      renderItem={renderItems}
      ListEmptyComponent={() => {
        return <View style={styles.centerView}>
           {data != null && <GdText style={styles.itemsText} tx={'no_data'}/>} 
          </View>
      }}
       />
      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={pushNotificationApi} setVisible={setVisible} />
    </SafeAreaView>
  )
}

export default Notifications
