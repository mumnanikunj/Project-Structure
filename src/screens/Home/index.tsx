import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, ImageBackground, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Video from 'react-native-video';
import { useDispatch } from 'react-redux';
import { Portal } from '@gorhom/portal'
import Intercom, { Space } from '@intercom/intercom-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import _ from 'lodash';

import images from '../../assets/images'
import Close from '../../assets/svg/close-circle.svg'
import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import ComponentStyle from '../../components/ComponentStyle'
import Header from '../../components/Header'
import { GdText } from '../../components/text/gd-text';
import ScreenNavigation from '../../constants/ScreenNavigation'
import Strings from '../../constants/Strings'
import { checkInternetConnection, showAlert } from '../../functions/commonFunctions'
import { DEFAULT_LANGUAGE } from '../../i18n/i18n';
import { setCurrentStep, updateOnBoardData } from '../../store/actions/SessionActions';
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'
import { CommonStyles } from '../../utils/theme/commonStyle';
import { RatingView } from '../ratings'
import { RatingViewType } from '../ratings/RatingView'
import { ShotFeedback } from '../Unity/ShotFeedback';
import { styles } from './styles'

let isRatingGiven = false;
export default function Home({ navigation, route }: any) {
  const [loading, setLoading] = useState(false)
  const [homeData, setHomeData] = useState([])
  const bottomSheetRef = useRef<RBSheet>()
  const [showEndSession, setShowEndSession] = useState(false)
  const [isCallClosePopup, setCallClosePopup] = useState(true)
  const [labguageKey, setLanguageKey] = useState<string>();
  const [visible, setVisible] = useState(false)
  const [ratingViewType, setRatingViewType] = useState<RatingViewType>('select_rating')
  const refRatingSheet = useRef<RBSheet>()
  const refShotFeedback = useRef()
  const videoRef = useRef(null);
  const isFocus = useIsFocused()
  const dispatch = useDispatch()

  const imagesFlat = [
    {
      image: images.home.network_box,
      Disc: 'need_mat',
      title: 'buy_now',
      sub_image: images.home.Shop_Icon
    },
    {
      image: images.home.Discord,
      Disc: 'join_our',
      title: 'discord',
      sub_image: images.home.discord
    }
  ]

  const onAddButtonPress = () => {
    bottomSheetRef?.current?.open()
  }


  const changeRatingView = (openView: RatingViewType): void => {
    if (openView === "comment" || openView === 'open_store') {
      refRatingSheet?.current?.close()
      setTimeout(() => {
        refRatingSheet?.current?.open()
      }, 1000);
    }
    setTimeout(() => {
      setRatingViewType(openView)
    }, 600);
  }
  useEffect(() => {
    if (route?.params?.showPopup !== undefined && route?.params?.showPopup === true) {
      setShowEndSession(true)
    } else {
      setShowEndSession(false)
    }
  }, [route?.params?.showPopup])

  // add image
  useEffect(() => {
    isRatingGiven = false;
    homeApi()
    checkRating()
    setRatingViewType('select_rating')

    setTimeout(() => {
      refRatingSheet?.current?.open()
    }, 4000);
  }, [])

  useEffect(() => {
    GetLanguage()
  }, [isFocus])

  const GetLanguage = async () => {
    const setLanguage = await AsyncStorage.getItem('settings.lang') || DEFAULT_LANGUAGE;
    setLanguageKey(setLanguage)
  }

  const checkRating = async () => {
    const isConnected = await checkInternetConnection()
    if (isConnected) {
      APICall('get', undefined, EndPoints.check_rating, false).then(async (res: any) => {
        if (res?.data && !res.data?.error) {
          if (_.get(res.data, "rating.ask_for_rating", false)) {
            refRatingSheet?.current?.open()
          }
        }
        if (res.data?.stage_id < 10 && res.data?.stage_id !== -1) {
          APICall('get', "", EndPoints.getOnboard, false).then(async (resOnBoard: any) => {
            if (res?.statusCode === 200) {
              const responseData = resOnBoard
              responseData.data.onboarding_flow = JSON.parse(resOnBoard.data.onboarding_flow)
              dispatch(setCurrentStep((responseData.data.onboarding_flow?.stage_id > 0) ? responseData.data.onboarding_flow?.stage_id - 1 : 0))
              dispatch(updateOnBoardData(resOnBoard.data))
              if ([11, 12, 13, 14, 15].includes(res.data?.stage_id)) {
                navigation.navigate(ScreenNavigation.screens.play, { data: { stage_id: res.data?.stage_id } })
              } else {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: ScreenNavigation.stack.AuthStack,
                        state: {
                          routes: [
                            {
                              name: ScreenNavigation.stack.Onboarding, params: {
                                stage_id: res.data?.stage_id,
                                from: ScreenNavigation.screens.Home
                              }
                            }
                          ]
                        }
                      }
                    ]
                  })
                );
              }

            }
          })
        }
      })
    }
  }

  const onRatingPopupClose = () => {
    if (isRatingGiven) { return }
    if (isCallClosePopup) {
      setRatingViewType('select_rating')
      // callCancelFeedbackAPI()
    }
    setTimeout(() => {
      setCallClosePopup(true)
    }, 500);
  }
  const userCancelRating = async () => {
    refRatingSheet?.current?.close()
    setCallClosePopup(false)
    if (ratingViewType === 'open_store') {
      // callCancelFeedbackAPI()
    }
    setRatingViewType('select_rating')
  }

  const callCancelFeedbackAPI = () => {
    giveRating({ app_store_rated: false })
  }

  const giveRating = async (payload: any) => {
    console.log("pa/===>> ", payload)
    if (payload?.feedback) {
      isRatingGiven = true
    }
    setRatingViewType("")
    const isConnected = await checkInternetConnection()
    if (isConnected) {
      refRatingSheet?.current?.close()
      APICall('post', payload, EndPoints.create_rating, false).then(async (res: any) => {
        console.log("ra.create_rating ", res.data)
      })
    }
  }

  const homeApi = async () => {
    const isConnected = await checkInternetConnection()
    if (isConnected) {
      setLoading(true)
      APICall('get', undefined, EndPoints.home, false).then(async (res: any) => {
        setLoading(false)
        if (res?.data) {
          if (res?.statusCode === 200) {
            console.log('HomeAMzonApo===>>', res?.data?.data)
            setHomeData(res?.data?.data)
          } else if (res?.statusCode === 422) {
            if (res?.data?.message) {
              showAlert(res?.data?.message)
            } else {
              showAlert(JSON.stringify(res?.data?.errors))
            }
          }
        }
      })
    } else {
      console.log()
      setVisible(true)
    }
  }


  const renderData = (data: any) => {
    return (
      <TouchableOpacity
        style={styles.renderView}
        onPress={() => {
          data?.index === 0
            ? onAddButtonPress()
            : homeData.length !== 0 && Linking.openURL(homeData[0]?.discord_url)
        }}
      >
        <Image resizeMode={'contain'} source={data?.item?.image} style={styles.interested} />
      </TouchableOpacity>
    )
  }

  const insets = useSafeAreaInsets()
  const STATUSBAR_HEIGHT = insets.top


  return (
    <SafeAreaView style={styles.safeArea}>

      <AppGradient />
      {showEndSession && (
        <View style={[styles.popupBack, { marginTop: STATUSBAR_HEIGHT || dH(40) }]}>
          <Image resizeMode={'contain'} source={images.tabs.session} tintColor={Colors.green} />
          <Text style={styles.msg}>{Strings.end_sesion_msg}</Text>
          {/* <GdText style={styles.msg} tx={Strings.end_sesion_msg}/> */}
          <Close
            onPress={() => {
              setShowEndSession(false)
            }}
          />
        </View>
      )}
      <Header
        heading={Strings.isHome}
        isLogo
        isBack
        onClick={function (): void {
          Intercom.presentSpace(Space.home)
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.parentView}
          onPress={() => {
            navigation.navigate(ScreenNavigation.screens.playNow)
          }}
        >
          <Image resizeMode={'contain'} source={images.home.banner} style={styles.banner} />
        </TouchableOpacity>
        <View style={styles.view_tabs}>
          <TouchableOpacity
            style={styles.inner_tab}
            onPress={() => {
              navigation.navigate(ScreenNavigation.screens.sessions)
            }}
          >
            <Image style={styles.image} source={images.tabs.session} tintColor={Colors.green} />
            <GdText style={styles.text_h2} tx={"my_sessions"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inner_tab}
            onPress={() => {
              navigation.navigate(ScreenNavigation.screens.GuideScreen)
            }}
          >
            <Image style={styles.image} source={images.home.vector} tintColor={Colors.green} />
            <GdText style={styles.text_h2} tx={"how_to_play"} />
          </TouchableOpacity>
        </View>
        <View style={styles.interested_view}>
          <GdText style={styles.interested_text} tx={"interested"} />
        </View>
        <RatingView
          viewType={ratingViewType}
          bottomSheetRef={refRatingSheet}
          setCallClosePopup={setCallClosePopup}
          onChangeView={changeRatingView}
          onPopupClose={onRatingPopupClose}
          userCancelRating={userCancelRating}
          giveRating={giveRating}
          key={1} />
        <FlatList
          style={styles.bottomView}
          horizontal
          data={imagesFlat}
          showsHorizontalScrollIndicator={false}
          renderItem={renderData}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      <ShotFeedback
        bottomSheetRef={refShotFeedback}
      />
      <Portal>
        <RBSheet
          height={dW(650)}
          openDuration={250}
          closeonDrag
          ref={bottomSheetRef}
          closeOnDragDown
          closeOnPressMask
          customStyles={{
            container: CommonStyles.bottomSheetContainer,
            wrapper: CommonStyles.bottomSheetWrapper,
            draggableIcon: CommonStyles.bottomSheetIcon
          }}
        >
          <View style={styles.container}>
            <Video
              paused={!isFocus}
              ref={videoRef}
              source={require('../../assets/video/matsell.mp4')}
              resizeMode={"cover"}
              style={[styles.video]}
              repeat
            // onEnd={onEnd}
            />
          </View>
          <View style={ComponentStyle.bottom_shett_view}>
            <GdText style={[ComponentStyle.text_h1, ComponentStyle.marginTopButton1]} tx={"buy_divot"} />
            <GdText style={[ComponentStyle.text_h2, ComponentStyle.marginTopButton3,
            styles.subTitleBuy]} tx={"divot_daddy"} />
            <TouchableOpacity
              onPress={() => {
                labguageKey === 'en' ?
                  homeData.length !== 0 && Linking.openURL(homeData[0]?.amazon_url) :
                  homeData?.length !== 0 && Linking.openURL(homeData[0]?.makuake_url);
                // Linking.openURL('https://www.makuake.com/project/golfdaddy_simulator/')
              }}
              style={[ComponentStyle.marginTopButton1, ComponentStyle.CustomButtonStyle]}
            >
              <Image
                resizeMode={'contain'}
                style={labguageKey === 'en' ? ComponentStyle.button : ComponentStyle.button2}
                source={labguageKey === 'en' ? images.home.Amazon : images.home.Makuake}
              />
              <GdText style={ComponentStyle.buyTextStyle} tx={'buy_on_amazon'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={ComponentStyle.paddingBottom}
              onPress={() => {
                Linking.openURL(homeData[0]?.golf_daddy_url)
              }}
            >
              <Image
                resizeMode={'contain'}
                style={[ComponentStyle.button, ComponentStyle.marginTopButton2]}
                source={images.home.Shoping}
              />
              <GdText style={ComponentStyle.buyTextStyle} tx={'buy_on_our_website'} />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={ComponentStyle.touchStyle}
              hitSlop={10}
              onPress={() => bottomSheetRef?.current?.close()} >
              <Text style={ComponentStyle.textCancel}>{Strings.not_now}</Text>
            </TouchableOpacity> */}
          </View>
        </RBSheet>
      </Portal>
      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={homeApi} setVisible={setVisible} />
    </SafeAreaView>
  )
}
