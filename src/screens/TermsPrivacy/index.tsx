import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'

import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Header from '../../components/Header'
import Strings from '../../constants/Strings'
import { checkInternetConnection, showAlert } from '../../functions/commonFunctions'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import styles from './style'

const TermsPrivacy = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    termesConditionApi()
  }, [])

  const termesConditionApi = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      setLoading(true)
      APICall('get', undefined, EndPoints.termsCondition, false).then(async (res: any) => {
        setLoading(false)
        if (res?.data) {
          if (res?.statusCode === 200) {
            setData(res.data)
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

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient />
      <Header heading={'termsOfUseText'} isBack onClick={() => navigation.goBack()} isLogo={false} />
      <View style={styles.cardBGColumnView}>
        <ScrollView>
          <Text style={styles.txtTitle}>{data.title}</Text>
          <Text style={styles.txtUpdatedAt}>{data.updated_at}</Text>
          <Text style={styles.txtTermsData}>{data.text}</Text>
        </ScrollView>
      </View>
      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={async () => {
        setVisible(false);
        await termesConditionApi()
      }}
        setVisible={setVisible} />
    </SafeAreaView>
  )
}

export default TermsPrivacy
