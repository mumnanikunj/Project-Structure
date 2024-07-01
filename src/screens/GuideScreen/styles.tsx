/* eslint-disable react-native/no-color-literals */
import { Platform, StyleSheet } from 'react-native'

import fonts from '../../assets/fonts'
import { actualDeviceSize, dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,    
    bottom: 0,
    right: 0
  },
  btnNext: {
    flex: 1,
  },
  guideTitle: {
    color: Colors.white,
    fontWeight: '600',
    fontFamily: fonts.bold,
    fontSize: dW(24),
  },
  guideSubtitle: {
    color: Colors.white,
    fontWeight: '400',
    fontFamily: fonts.regular,
    fontSize: dW(16),
    textAlign: 'center',
    marginTop: dW(16)
  },
  textContainer: {
    justifyContent: 'flex-end',
    position: 'relative',
    alignItems: 'center',
    marginHorizontal: dW(24),
    marginTop: dW(40)
  },
  play_icon_View: {    
     justifyContent: 'center', alignItems: "center",     
     height: actualDeviceSize.height * (global?.language === "en" ? 0.71: 0.695),    
     width:'100%'     
  },
  playIconImage:{
    height:56,
    width:56
  },
  blur_icon: {
    height: 40,
    width: 40, position: 'relative', borderRadius: 20, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  backPress:{
    flex:1,
    position:'absolute',    
    padding: 14
  }
})