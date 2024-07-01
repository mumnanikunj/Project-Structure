import React, { useEffect, useRef, useState } from 'react'
import { Image, Linking,   TouchableOpacity, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import RBSheet from 'react-native-raw-bottom-sheet'
import Video from 'react-native-video';
import { Portal } from '@gorhom/portal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'

import images from '../assets/images'
import { DEFAULT_LANGUAGE } from '../i18n/i18n';
import { styles } from '../screens/Home/styles'
import { dW } from '../utils/dynamicHeightWidth'
import { CommonStyles } from '../utils/theme/commonStyle'
import ComponentStyle from './ComponentStyle'
import { GdText } from './text/gd-text';

interface RBSeetProps {
  // data: []
  data: any,
  bottomSheetRef: any
  onSelectOptions: (data: any) => void
  website_url: string,
  amazon_url: string,
  makuake_url: string
}

const BuySimulatorSheet = (props: RBSeetProps) => {
  const [labguageKey , setLanguageKey] = useState<string>();

  const videoRef = useRef(null);
  const isFocus = useIsFocused()
  
  useEffect(()=>{
    GetLanguage()
  },[isFocus])

  const GetLanguage = async() =>{
    const setLanguage = await AsyncStorage.getItem('settings.lang') || DEFAULT_LANGUAGE ;
    setLanguageKey(setLanguage)
  } 
  return (
    <>
      <Portal>
        <RBSheet
          height={dW(650)}
          openDuration={250}
          closeonDrag
          ref={props.bottomSheetRef}
          closeOnDragDown
          closeOnPressMask
          customStyles={{
            container: CommonStyles.bottomSheetContainer,
            wrapper: CommonStyles.bottomSheetWrapper,
            draggableIcon: CommonStyles.bottomSheetIcon
          }}
        >
          <View style={styles.container}>
            <Video
              // paused={!isFocus}
              ref={videoRef}
              source={require('../assets/video/matsell.mp4')}
              resizeMode={"cover"}
              style={styles.video}
              repeat
            // onEnd={onEnd}
            />
          </View>
          <View style={ComponentStyle.bottom_shett_view}>
            <GdText style={[ComponentStyle.text_h1, ComponentStyle.marginTopButton1]} tx={'buy_divot'}/>
            <GdText style={[ComponentStyle.text_h2, ComponentStyle.marginTopButton3,
            styles.subTitleBuy]} tx={'divot_daddy'}/>
            <TouchableOpacity
              onPress={() => {
                props.bottomSheetRef?.current?.close()
                props.onSelectOptions({ viewType: 'onboard', data: 1 })                
                labguageKey === 'en' ?
                Linking.openURL(props.amazon_url).catch(e => { }):
                Linking.openURL(props.makuake_url)
              }}
              // style={[ComponentStyle.button, ComponentStyle.marginTopButton1]}
              style={[ComponentStyle.marginTopButton1, ComponentStyle.CustomButtonStyle]}
            >
              <Image
                resizeMode={'contain'}
                style={labguageKey === 'en' ? ComponentStyle.button :ComponentStyle.button2}
                source={labguageKey === 'en' ?  images.home.Amazon : images.home.Makuake}
              />
              <GdText style={ComponentStyle.buyTextStyle} tx={'buy_on_amazon'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={ComponentStyle.paddingBottom}
              onPress={() => {
                props.bottomSheetRef?.current?.close()
                props.onSelectOptions({ viewType: 'onboard', data: 2 })
                Linking.openURL(props.website_url).catch(e => { })
              }}
            >
              <Image
                resizeMode={'contain'}
                style={[ComponentStyle.button, ComponentStyle.marginTopButton2]}
                source={images.home.Shoping}
              />
              <GdText style={ComponentStyle.buyTextStyle} tx={'buy_on_our_website'} />
            </TouchableOpacity>

          </View>
        </RBSheet>
      </Portal>
    </>
  )
}

export default BuySimulatorSheet


