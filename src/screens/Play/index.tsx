import React, { FC, useEffect, useRef, useState } from 'react'
import { Image, SafeAreaView, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import Swiper from 'react-native-web-swiper'
import { StackActions, useRoute } from '@react-navigation/native'
import _ from 'lodash'

import AppGradient from '../../components/AppGradient'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { GdText } from '../../components/text/gd-text'
import ScreenNavigation from '../../constants/ScreenNavigation'
import { play_des, play_image, play_title } from '../../constants/Strings'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { Colors } from '../../utils/theme'
import { ChangeIronUnity } from '../Unity/ChangeIronUnity'
import { styles } from './style'

interface PlayProps {
  navigation: any
}

const Play: FC<PlayProps> = ({ navigation }) => {
  const swiperRef = useRef()
  const route = useRoute()
  const swipe = Array(3).fill(1)
  const refIronChange = useRef<RBSheet>(null)

  const [initialScrollIndex, setInitialScroll] = useState(0)
  const [clubData, setClubData] = useState([])
  const routeData = _.get(route.params, "data", {})

  useEffect(() => {
    APICall('get', undefined, EndPoints.clubs, false).then
      ((res: any) => {
        if (res?.statusCode === 200) {
          setClubData(res.data.data)
        }
      });
  }, [])

  useEffect(() => {
    let isSlide = true
    if (isSlide) {
      if (initialScrollIndex < 0) navigation.goBack()
      else if (initialScrollIndex >= 0 && initialScrollIndex < 3) {
        swiperRef?.current?.goTo(initialScrollIndex)
        isSlide = true
      } else if (initialScrollIndex === 3) {
        if (routeData) {
          // refIronChange.current?.open()
          setInitialScroll(2)
          navigation.pop(2)
        } else {
          navigation.navigate(ScreenNavigation.screens.playNow)
          // bottomSheetRef.current?.open()
          isSlide = false
          setInitialScroll(2)
        }
      }
    }
  }, [initialScrollIndex])

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppGradient />
      {/* {
        initialScrollIndex === 0 ? 
        null: */}
      <View style={styles.view_header}>
        <Header
          isLogo={false}
          heading={'how_to_play'}
          isBack
          onClick={() => setInitialScroll(initialScrollIndex - 1)}
        ></Header>
        <View style={styles.view_indicator}>
          {swipe.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  ...styles.indicator_circle,
                  backgroundColor: index === initialScrollIndex ? Colors.green : Colors.gray
                }}
              />
            )
          })}
        </View>
      </View>
      {/* } */}

      <View style={styles.safeArea}>
        <Swiper
          ref={swiperRef}
          from={initialScrollIndex}
          activeIndex={initialScrollIndex}
          onIndexChanged={(index) => setInitialScroll(index)}
          minDistanceForAction={0.1}
          controlsEnabled={false}
          containerStyle={{
            flex: 1,
          }}
        >
          {swipe.map((data, index) => {
            return (
              <View style={styles.play_bottom} key={index}>
                <Image
                  resizeMode='stretch'
                  style={[styles.image_props, styles.image_border]}
                  source={play_image[index]}
                />
                <View style={styles.textContainer}>
                  {/* <Text style={[styles.text_prop, styles.text_h1]}>{play_title[index]}</Text> */}
                  <GdText style={[styles.text_prop, styles.text_h1]} tx={play_title[index]} />
                  <GdText style={[styles.text_prop, styles.text_h2]} tx={play_des[index]} />
                </View>
                <View style={styles.bottom}>
                  <Button
                    exStyle={styles.btnNext}
                    heading={routeData?.stage_id && index === 2 ? 'let_go' : index === 2 ? 'done' : 'next'}
                    onPress={() => {
                      console.log("index.. ", index)
                      setInitialScroll(JSON.parse(JSON.stringify(index + 1)))
                    }
                    } isDisabled={false} />
                </View>
              </View>
            )
          })}
        </Swiper>
      </View>

      <ChangeIronUnity
        data={clubData}
        bottomSheetRef={refIronChange}
        isOnBoard
        onChangeIron={(item: any) => {
          console.log("data. ", routeData?.stage_id)
          refIronChange.current?.close()
          navigation.dispatch(StackActions.replace(ScreenNavigation.screens.OnboardCamera, { stage_id: routeData?.stage_id }))
        }}
      />
    </SafeAreaView>
  )
}
export default Play
