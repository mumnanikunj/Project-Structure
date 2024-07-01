import {Platform, StyleSheet} from 'react-native'

import {dH, dW} from '../../utils/dynamicHeightWidth'
import {Colors} from '../../utils/theme'
import fonts from '../../assets/fonts'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
  },
  swingText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center'
  },
  playerWeb: {
      borderRadius: 16,
      margin:16,
      overflow: 'hidden'
  },
  ImagebackgroundCon: {
    height: dW(169),
    marginHorizontal: dW(16),
    marginTop: dH(16),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  FlatListCon: {
    marginHorizontal: dW(16),

    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  FlatListConInbot: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: dW(6.2)
  },
  ImageText: {
    color: Colors.white,
    paddingLeft: 15,
    fontSize: 16,
    lineHeight: 20
  },
  ImageStyle: {
    // width:'100%',
    // height: 100,
    // flex: 1
    width: '100%', 
    height: dW(322),
    alignSelf: 'center',
    borderRadius: 20,
  overflow: 'hidden'
  },
  ThreeImageCon: {
    flex: 1,
    flexDirection: 'row'
  },
  borderRadiusImageLeft: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16
  },
  borderRadiusImageRight: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16
  },
  GeneralText: {
    color: Colors.white,
    marginHorizontal: dW(16),
    fontSize: 16,
    marginVertical: dH(10)
  },
  flex: {
    flex: 1
  },
  view_indicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
  },
  indicator_circle: {
    width: dW(8),
    height: dH(7),
    borderRadius: 20,
    marginLeft: 6
  },
  margin : {
    // marginTop: 5
  },
  play_bottom: {
    flex: 1,
    paddingVertical: dH(8),
    alignContent: 'center',
    alignItems: 'center',    
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
  bottom: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  button_exStyle: {
    marginBottom: dH(16)
  },
  text_exStyle: {
    marginBottom: dH(16)
  },
  textContainer:{
    marginHorizontal: dW(16)
  },
  secoundtextContainer:{
    // marginHorizontal:dW(10),
    flexDirection:"row",
    justifyContent:'space-between',
    marginTop:dW(108)
  },
  view_header: {
    width: '100%',
    flexDirection: 'row',
    alignItems:'center'
  }
})
