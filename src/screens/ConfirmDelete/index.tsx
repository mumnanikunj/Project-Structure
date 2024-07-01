import React, { useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { CommonActions } from '@react-navigation/native'

import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Button from '../../components/Button'
import Header from '../../components/Header'
import ScreenNavigation from '../../constants/ScreenNavigation'
import Strings from '../../constants/Strings'
import { checkInternetConnection, removeAsyncData, showAlert }
  from '../../functions/commonFunctions'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import constants, { commonConstant } from '../../utils/theme/constants'
import styles from './style'
import { GdText } from '../../components/text/gd-text'

const ConfirmDelete = ({ navigation, route }: any) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false)

  const callAPIToDeleteAccount = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      setLoading(true)
      APICall('delete', undefined, EndPoints.deleteAccount, false).then(async (res: any) => {
        setLoading(false)
        if (res?.data) {
          if (res?.statusCode === 200) {
            // navigation.navigate(ScreenNavigation.stack.AuthStack)
            await removeAsyncData(constants.asyncStorageKeys.userData)
            await removeAsyncData(constants.asyncStorageKeys.userToken);
            commonConstant.tokenData = {};
            commonConstant.appUser = {}
            commonConstant.isLogin = false
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: ScreenNavigation.stack.AuthStack }]
              }));
          } else if (res?.statusCode === 422) {
            if (res?.data?.message) {
              showAlert(res?.data?.message)
            }
            else {
              showAlert(JSON.stringify(res?.data?.errors))
            }
          }
        } else {
          setVisible(true)
        }
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient />      
      <Header isLogo={false}
        heading={'delete_my_account'}
        isBack onClick={() => navigation.goBack()} />

      <View style={styles.contentContainer}>        
        <GdText style={styles.signinHeading} tx={"confirm_account_delete"} />
        <GdText style={styles.txtSubTitle} tx={"confirm_message"} />        
      </View>
      <Button
        heading={'delete_account_forever'}
        onPress={callAPIToDeleteAccount}
        exStyle={styles.btnDelete}
        isDisabled={false}
        textStyle={styles.btnTextDelete}
      />
      {loading && <AppLoader />}

      <AppNoInternetSheet visible={visible} setVisible={setVisible} onClick={async () => {
        await callAPIToDeleteAccount()
      }} />

    </SafeAreaView>
  )
}

export default ConfirmDelete
