/* eslint-disable react-hooks/rules-of-hooks */
import React, {FC, useState} from 'react'
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import {Portal} from '@gorhom/portal'
import {useNavigation} from '@react-navigation/native'

import fonts from '../../assets/fonts'
import {AppLoader} from '../../components'
import ComponentStyle from '../../components/ComponentStyle'
import { GdText } from '../../components/text/gd-text'
import {callSessionDetailAPI} from '../../utils/api/sessionapi'
import {actualDeviceSize, dH, dW} from '../../utils/dynamicHeightWidth'
import {Colors} from '../../utils/theme'
import {CommonStyles} from '../../utils/theme/commonStyle'
import {getSessionDetailObj} from '../../utils/utils'
import {DetailSessionsOverview} from '../DetailSessions/DetailSessionsOverview'
import {UnitySwingVideo} from './UnitySwingVideo'
import {ISessionResultUnity} from './unityviewscreen.props'

export const SessionResultUnity: FC<ISessionResultUnity> = React.forwardRef((props, ref) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [swingResult, setSwingResult] = useState({})
  const [selectedVideoData, setVideoData] = useState('')
  const navigation = useNavigation()
  const fetchSession = (sessionId: string, page: number, isActive = true) => {
    getSessionDetail(sessionId, page, isActive)
  }

  React.useImperativeHandle(ref, () => ({fetchSession}))

  const getSessionDetail = async (sessionId: string, page: number,isActive: boolean) => {
    setLoading(true)
    const responseData: any = await callSessionDetailAPI(isActive, sessionId, page)
    setLoading(false)
    if (!responseData.error) {
      setSwingResult(responseData)
    }
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // props?.bottomSheetRef?.current?.open()
      setVideoData('')
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation])

  React.useEffect(() => {
    if (selectedVideoData) {
      navigation.navigate('ShotPreview', {
        Data: {...selectedVideoData, swingId: props.swingId}
      })
    }
  }, [selectedVideoData])

  return (
    <Portal>
      <RBSheet
        height={actualDeviceSize.height - dH(90)}
        openDuration={550}
        closeonDrag
        // onClose={() => CloseRBSheet()}
        ref={props.bottomSheetRef}
        closeOnDragDown
        closeOnPressMask
        customStyles={{
          container: CommonStyles.bottomSheetContainer,
          wrapper: CommonStyles.bottomSheetWrapper,
          draggableIcon: CommonStyles.bottomSheetIcon
        }}
      >
        <ScrollView>
          <TouchableOpacity activeOpacity={1}>
            <View style={ComponentStyle.bottom_shett_view}>              
              <GdText style={[ComponentStyle.text_h1, styles.txtTitle]} tx={'my_results'}/>
              <DetailSessionsOverview
                ArrayofDetailes={getSessionDetailObj(swingResult.stats)}
                isUnity={props.isUnity}
              />
              <GdText style={styles.SwingsText} tx={'YourSwings'}/>              
              <UnitySwingVideo
                swingId={props.swingId}
                data={swingResult}
                onSelectVideo={setVideoData}
                setLoading={setLoading}
                refSheet={props.bottomSheetRef}
              />
              {/* <DetailSessionListView
                            isTitleCenter
                            data={_.get(swingResult, "swings", [])}
                            onEndReach={props.onEndReach}
                        /> */}
            </View>
          </TouchableOpacity>
        </ScrollView>

        {isLoading && <AppLoader />}
      </RBSheet>
    </Portal>
  )
})

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.fonApp
  },
  SwingsText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginVertical: dW(16),
    marginTop: dH(24),
    textAlign: 'center'
  },
  txtTitle: {
    marginVertical: 30
  },
  listRoot: {
    width: '100%'
  }
})
