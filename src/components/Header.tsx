import React, { FC } from 'react'
import { Image, Pressable, StyleSheet,Text, TouchableOpacity, View  } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import fonts from '../assets/fonts';
import images from '../assets/images'
import Strings from '../constants/Strings'
import { dH, dW } from '../utils/dynamicHeightWidth'
import { Colors } from '../utils/theme'
import { GdText } from './text/gd-text';

interface HeaderProps {
  heading: string
  isLogo: boolean
  isBack: boolean
  onClick: () => void
}

const Header: FC<HeaderProps> = ({ heading, isLogo, onClick, isBack,rigthView }) => {
  const insets = useSafeAreaInsets();
  const STATUSBAR_HEIGHT = insets.top;

  if(rigthView) {
    return <View style={styles.rightView}>{rigthView}</View>
  }

  return (
    <View style={[styles.MainView, heading === 'How to Play' && {marginTop:  STATUSBAR_HEIGHT}]}>
      {isBack ? (
        <TouchableOpacity onPress={onClick} hitSlop={20}>
          <Image
            style={{
              height: dH(heading === Strings.isHome ? dH(48) : dH(25)),
              width: dW(heading === Strings.isHome ? dW(48) : dW(25))
            }}
            source={heading === Strings.isHome ? images.home.chat : images.auth.back_arrow}
            resizeMode={"contain"} />
        </TouchableOpacity>
      ) : (
        <Pressable style={styles.PressView}></Pressable>
      )}
      {isLogo ? (
          <Image
            style={styles.LogoImage}
            source={images.app_icon.appLogo}
            resizeMode={"cover"} />
      ) : (
        // <Text style={styles.PressText}>
        //   {heading}
        // </Text>
        <GdText style={styles.PressText} tx={heading} />
      )}
      <Pressable style={styles.PressAct}></Pressable>
    </View>
  )
}

export default Header

export const styles = StyleSheet.create({
  MainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dW(20),
    width: '100%'
  },
  rightView: {
    height: dH(50),
    width: '100%'
  },
  PressView: {
    height: dH(60),
    width: dW(36),
    justifyContent: 'center'
  },
  LogoView: {
    paddingHorizontal: dW(24),
    paddingTop: dH(8),
    paddingBottom: dH(8),
    alignSelf: 'center'
  },
  LogoImage: {
    height: 74,
    width: 123
  },
  PressText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: '400'
  },
  PressAct: {
    height: dH(60),
    width: dW(36),
    justifyContent: 'center'
  }
})
