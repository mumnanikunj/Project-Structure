import React from 'react'
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native'

import images from '../../assets/images'
import AppGradient from '../../components/AppGradient'
import Header from '../../components/Header'
import Strings from '../../constants/Strings'
import {Colors} from '../../utils/theme'
import styles from './style'

const PaymentHistory = ({navigation}: any) => {

  const historyList = [5, 12, 5, 12,1]

  const renderHistoryData = ({item, index} : any) => {
    return (
      <View
        style={[
          styles.cardBGColumnView,
          styles.historyBg,
          {
            backgroundColor: index % 2 === 0 ? Colors.darkGreen : Colors.transparent}
      ]}
      >
        <View style={styles.cardBGView}>
          <Text style={styles.txtItemDate}>{'Marth 15, 2022'}</Text>
          <Text style={styles.txtItemPrice}>{'$9.99'}</Text>
        </View>
        <View style={styles.paymentText}>
          <Text style={styles.txtItemDescription}>{'Payment by correspondence'}</Text>
        </View>
        {/* <View style={styles.cardBGView}>
          <View style={styles.raw}>
            <Image style={styles.cardImage} source={images.payment.cardImage} />
            <Text style={styles.cardNumberText}>{'  ... 6714'}</Text>
          </View>
        </View> */}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient />
        <Header heading={Strings.billingMethod} isBack onClick={() => navigation.goBack()} isLogo={false} />

        {/* <Text style={styles.subscribeTitleText}>{Strings.no_subscription}</Text> */}

        <TouchableOpacity style={{...styles.subscriptionViewCon, borderColor: Colors.green}}>
          <View style={{...styles.PercentageView, backgroundColor: Colors.green}}>
            <Text>{'Current Plan:'}</Text>
          </View>
          <View style={styles.subscriptionViewConBot}>
            <View style={styles.YearlyCon}>
              <View>
                <Text style={styles.yearlyText}>{'Monthly'}</Text>
                <Text style={styles.fullYearText}>{'Next payment\nDecember 24, 2023'}</Text>
              </View>
            </View>
            <View style={styles.TextCon}>
              <Text style={{...styles.dollerText, color: Colors.green}}>{'$'}</Text>
              <Text style={{...styles.priceText, color: Colors.green}}>{'7.99'}</Text>
              <Text style={styles.milliText}>{' / m'}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.RenderItemMain}>
          <Text style={styles.itemsText}>{Strings.change_plan}</Text>
          <Image source={images?.auth?.back_arrow} style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>

        <View style={styles.parentContainer}>
          <Text style={styles.cardTitleText}>{'Payment history:'}</Text>
        </View>

        <FlatList
          style={styles.grow}
          data={historyList}
          renderItem={renderHistoryData}
        ></FlatList>
    </SafeAreaView>
  )
}

export default PaymentHistory
