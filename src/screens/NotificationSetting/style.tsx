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
  lightText: {
    color: Colors.gray,
    fontSize: dW(14),
    fontFamily: fonts.regular,
    fontWeight: '400'
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
  titleText: {
    color: Colors.white,
    alignSelf: 'flex-start',
    fontSize: 16,
    fontFamily: fonts.regular,
    fontWeight: '400'
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
    backgroundColor: Colors.textArea_BG,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: dW(10),
    padding: dW(4),
    marginTop: dH(16),
    marginHorizontal: dW(16)
  },
  cardBGView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: dW(24),
    marginBottom: dW(16),
    paddingHorizontal: dW(16)
  },
  emptySpaceView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
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
  PushNotificationView: {
    flexDirection: 'row'
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
    bottom: dW(0.8)
  },
  Optionviewstyle: {
    paddingStart: dW(20),
    paddingVertical: dW(14),
    borderRadius: dH(100),
    flexDirection: 'row',
    marginBottom: dW(16),
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
  Listingroot: {
    marginHorizontal: dW(16),
    marginVertical: dW(41)
  },
  cardSecoundBGView: {
    marginTop: dW(0),
    marginBottom: dW(0),
    paddingHorizontal: dW(16),
    paddingTop:dW(24)
  }
})
export default styles
