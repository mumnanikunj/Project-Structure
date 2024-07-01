/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react'
import {SafeAreaView, Text, View} from 'react-native'
import Swiper from 'react-native-web-swiper'

import AppGradient from '../../components/AppGradient'
import Header from '../../components/Header'
import  {sigup_des, sigup_title} from '../../constants/Strings'
import ChoosePhoto from './ChoosePhot'
import GamePlay from './GamePlay'
import {styles} from './style'

const SignupParent = ({ route}: any) => {
  const swiperRef = useRef()
  const swipe = Array(3).fill(1)
  const [initialScrollIndex, setInitialScroll] = useState(0)
  // const {from} = route.params;

  useEffect(() => {
    if (initialScrollIndex >= 0 && initialScrollIndex < 4) {
      swiperRef?.current?.goTo(initialScrollIndex)
    }
  }, [initialScrollIndex])

  // useEffect(() => {
  //   const stageID = route.params.stageId
  //   console.log("stageID.. ", stageID);
  //   setInitialScroll(stageID - 1)
  // }, [route.params.stageId])

  const toggleIndex = (index: number) => {
    console.log("toggleIndex ", index)
    setInitialScroll(index)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppGradient />
          <Header
            isLogo={false}
            heading='Sign Up'
            // heading={from === "Home"? Strings.profile_setup: Strings.sign_up}
            isBack={false}
            onClick={() => {}}
          ></Header>
      <View style={styles.viewSafe}>
        <View style={styles.header_view}>
          {/* <View style={styles.view_dots}>
            {swipe.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    ...styles.indicator_circle,
                    backgroundColor: index === initialScrollIndex ? Colors.green : Colors.lightblack
                  }}
                />
              )
            })}
          </View> */}
        </View>   
        {/* <View style={styles.onboardingTextView}>     */}
        <Text style={[styles.text_prop, styles.text_h1]}>{sigup_title[initialScrollIndex]}</Text>
        <Text style={[styles.text_prop, styles.text_h2]}>{sigup_des[initialScrollIndex]}</Text>
        {/* </View> */}
        <View style={[styles.safeArea, styles.view_header, {marginTop: 25}]}>
          <Swiper
            containerStyle={styles.safeArea}
            ref={swiperRef}
            from={initialScrollIndex}
            activeIndex={initialScrollIndex}
            onIndexChanged={(index) => setInitialScroll(index)}
            minDistanceForAction={0.1}
            controlsEnabled={false}
            gesturesEnabled={() => false}
          >
            {swipe.map((data, index) => {
              return (
                <View key={index} style={{flex: 1}}>
                  {/* {index === 0 && <ContactInformation setIndex={toggleIndex} />} */}
                  {index === 1 && <GamePlay setIndex={toggleIndex} />}
                  {index === 2 && <ChoosePhoto setIndex={toggleIndex} 
                  // from={from}
                  />}
                  {/* {index === 3 && <Subscription   from={from}/>  } */}
                </View>
              ) 
            })}
          </Swiper>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignupParent
