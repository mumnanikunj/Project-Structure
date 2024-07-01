import React, { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import _ from 'lodash'
import moment from 'moment'

import images from '../../assets/images'
import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import HeaderSettings from '../../components/HeaderSettings'
import ScreenNavigation from '../../constants/ScreenNavigation'
import { checkInternetConnection, debugLog } from '../../functions/commonFunctions'
import en from '../../locales/en'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { Colors } from '../../utils/theme'
import { SessionResultUnity } from '../Unity/SessionResultUnity'
import { styles } from './styles'
import { GdText } from '../../components/text/gd-text'

export default function Sessions({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);   // Current page
  const [totalSessions, setTotalSession] = useState(0);
  const [visible, setVisible] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const sessionDetail = useSelector((state: any) => state.SessionReducer);
  const refMyResult = useRef(null);
  const refSessionResult = useRef<RBSheet>(null)

  const [processedData, setProcessedData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      // const isSessionEnded = _.size(_.get(sessionDetail, "id", "")) > 0
      // if (isSessionEnded) {
      //   callSessionsAPI()
      // }
      setData([]);
      setProcessedData([]);
      setTotalSession(0);
      setTimeout(() => {
        callSessionsAPI()
      }, 100);
    }, [])
  );

  useEffect(() => {
    if (!endReached && page > 1) {
      callSessionsAPI();
    }
  }, [page]);

  const callSessionsAPI = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      setLoading(true);
      APICall('get', undefined, EndPoints.sessionList + "?page=" + page, false).then
        ((res: any) => {
          debugLog(res);
          setLoading(false);
          if (res?.statusCode !== undefined && res?.statusCode === 200) {
            if (res?.data !== undefined) {
              const newData = res?.data?.results;
              const swingArray = _.reverse([...data, ...newData] || [])
              setData(swingArray);
              setProcessedData(swingArray);
              setTotalSession(_.size(swingArray));
              if (res?.data?.next === null) {
                setEndReached(true);
              }
            }
          }
        });
    } else {
      setVisible(true);
    }
  };

  const onPressSession = async (item) => {
    refSessionResult.current.open()
    refMyResult.current.fetchSession(item.id, 1, false)
    // refSessionResult.current.open()
  }

  const renderItems = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={[styles.DataFlatCon, { backgroundColor: index % 2 !== 0 ? Colors.darkGreen : Colors.transparent }]}
        onPress={() => onPressSession(item)}>
        <View style={styles.DataFlatConIn}>
          <Text style={styles.YearText}>{moment(item?.created_at).format('MMMM DD, yyyy')}</Text>
          <View style={{}}>
            <Text style={styles.TimeText}>{moment(item?.created_at, moment.ISO_8601).format('hh:mm A')}</Text>
          </View>
        </View>
        <View style={{ ...styles.DataFlatConIn }}>
          <View style={styles.DotMainView}>
            {item?.sub_game_type !== 'Daily Challenges' ? (
              <Image source={images.tabs.blue} style={styles.BlueDotImage} />
            ) : (
              <Image source={images.tabs.pink} style={styles.PinkDotImage} />
            )}
            <View style={styles.ViewRange}>
              <Text style={styles.YearText}>{item?.game_type}</Text>
              <Text style={styles.TimeText}>{item?.sub_game_type}</Text>
            </View>
          </View>
        </View>

        {/* <View style = {styles.DataFlatConIn}> */}
        <Text style={{ ...styles.YearText }}>{item?.distance}</Text>
        {/* </View> */}
      </TouchableOpacity>
    )
  };

  const sortData = (item: string) => {
    if (item === "Most Recent") {
      const sortedArray = [...data].sort((a, b) => { return new Date(b?.created_at) - new Date(a?.created_at) });
      setProcessedData(sortedArray);
    } else {
      const sortedArray = [...data].sort((a, b) => { return new Date(a?.created_at) - new Date(b?.created_at) });
      setProcessedData(sortedArray);
    }
  };

  const filterData = (item: string) => {
    if (item === "All") {
      setProcessedData(data);
    } else {
      const filteredData = [...data].filter((a) => { return a?.game_type === item });
      setProcessedData(filteredData);
    }
  };

  return (
    <SafeAreaView style={styles.SafeArea}>
      <AppGradient />
      <HeaderSettings title={"my_sessions"} signout={false} onClick={undefined} onEndSession={undefined} />


      <View style={styles.TotalSessionnCon}>
        {/* <Text style={styles.TotalSessionsText}>{'Total Sessions'}</Text> */}
        <GdText style={styles.TotalSessionsText} tx={"total_sessions"} />
        <Text style={styles.TotalNumberText}>{_.toNumber(totalSessions || '0')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ScreenNavigation.screens.playNow)}>
          <Image source={images.tabs.AddNewSessions} style={styles.AddNewSessionsImage} resizeMode={"contain"} />
        </TouchableOpacity>
      </View>
      {/* <View style={{ ...styles.TotalSessionnCons }}>
        <SelectDropdown
          data={["Most Recent", "Oldest"]}
          buttonStyle={styles.SelectDropDown}
          buttonTextStyle={styles.DropDownbuttonText}
          defaultButtonText={en.T109}
          renderDropdownIcon={() => {
            return <Image source={images.tabs.dropdown} />
          }}
          onSelect={(item) => {
            sortData(item);
          }}
          dropdownStyle={styles.dropDownStyle} />
        <SelectDropdown
          data={["All", "Free Play", "Iron Shot"]}
          buttonStyle={styles.SelectDropDown}
          buttonTextStyle={styles.DropDownbuttonText}
          defaultButtonText={en.T110}
          renderDropdownIcon={() => {
            return <Image source={images.tabs.dropdown} />
          }}
          onSelect={(item) => {
            filterData(item);
          }}
          dropdownStyle={styles.dropDownStyle} />
      </View> */}
      <View style={styles.DataCon}>
        {/* <Text style={styles.DataText}>{en.T111}</Text> */}
        <GdText style={styles.DataText} tx={"date"} />
        {/* <Text style={styles.DataText}>{en.T112}</Text> */}
        <GdText style={styles.DataText} tx={"game"} />
      </View>
      <FlatList
        data={processedData}
        renderItem={renderItems}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          // setPage(prevPage => prevPage + 1);
        }} // Load more data when end is reached
      />
      <SessionResultUnity
        ref={refMyResult}
        isUnity={false}
        onEndReach={() => setPage(prevPage => prevPage + 1)}
        bottomSheetRef={refSessionResult} />

      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={callSessionsAPI} setVisible={setVisible} />
    </SafeAreaView>
  )
}
