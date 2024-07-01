import { Platform, StyleSheet } from 'react-native'

import fonts from '../../assets/fonts'
import { Constants } from '../../utils/constants'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'
import responsive from '../../utils/theme/responsive'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
  },
  headerText: {
    alignItems: 'center', flexDirection: 'row',
    justifyContent: 'center', marginHorizontal: dW(15),
    marginBottom: dW(20)
  },
  view_header: {
    width: '100%',
    flex: 1,
  },
  header_view: {
    width: '100%',
    flexDirection: 'row'
  },
  view_dots: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    right: 20
  },
  view_indicator: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: dH(58)
  },
  button_exStyle: {
    marginTop: dH(32),
    paddingHorizontal: dW(40),
  },
  text_exStyle: {
    marginBottom: 30
  },

  viewSafe: {
    flex: 1,
    alignItems: 'center'
  },
  txtHeaderTitle: {
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center'
  },
  txtHeaderSubTitle: {
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: Colors.white,
    textAlign: 'center',
    marginTop: dW(1)
  },
  text_prop: {
    color: Colors.white
  },
  selected_text_prop: {
    color: Colors.black
  },
  text_h1: {
    fontSize: dW(24),
    fontFamily: fonts.bold,
    fontWeight: '600'
  },
  text_title: {
    fontSize: dW(24),
    fontFamily: fonts.bold,
    fontWeight: '600',
    marginBottom: dW(24)
  },
  text_game: {
    fontSize: dW(32),
    fontFamily: fonts.light,
    fontWeight: '300',
    marginTop: dW(24),
    marginBottom: dW(16)
  },

  text_h2: {
    fontSize: dW(16),
    fontFamily: fonts.regular,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: dW(24)
  },
  text_subtitle: {
    fontSize: dW(18),
    fontFamily: fonts.regular,
    fontWeight: '400',
    textAlign: 'center',
  },
  btnNext: {
    flex: 1,
    justifyContent: 'flex-end',
    // marginBottom: dH(50)
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

  marg_hor: {
    marginHorizontal: dW(16),
  },

  photo_choose: {
    width: dW(160),
    height: dW(160),
    alignSelf: 'center',
    borderRadius: dW(100),
    overflow: 'hidden',
    marginBottom: dW(32)
  },

  space: { marginEnd: dW(16) },

  row: {
    flexDirection: 'row',

    justifyContent: 'space-between'
  },

  choose_photo_view: {
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  selected_hand: {
    backgroundColor: Colors.ligth_green,
    borderRadius: dW(10),
    alignItems: 'center'
  },

  unselected_hand: {
    borderRadius: dW(10),
    backgroundColor: Colors.textArea_BG,
    alignItems: 'center',
    borderColor: Colors.inputBorderColor,
    borderWidth: 1
  },

  warnCon: {
    backgroundColor: Colors.lightblack,
    borderRadius: 16,
    justifyContent: 'space-between',
    paddingHorizontal: dW(16),
    paddingVertical: dH(15),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: dH(16),
    width: '100%'
  },
  warnText: {
    color: Colors.white,
    flex: 1,
    marginStart: 10,
    fontFamily: fonts.regular
  },
  textInputCon: {
    backgroundColor: Colors.textArea_BG,
    borderRadius: 8,
    borderColor: Colors.inputBorderColor,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: dW(16),
    width: '100%'
  },
  titleView: {
    alignItems: 'center', marginBottom: dW(25)
  },
  error: {
    fontFamily: fonts.regular,
    fontSize: responsive.convertFontScale(14),
    color: Colors.red,
    width: '100%',
    alignSelf: 'center',
  },
  text_required: { color: Colors.white, fontSize: 20 },

  textInputStyle: {
    color: Colors.white,
    fontSize: dW(14),
    flex: 1,
    height: dW(48)
  },
  subscriptionViewCon: {
    height: dH(92),
    // flex:1,
    // backgroundColor:'red',
    marginHorizontal: dW(16),
    borderWidth: 1.5,
    borderRadius: dW(18),
    marginTop: dW(15)
  },
  PercentageView: {
    flex: 0.3,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: dW(16),
    borderTopRightRadius: dW(16)
  },
  subscriptionViewConBot: {
    flex: 1,
    // backgroundColor:Colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: dW(15)
  },
  moreStyle: {
    alignItems: 'flex-start',
    paddingTop: dH(25),
    flex: 1
  },
  YearlyCon: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingLeft: dW(15)
    // paddingRight:dW(43)
    // backgroundColor:'red'
  },
  YearlyCon2: {
    flex: 0.7,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingLeft: dW(15)
  },
  yearlyText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: '600'
  },
  fullYearText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '400',
    marginTop: dW(8)
  },
  priceText: {
    fontSize: 32,
    color: Colors.green,
    fontWeight: '300'
  },
  txtHeightCm: {
    fontFamily: fonts.light,
    fontSize: dW(22),
    color: Colors.white,
    fontWeight: '300'
  },
  TextCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dollerText: { color: Colors.white, fontSize: 16 },
  milliText: { color: Colors.gray },
  YearText: { alignItems: 'flex-start', marginHorizontal: dW(13), flex: 1 },
  skipView: {
    alignSelf: 'center'
  },
  btnRoot: {
    flexGrow: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: dW(32)
  },
  emptryGrow: { flexGrow: 1 },
  skipText: {
    color: Colors.white,
    fontSize: dW(16),
    fontFamily: fonts.regular,
    fontWeight: '400'
  },
  nextView: {
    textTransform:'uppercase',
    paddingHorizontal: dW(20),
    marginBottom: dW(24)
  },
  flex1: { flex: 1 },
  Viewtext_h1: {
    marginTop: dH(70),
    alignItems: 'center'
  },
  Optiontextstyle: {
    fontFamily: fonts.bold,
    fontWeight: '500',
    lineHeight: dW(20),
    fontSize: dW(14),
    flex: 1,
    marginEnd: dW(10)
  },
  imgTick: {
    height: dW(24),
    width: dW(24),
    tintColor: Colors.fonApp,
    marginEnd: dW(20)
  },
  Optionviewstyle: {
    paddingStart: dW(20),
    paddingVertical: dW(14),
    borderRadius: dH(100),
    flexDirection: "row",
    marginBottom: dW(16),
    alignItems: "center",
    // position: 'absolute',    
    // width: '100%',
    // height: dW(50),
  },
  buttonSign: {
    marginTop: 0
  },
  sliderIndicateText: {
    color: Colors.grey_green,
    paddingBottom: dW(10),
    fontWeight: '400',
    fontFamily: fonts.regular
  },
  onboardingTextView: {
    alignItems: 'center',
    marginTop: dW(120)
  },
  onboardingAlmostView: {
    marginTop: dW(10),
    alignItems: 'center'
  },
  stageView_style: {
    marginVertical: dH(10),
    alignItems: 'center'
  },
  calibrateview: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0    
  },
  calibratetext: {
    marginTop: dH(10),
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: dW(16),
    color: Colors.white
  },
  subTitleBuy: {
    marginHorizontal: dW(11),
  },
  video: {
    // flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 16,
    height: dW(310)
  },
  container: {
    flex: 1,
    margin: dH(10)
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
  },
  checkBoxArea: {
    flexDirection: 'row',
    marginEnd: dW(35),
    marginTop: dW(24),
  },
  parentCheckBox: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  tickBox: {
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: Colors.lightblack,
  },
  parentCheckBoxText: {
    color: Colors.white,
    marginStart: dW(15)
  },
  checkBoxOne: {
    fontSize: dW(14),
    fontWeight: '400',
    color: Colors.gray,
    fontFamily: fonts.regular,
    marginStart: dW(15),
    flex:1
  },
  checkBoxTwo: {
    fontSize: dW(14),
    fontWeight: '400',
    color: Colors.ligth_green,
    alignSelf: 'center',
    fontFamily: fonts.regular
  },
  commonView: {
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  topCorder: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtTitle: {
    fontSize: 24,
    fontFamily: fonts.bold,
    fontWeight: "600",
    color: Colors.white,
    marginTop: dH(8),
    textAlign: 'center'
  },
  txtSubTitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    fontWeight: "400",
    color: Colors.white,
    marginVertical: dH(16),
    textAlign: 'center'
  },
  bottomCornerRoot: {
    marginTop: dW(15)
  },
  Viewtitle: {
    flex: 1
  },
  view_header_secoundry: {
    marginTop: dW(0),
    flexDirection: 'column',
    paddingHorizontal: 32
  },
  contactButtonView: {
  },
  recordView: {
    flex: 1,
    justifyContent: "space-between"
  },
  camera_preview_image_view: {
    alignItems: 'center'
  },
  text_exStyle_secondry: { marginBottom: 0 },
  ripple: {
    position: 'absolute',
    borderRadius: 100, // Make it a circle
    width: '100%',
    height: dW(50)
    // paddingVertical: dW(14),
  },
  bottomView:{
    flex:0.1
  },
  BottomSubText:{ 
    fontFamily:fonts.regular,
    color:Colors.white,
    fontWeight:'400',
    fontSize:dW(16),    
  }

})
