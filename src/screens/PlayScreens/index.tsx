import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import Swiper from 'react-native-web-swiper'
import YoutubePlayer from 'react-native-youtube-iframe'
import { useRoute } from '@react-navigation/native'
import _ from 'lodash'

import images from '../../assets/images'
import AppGradient from '../../components/AppGradient'
import Button from '../../components/Button'
import ComponentStyle from '../../components/ComponentStyle'
import Header from '../../components/Header'
import { GdText } from '../../components/text/gd-text'
import ScreenNavigation from '../../constants/ScreenNavigation'
import { play_image } from '../../constants/Strings'
import { dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'
import { styles } from './styles'


const data = [
  {
    img: play_image[0],
    text: 'play_title'
  },
  {
    img: play_image[1],
    text: 'choke_title'
  },
  {
    img: play_image[2],
    text: 'pad_title'
  }
]
const play_img = [play_image[0], play_image[1], play_image[2]]
const play_tit = ['play_title', 'choke_title', 'pad_title']
interface Props {
  navigation: any
}

const PlayScreen: FC<Props> = ({ navigation }) => {
  const [initialScrollIndex, setInitialScroll] = useState(0)
  const swiperRef = useRef()
  const route = useRoute()
  const swipe = Array(3).fill(1)
  const refIronChange = useRef<RBSheet>(null)
  const routeData = _.get(route.params, "data", {})
  console.log('RoutData--', initialScrollIndex)
  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      // Alert.alert('video has finished playing!')
    }
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
          refIronChange.current?.open()
          setInitialScroll(2)
          navigation.goBack()
        } else {
          navigation.navigate(ScreenNavigation.screens.playNow)
          // bottomSheetRef.current?.open()
          isSlide = false
          setInitialScroll(2)
        }
      }
    }
  }, [initialScrollIndex])

  const rendItems = ({ item, index }: any) => {
    return (
      // <TouchableOpacity onPress={() => navigation.navigate(ScreenNavigation.screens.playNow)}>
        <View
          style={[
            styles.FlatListCon,
            index === 0 ? ComponentStyle.marginTopButton3 : ComponentStyle.marginTopButton1
          ]}
        >
          <Image  
            source={item.img} style={styles.ImageStyle} />
          <View style={styles.FlatListConInbot}>
            <Image source={images.tabs.blue} tintColor={Colors.green} style={styles.margin} />
            {/* <Text style={styles.ImageText}>{item.text}</Text> */}
            <GdText style={styles.ImageText} tx={item.text} />
          </View>
        </View>
      // </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppGradient />
      {/* <View style={styles.view_indicator}>
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
      <Header isBack heading={'how_to_play'} onClick={() => navigation.goBack()} isLogo={false} /> */}
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
       <View style={styles.safeArea}>
        <Swiper
          ref={swiperRef}
          from={initialScrollIndex}
          activeIndex={initialScrollIndex}
          onIndexChanged={(index) => setInitialScroll(index)}
          minDistanceForAction={0.1}
          controlsEnabled={false}
        >
          {swipe.map((data, index) => {
            return (
              <View style={styles.play_bottom} key={index}>                
                <Image
                resizeMode='stretch'
                style={[styles.image_props, styles.image_border]}
                source={play_img[index]}
                />
                <View style={[styles.textContainer,styles.secoundtextContainer]}>
                <Image source={images.tabs.blue} tintColor={Colors.green} style={styles.margin} />                
                <GdText style={styles.ImageText} tx={play_tit[index]} />                                
                </View>
                <View style={styles.bottom}>

                  <Button
                    // exStyle={index === 2 ? styles.button_exStyle : styles.text_exStyle}
                    heading={routeData?.stage_id && index === 2 ? 'let_go' : index === 2 ? 'done' :'next'}
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
      {/* <ScrollView style={styles.flex}>        
        <FlatList data={data} renderItem={rendItems} />
      </ScrollView> */}

    </SafeAreaView>
  )
}

export default PlayScreen
