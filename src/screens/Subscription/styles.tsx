import {Platform, StyleSheet} from 'react-native'

import fonts from '../../assets/fonts'
import {dH, dW} from '../../utils/dynamicHeightWidth'
import {Colors} from '../../utils/theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
  },
  button: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  text_exStyle: {
    marginBottom: dH(32)
  },
  subscriptionViewCon: {
    height: dH(92),
    // flex:1,
    // backgroundColor:'red',
    marginHorizontal: dW(16),
    borderWidth: 1.5,
    borderRadius: dW(18),
    marginTop: dH(32)
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
  selected_plan_item: {
    backgroundColor: Colors.green_transparent,
    borderBottomStartRadius: dW(16),
    borderBottomEndRadius: dW(16),
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
  TextCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dollerText: {
    color: Colors.white, 
    fontSize: 16
  },
  milliText: {
    color: 
    Colors.gray
  },
  YearText: {
    alignItems: 'flex-start', 
    marginHorizontal: dW(13), 
    flex: 1},
  skipView: {
    alignSelf: 'center'
  },
  text_prop: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: '400',
    marginVertical: dH(8),
    textAlign: 'center'
  }
})
