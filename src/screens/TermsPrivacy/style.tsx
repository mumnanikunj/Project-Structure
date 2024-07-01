import { Platform, StyleSheet } from 'react-native'

import fonts from '../../assets/fonts'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fonApp,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
  },
  forgotPasswordText: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.white,
    alignSelf: 'center'
  },
  loginImage: {
    height: dH(54),
    width: dW(103),
    top: dH(0),
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
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: dW(8),
    marginTop: dH(5)
  },
  textInputArea: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    width: dW(300),
    height: dH(35),
    borderRadius: dW(8),
    borderWidth: dW(1),
    alignSelf: 'center',
    marginTop: dH(40)
  },
  parentContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: dW(15),
    paddingBottom: dH(15),
    marginTop: dH(32)
  },
  cardTitleText: {
    color: Colors.white,
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
    alignSelf: 'flex-end',
    fontSize: 14,
    fontFamily: fonts.medium
  },
  cardNumberText: {
    color: Colors.white,
    alignSelf: 'flex-start',
    fontSize: 14,
    fontFamily: fonts.bold
  },
  cardNumberLightText: {
    color: Colors.gray,
    alignSelf: 'flex-start',
    fontSize: 13,
    fontFamily: fonts.bold
  },
  subscriptionViewCon: {
    height: dH(92),
    marginHorizontal: dW(16),
    borderWidth: dW(1.5),
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
    borderRadius: dW(10),
    paddingHorizontal: dW(16),
    paddingVertical: dW(24),
    marginTop: dH(8),
    margin: dW(12),
  },
  cardBGView: {
    flex: 1,
    backgroundColor:Colors.lightblack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: dW(8),
    borderRadius: dH(10)
  },
  cardImage: {
    height: dH(16),
    width: dW(26),
    top: dH(0),
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
  },
  subscriptionViewConBot: {
    flex: 1,
    backgroundColor: Colors.lightblack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: dW(15),
    borderBottomLeftRadius: dW(20),
    borderBottomRightRadius: dW(20),
    bottom: dH(0.8)
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
    backgroundColor: Colors.lightblack,
    borderRadius: 8,
  },
  dollerText: {
    color: Colors.white,
    fontSize: 16
  },
  milliText: {
    color: Colors.gray
  },
  txtTitle: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: "600",
    fontFamily: fonts.bold
  },
  txtUpdatedAt: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: "400",
    fontFamily: fonts.regular,
    marginTop: dW(8),
    marginBottom: dW(24)
  },
  txtTermsData: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "400",
    fontFamily: fonts.regular
  }
})
export default styles
