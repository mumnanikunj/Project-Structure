import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Reanimated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
  Camera,
  CameraDevice,
  CameraRuntimeError,
  useCameraDevice,
  useCameraFormat,
  VideoFile
} from 'react-native-vision-camera';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/core';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';

import images from '../../assets/images';
import { AppLoader } from '../../components';
import AppNoInternetSheet from '../../components/AppNoInternetSheet';
import Button from '../../components/Button';
import CameraMask from '../../components/CameraMask/CameraMask';
import VideoPlayer from '../../components/VideoPlayerFull';
import ScreenNavigation from '../../constants/ScreenNavigation';
import Strings from '../../constants/Strings';
import { checkInternetConnection, debugLog, showAlert, showToast } from '../../functions/commonFunctions';
import useRecordSound from '../../hooks/useRecordSound';
import { setUnityPostMessage } from '../../store/actions/SessionActions';
import APICall from '../../utils/api/api';
import EndPoints from '../../utils/api/endpoints';
import { dH, dW } from '../../utils/dynamicHeightWidth';
import { Colors } from '../../utils/theme';
import { StartShotOverlay } from './StartShotOverlay';
import { styles } from './style';
import { GdText } from '../../components/text/gd-text';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true
});

const SCALE_FULL_ZOOM = 3;

const cameraPosition = 'front';

