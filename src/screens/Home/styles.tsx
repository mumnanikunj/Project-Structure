import { Platform, StyleSheet } from 'react-native'

import fonts from '../../assets/fonts'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
  },
  parentView: {
    paddingHorizontal: dW(16)
  },
  subTitleBuy: {
    marginHorizontal: dW(11)
  },
  banner: {
    width: dW(343),
    height: dH(168)
  },
  interested: {
    width: dW(191),
    height: dH(200),
    flex:1,    
    justifyContent:'flex-end'
  },
  sub_image:{
    width:dW(32),
    height:dW(32),
    right:dW(10)    
  },
  BlurViewEffect:{
    flexDirection:'row',
    justifyContent:'center',
    bottom:dW(30)
  },
  DiscText:{
    fontFamily:fonts.regular,
    fontWeight:'400',
    fontSize:dW(14),
    color:Colors.white
  },
  TitleText:{
    color:Colors.white,
    fontFamily:fonts.semi_bold,
    fontSize:dW(14)
  },
  bottomTextView:{
    
  },
  view_tabs: {
    paddingTop: dH(16),
    paddingBottom: dH(8),
    paddingHorizontal: dW(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center'
  },
  inner_tab: {
    borderColor: Colors.green_light,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: dW(16),
    paddingVertical: dH(8),
    flexDirection: 'row',
    alignItems: 'center',
    width: '47%',
    justifyContent: 'center'
  },
  text_h2: {
    fontSize: 14,
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: Colors.white,
    marginStart: dW(8)
  },
  interested_text: {
    fontSize: 16,
    fontFamily: fonts.medium,
    fontWeight: '400',
    color: Colors.white
  },
  interested_view: {
    paddingHorizontal: dW(16),
    paddingTop: dH(24),
    paddingBottom: dH(8)
  },
  image: {
    width: dW(20),
    height: dH(20)
  },
  renderView: {
    paddingEnd: dW(10)
  },
  bottomView: {
    marginTop: dH(10),
    marginStart: dW(16)
  }, 
  popupBack: {
    backgroundColor: Colors.black, 
    padding: 16, 
    flexDirection: 'row', 
    width: '100%',
    alignItems: 'center',
    justifyContent: "space-evenly",
    borderBottomLeftRadius: dH(16),
    borderBottomRightRadius: dH(16)
    },
    msg: {
      color: Colors.white,
      width: '70%', 
      textAlign: 'center'
    },
    video: {
      // flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      borderRadius:16,
      height:dW(310)
    },
    container:{
      flex:1,
      margin:dH(10)      
    },
    // fullScreen: {
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   bottom: 0,
    //   right: 0,
    // },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
})
