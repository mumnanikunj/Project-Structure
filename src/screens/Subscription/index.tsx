import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Linking, Platform, SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as RNIap from 'react-native-iap'
import Intercom from '@intercom/intercom-react-native';
import { CommonActions, useIsFocused, useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import images from '../../assets/images';
import { AppLoader } from '../../components';
import Button from '../../components/Button';
import CommonModel from '../../components/CommonModal';
import ScreenNavigation from '../../constants/ScreenNavigation';
import Strings from '../../constants/Strings';
import { showAlert } from '../../functions/commonFunctions';
import { dH, dW } from '../../utils/dynamicHeightWidth';
import { Colors } from '../../utils/theme';
import constants, { commonConstant } from '../../utils/theme/constants';
import { styles } from './styles';

interface SubscriptionProps {
  from: string
}
const Subscription: FC<SubscriptionProps> = ({ from }) => {

  const [SelectCon, setSelectCon] = useState(true);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [productsBySku, setProductsBySku] = useState<any[]>([])
  const isFocus = useIsFocused()
  const ownedPlans = useRef<RNIap.Purchase[]>([])
  const navigation = useNavigation()

  const getProducts = useCallback(() => {
    RNIap.getAvailablePurchases().then((resp) => {
      ownedPlans.current = resp
    })
  }, [])

  useEffect(() => {
    if (isFocus) {
      getProducts()
    }
  }, [getProducts, isFocus])


  useEffect(() => {
    setLoading(true);
    RNIap.initConnection()
      .then((resp) => {
        if (resp) {
          if (Platform.OS === "android") {
            RNIap.getSubscriptions({
              skus: constants.subscriptionSkus
            })
              .then((resp) => {
                setProductsBySku(resp)
                setLoading(false)
              })
              .catch(() => {
                setLoading(false)
              })
          } else {
            RNIap.getSubscriptions({ skus: constants.subscriptionSkus })
              .then((resp) => {
                setProductsBySku(resp)
                setLoading(false)
              })
              .catch(() => {
                setLoading(false)
              })
          }
        } else {
          setLoading(false)
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const onPressManage = useCallback(() => {
    try {
      const id = ownedPlans?.current[0]?.productId;
      if (Platform.OS === "android") {
        Linking.openURL(
          `https://play.google.com/store/account/subscriptions?package=com.golfdaddy&sku=${id}`
        )
      } else {
        Linking.openURL(
          'https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/manageSubscriptions'
        )
      }
    } catch (error) { }
  }, [])

  const onPurchase = useCallback(
    (id: string) => {
      if (ownedPlans.current.length > 0) {
        setShow(true);
        return
      }
      const product = _.find(productsBySku, (i) => i?.productId === id)
      if (productsBySku.length > 0 && product?.productId) {
        setLoading(true)
        if (Platform.OS === "android") {
          RNIap.requestSubscription({
            sku: product?.productId,
            subscriptionOffers: [
              {
                offerToken: product?.subscriptionOfferDetails[0]?.offerToken,
                sku: product?.productId
              }
            ]
          })
            .then(() => {
              setLoading(false)
              getProducts()
            })
            .catch(({ message }) => {
              if (message) {
                showAlert(String(message))
              }
              setLoading(false)
            })
        } else {
          RNIap.requestPurchase({
            sku: product.productId
          })
            .then(() => {
              setLoading(false)
              getProducts()
            })
            .catch(() => {
              setLoading(false)
            })
        }
      } else {
        showAlert('No subscription available.')
      }
    },
    [getProducts, onPressManage, productsBySku]
  )

  const onRestorePurchase = useCallback(async () => {
    const purchaseHistories = await RNIap.getPurchaseHistory()

    if (purchaseHistories && purchaseHistories.length > 0) {
      // Restore the purchase.
      showAlert('Successfully restored your subscription.')
    } else {
      showAlert('No subscription available to restore.')
    }
  }, [])

  const renderRestoreButton = useMemo(() => {
    return (
      ownedPlans.current.length > 0 && (
        <Button heading={"Restore Subscription"} onPress={onRestorePurchase} exStyle={{ width: dW(250), marginBottom: dH(16) }} isDisabled={false} />
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRestorePurchase])

  const renderBottomText = useMemo(() => {
    return (
      ownedPlans.current.length > 0 && (
        <>
          <Text style={styles.text_prop}>{Strings.modify_subscription}</Text>
          {renderRestoreButton}
        </>
      )
    )
  }, [renderRestoreButton])

  const openHomePage = () => {
    if (from === ScreenNavigation.screens.Login) {
      Intercom.loginUserWithUserAttributes({
        userId: commonConstant.appUser.id
      });
    }
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{
          name: from === ScreenNavigation.screens.SignUp ?
            ScreenNavigation.screens.Login :
            ScreenNavigation.stack.HomeNavigator
        }]
      })
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>

      <TouchableOpacity style={{
        ...styles.subscriptionViewCon,
        borderColor: SelectCon ? Colors.green : Colors.lightblack
      }}
        onPress={() => setSelectCon(true)}
      >
        <View style={{ ...styles.PercentageView, backgroundColor: SelectCon ? Colors.green : Colors.lightblack }}>
          <Text>{"Save - 20%"}</Text>
        </View>
        <View style={[styles.subscriptionViewConBot, SelectCon && styles.selected_plan_item]}>
          <View style={styles.YearlyCon}>
            <TouchableOpacity style={{ marginTop: dW(4) }}>
              {SelectCon ? <Image source={images.auth.radioSelect} /> : <Image source={images.auth.radioUnSelect} />}
            </TouchableOpacity>
            <View style={styles.YearText}>
              <Text style={styles.yearlyText}>{"Yearly"}</Text>
              <Text style={styles.fullYearText}>{"Pay for full year"}</Text>
            </View>
          </View>
          <View style={styles.TextCon}>
            <Text style={{ ...styles.dollerText, color: SelectCon ? Colors.green : Colors.white }}>{"$"}</Text>
            <Text style={{ ...styles.priceText, color: SelectCon ? Colors.green : Colors.white }}>{"7.99"}</Text>
            <Text style={styles.milliText}>{" / m"}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.subscriptionViewCon,
          backgroundColor: SelectCon ? Colors.transparent : Colors.green_transparent,
          borderColor: !SelectCon ? Colors.green : Colors.lightblack
        }}
        onPress={() => setSelectCon(false)}>
        <View style={{ ...styles.subscriptionViewConBot, ...styles.moreStyle }}>
          <View style={styles.YearlyCon}>
            <TouchableOpacity style={{ marginTop: dW(4) }}>
              {!SelectCon ? <Image source={images.auth.radioSelect} /> : <Image source={images.auth.radioUnSelect} />}
            </TouchableOpacity>
            <View style={styles.YearText}>
              <Text style={{ ...styles.yearlyText, color: Colors.white }}>{"Month"}</Text>
              <Text style={styles.fullYearText}>{"Pay monthly, cancel any time."}</Text>
            </View>
          </View>
          <View style={styles.TextCon}>
            <Text style={{ ...styles.dollerText, color: !SelectCon ? Colors.green : Colors.white }}>{"$"}</Text>
            <Text style={{ ...styles.priceText, color: !SelectCon ? Colors.green : Colors.white }}>{"9.99"}</Text>
            <Text style={styles.milliText}>{" / m"}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.button} >
        <Button
          exStyle={styles.text_exStyle}
          heading={Strings.select_plan}
          onPress={async () => {
            const pId = SelectCon ? constants.subscriptionSkus[0] : constants.subscriptionSkus[1];
            onPurchase(pId)
          }} isDisabled={false}
        ></Button>
        {renderBottomText}
      </View>
      {loading && <AppLoader />}

      <Text
        onPress={openHomePage}
        style={styles.text_prop}>{Strings.try_free}</Text>

      <CommonModel
        isVisible={show}
        button={Strings.manage_subscription}
        message={Strings.subscribed}
        close={() => setShow(false)}
        onPressButton={async () => { onPressManage(); }} />
    </SafeAreaView>
  )
};

export default Subscription;