export function CameraPage({ navigation, route }: any): React.ReactElement {
  const camera = useRef<Camera>(null);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const device: CameraDevice | undefined = useCameraDevice(cameraPosition)
  const format = useCameraFormat(device, [
    { videoResolution: { width: 540, height: 960 } }
    // { fps: 120 }
  ])
  const zoom = useSharedValue(0);
  const dispatch = useDispatch()
  const insets = useSafeAreaInsets()

  
  // check if camera page is active
  const isFocussed = useIsFocused();
  const isActive = isFocussed;

  const [loading, setLoading] = useState(false);
  const [APIloading, setAPILoading] = useState(false);
  const [media, setMedia] = useState<VideoFile>();
  const [visible, setVisible] = useState(false);
  const [visibleShot, setVisibleShot] = useState(false);
  const [recordedVideoLink, setRecordedVideoLink] = useState<string | null>(null)

  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, 2);

  const [isRecording, setIsRecording] = useState(false);
  const [isTimer, setTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(5);
  const timerRef = useRef(timerSeconds);

  const [recordTime, setRecordTime] = useState(3);
  const recordTimerRef = useRef(recordTime);

  const neutralZoom = device?.neutralZoom ?? 1;

  const { playSound } = useRecordSound();

  useEffect(() => {
    // Run everytime the neutralZoomScaled value changes. (reset zoom when device changes)
    zoom.value = neutralZoom;
  }, [neutralZoom, zoom]);

  useEffect(() => {
    Camera.requestCameraPermission().then(status => { debugLog(status) });
    Camera.requestMicrophonePermission();    
    // Camera.getMicrophonePermissionStatus()
    //   .then((status) =>
    //     setHasMicrophonePermission(status === "authorized"));
  }, []);

  const startRecordingWithTimer = () => {
    setTimer(false); // Reset recording status if already recording
    setTimerSeconds(5); // Reset the timer duration if needed
    setTimer(true);
    playSound(images.audio.record_audio)
    const timerInterval = setInterval(() => {
      setTimerSeconds((prevSeconds) => {
        timerRef.current = prevSeconds;
        return prevSeconds - 1;
      });
      if (timerRef.current === 1) {
        // When the timer reaches 1 second, start recording
        clearInterval(timerInterval);
        startRecording(); // Your recording function
        setTimer(false);
      }
    }, 1000); // Update the timer every 1 second
  };

  const sessionDetail = useSelector((state: any) => state.SessionReducer);

  const cameraAnimatedProps = useAnimatedProps(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
    return {
      zoom: z
    };
  }, [maxZoom, minZoom, zoom]);
  // #endregion

  // Camera callbacks
  const onError = useCallback((error: CameraRuntimeError) => {
    debugLog(error);
  }, []);

  const flipVideo = async (inputUri: string) => {
    setLoading(true);
    const outPutPath = inputUri.substring(0, inputUri.lastIndexOf('/'));
    const outputUri = outPutPath + '/OUTPUT' + new Date().getTime().toLocaleString() + '.mp4';
    const command = `-i ${inputUri} -vf "hflip" ${outputUri}`;
    try {
      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();
      if (ReturnCode.isSuccess(returnCode)) {
        // SUCCESS
        setLoading(false);
        return outputUri;
      } else if (ReturnCode.isCancel(returnCode)) {
        // CANCEL
        setLoading(false);
        return "";
      } else {
        // ERROR
        setLoading(false);
        return "";
      }
    } catch (error) {
      debugLog('Error processing video:', error);
      setLoading(false);
      return "";
    }
  };

  const onMediaCaptured = useCallback(
    async (media: VideoFile) => {
      debugLog(`Media captured! ${JSON.stringify(media)}`);
      if (Platform.OS === "android" && cameraPosition === "front") {
        const newPath = await flipVideo(media.path);
        if (newPath !== "") {
          media.path = newPath;
        }
        debugLog("flipped path = ", media.path)
        setMedia(media);
        uploadVideoAndGetData(media);
      } else {
        setMedia(media);
        uploadVideoAndGetData(media);
      }
    },
    []
  );

  const onPinchGesture = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent, { startZoom?: number }>({
    onStart: (_, context) => {
      context.startZoom = zoom.value;
    },
    onActive: (event, context) => {
      // we're trying to map the scale gesture to a linear zoom here
      const startZoom = context.startZoom ?? 0;
      const scale = interpolate(event.scale, [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM], [-1, 0, 1], Extrapolate.CLAMP);
      zoom.value = interpolate(scale, [-1, 0, 1], [minZoom, startZoom, maxZoom], Extrapolate.CLAMP);
    }
  });
  // #endregion

  const onStoppedRecording = useCallback(() => {
    setIsRecording(false);
    setLoading(false);
    debugLog('stopped recording video!');
  }, []);

  const stopRecording = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      await camera.current.stopRecording()
    } catch (e) {
      debugLog('failed to stop recording!', e);
    }
  }, [camera]);

  const startRecording = useCallback(() => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');

      debugLog('calling startRecording()...');
      camera.current.startRecording({
        onRecordingError: (error) => {
          debugLog('Recording failed!', error);
          onStoppedRecording();
        },
        onRecordingFinished: (video) => {
          debugLog(`Recording successfully finished! ${video.path}`);
          onMediaCaptured(video);
          onStoppedRecording();
        }
      });
      setIsRecording(true);
      setRecordTime(3); // Reset the timer duration if needed
      const timerInterval = setInterval(() => {
        setRecordTime((prevSeconds) => {
          recordTimerRef.current = prevSeconds;
          return prevSeconds - 1;
        });
        if (recordTimerRef.current === 1) {
          // When the timer reaches 1 second, stop recording
          clearInterval(timerInterval);
          stopRecording(); // stop recording function
        }
      }, 1000); // Update the timer every 1 second
    } catch (e) {
      debugLog('failed to start recording!', e);
    }
  }, [onMediaCaptured, onStoppedRecording, stopRecording]);

  const uploadVideoAndGetData = async (media: any) => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      if (media !== undefined) {
        const uri = media?.path;
        const name = media?.path.substring(media.path.lastIndexOf('/') + 1);
        const type = 'video/mp4';

        const formData = {
          'file': {
            uri: Platform.OS === 'android' ? decodeURI(uri) : decodeURI(uri),
            name,
            type
          },
          "session_id": sessionDetail?.id,
          "club_type": route?.params?.club_type,
        };
        console.log("formData.S. ", formData)
        setAPILoading(true);
        setRecordedVideoLink(formData.file.uri)
        APICall('post', formData, EndPoints.video_simulate, true).then(async (res: any) => {
          setAPILoading(false);
          setRecordedVideoLink(null)
          console.log("Simulate Result => ", res.data)
          if (res !== undefined) {
            if (res.data.statusCode === 200) {
              dispatch(setUnityPostMessage(res.data.data))
              setTimeout(() => {
                navigation.goBack()
              }, 500);
              // navigation.navigate(ScreenNavigation.screens.Unity, { data: res.data.data });
            } else if (res.data.statusCode === 502) {
              showAlert('Server Error. Please try again.')
            } else if (res.data.statusCode === 422) {
              showAlert(res?.data?.message);
            }
          } else {
            // showAlert(res?.data?.errors?.message);
          }
        }).catch(e => {
          setRecordedVideoLink(null)
        });
      }
    } else {
      setVisible(true);
    }
  };

  // const onFlipCameraPressed = useCallback(() => {
  //   setCameraPosition((p) => (p === 'back' ? 'front' : 'back'))
  // }, [])

  const checkIfFreeShotAvailable = async () => {
    startRecordingWithTimer();
  };

  const STATUSBAR_HEIGHT = insets.top;

  return (
    <View style={[styles.container, {
      backgroundColor: isTimer ? Colors.black50 : Colors.transparent
    }]}>

      {device != null && (
        <GestureHandlerRootView style={styles.container}>
          <PinchGestureHandler onGestureEvent={onPinchGesture} enabled={isActive}>
            <Reanimated.View style={StyleSheet.absoluteFill}>
              <ReanimatedCamera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={isActive}
                onError={onError}
                format={format}
                enableZoomGesture={false}
                animatedProps={cameraAnimatedProps}
                photo
                video
                audio={hasMicrophonePermission}
                orientation={"portrait"}
              />
            </Reanimated.View>
          </PinchGestureHandler>
        </GestureHandlerRootView>
      )}
      {!isTimer && <View style={[styles.targetDataRoot, { paddingTop: STATUSBAR_HEIGHT + dH(10) }]}>        
        <GdText style={styles.txtTargetDistance} tx={'targetDistance'}/>
        <Text style={styles.txtTargetValue}>{Strings.value_yards.replace("$1", route?.params?.target_distance)}</Text>
      </View>}
      <View style={styles.captureButton}>
        {(!isRecording && !isTimer) ? <Button
          exStyle={{ marginBottom: dH(16), marginTop: dH(16) }}
          heading={'Start Recording'}
          onPress={() => { checkIfFreeShotAvailable() }} isDisabled={false} /> : null}
      </View>
      {/* <View style={styles.rightButtonRow}> 
          <TouchableOpacity style={styles.button} onPress={onFlipCameraPressed} activeOpacity={0.4}>
            <IonIcon name={"camera-reverse"} color={"white"} size={24} />
          </TouchableOpacity>
      </View>  */}
      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={() => {
        uploadVideoAndGetData(media)
      }} />

      {isTimer && <StartShotOverlay
        target_distance={route?.params?.target_distance} />}

      {/* {isTimer &&
        <View style={styles.mastRoot}>
          <CameraMask
            target_distance={route.params.target_distance}
            topMargin={STATUSBAR_HEIGHT}
          />
          <View style={{
            ...styles.btnCloseRoot,
            paddingTop: STATUSBAR_HEIGHT
          }}>
            <TouchableOpacity style={styles.button} onPress={() => {
              navigation.goBack()
            }} >
              <Image
                style={{ height: dH(24), width: dW(24) }}
                source={images.cross}
                resizeMode={"contain"} />
            </TouchableOpacity>
          </View>
        </View>
      } */}

      {recordedVideoLink && <VideoPlayer
        source={{ uri: recordedVideoLink }}
        onEnd={() => { }}
      />}

      {loading || APIloading && <AppLoader />}

      {!isTimer && <View style={[styles.backButton, { top: STATUSBAR_HEIGHT + (isTimer ? 0 : 32) }]}>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.goBack() }} hitSlop={20}>
          <Image
            style={styles.imageClose}
            source={images.cross}
            resizeMode={"contain"} />
        </TouchableOpacity>

      </View>}


      <AppNoInternetSheet visible={visibleShot} onClick={() => {
        checkIfFreeShotAvailable();
      }} />
    </View>
  );
}