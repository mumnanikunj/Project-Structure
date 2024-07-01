/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { FC, useEffect, useRef, useState } from 'react'
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { showMessage } from "react-native-flash-message";
import RNFS from 'react-native-fs'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Video from 'react-native-video'
import { useDispatch, useSelector } from 'react-redux'
import { Portal } from '@gorhom/portal'
import { BlurView } from '@react-native-community/blur'
import { CommonActions, StackActions } from '@react-navigation/native'
import _ from 'lodash'

import fonts from '../../assets/fonts'
import { SvgImage } from '../../assets/svg/SvgPath';
import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import ComponentStyle from '../../components/ComponentStyle'
import Header from '../../components/Header'
import ScreenNavigation from '../../constants/ScreenNavigation'
import Strings from '../../constants/Strings'
import { checkInternetConnection, debugLog } from '../../functions/commonFunctions'
import { setCurrentStep, updateOnBoardData } from '../../store/actions/SessionActions'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'
import { CommonStyles } from '../../utils/theme/commonStyle'
import {
  getFolderNameFromUrl,
  getFrameUriArray
} from '../../utils/VideoUtils'
import { ISwing } from '../Unity/UnityView.props'
import ScrollRuler from './ScollRuler'

const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height

export const FRAME_PER_SEC = 60
export const FRAME_WIDTH = 50
const TILE_HEIGHT = 80
const TILE_WIDTH = FRAME_WIDTH / 2 // to get a 2x resolution

const DURATION_WINDOW_DURATION = 9
const DURATION_WINDOW_BORDER_WIDTH = 4
const DURATION_WINDOW_WIDTH = DURATION_WINDOW_DURATION * FRAME_PER_SEC * TILE_WIDTH
const POPLINE_POSITION = '50%'

let lastFrameIndex = 0
const getFileNameFromPath = (path) => {
  const fragments = path.split('/')
  let fileName = fragments[fragments.length - 1]
  fileName = fileName.split('.')[0]
  return fileName
}

const FRAME_STATUS = Object.freeze({
  LOADING: { name: Symbol('LOADING') },
  READY: { name: Symbol('READY') }
})

const getLeftLinePlayTime = (offset) => {
  return offset / (FRAME_PER_SEC * TILE_WIDTH)
}
const getRightLinePlayTime = (offset) => {
  return (offset + DURATION_WINDOW_WIDTH) / (FRAME_PER_SEC * TILE_WIDTH)
}
const getPopLinePlayTime = (offset) => {
  return (
    (offset + (DURATION_WINDOW_WIDTH * parseFloat(POPLINE_POSITION)) / 100) /
    (FRAME_PER_SEC * TILE_WIDTH)
  )
}

interface IShotPreview {
  navigation: any
  route: any
  bottomSheetRef: any
  Data: ISwing
}

