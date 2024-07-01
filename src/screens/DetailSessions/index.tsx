import React, { FC, useEffect, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import _ from 'lodash'
import moment from 'moment'

import { AppLoader } from '../../components'
import AppGradient from '../../components/AppGradient'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Header from '../../components/Header'
import { callSessionDetailAPI } from '../../utils/api/sessionapi'
import { getSessionDetailObj } from '../../utils/utils'
import { DetailSessionListView } from './DetailSessionList'
import { DetailSessionsOverview } from './DetailSessionsOverview'
import { styles } from './styles'

interface DeatilsProps {
  navigation: any
  route: any
}

const DetailSessions: FC<DeatilsProps> = ({ navigation, route }: DeatilsProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [headerData, setHeaderData] = useState({});
  const [page, setPage] = useState(1);

  const [endReached, setEndReached] = useState(false);
  const sessionDetail = route?.params?.sessionDetail;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!endReached) {
      getSessionDetail();
    }
  }, [page]);


  const getSessionDetail = async () => {
    setLoading(true)
    const responseData: any = await callSessionDetailAPI(false, sessionDetail?.id, page);
    setLoading(false)
    if (responseData) {
      setData(responseData.swings)
      setHeaderData(responseData.stats)
    }
  };

  return (
    <SafeAreaView style={styles.SafeArea}>
      <AppGradient />
      <Header
        isBack heading={"Session Details"}
        onClick={() => navigation.goBack()}
        isLogo={false} />

      <View style={styles.TimeView}>
        <Text style={styles.YearTimeText}>{moment(sessionDetail?.created_at).format('MMMM DD, yyyy')}</Text>
        <Text style={styles.TimeTextHeader}>{moment(sessionDetail?.created_at, moment.ISO_8601).format('hh:mm A')}</Text>
      </View>

      <DetailSessionsOverview
        isUnity={false}
        ArrayofDetailes={getSessionDetailObj(headerData)}
      />
      <DetailSessionListView
        data={data}
        onEndReach={() => setPage(prevPage => prevPage + 1)}
      />

      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={callSessionDetailAPI} setVisible={setVisible} />
    </SafeAreaView>
  )
}

export default DetailSessions
