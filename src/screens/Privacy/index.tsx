import React, { useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import WebView from 'react-native-webview'

import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import Header from '../../components/Header'
import Strings from '../../constants/Strings'
import styles from './style'

const Privacy = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const url = 'https://golfdaddy.com/pages/privacy-policy';

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient />
      <Header heading={Strings.check_box_text_two} isBack onClick={() => navigation.goBack()} isLogo={false} />
      <View style={styles.cardBGColumnView}>
        <View style={styles.cardBGView}>
          <WebView
            style={styles.WebView}
            source={{ uri:url }}
            onLoadEnd={() => {setLoading(false);}}
            onLoadStart={() => {setLoading(true);}}>
          </WebView>
        </View>
      </View>
      {loading && <AppLoader />}
    </SafeAreaView>
  )
}

export default Privacy