const ShotPreview: FC<IShotPreview> = ({ navigation, route }) => {
  const [selectedVideo, setSelectedVideo] = useState(`${RNFS.DocumentDirectoryPath}`)
  const [frames, setFrames] = useState() // <[{status: <FRAME_STATUS>, uri: <string>}]>
  const [framesLineOffset, setFramesLineOffset] = useState(0) // number
  const bottomSheetRef = useRef<RBSheet>()
  const [paused, setPaused] = useState(false)
  const [zoomAnim, setZoomAnim] = useState(new Animated.Value(1))
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [play, setPlay] = useState(false)
  const [distance, setDistance] = useState('')
  const [deviation, setDeviation] = useState('')
  const dispatch = useDispatch();

  const RouteData = route?.params?.Data
  console.log("RouteData..@. ", RouteData)
  const deviationResult = _.get(RouteData, 'flight_attributes.total_deviation', 0)

  useEffect(() => {
    handleVideoLoad()
  }, [])
  const insets = useSafeAreaInsets()

  useEffect(() => {
    Animated.spring(zoomAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true
      // isInteraction:true
    }).start()
  }, [])


  const Opensceller = () => {
    bottomSheetRef?.current?.open()
  }

  const OpenShareSheet = async () => {
    try {
      const result = await Share.share({
        // title: 'Share Message',
        url: 'https://golfdaddy.com/',
        message: 'GolfDaddy'
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  const videoPlayerRef = useRef()

  const handleOnTouchStart = () => {
    setPaused(true)
  }
  const handleOnTouchEnd = () => {
    setPaused(false)
  }

  const handleOnScroll = ({ nativeEvent }) => {
    const playbackTime = getPopLinePlayTime(nativeEvent.contentOffset.x)
    const frameIndex = Math.round(nativeEvent.contentOffset.x / FRAME_WIDTH)
    if (frameIndex === lastFrameIndex) {
      lastFrameIndex = frameIndex
      return
    }
    lastFrameIndex = frameIndex
    console.log(frameIndex)
    const videoDuration = 7.1 // in seconds
    const seekTime = frameIndex / FRAME_PER_SEC
    console.log('seekTime.. ', seekTime)
    const clampedSeekTime = Math.min(Math.max(0, seekTime), videoDuration)
    videoPlayerRef.current?.seek(clampedSeekTime)
  }

  const handleVideoLoad = async () => {
    const destinationPath = `${RNFS.DocumentDirectoryPath}/${getFolderNameFromUrl(
      RouteData?.video_url
    )}`
    setSelectedVideo(`${destinationPath}.mp4`)
    const imageArray = await getFrameUriArray(destinationPath)
    setFrames(imageArray)
  }

  const handleOnProgress = ({ currentTime }) => {
    if (currentTime >= getRightLinePlayTime(framesLineOffset)) {
      const a = getLeftLinePlayTime(framesLineOffset)
      videoPlayerRef.current.seek(a)
    }
  }


  const Send_Data = async () => {
    console.log('call1')
    const onboardData = useSelector((state: any) => state.SessionReducer.onboardData);

    const stageView = onboardData.onboarding_flow.find((item: any) => item.stage_id === (_.get(RouteData, "stage_id", 11)));
    const stageId = stageView.stage_id;

    const viewIndex = _.findIndex(onboardData.onboarding_flow, (item: IOnboardItem) => {
      return item.stage_id === stageId
    })

    console.log('stageView.stage_id', stageView.stage_id)

    const requestData = {
      answered: true,
      stage_id: stageView.stage_id,
      video: `video ${stageView.stage_id}`,
      distance,
      deviation
    }
    const updateOnbaord = onboardData
    updateOnbaord.onboarding_flow[viewIndex] = {
      ...updateOnbaord.onboarding_flow[viewIndex],
      ...requestData
    }
    bottomSheetRef.current.close()
    // console.log("updateOnbaord@ ", updateOnbaord)
    console.log("EstageView.stage_id. ", updateOnbaord)
    dispatch(setCurrentStep(stageView.stage_id + 1))
    dispatch(updateOnBoardData(updateOnbaord))
    APICall('put', updateOnbaord, EndPoints.signUpUpdate, false)
    if (stageView.stage_id === 15) {
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
                      stage_id: 16,
                      // from: ScreenNavigation.screens.Home
                    }
                  }
                ]
              }
            }
          ]
        })
      );
      // navigation.dispatch(StackActions.popToTop());
    } else {
      navigation.dispatch(StackActions.replace("OnboardCamera", { stage_id: stageView.stage_id + 1 }))
    }
  }

  const Send_Datafunction = async () => {
    // console.log("deviation... ", deviation)
    // return
    const isConnected = await checkInternetConnection()
    if (isConnected) {
      const body = JSON.stringify({
        swing_id: RouteData?.swing_id,
        feedback: { thumbs_up: 'false', distance, deviation }
      })
      setLoading(true)
      APICall('post', body, EndPoints.submit_swing, false)
        .then(async (res: any) => {
          bottomSheetRef.current?.close()
          setLoading(false)
          if (res.data) {
            if (res?.statusCode === 200) {
              showMessage({
                message: res?.data?.message,
                type: "success"
            })
              console.log('res?.statusCode', res?.statusCode)
            } else if (res?.statusCode === 404) {
              Alert.alert('Somthing want wrong')
            } else {
              console.log('checkDetails')
            }
          }
        })
        .catch((err) => {
          debugLog('err', err)
        })
    } else {
      setVisible(true)
    }
  }

  const renderFrame = (frame, index) => {
    if (frame.status === FRAME_STATUS.LOADING.name.description) {
      return <View style={styles.loadingFrame} key={index} />
    } else {
      return (
        <View>
          <Image
            key={index}
            source={{ uri: frame }}
            style={{
              width: FRAME_WIDTH,
              height: FRAME_WIDTH,
              zIndex: 10
            }}
          />
          {/* <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color:Colors.white
            }}
          >
            {index}
          </Text> */}
        </View>
      )
    }
  }

  return (
    // <SafeAreaView style={styles.mainContainer}>
    <Animated.View style={{ flex: 1, transform: [{ scale: zoomAnim }] }}>
      <AppGradient />

      <View style={styles.videoContainer}>
        {/* <Animated.Image
                 source={{ uri: 'https://picsum.photos/id/39/200' }}
                  style={{ width: 300, height: 300,position:'absolute' }}
                 sharedTransitionTag="tag"
                 /> */}
        <TouchableWithoutFeedback
          onPressIn={() => { setPlay(true) }}
          onPressOut={() => setPlay(false)}
          //    onLongPress={() => {
          //     console.log('Long Press')
          //     setPlay(true)
          // }}
          delayLongPress={100}
          style={{ backgroundColor: 'red' }}
        >
          <Video
            ref={videoPlayerRef}
            style={styles.video}
            resizeMode={'cover'}
            source={{ uri: selectedVideo }}
            repeat={true}
            muted={true}
            paused={play}
            // onLoad={handleVideoLoad}
            onProgress={handleOnProgress}
          />
        </TouchableWithoutFeedback>
        <Header
          isLogo={false}
          //   isBack
          //   onClick={() => navigation.goBack()}
          rigthView={
            <View style={[styles.rigthViewcontainer, { paddingTop: insets.top }]}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <BlurView
                  blurType={'ultraThinMaterialDark'} blurAmount={100} style={styles.blur_icon}
                >
                  <SvgImage.back_vector width={12} height={12} color={Colors.white} />
                </BlurView>
              </TouchableOpacity>
              {
                !RouteData?.type ?
                  <View style={styles.rigthViewSubcontainer}>
                    <TouchableOpacity onPress={() => Opensceller()}>
                      <BlurView
                        blurType={'ultraThinMaterialDark'} blurAmount={100} style={[styles.blur_icon, { position: 'relative', marginHorizontal: dW(10) }]}
                      >
                        <SvgImage.flag_vector width={16} height={16} color={Colors.white} />
                      </BlurView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => OpenShareSheet()}>
                      <BlurView
                        blurType={'ultraThinMaterialDark'} blurAmount={100} style={[styles.blur_icon, { position: 'relative', marginHorizontal: dW(10) }]}
                      >
                        <SvgImage.share_vector width={18} height={18} color={Colors.white} />
                      </BlurView>
                    </TouchableOpacity>
                  </View>
                  :
                  <TouchableOpacity
                    onPress={() => Opensceller()}
                  >
                    <BlurView
                      blurType={'ultraThinMaterialDark'} blurAmount={100} style={[styles.blur_icon, { position: 'relative', marginHorizontal: dW(1), width: 60 }]}
                    >
                      <Text style={styles.nextText}>{Strings.next}</Text>
                    </BlurView>
                  </TouchableOpacity>
              }
            </View>
          }
        />

        {/* <ScrollRuler type={"distance"} minValue={20} maxValue={140}/>

        <ScrollRuler type={"deviation"} minValue={10} maxValue={15}/> */}

        <Portal>
          <RBSheet
            height={!RouteData?.type ? dH(450) : dH(480)}
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
            <View style={ComponentStyle.bottom_shett_view}>
              <Text style={[ComponentStyle.text_h1, styles.txtTitle]}>{Strings.calibration}</Text>
              <Text style={styles.txtShotLanded}>{Strings.whereShot}</Text>
              <>
                <Text style={styles.txtDistance}>{!RouteData?.type ? Strings.distance : Strings.carry_distance}</Text>
                {/* <View style={{flex:1}}> */}
                <ScrollRuler
                  type={'distance'}
                  minValue={0}
                  maxValue={200}
                  onValueSelect={(data) => {
                    setDistance(data.newStep)
                  }}
                />
                {/* </View> */}
                <Text style={styles.txtDistance}>{Strings.Deviation}</Text>
                <ScrollRuler
                  type={'deviation'}
                  minValue={20}
                  maxValue={20}
                  onValueSelect={(data) => {
                    setDeviation(data.newStep)
                  }}
                // setDeviation={setDeviation}
                />
              </>
              <TouchableOpacity style={styles.SendView} onPress={() => !RouteData?.type ? Send_Datafunction() : Send_Data()}>
                <Text style={styles.SendText}>{!RouteData?.type ? Strings.send : Strings.done}</Text>
              </TouchableOpacity>
              {
                RouteData?.type ?
                  <TouchableOpacity style={styles.bottomButton}>
                    <Text style={styles.bottomButtonText}>{Strings.not_sure}</Text>
                  </TouchableOpacity>
                  :
                  null
              }
              {loading && <AppLoader />}
              <AppNoInternetSheet
                visible={visible}
                setVisible={setVisible}
                onClick={Send_Datafunction}
              />
            </View>
          </RBSheet>
        </Portal>
        {
          !RouteData?.type ?
            <View style={styles.blurparentView}>
             {!play && <BlurView blurType={'ultraThinMaterialDark'} blurAmount={10} style={styles.blurView} />} 
              <View style={styles.MainblurView}>
                <View style={styles.bluerInnerView}>
                  <Text style={styles.elementText}>{Strings.target}</Text>
                  <Text style={styles.elementValue}>{'-'}</Text>
                </View>
                <View style={styles.bluerInnerView}>
                  <Text style={styles.elementText}>{Strings.club}</Text>
                  <Text style={styles.elementValue}>{'-'}</Text>
                </View>
                <View style={styles.lineStyle}></View>
                <View style={styles.bluerInnerView}>
                  <Text style={styles.elementText}>{Strings.Carry}</Text>
                  <Text style={styles.elementValue}>{`${_.round(
                    _.get(RouteData, 'flight_attributes.carry_distance', 0)
                  )} Yards`}</Text>
                </View>
                <View style={styles.bluerInnerView}>
                  <Text style={styles.elementText}>{Strings.distance}</Text>
                  <Text style={styles.elementValue}>{`${Math.round(
                    RouteData?.flight_attributes?.total_distance
                  )} Yards`}</Text>
                </View>
                <View style={styles.bluerInnerView}>
                  <Text style={styles.elementText}>{Strings.Deviation}</Text>
                  <Text style={styles.elementValue}>
                    {_.round(Math.abs(deviationResult))}
                    {deviationResult < 0 ? 'L' : 'R'}
                  </Text>
                </View>
              </View>
            </View>
            : null
        }

      </View>
      {/* <View style={styles.container}>
                    <TouchableOpacity
                        onPress={async () => {
                              const result = await launchImageLibrary({
                                mediaType: 'video',
                                assetRepresentationMode: 'current',
                              });

                            console.log('selectedVideo', result)
                            showEditor(`${result.assets[0]?.uri}` || '', {
                                maxDuration: 20,
                            });
                        }}
                        style={{ padding: 10, backgroundColor: 'red' }}
                    >
                        <Text>Launch Library</Text>
                    </TouchableOpacity>
                </View> */}
      {frames && (
        <View style={styles.durationWindowAndFramesLineContainer}>
          {/* <View style={styles.durationWindow}>
            <View style={styles.durationLabelContainer}>
              <Text style={styles.durationLabel}>{DURATION_WINDOW_DURATION} sec.</Text>
            </View>
          </View> */}
          <View style={styles.popLineContainer}>
            <View style={styles.popLine} />
          </View>
          {/* <View style={styles.durationWindowLeftBorder} />
          <View style={styles.durationWindowRightBorder} /> */}
          <ScrollView
            decelerationRate={0.8}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={styles.framesLine}
            alwaysBounceHorizontal={true}
            scrollEventThrottle={1}
            onScroll={handleOnScroll}
            onTouchStart={handleOnTouchStart}
            onTouchEnd={handleOnTouchEnd}
            onMomentumScrollEnd={handleOnTouchEnd}
          >
            <View style={styles.prependFrame} />
            {frames.map((frame, index) => renderFrame(frame, index))}
            <View style={styles.appendFrame} />
          </ScrollView>
        </View>
      )}
    </Animated.View>
    //</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 16
  },
  buttonText: {
    color: '#fff'
  },
  videoContainer: {
    width: SCREEN_WIDTH,
    height: 0.9 * SCREEN_HEIGHT
    // backgroundColor: 'rgba(255,255,255,0.1)'
  },
  video: {
    // backgroundColor:'transparent',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0
  },
  durationWindowAndFramesLineContainer: {
    // top: -DURATION_WINDOW_BORDER_WIDTH,
    width: SCREEN_WIDTH,
    height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
    // justifyContent: 'center',
    zIndex: 10
  },
  durationWindow: {
    width: DURATION_WINDOW_WIDTH,
    borderColor: 'yellow',
    borderWidth: DURATION_WINDOW_BORDER_WIDTH,
    borderRadius: 4,
    height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
    alignSelf: 'center'
  },
  durationLabelContainer: {
    backgroundColor: 'yellow',
    alignSelf: 'center',
    top: -28,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  durationLabel: {
    color: 'rgba(0,0,0,0.6)',
    fontWeight: '700'
  },
  popLineContainer: {
    position: 'absolute',
    alignSelf: POPLINE_POSITION === '50%' && 'center',
    zIndex: 25
  },
  popLine: {
    width: 3,
    height: TILE_HEIGHT / 1.6,
    backgroundColor: Colors.white
  },
  durationWindowLeftBorder: {
    position: 'absolute',
    width: DURATION_WINDOW_BORDER_WIDTH,
    alignSelf: 'center',
    height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
    left: SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: 'yellow',
    zIndex: 25
  },
  durationWindowRightBorder: {
    position: 'absolute',
    width: DURATION_WINDOW_BORDER_WIDTH,
    right: SCREEN_WIDTH - SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
    height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: 'yellow',
    zIndex: 25
  },
  framesLine: {
    width: SCREEN_WIDTH,
    position: 'absolute'
  },
  loadingFrame: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1
  },
  prependFrame: {
    width: SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2
  },
  appendFrame: {
    width: SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2
  },
  blurparentView: {
    padding: dH(6),
    top: dH(80),
    position: 'absolute',
    left: dW(14),
    borderRadius: 10
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  // eslint-disable-next-line react-native/no-color-literals
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    // margin:10,
    marginVertical: 10
  },
  elementText: {
    color: Colors.white,
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: dW(16),
    lineHeight: 20,
    marginEnd: dW(25)
  },
  elementValue: {
    color: Colors.green_ligth_opacity,
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: dW(16),
    lineHeight: 20
  },
  // eslint-disable-next-line react-native/no-color-literals
  rigthViewcontainer: {
    flex: 1,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rigthViewSubcontainer: {
    flexDirection: 'row',
    // width: dW(100),
    justifyContent: 'space-between'
  },
  iconPack: {
    height: 40,
    width: 40
  },
  txtShotLanded: {
    fontFamily: fonts.regular,
    fontSize: dW(16),
    color: Colors.white,
    marginBottom: dW(24)
  },
  txtDistance: {
    fontFamily: fonts.regular,
    fontSize: dW(16),
    color: Colors.green_light,
    marginBottom: dW(10)
  },
  txtTitle: {
    marginTop: dH(15),
    marginBottom: dH(15)
  },
  SendView: {
    backgroundColor: Colors.green,
    paddingVertical: 16,
    paddingHorizontal: 80,
    borderRadius: 40
  },
  SendText: {
    fontFamily: fonts.bold,
    fontWeight: '500',
    color: Colors.white,
    fontSize: dW(14),
    lineHeight: 20
  },
  MainblurView: {
    paddingHorizontal: 12
  },
  bluerInnerView: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  blur_icon: {
    height: 40,
    width: 40, position: 'absolute', borderRadius: 20, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  nextText: {
    color: Colors.white,
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 16
  },
  bottomButton: {
    top: dH(15)
  },
  bottomButtonText: {
    color: Colors.white,
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 16
  }
})

