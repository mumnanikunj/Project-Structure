/* eslint-disable no-case-declarations */

import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { showMessage } from "react-native-flash-message";
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
// import UnityView from '@azesmway/react-native-unity';
import { useIsFocused } from '@react-navigation/native';
import _ from 'lodash';

import fonts from '../../assets/fonts';
import { AppLoader } from '../../components';
import AppNoInternetSheet from '../../components/AppNoInternetSheet';
import { DeviationFeedback } from '../../components/DeviationFeedback';
import ScreenNavigation from '../../constants/ScreenNavigation';
import { checkInternetConnection, debugLog } from '../../functions/commonFunctions';
import { changeClub, setUnityPostMessage } from '../../store/actions/SessionActions';
import APICall from '../../utils/api/api';
import EndPoints from '../../utils/api/endpoints';
import { actualDeviceSize, dW } from '../../utils/dynamicHeightWidth';
import { Colors } from '../../utils/theme';
import { ChangeIronUnity } from './ChangeIronUnity';
import { SessionResultUnity } from './SessionResultUnity';
import { IStartSession, IVideoResult, SendEventToUnityType } from './unityviewscreen.props';

function UnityViewScreen({ navigation, route }: any) {
  const unityPostMessage = useSelector((state: any) => state.SessionReducer.unityPostMessage);
  const unityRef = useRef(null);
  const refIronChange = useRef<RBSheet>(null)
  const refSessionResult = useRef<RBSheet>(null)
  const isFocussed = useIsFocused()
  const refMyResult = useRef(null);
  const refFeedbackSheet = useRef<RBSheet>(null);
  const sessionId = route?.params?.item.id

  const [page, setPage] = useState(1);
  const [swingId, setSwingId] = useState<number>(0)
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isScreenInit, setScreenInit] = useState<boolean>(false)
  const [clubType, setClubType] = useState<string>('8 Iron')

  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const bottomSheetRef = useRef<RBSheet>();

  useEffect(() => {

    return () => {
      unityRef.current?.unloadUnity()
    }
  }, [])

  useEffect(() => {
    callClubListAPI();
    setTimeout(() => {
      setScreenInit(true)
      setScreenLoading(false)
    }, 500);
  }, [])


  useEffect(() => {
    if (unityRef != null && !screenLoading) {
      if (isFocussed) {
        unityRef.current?.resumeUnity()
      } else {
        unityRef.current?.pauseUnity(true)
      }
    }
    if (unityPostMessage != null) {
      setSwingId(unityPostMessage.swing_id)
      setTimeout(() => {
        setEvent('stop_camera')
        setEvent('result', unityPostMessage)
      }, 1000);
    }
  }, [isFocussed])

  const callClubListAPI = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      setLoading(true);
      APICall('get', undefined, EndPoints.clubs, false).then
        ((res: any) => {
          debugLog(res);
          setLoading(false);
          if (res?.statusCode === 200) {
            const all_data = res?.data?.data;
            setData(all_data);
            // const activeClubs: any[] = [];
            // all_data.forEach((element: any) => {
            //   if (element.is_active) {
            //     activeClubs.push(element);
            //   }
            // });
          }
        });
    } else {
      setVisible(true);
    }
  };

  const callAPIUpdateSwing = async (data: any) => {
    if (swingId < 0) return
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      APICall('post', {
        swing_id: swingId,
        unity_attributes: data
      }, EndPoints.updateSwing, false).then
        ((res: any) => { debugLog("UpdateSwing=> " + res); });
    }
  };

  // const callAPISwingList = async (data) =>{

  // }



  useEffect(() => {
    const unsubscribe =
      () => navigation.addListener('focus', () => {
        // callClubListAPI();
        // setScreenLoading(true);
        // setTimeout(() => {
        //   setScreenLoading(false);
        // }, 500);
      });
    return unsubscribe()
  }, [navigation]);

  useEffect(() => {
    console.log("SessionId = ", sessionId)
    setTimeout(() => {
      const data = route?.params?.item
      console.log("Data Session ", data)
      if (unityRef?.current && unityRef?.current !== null) {
        const message: IStartSession = {
          gameMode: data.game_mode,
          type: 'startSession',
          map: data.map,
          clubType: '8 Iron',
          GameObject: 'ReactEventsController',
          Method: 'HandleReceiveStartSession'
        };
        setEvent('startSession', message)
        setEvent('close_sheet', "")
      }
    }, 4000);
  }, [route?.params?.data]);

  const sendFeedback = async (request: any, isThumbUp: boolean) => {
    const isConnected = await checkInternetConnection()
    if (isConnected) {
      const body = JSON.stringify({
        swing_id: swingId,
        feedback: { thumbs_up: `${isThumbUp}`, ...request }
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
            } else if (res?.statusCode === 404) {
              Alert.alert('Somthing want wrong')
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

  const setEvent = (type: SendEventToUnityType, data?: any) => {
    if (_.isEmpty(data) || unityRef?.current == null) return;
    debugLog("----")
    debugLog("SendEvent " + type + "\nData" + JSON.stringify(data))
    debugLog("----")
    switch (type) {
      case 'close_sheet':
        unityRef.current.postMessage("ReactEventsController", "ReactEventsController", JSON.stringify({
          type: 'reactPanelClosed',
          result: 'closed'
        }));
        break
      case 'startSession':
        unityRef.current.postMessage(data.GameObject, data.Method, JSON.stringify(data));
        break;
      case 'stop_camera':
        unityRef.current.postMessage('ReactEventsController', 'HandleReceiveMessage', 'stop_camera');
        break;
      case 'changeClub':
        setClubType(data.clubType)
        unityRef.current.postMessage('ReactEventsController', 'HandleReceiveClubChange', JSON.stringify(data));
        break;
      case 'result':
        const resultData = data.flight_attributes
        const message: IVideoResult = {
          "type": "result",
          "apexHeight": resultData.apex_height,
          "carryDeviation": resultData.carry_deviation,
          "carryDistance": resultData.carry_distance,
          "clubSpeed": resultData.club_speed,
          "totalDistance": resultData.total_distance,
          "totalDeviationDifference": resultData.total_deviation_diff,
          "launchAngle": resultData.launch_angle,
          "launchDirection": resultData.launch_direction,
          "shotType": resultData.shot_type,
          "totalDeviationDiff": resultData.total_deviation_diff,
          "totalDistanceDiff": resultData.total_distance_diff,
          "swingNumber": data.swing_number
        }
        console.log("SentToUnity Result - ", message)
        unityRef.current.postMessage('ReactEventsController', 'HandleSwingResults',
          JSON.stringify(message));
        dispatch(setUnityPostMessage(null))
        break
      default:
        break;
    }
  }

  return (
    <View style={styles.main}>
      <StatusBar hidden />
      {screenLoading ? (
        <AppLoader />
      ) : (
        <View style={{
          height: actualDeviceSize.height,
          width: actualDeviceSize.width
        }}>
          {/* <UnityView
            fullScreen={false}
            ref={unityRef}
            style={styles.main}
            onUnityMessage={result => {
              console.log("----")
              debugLog('onUnityMessage', result.nativeEvent.message);
              console.log("----")
              let unitJson = { type: "" };
              try {
                unitJson = JSON.parse(result.nativeEvent.message)
              } catch (error) {
                unitJson.type = result.nativeEvent.message
              }
              if (unitJson.type === 'SessionDetails') {
                // navigation.push(ScreenNavigation.screens.OngoingSession);
              } else if (unitJson.type === 'IronSelection') {
                bottomSheetRef.current?.open();
              } else if (unitJson.type === 'startCamera') {
                navigation.navigate(ScreenNavigation.screens.Camera, {
                  target_distance: _.round(unitJson.targetDistance),
                  club_type: clubType
                });
              } else if (unitJson.type === 'OnClickBack') {
                navigation.goBack();
              } else if (unitJson.type === 'viewSessionResults') {
                refSessionResult.current.open()
                // setTimeout(() => {
                refMyResult.current.fetchSession(sessionId, 1)
                // }, 150);
              } else if (unitJson.type === 'selectClubType') {
                refIronChange.current?.open()
              } else if (unitJson.type === 'shotResult') {
                callAPIUpdateSwing(unitJson)
              } else if (unitJson.type === 'shotFeedback' && unitJson.feedback === "thumbsDown") {
                refFeedbackSheet.current?.open()
              } else if (unitJson.type === 'shotFeedback' && unitJson.feedback === "thumbsUp") {
                sendFeedback({}, true)
              }
            }}
          /> */}
        </View>)}

      <ChangeIronUnity
        data={data}
        swingId={swingId}
        bottomSheetRef={refIronChange}
        onChangeIron={(item: any) => {
          console.log("data. ", item)
          dispatch(changeClub(item.club_type));
          setEvent('changeClub', {
            clubType: item.club_type
          })
          refIronChange.current?.close()
          setEvent('close_sheet', "");
          // unityRef?.current?.pauseUnity();
          // navigation.navigate(ScreenNavigation.screens.Camera);
        }}
      />
      <DeviationFeedback
        bottomSheetRef={refFeedbackSheet}
        onSave={(data => {
          refFeedbackSheet.current?.close()          
          sendFeedback(data, false)
        })}
      />
      <SessionResultUnity
        ref={refMyResult}
        isUnity
        onEndReach={() => setPage(prevPage => prevPage + 1)}
        bottomSheetRef={refSessionResult} />

      <AppNoInternetSheet visible={visible} onClick={() => {
        callClubListAPI()
      }} setVisible={setVisible} />
    </View>
  );
}

export default UnityViewScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: actualDeviceSize.height,
    backgroundColor: Colors.black50,
    width: actualDeviceSize.width
  },
  IronConFlatList: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: dW(30),
    paddingVertical: dW(15),
    marginRight: 10,
    borderWidth: 1,
    marginTop: 20,
    height: 100,
    width: 120
  },
  border_less: {
    borderColor: Colors.gray
  },
  border: {
    borderColor: Colors.green
  },
  iron_text: {
    fontSize: 32,
    fontFamily: fonts.medium,
    fontWeight: '400'
  },
  iron_text_club: {
    fontSize: 18
  }
})
