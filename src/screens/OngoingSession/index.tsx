import React, { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import images from '../../assets/images'
import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Button from '../../components/Button'
import CommonModel from '../../components/CommonModal'
import HeaderSettings from '../../components/HeaderSettings'
import ScreenNavigation from '../../constants/ScreenNavigation'
import Strings from '../../constants/Strings'
import { checkInternetConnection, debugLog } from '../../functions/commonFunctions'
import { setSessionDataDefault } from '../../store/actions/SessionActions'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { Colors } from '../../utils/theme'
import { styles } from './styles'

interface DeatilsProps {
  navigation: any
  route: any
}

const OnGoingSessions = ({ navigation, route }: DeatilsProps) => {
  const [sessionVisible, setSesion] = useState(false)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [totalSwings, setTotalSwings] = useState(0);
  const [page, setPage] = useState(1);   // Current page
  const [visible, setVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  const [endReached, setEndReached] = useState(false);
  
  const dispatch = useDispatch();

  const sessionDetail = useSelector((state: any) => state.SessionReducer);

  const ArrayofDetailes = [
    {
      // img:images.tabs.billing,
      text: 'Game Type',
      times: sessionDetail?.game_type ? sessionDetail?.game_type : ''
    },
    {
      img: images.tabs.distance,
      text: 'Distance to Hole',
      times: sessionDetail?.distance ? sessionDetail?.distance : '0' +' yds'
    },
    {
      img: images.tabs.book,
      text: 'Total Swing',
      times: totalSwings
    },
    {
      img: images.tabs.timer,
      text: 'Time Session',
      times: sessionDetail?.session_time && sessionDetail?.session_time !== null ? sessionDetail?.session_time : '00:00:00'
    }
  ];

  const callSessionDetailAPI = async () => {
    const isConnected = await checkInternetConnection();
    if(isConnected) {
      setLoading(true);
      const body = {
        "session_id": sessionDetail?.id
      };
      APICall('get', body, EndPoints.sessionDetail+"?page="+page, false).then
      ((res: any) => {
        debugLog(res);
        setLoading(false);
        if(res?.statusCode !== undefined && res?.statusCode === 200) {
          if(res?.data !== undefined) {
            const newData = res?.data?.results;
            setData((prevData) => [...prevData, ...newData]); // Append new data to existing data
            setTotalSwings(res?.data?.total_swings);
            if(res?.data?.next === null) {
              setEndReached(true);
            }
          }
        }
      });
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    if(!endReached) {
      callSessionDetailAPI();
    }
  }, [page]);

  const endSessionAPI = async () => {
    const isConnected = await checkInternetConnection();
    if(isConnected) {
      setLoading(true);
        const body = {
            "session_id": sessionDetail?.id
        };
  
        APICall('put', body, EndPoints.endSession, false).then
        ((res: any) => {
          debugLog(res);
          setLoading(false);
          if(res?.statusCode !== undefined && res?.statusCode === 200) {
            dispatch(setSessionDataDefault());
            // navigation.popToTop();
            // navigation.push(ScreenNavigation.screens.Home,{showPopup: true});
            navigation.navigate(ScreenNavigation.screens.Home,
              {
                  showPopup: true
              }
            );
          }
        });
      } else {
        setEndVisible(true);
      }
  };

  const renderItems = ({ item, index }: any) => {
    return (
      <View
        style={[styles.DataCon, {
          backgroundColor: index % 2 !== 0 ? Colors.lightblack : Colors.transparent
           }]}>
        <View style={styles.DataFlatConIn}>
          <Text style={styles.TimeText}>{"#"+item?.id}</Text>
        </View>
        <View style={{ ...styles.DataFlatConIn }}>
          <Text style={styles.YearText}>{item?.carry_distance}</Text>
        </View>
        <View style={styles.DataFlatConIn}>
          <Text style={{ ...styles.YearText }}>{item?.total_distance}</Text>
        </View>
        <View style={styles.DataFlatConIn}>
          <Text style={{ ...styles.YearText }}>{item?.total_deviation_distance}</Text>
        </View>
      </View>
    )
  };

  return (
    <SafeAreaView style={styles.SafeArea}>
      <AppGradient />
      <CommonModel
        isVisible={sessionVisible}
        button={Strings.end_session}
        message={Strings.sessio_message}
        close={() => setSesion(false)}
        onPressButton={async () => {await endSessionAPI();}}>
      </CommonModel>
      
        <HeaderSettings
          title={Strings.my_results}
          onClick={() => {navigation.goBack()}}
          onEndSession={async() => {
            setSesion(true);
          }} signout={false}    
        ></HeaderSettings>
     
      <View style={styles.checkCon}>
        {ArrayofDetailes?.map((item, index) => {
          return (
            <View style={styles.checkConIn} key={index}>
              <Text style={styles.typeText}>{item.text}</Text>
              {item.img ? (
                <View style={styles.imageText}>
                  <Image source={item.img} />
                  <Text style={styles.textTypes}>{item.times}</Text>
                </View>
              ) : (
                <Text style={styles.textTypes2}>{item.times}</Text>
              )}
            </View>
          )
        })}
      </View>
      <View style={styles.NameView}>
        <Text style={styles.SwingsText}>{Strings.YourSwings}{":"}</Text>
        <View style={styles.tileCon}>
        <View style={styles.DataFlatConIn}>
          <Text style={styles.DataText}>{Strings.Swings}</Text>
          </View>
          <View style={styles.DataFlatConIn}>
          <Text style={styles.DataText}>{Strings.Carry}</Text>
          </View>
          <View style={styles.DataFlatConIn}>
          <Text style={styles.DataText}>{Strings.Distance}</Text>
          </View>
          <View style={styles.DataFlatConIn}>
          <Text style={styles.DataText}>{Strings.Deviation}</Text>
          </View>
        </View>

        <FlatList 
          data={data} 
          renderItem={renderItems} 
          showsVerticalScrollIndicator={false}
          onEndReached={() =>{
            setPage(prevPage => prevPage + 1);
          }} // Load more data when end is reached
          contentContainerStyle={styles.bottom}
       />
      </View>
        <Button
          exStyle={styles.ButtonEx}
          onPress={() => {
            navigation.goBack();
          }}
          heading={Strings.return_session} isDisabled={false}></Button>
      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={callSessionDetailAPI} setVisible={setVisible} />
      <AppNoInternetSheet visible={endVisible} onClick={endSessionAPI} setVisible={setEndVisible} />
    </SafeAreaView>
  )
}

export default OnGoingSessions
