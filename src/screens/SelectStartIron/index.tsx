import React, { FC, useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { Camera } from 'react-native-vision-camera';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import images from '../../assets/images'
import { AppLoader } from '../../components';
import AppNoInternetSheet from '../../components/AppNoInternetSheet';
import BottomDistance from '../../components/Bottom_distancs'
import BottomClub from '../../components/BottomClub'
import Button from '../../components/Button'
import Header from '../../components/Header'
import ScreenNavigation from '../../constants/ScreenNavigation'
import { checkInternetConnection, debugLog, showAlert } from '../../functions/commonFunctions'
import { setSessionData, setUnityPostMessage } from '../../store/actions/SessionActions';
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'
import { styles } from './styles'

interface SelectStartIcronProps {
  navigation: any
  route: any
}

const SelectStartIcron: FC<SelectStartIcronProps> = ({ navigation, route }) => {
  const [pos, setPos] = useState(0)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [distance, setDistance] = useState("100")
  const [visible, setVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);

  const dispatch = useDispatch();

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
            const activeClubs: any[] = [];
            all_data.forEach((element: any) => {
              if (element.is_active) {
                activeClubs.push(element);
              }
            });
            setData(activeClubs);
          }
        });
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    callClubListAPI();

    Camera.requestCameraPermission();
    Camera.requestMicrophonePermission();
  }, []);

  function capitalizeWords(inputString) {
    // Split the string into an array of words
    let words = inputString.split(' ');
    // Capitalize the first letter of each word and make the rest lowercase
    let capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    // Join the words back into a string
    let resultString = capitalizedWords.join(' ');
    return resultString;
}


  const callAPIToCreateSession = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      setLoading(true);
      const body = JSON.stringify({
        game_type: route.params.item.title,
        sub_game_type: route.params.item.desc,
        distance
      });


      APICall('post', body, EndPoints.session, false).then
        ((res: any) => {
          debugLog(res);
          setLoading(false);
          if (res?.data?.data !== undefined && res?.data?.data.length > 0 && res?.statusCode === 200) {
            const sessionId = res?.data?.data[0].user_session_id;
            const mydata: any = {
              id: sessionId,
              game_type: route.params.item.title,
              sub_game_type: route.params.item.desc,
              distance,
              created_at: new Date().toISOString(),
              club: data[pos]?.club_type === "PW"? "PW": capitalizeWords(data[pos]?.club_type)
            };
            console.log("SessionMessage ", mydata)
            dispatch(setSessionData(mydata));
            // navigation.navigate(ScreenNavigation.screens.Camera);
            navigation.navigate(ScreenNavigation.screens.Unity, { item: mydata });

          } else {
            if (res?.data?.message) {
              showAlert(res?.data?.message);
            }
          }
        });
    } else {
      setAddVisible(true);
    }
  };

  const renderItems = ({ item, index }: any) => {
    return (
      <TouchableOpacity onPress={() => setPos(index)}>
        <View style={[styles.IronConFlatList, pos !== index ? styles.border_less : styles.border]}>
          <Text style={[styles.iron_text, { color: pos !== index ? Colors.white : Colors.green }]}>
            {item.club_type.split(" ")[0]}
          </Text>
          {item.club_type.split(" ").length > 1 ? <Text
            style={[
              styles.iron_text,
              { fontSize: 18 },
              { color: pos !== index ? Colors.white : Colors.green }
            ]}
          >
            {item.club_type.split(" ")[1]}
          </Text> : null}
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.mainView}>
      <FastImage
        style={styles.TopHeaderImage}
        source={
          route?.params?.item?.image ? {
            uri: route?.params?.item?.image,
            priority: FastImage.priority.normal
          }
            : images.tabs.PlayGolfImage
        }
        fallback
        defaultSource={images.tabs.PlayGolfImage}
        resizeMode={FastImage.resizeMode.cover}
      >
        <Header isBack heading={'How to Play'} onClick={() => {
          navigation.goBack();
        }} isLogo={false} />
        <View
          style={[
            styles.TopCon,
            {
              backgroundColor:
                route?.params?.item?.desc !== 'Daily Challenges' ? Colors.darkblue : Colors.Pinkdark
            }
          ]}
        >
          <Image
            source={
              route?.params?.item?.desc !== 'Daily Challenges' ? images.tabs.distance : images.home.calander
            }
            tintColor={Colors.white}
          />
          <Text style={styles.TopConText}>{route?.params?.item?.desc}</Text>
        </View>
        <Text style={styles.YearText}>{moment(new Date()).format('MMMM D, yyyy')}</Text>
      </FastImage>
      <LinearGradient colors={[Colors.lightblack, Colors.fonApp, Colors.fonApp]} style={{ flexGrow: 1 }}>

        <Text style={styles.DistanceText}>{_.get(route?.params, "item.title", " ")}</Text>

        <BottomDistance editable={route?.params?.item?.desc !== 'Daily Challenges'} setDistance={setDistance}></BottomDistance>

        <View style={styles.HeaderTop}>
          <Text style={styles.PlayNowText}>{'Select your start iron'}</Text>

          <BottomClub></BottomClub>
        </View>
        <View style={{ marginHorizontal: dW(16) }}>
          <FlatList data={data} renderItem={renderItems} horizontal showsHorizontalScrollIndicator={false} />
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity style={styles.play_view} onPress={() => { navigation.navigate(ScreenNavigation.screens.playScreen) }}>
            <Image style={styles.how_play} source={images.home.vector}></Image>
            <Text style={styles.KindGameText}>{'How to play?'}</Text>
          </TouchableOpacity>

          <Button
            exStyle={{ marginBottom: dH(16), marginTop: dH(16) }}
            heading={'Start Session'}
            onPress={async () => {
              dispatch(setUnityPostMessage(null))
              await callAPIToCreateSession();
              // navigation.navigate(ScreenNavigation.screens.Unity, { item: route?.params?.item });

            }} isDisabled={false} />
        </View>
      </LinearGradient>
      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={callClubListAPI} setVisible={setVisible} />
      <AppNoInternetSheet visible={addVisible} onClick={callAPIToCreateSession} setVisible={setAddVisible} />

    </View>
  )
}

export default SelectStartIcron
