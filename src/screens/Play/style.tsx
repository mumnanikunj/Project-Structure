import {Platform, StyleSheet} from 'react-native'

import fonts from '../../assets/fonts'
import {dH, dW} from '../../utils/dynamicHeightWidth'
import {Colors} from '../../utils/theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0),
  },
  safeAreaSecound : {
    flex:1
  },
  view_header: {
    width: '100%',
    flexDirection: 'row',
    alignItems:'center'
  },
  play_bottom: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center'
  },
  btnNext: {
    margin: 0
  },
  text_prop: {
    color: Colors.white
  },

  text_h1: {
    fontSize: 22,
    fontFamily: fonts.bold,
    fontWeight: '600',
    marginTop: dH(24),
    textAlign: 'center'
  },

  text_h2: {
    fontSize: 15,
    fontFamily: fonts.regular,
    fontWeight: '400',
    marginTop: dH(16),
    textAlign: 'center'
  },

  view_indicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20
  },

  indicator_circle: {
    width: dW(8),
    height: dH(7),
    borderRadius: 20,
    marginLeft: 6
  },
  error_img: {
    width: dW(25),
    height: dH(25)
  },
  image_props: {
    width: '100%', 
    height: dW(342),
    alignSelf: 'center'
  },
  image_border: {
    // borderRadius: 20,
    // overflow: 'hidden'
  },
  bottom: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  textContainer:{
    marginHorizontal: dW(16)
  },
  videoGuide:{    
    width: '100%',
    height: '80%',    
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0
  }
})