export default ShotPreview

// import * as React from 'react';

// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   NativeEventEmitter,
//   NativeModules,
//   Modal,
// } from 'react-native';
// import {
//   cleanFiles,
//   deleteFile,
//   isValidVideo,
//   listFiles,
//   showEditor,
// } from 'react-native-video-trim';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { useEffect, useState } from 'react';

// export default function App() {
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     const eventEmitter = new NativeEventEmitter(NativeModules.VideoTrim);
//     const subscription = eventEmitter.addListener('VideoTrim', (event) => {
//       switch (event.name) {
//         case 'onShow': {
//           console.log('onShowListener', event);
//           break;
//         }
//         case 'onHide': {
//           console.log('onHide', event);
//           break;
//         }
//         case 'onStartTrimming': {
//           console.log('onStartTrimming', event);
//           break;
//         }
//         case 'onFinishTrimming': {
//           console.log('onFinishTrimming', event);
//           break;
//         }
//         case 'onCancelTrimming': {
//           console.log('onCancelTrimming', event);
//           break;
//         }
//         case 'onError': {
//           console.log('onError', event);
//           break;
//         }
//       }
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         onPress={async () => {
//           try {
//             const result = await launchImageLibrary({
//               mediaType: 'video',
//               assetRepresentationMode: 'current',
//             });

//             isValidVideo(result.assets![0]?.uri || '').then((res) =>
//               console.log('isValidVideo:', res)

//             );

//             showEditor(result.assets![0]?.uri || '', {

//               // maxDuration: 30,
//               // cancelButtonText: 'hello',
//               // saveButtonText: 'world',
//               // removeAfterSavedToPhoto: true,
//               // enableCancelDialog: false,
//               // cancelDialogTitle: '1111',
//               // cancelDialogMessage: '22222',
//               // cancelDialogCancelText: '3333',
//               // cancelDialogConfirmText: '4444',
//               // enableSaveDialog: false,
//               // saveDialogTitle: '5555',
//               // saveDialogMessage: '666666',
//               // saveDialogCancelText: '77777',
//               // saveDialogConfirmText: '888888',
//               // trimmingText: '9999999',
//             })
//               .then(async(res) => await NativeModules.VideoTrim?.NativeModules.VideoTrim)
//               .catch((e) => console.log(e, 1111));
//           } catch (error) {
//             console.log(error);
//           }
//         }}
//         style={{ padding: 10, backgroundColor: 'red' }}
//       >
//         <Text style={{ color: 'white' }}>Launch Library</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           isValidVideo(
//             '/Users/macm03/Library/Developer/CoreSimulator/Devices/B4CE4A72-AB9F-42E4-B462-A5F7CB3ECABE/data/Containers/Data/Application/E31069B6-EF6D-4E61-BBCF-0A908F3C98A4/Documents/a.mp4'
//           ).then((res) => console.log(res));
//         }}
//         style={{
//           padding: 10,
//           backgroundColor: 'blue',
//           marginTop: 20,
//         }}
//       >
//         <Text style={{ color: 'white' }}>Check Video Valid</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           listFiles().then((res) => {
//             console.log(res);
//           });
//         }}
//         style={{
//           padding: 10,
//           backgroundColor: 'orange',
//           marginTop: 20,
//         }}
//       >
//         <Text style={{ color: 'white' }}>List Files</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           cleanFiles().then((res) => console.log(res));
//         }}
//         style={{
//           padding: 10,
//           backgroundColor: 'green',
//           marginTop: 20,
//         }}
//       >
//         <Text style={{ color: 'white' }}>Clean Files</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           listFiles().then((res) => {
//             console.log(res);

//             if (res.length) {
//               deleteFile(res[0]!).then((r) => console.log('DELETE:', r));
//             }
//           });
//         }}
//         style={{
//           padding: 10,
//           backgroundColor: 'purple',
//           marginTop: 20,
//         }}
//       >
//         <Text style={{ color: 'white' }}>Delete file</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           setModalVisible(true);
//         }}
//         style={{
//           padding: 10,
//           backgroundColor: 'blue',
//           marginTop: 20,
//         }}
//       >
//         <Text style={{ color: 'white' }}>Open Modal</Text>
//       </TouchableOpacity>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={[styles.container, { backgroundColor: 'gray' }]}>
//           <TouchableOpacity
//             onPress={async () => {
//               const result = await launchImageLibrary({
//                 mediaType: 'video',
//                 assetRepresentationMode: 'current',
//               });

//               isValidVideo(result.assets![0]?.uri || '').then((res) =>
//                 console.log('isValidVideo:', res)
//               );

//               showEditor(result.assets![0]?.uri || '', {
//                 maxDuration: 30,
//                 cancelButtonText: 'hello',
//                 saveButtonText: 'world',
//               })
//                 .then((res) => console.log(res))
//                 .catch((e) => console.log(e, 1111));
//             }}
//             style={{ padding: 10, backgroundColor: 'red' }}
//           >
//             <Text style={{ color: 'white' }}>Launch Library</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               setModalVisible(false);
//             }}
//             style={{
//               padding: 10,
//               backgroundColor: 'blue',
//               marginTop: 20,
//             }}
//           >
//             <Text style={{ color: 'white' }}>Close Modal</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
// });
