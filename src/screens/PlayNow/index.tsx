import React, { FC, useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import _ from 'lodash'

import images from '../../assets/images'
import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import GameModes from '../../components/GameModes'
import { GdText } from '../../components/text/gd-text'
import ScreenNavigation from '../../constants/ScreenNavigation'
import { checkInternetConnection, debugLog, showAlert } from '../../functions/commonFunctions'
import { setSessionData, setUnityPostMessage } from '../../store/actions/SessionActions'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { Colors } from '../../utils/theme'
import { PLAY_NOW_DATA } from './MOCK_PLAY_NOW'
import { styles } from './styles'

interface PlayNowProps {
  navigation: any
  route: any
}

const PlayNow: FC<PlayNowProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()
  const [refresh , setRefresh] = useState(true);
  const IsFocus = useIsFocused()

  useEffect(() => {
    setRefresh(!refresh)
  }, [IsFocus]);

  const callDashboardAPI = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      setLoading(true);
      APICall('get', undefined, EndPoints.dashBoard, false).then
        ((res: any) => {
          debugLog(res);
          setLoading(false);
          if (res?.statusCode !== undefined && res?.statusCode === 200) {
            if (res?.data !== undefined) {
              setData(res?.data);
            }
          }
        });
    } else {
      setVisible(true)
    }
  };

  const callAPIToCreateSession = async (item) => {    
    dispatch(setUnityPostMessage(null))
    const isConnected = await checkInternetConnection();
    if (isConnected) {
        setLoading(true);
        const body = JSON.stringify({
            game_type: item.title,
            sub_game_type: item.desc
        });        
        APICall('post', body, EndPoints.session, false).then
            ((res: any) => {                
                setLoading(false);
                if (res?.data?.data !== undefined && res?.data?.data.length > 0 && res?.statusCode === 200) {                  
                  const sessionId = res?.data?.data[0].user_session_id;
                    const mydata: any = {
                        map: item.map,
                        id: sessionId,
                        game_type: item.title,
                        game_mode: item.game_mode,
                        sub_game_type: item.desc,
                        created_at: new Date().toISOString()
                    };
                    dispatch(setSessionData(mydata));
                    navigation.navigate(ScreenNavigation.screens.Unity, { item: mydata });
                } else {
                    if (res?.data?.message) {
                        showAlert(res?.data?.message);
                    }
                }
            });
    } else {
      setVisible(true);
    }
};



  const renderItems = ({ item, index }: any) => {    
    return (
      <TouchableOpacity
        onPress={() =>
          // index === 0 ?
          // console.log('SelectItem',item)
          navigation.navigate(ScreenNavigation.screens.SelectMap, { item })
          // :callAPIToCreateSession(item)
        }
        style={styles.item}
      >
        <View>
          <Image
            style={[styles.ImagebgCon, styles.imageOverLay]}
            source={item.image}
          />
          <Image
            style={[styles.ImagebgCon, styles.imageOverLay]}
            source={images.play.play_shadow}
          />

          <View style={styles.ImagebgCon} >
            <View style={styles.item_view}>
              <View
                style={[
                  styles.TopCon,
                  { backgroundColor: item.isTarget ? Colors.darkblue : Colors.Pinkdark }
                ]}
              >
                <Image
                  source={item.isTarget ? images.tabs.distance : images.home.calander}
                  tintColor={Colors.white}
                />
                {/* <Text style={styles.TopConText}>{item.desc}</Text> */}
                <GdText style={styles.TopConText} tx={item.desc} />
              </View>
            </View>

            <View style={styles.BottomCon}>
              {/* <Text
                style={
                   styles.TextStyle
                }
                >
                {_.trim(item.title)}
              </Text> */}
              <GdText style={styles.TextStyle} tx={_.trim(item.title)} />

              <Image source={images.tabs.ArrowButtonTopRight} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppGradient />
      <View style={styles.HeaderTop}>
        <GdText style={styles.PlayNowText} tx={"play_now"} />
        <View style={styles.MessageCon}>
          <GameModes />
        </View>
      </View>
      <FlatList data={PLAY_NOW_DATA} renderItem={renderItems}
        contentContainerStyle={styles.listRoot} />
      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={callDashboardAPI} setVisible={setVisible} 
      />
    </SafeAreaView>
  )
}

export default PlayNow
