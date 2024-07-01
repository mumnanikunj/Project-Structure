import { StyleSheet } from 'react-native'

import fonts from '../../assets/fonts'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   alignItems:'center',
    //   justifyContent:'center',
    backgroundColor: Colors.fonApp
  },
  forgotPasswordText: {
    // color: Colors.white,
    fontWeight: '700',
    fontSize: 18,
    color: Colors.white,
    alignSelf: 'center'
  },
  loginImage: {
    height: dH(54),
    width: dW(103),
    top: 0,
    position: 'absolute'
  },
  innerContainer: {},
  signinHeading: {
    color: Colors.white,
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: '700'
  },
  phoneNumberInput: {
    // width:dW(260),
    // height:dH(35),
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 8,
    marginTop: dH(5)
    // height: dH(40), // Adjust this value
    // textAlignVertical: 'center',
  },
  textInputArea: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    width: dW(300),
    height: dH(35),
    borderRadius: 8,
    borderWidth: 1,

    alignSelf: 'center',
    marginTop: dH(40)
  },
  parentContainer: {
    // flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
    marginTop: dH(32)
    // height: '25%',
    // backgroundColor:'red',
  },
  cardTitleText: {
    color: Colors.white,
    // alignSelf: 'center',
    fontSize: 16,
    fontFamily: fonts.bold
  },
  confirmationContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    bottom: dH(33),
    position: 'absolute'
  },

  editTitleText: {
    color: Colors.green,
    // marginLeft:10,
    alignSelf: 'flex-end',
    fontSize: 14,
    fontFamily: fonts.medium
  },

  cardNumberText: {
    color: Colors.white,
    // marginLeft:10,
    alignSelf: 'flex-start',
    fontSize: 14,
    fontFamily: fonts.bold
  },
  cardNumberLightText: {
    color: Colors.gray,
    // marginLeft:10,
    alignSelf: 'flex-start',
    fontSize: 13,
    fontFamily: fonts.bold
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
  cardBGColumnView: {
    flex: 1,
    backgroundColor: Colors.lightblack,

    borderRadius: 10,
    padding: dW(4),
    marginTop: 8,
    margin: 12
  },

  cardBGView: {
    flex: 1,
    backgroundColor:Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: dW(8),
    borderRadius:10
  },
  cardImage: {
    height: dH(16),
    width: dW(26),
    top: 0,
    position: 'relative'
  },
  TextCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
  subscriptionViewConBot: {
    flex: 1,
    backgroundColor: Colors.lightblack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: dW(15),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    bottom: 0.8
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
  WebView: {
    backgroundColor: Colors.white
  },
  dollerText: { color: Colors.white, fontSize: 16 },
  milliText: { color: Colors.gray }
})
export default styles
